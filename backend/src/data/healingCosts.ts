import type { TrainingResource, TrainingTroop } from "./trainingCosts.js";

export type HealingTier = "t4" | "t5";
export type HealingCounts = Record<TrainingTroop, number>;
export type HealingCost = Record<TrainingResource, number>;
export type HealingReductions = {
  policy10?: boolean;
  policy15?: boolean;
  policy20?: boolean;
  villages?: Partial<Record<TrainingResource, number>>;
};

// Base cost for one severely wounded unit on the Resource Healing tab of
// codfan.com/healing-calculator, with policy and village reductions disabled.
export const healingResourceCosts: Record<HealingTier, Record<TrainingTroop, HealingCost>> = {
  t4: {
    infantry: { gold: 90, wood: 90, ore: 0, mana: 30 },
    mage: { gold: 0, wood: 90, ore: 67.5, mana: 30 },
    archer: { gold: 90, wood: 0, ore: 67.5, mana: 30 },
    cavalry: { gold: 54, wood: 54, ore: 54, mana: 30 },
    flying: { gold: 54, wood: 54, ore: 54, mana: 30 }
  },
  t5: {
    infantry: { gold: 240, wood: 240, ore: 0, mana: 120 },
    mage: { gold: 0, wood: 240, ore: 180, mana: 120 },
    archer: { gold: 240, wood: 0, ore: 180, mana: 120 },
    cavalry: { gold: 144, wood: 144, ore: 144, mana: 120 },
    flying: { gold: 144, wood: 144, ore: 144, mana: 120 }
  }
};

export function healingCostTotal(tier: HealingTier, counts: Partial<HealingCounts>, reductions: HealingReductions = {}): HealingCost {
  const total: HealingCost = { gold: 0, wood: 0, ore: 0, mana: 0 };
  for (const troop of ["infantry", "mage", "archer", "cavalry", "flying"] as const) {
    const count = counts[troop];
    const units = Number.isFinite(count) ? Math.max(0, Math.floor(count!)) : 0;
    const rate = healingResourceCosts[tier][troop];
    total.gold += units * rate.gold;
    total.wood += units * rate.wood;
    total.ore += units * rate.ore;
    total.mana += units * rate.mana;
  }
  const policyFactor = 1 - ((reductions.policy10 ? 10 : 0) + (reductions.policy15 ? 15 : 0) + (reductions.policy20 ? 20 : 0)) / 100;
  const discounted = (resource: TrainingResource) => {
    const input = reductions.villages?.[resource] ?? 0;
    const villagePercent = Number.isFinite(input) ? Math.min(100, Math.max(0, input)) : 0;
    return Math.round(total[resource] * policyFactor * (1 - villagePercent / 100));
  };
  return { gold: discounted("gold"), wood: discounted("wood"), ore: discounted("ore"), mana: discounted("mana") };
}
