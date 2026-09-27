import assert from 'node:assert/strict';
import { trainingCostTotal } from '../src/data/trainingCosts.js';

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
console.log('Training cost checks passed for recorded unit costs, higher tiers, and invalid quantities.');
