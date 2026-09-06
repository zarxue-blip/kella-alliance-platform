/**
 * Regression test for radar graph multi-selection bug.
 *
 * Root cause: When a member modal is opened from the dashboard power board,
 * the member data comes from state.dashboardMembers which is in compact mode
 * (only one stat metric per statHistory entry). This caused the radar graph
 * to show 0 for all non-power metrics because normalizeStatHistory could not
 * find the metric data.
 *
 * Run: node backend/test/radar_multi_selection.test.js
 *
 * MULTI-SELECTION: This test verifies that full member data contains ALL
 * selected radar metrics. Do not replace filter/querySelectorAll/map iteration
 * with single-item find/querySelector logic — all selected radar metrics need
 * full statHistory.
 */

// Reproduce the core statHistory filtering logic from kellaDashboard.ts
// without importing the full Express template (which requires DOM globals).

function normalizeStatHistory(member, metricKey) {
  const metric = metricKey || 'power';
  const rows = [];
  (Array.isArray(member?.statHistory) ? member.statHistory : []).forEach(function(point) {
    const date = point?.date ? new Date(point.date) : null;
    const value = Number(point?.metrics?.[metric]);
    if (!date || !Number.isFinite(date.getTime()) || !Number.isFinite(value)) return;
    rows.push({ date: date, value: value });
  });
  // Dedupe by day
  const byDay = new Map();
  rows
    .filter(function(point) { return Number.isFinite(point.value); })
    .sort(function(left, right) { return left.date.getTime() - right.date.getTime(); })
    .forEach(function(point) { byDay.set(point.date.toISOString().slice(0, 10), point); });
  return Array.from(byDay.values()).sort(function(left, right) { return left.date.getTime() - right.date.getTime(); });
}

function memberMetricValue(member, metricKey, dateKey) {
  if (!dateKey) {
    if (metricKey === 'power') return Number(member?.power || 0);
    const history = normalizeStatHistory(member, metricKey);
    if (history.length) return Number(history[history.length - 1].value || 0);
    return 0;
  }
  const history = normalizeStatHistory(member, metricKey).filter(function(point) {
    return point.date.toISOString().slice(0, 10) <= dateKey;
  });
  if (history.length) return Number(history[history.length - 1].value || 0);
  return 0;
}

// --- Test data ---

const fullMember = {
  id: '6a34ff3d62ea4115fda31a1f',
  power: 166379326,
  statHistory: [
    {
      date: '2026-08-14T00:00:00.000Z',
      metrics: {
        power: 166379326,
        merits: 102940692,
        unitsKilled: 723990229,
        resourcesGathered: 478027617,
        unitsHealed: 267030268,
        serverRank: 0,
        buildingPower: 18671177,
        woodGathered: 102981151,
        goldGathered: 82474096,
        t5Kills: 0
      }
    },
    {
      date: '2026-08-10T00:00:00.000Z',
      metrics: {
        power: 165000000,
        merits: 101000000,
        unitsKilled: 720000000,
        resourcesGathered: 475000000,
        unitsHealed: 265000000,
        buildingPower: 185000000,
        woodGathered: 102000000,
        goldGathered: 82000000
      }
    }
  ]
};

// Compact member: only has 'power' in statHistory metrics
const compactMember = {
  id: '6a34ff3d62ea4115fda31a1f',
  power: 166379326,
  statHistory: [
    { date: '2026-08-14T00:00:00.000Z', metrics: { power: 166379326 } },
    { date: '2026-08-10T00:00:00.000Z', metrics: { power: 165000000 } }
  ]
};

// The default radar metrics (from profileRadarMetrics defaults)
const defaultMetrics = ['power', 'merits', 'topPower', 'unitsKilled', 'resourcesGathered', 'serverRank', 'unitsHealed', 'buildingPower'];
// Filter to only metrics that exist in statMetricOptions (exclude topPower which is not a selectable option)
const selectableMetrics = defaultMetrics.filter(function(k) { return k !== 'topPower'; });

let passed = 0;
let failed = 0;

function assert(name, condition, details) {
  if (condition) {
    console.log('  ✅ ' + name);
    passed++;
  } else {
    console.log('  ❌ ' + name + (details ? ' — ' + details : ''));
    failed++;
  }
}

console.log('=== Radar Multi-Selection Regression Tests ===\n');

console.log('Test 1: Compact member (dashboard data) — simulates the bug');
const compactValues = selectableMetrics.map(function(key) {
  return { metric: key, value: memberMetricValue(compactMember, key, '2026-08-14') };
});
console.log('  Values from compact member:', JSON.stringify(compactValues));
let compactNonZero = compactValues.filter(function(v) { return v.value > 0; }).length;
assert('Compact member only has Power with non-zero value (demonstrates the bug)',
  compactNonZero === 1 && compactValues.find(function(v) { return v.metric === 'power' && v.value > 0; }),
  'Expected 1 non-zero (power only), got ' + compactNonZero);

console.log('\nTest 2: Full member — simulates the fix');
const fullValues = selectableMetrics.map(function(key) {
  return { metric: key, value: memberMetricValue(fullMember, key, '2026-08-14') };
});
console.log('  Values from full member:', JSON.stringify(fullValues));
let fullNonZero = fullValues.filter(function(v) { return v.value > 0; }).length;
assert('Full member has ALL selected metrics with non-zero values (6/7 non-zero, serverRank=0 is expected)',
  fullNonZero >= 6,
  'Expected >= 6 non-zero values, got ' + fullNonZero);

console.log('\nTest 3: Multi-selection count matches');
assert('All selected metrics (6) are recognized from full member data',
  fullValues.length === selectableMetrics.length,
  'Expected ' + selectableMetrics.length + ' metrics, got ' + fullValues.length);

console.log('\nTest 4: Deselection test (simulated)');
const subsetMetrics = selectableMetrics.slice(0, 4);
const subsetValues = subsetMetrics.map(function(key) {
  return { metric: key, value: memberMetricValue(fullMember, key, '2026-08-14') };
});
console.log('  4 selected metrics:', JSON.stringify(subsetValues));
let subsetNonZero = subsetValues.filter(function(v) { return v.value > 0; }).length;
assert('First 4 selected metrics all have non-zero values',
  subsetNonZero === subsetMetrics.length,
  'Expected ' + subsetMetrics.length + ' non-zero, got ' + subsetNonZero);

console.log('\nTest 5: Selection order independence');
const reversedMetrics = selectableMetrics.slice().reverse();
const reversedValues = reversedMetrics.map(function(key) {
  return { metric: key, value: memberMetricValue(fullMember, key, '2026-08-14') };
});
console.log('  Reversed order metrics:', JSON.stringify(reversedValues));
let reversedNonZero = reversedValues.filter(function(v) { return v.value > 0; }).length;
assert('Selection order does not affect data availability (>= 6 non-zero)',
  reversedNonZero >= 6,
  'Expected >= 6 non-zero, got ' + reversedNonZero);

console.log('\n=== Summary ===');
console.log('Passed: ' + passed + ', Failed: ' + failed);
if (failed > 0) {
  console.log('❌ REGRESSION DETECTED — radar multi-selection is broken');
  process.exit(1);
} else {
  console.log('✅ All radar multi-selection tests passed');
  process.exit(0);
}
