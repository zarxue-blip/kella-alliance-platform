import { healingResourceCosts } from "../data/healingCosts.js";

export function hospitalDeniedHtml(authenticated: boolean) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Hospital | Kella</title><style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at 50% 20%,#263328,#0a100d 70%);color:#f2e4c4;font:16px/1.6 system-ui}
    main{width:min(470px,calc(100% - 40px));box-sizing:border-box;padding:34px;border:1px solid #b99b5866;border-radius:18px;background:#151d18e8;box-shadow:0 25px 70px #0009;text-align:center}
    img{width:90px;height:90px;object-fit:contain}h1{margin:10px 0;font:32px Georgia,serif}p{color:#b9c1b6}a{display:inline-block;margin:8px 5px;padding:11px 17px;border:1px solid #c8a85e;border-radius:9px;background:#b8913d;color:#18130a;font-weight:800;text-decoration:none}a.secondary{background:transparent;color:#ead9b5}
    </style></head><body><main><img src="/assets/base-game/assets/hospital.png" alt=""><h1>Hospital</h1><p>${authenticated ? "Access is available to members with the @881 Discord role." : "Sign in with Discord to use the Hospital calculator."}</p>${authenticated ? "" : '<a href="/api/auth/discord">Sign in with Discord</a>'}<a class="secondary" href="/">Return to Kella</a></main></body></html>`;
}

export const hospitalClient = `
      const hospitalTroops = [
        { key: "infantry", label: "Infantry" },
        { key: "mage", label: "Mage" },
        { key: "archer", label: "Archers" },
        { key: "cavalry", label: "Cavalry" },
        { key: "flying", label: "Flying" }
      ];
      const hospitalResources = ["gold", "wood", "ore", "mana"];
      const hospitalRates = ${JSON.stringify(healingResourceCosts)};

      function hospitalQuantity(value) {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? Math.min(1000000000, Math.max(0, Math.floor(parsed))) : 0;
      }

      function hospitalPercent(value) {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? Math.min(100, Math.max(0, parsed)) : 0;
      }

      function hospitalData() {
        if (!state.hospital) {
          state.hospital = {
            tier: "t4",
            counts: { infantry: 0, mage: 0, archer: 0, cavalry: 0, flying: 0 },
            policy: { 10: false, 15: false, 20: false },
            villages: { gold: 0, wood: 0, ore: 0, mana: 0 }
          };
        }
        return state.hospital;
      }

      function hospitalTotals(data) {
        const base = { gold: 0, wood: 0, ore: 0, mana: 0 };
        hospitalTroops.forEach(function(troop) {
          const count = hospitalQuantity(data.counts[troop.key]);
          const rates = hospitalRates[data.tier][troop.key];
          hospitalResources.forEach(function(resource) { base[resource] += count * rates[resource]; });
        });
        const policyFactor = 1 - ((data.policy[10] ? 10 : 0) + (data.policy[15] ? 15 : 0) + (data.policy[20] ? 20 : 0)) / 100;
        const totals = {};
        hospitalResources.forEach(function(resource) {
          totals[resource] = Math.round(base[resource] * policyFactor * (1 - hospitalPercent(data.villages[resource]) / 100));
        });
        return totals;
      }

      function renderHospital() {
        const data = hospitalData();
        const troopInputs = hospitalTroops.map(function(troop) {
          return '<label class="hospital-troop" for="hospital-' + troop.key + '">' +
            '<img src="/assets/training-units/' + troop.key + '-' + data.tier + '.png" alt="" data-hospital-icon="' + troop.key + '" />' +
            '<span>' + troop.label + '</span>' +
            '<input id="hospital-' + troop.key + '" type="number" min="0" max="1000000000" step="1" inputmode="numeric" value="' + hospitalQuantity(data.counts[troop.key]) + '" data-hospital-count="' + troop.key + '" aria-label="Wounded ' + troop.label + '" />' +
          '</label>';
        }).join("");
        const resourceCards = hospitalResources.map(function(resource) {
          return '<div class="hospital-resource hospital-resource-' + resource + '">' +
            '<img src="' + resourceIconPaths[resource] + '" alt="" />' +
            '<span>' + trainingResourceLabels[resource] + '</span>' +
            '<strong data-hospital-result="' + resource + '">0</strong>' +
          '</div>';
        }).join("");
        const villageInputs = hospitalResources.map(function(resource) {
          return '<label class="hospital-village"><span><img src="' + resourceIconPaths[resource] + '" alt="" />' + trainingResourceLabels[resource] + '</span><span class="hospital-percent-input"><input type="number" min="0" max="100" step="0.1" inputmode="decimal" value="' + hospitalPercent(data.villages[resource]) + '" data-hospital-village="' + resource + '" aria-label="' + trainingResourceLabels[resource] + ' village reduction percentage" />%</span></label>';
        }).join("");
        const policies = [
          { value: 10, label: "Resource Healing" },
          { value: 15, label: "Resource Healing II" },
          { value: 20, label: "Healthcare Diligence" }
        ].map(function(policy) {
          return '<label class="hospital-policy"><input type="checkbox" data-hospital-policy="' + policy.value + '"' + (data.policy[policy.value] ? ' checked' : '') + ' /><span>' + policy.label + ' <small>(' + policy.value + '%)</small></span></label>';
        }).join("");
        app.innerHTML = (embeddedTool ? '' : pageHeader("Hospital", "Calculate resources needed to heal your severely wounded troops.")) +
          '<div class="hospital-shell"><section class="hospital-board" aria-labelledby="hospitalHeading">' +
            '<header class="hospital-heading"><img src="/assets/base-game/assets/hospital.png" alt="" /><div><span class="hospital-eyebrow">RESOURCE HEALING</span><h2 id="hospitalHeading">Hospital</h2><p>Enter your severely wounded units.</p></div></header>' +
            '<div class="hospital-troops" role="group" aria-label="Wounded troops">' + troopInputs + '</div>' +
            '<div class="hospital-tier-row"><span>Troop tier</span><div class="hospital-tier-switch" role="group" aria-label="Troop tier">' +
              '<button type="button" data-hospital-tier="t4" aria-pressed="' + String(data.tier === 't4') + '">T4</button>' +
              '<button type="button" data-hospital-tier="t5" aria-pressed="' + String(data.tier === 't5') + '">T5</button>' +
            '</div></div>' +
            '<section class="hospital-results" aria-labelledby="hospitalResultsHeading"><div class="hospital-results-heading"><div><span class="hospital-eyebrow">HEALING COST</span><h3 id="hospitalResultsHeading">Resources needed</h3></div><span data-hospital-summary>0 T4 troops</span></div>' +
              '<div class="hospital-resource-grid" aria-live="polite">' + resourceCards + '</div>' +
            '</section>' +
            '<details class="hospital-reductions"><summary>Healing reductions <span>Optional policy and village bonuses</span></summary><div class="hospital-reduction-content"><fieldset><legend>Policy bonuses</legend><div class="hospital-policy-grid">' + policies + '</div></fieldset><fieldset><legend>Village reductions by resource</legend><div class="hospital-village-grid">' + villageInputs + '</div></fieldset></div></details>' +
            '<p class="hospital-note">Base Resource Healing rates from the reference calculator. Policy percentages add together; village reductions apply to each resource after policies. Each final total is rounded once.</p>' +
          '</section></div>';
        updateHospital();
      }

      function updateHospital() {
        const root = app.querySelector(".hospital-board");
        if (!root) return;
        const data = hospitalData();
        root.querySelectorAll("[data-hospital-tier]").forEach(function(button) {
          const active = button.getAttribute("data-hospital-tier") === data.tier;
          button.setAttribute("aria-pressed", String(active));
          button.classList.toggle("active", active);
        });
        root.querySelectorAll("[data-hospital-icon]").forEach(function(image) {
          image.src = "/assets/training-units/" + image.getAttribute("data-hospital-icon") + "-" + data.tier + ".png";
        });
        const count = hospitalTroops.reduce(function(sum, troop) { return sum + hospitalQuantity(data.counts[troop.key]); }, 0);
        root.querySelector("[data-hospital-summary]").textContent = formatNumber(count) + " " + data.tier.toUpperCase() + " " + (count === 1 ? "troop" : "troops");
        const totals = hospitalTotals(data);
        hospitalResources.forEach(function(resource) {
          const result = root.querySelector('[data-hospital-result="' + resource + '"]');
          if (result) result.textContent = formatNumber(totals[resource]);
        });
      }

      document.addEventListener("input", function(event) {
        const target = event.target;
        if (target.matches?.("[data-hospital-count]")) {
          const troop = target.getAttribute("data-hospital-count");
          if (hospitalTroops.some(function(item) { return item.key === troop; })) {
            hospitalData().counts[troop] = hospitalQuantity(target.value);
            updateHospital();
          }
        } else if (target.matches?.("[data-hospital-village]")) {
          const resource = target.getAttribute("data-hospital-village");
          if (hospitalResources.includes(resource)) {
            hospitalData().villages[resource] = hospitalPercent(target.value);
            updateHospital();
          }
        }
      });

      document.addEventListener("change", function(event) {
        const target = event.target;
        if (target.matches?.("[data-hospital-policy]")) {
          const value = Number(target.getAttribute("data-hospital-policy"));
          if ([10, 15, 20].includes(value)) {
            hospitalData().policy[value] = target.checked;
            updateHospital();
          }
        } else if (target.matches?.("[data-hospital-count]")) {
          target.value = String(hospitalQuantity(target.value));
        } else if (target.matches?.("[data-hospital-village]")) {
          target.value = String(hospitalPercent(target.value));
        }
      });

      document.addEventListener("click", function(event) {
        const button = event.target.closest?.("[data-hospital-tier]");
        if (!button) return;
        const tier = button.getAttribute("data-hospital-tier");
        if (tier === "t4" || tier === "t5") {
          hospitalData().tier = tier;
          updateHospital();
        }
      });
`;
