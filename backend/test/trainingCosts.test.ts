import assert from 'node:assert/strict';
import { trainingCostTotal, trainingSpeedupPlan, trainingUnitEventEstimates } from '../src/data/trainingCosts.js';

// Recorded 1,600-unit examples are useful checks against resource-type swaps.
assert.deepEqual(trainingCostTotal('t1', 'archer', 1600), { ore: 0, mana: 0, wood: 96000, gold: 64000 });
assert.deepEqual(trainingCostTotal('t2', 'infantry', 1600), { ore: 0, mana: 0, wood: 160000, gold: 160000 });
assert.deepEqual(trainingCostTotal('t2', 'mage', 1600), { ore: 120000, mana: 0, wood: 160000, gold: 0 });
assert.deepEqual(trainingCostTotal('t2', 'cavalry', 1600), { ore: 96000, mana: 0, wood: 96000, gold: 96000 });
assert.deepEqual(trainingCostTotal('t3', 'flying', 1600), { ore: 144000, mana: 48000, wood: 144000, gold: 144000 });
assert.deepEqual(trainingCostTotal('t5', 'archer', 2), { ore: 1200, mana: 800, wood: 0, gold: 1600 });
assert.deepEqual(trainingCostTotal('t2', 'mage', Number.NaN), { ore: 0, mana: 0, wood: 0, gold: 0 });
assert.deepEqual(trainingCostTotal('t2', 'mage', -5), { ore: 0, mana: 0, wood: 0, gold: 0 });
assert.deepEqual(trainingCostTotal('t2', 'mage', 2.9), { ore: 150, mana: 0, wood: 200, gold: 0 });

const oneDayFlying = trainingSpeedupPlan('t3', 'flying', 86400, 75);
assert.equal(oneDayFlying.units, 2520);
assert.deepEqual(oneDayFlying.resources, { ore: 226800, mana: 75600, wood: 226800, gold: 226800 });
assert.equal(oneDayFlying.usedSeconds, 86400);
assert.equal(oneDayFlying.remainingSeconds, 0);
assert.deepEqual(trainingSpeedupPlan('t5', 'cavalry', 60, 75), {
  units: 0, resources: { ore: 0, mana: 0, wood: 0, gold: 0 }, usedSeconds: 0, remainingSeconds: 60
});
assert.equal(trainingSpeedupPlan('t1', 'archer', Number.NaN, -20).units, 0);

assert.deepEqual(trainingUnitEventEstimates('t3', 1600), {
  powerGain: 32000, greatestHeights: 4800, mgeDay1: 32000, mgeDay5: 25600
});
assert.deepEqual(trainingUnitEventEstimates('t1', 1600), {
  powerGain: null, greatestHeights: null, mgeDay1: null, mgeDay5: null
});
console.log('Training cost, speedup, and event estimate checks passed.');
