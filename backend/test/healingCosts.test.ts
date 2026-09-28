import assert from "node:assert/strict";
import { healingCostTotal } from "../src/data/healingCosts.js";

// These rates and rounding cases were checked against the Resource Healing
// calculator at codfan.com/healing-calculator with 1,000 or 1 wounded unit.
const thousandEach = { infantry: 1000, mage: 1000, archer: 1000, cavalry: 1000, flying: 1000 };
assert.deepEqual(healingCostTotal("t4", thousandEach), { gold: 288000, wood: 288000, ore: 243000, mana: 150000 });
assert.deepEqual(healingCostTotal("t5", thousandEach), { gold: 768000, wood: 768000, ore: 648000, mana: 600000 });
assert.equal(healingCostTotal("t4", { mage: 1 }).ore, 68);
assert.equal(healingCostTotal("t4", { mage: 2 }).ore, 135);
assert.equal(healingCostTotal("t4", { mage: 1 }, { policy15: true }).ore, 57);
assert.equal(healingCostTotal("t4", { mage: 1 }, { policy15: true, villages: { ore: 10 } }).ore, 52);
assert.equal(healingCostTotal("t4", { infantry: 100 }, { policy10: true, policy15: true, policy20: true }).gold, 4950);
assert.deepEqual(healingCostTotal("t4", { mage: -1, archer: Number.NaN }), { gold: 0, wood: 0, ore: 0, mana: 0 });
console.log("Healing rates, policy reductions, village reductions, and rounding checks passed.");
