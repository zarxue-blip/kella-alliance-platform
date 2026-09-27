export type TrainingResource = "ore" | "mana" | "wood" | "gold";
export type TrainingTroop = "infantry" | "mage" | "archer" | "cavalry" | "flying";
export type TrainingTier = "t1" | "t2" | "t3" | "t4" | "t5" | "p34" | "p45";
export type TrainableTier = Exclude<TrainingTier, "p34" | "p45">;
export type TrainingCost = Record<TrainingResource, number>;

export const trainingUnitTierSeconds: Record<TrainableTier, number> = {
  t1: 18, t2: 40, t3: 60, t4: 80, t5: 120
};

// Only T3–T5 power and event scores are present in Kella's existing training
// tools. Leave T1/T2 unknown rather than imply an event awards zero points.
export const trainingUnitPower: Record<TrainableTier, number | null> = {
  t1: null, t2: null, t3: 20, t4: 40, t5: 100
};
export const trainingUnitEventRates: Record<"greatestHeights" | "mgeDay1" | "mgeDay5", Record<TrainableTier, number | null>> = {
  greatestHeights: { t1: null, t2: null, t3: 3, t4: 4, t5: 10 },
  mgeDay1: { t1: null, t2: null, t3: 20, t4: 40, t5: 100 },
  mgeDay5: { t1: null, t2: null, t3: 16, t4: 32, t5: 80 }
};

// T1 Archer, T2 Infantry/Mage/Cavalry and T3 Flying match the owner's
// Call of Dragons recording. Other T1/T2 entries are estimates; the existing
// T3–T5 and promotion values are preserved for Kella's planning tools.
export const trainingResourceCosts: Record<TrainingTier, Record<TrainingTroop, TrainingCost>> = {
  t1: {
    infantry: { ore: 0, mana: 0, wood: 60, gold: 60 },
    mage: { ore: 45, mana: 0, wood: 60, gold: 0 },
    archer: { ore: 0, mana: 0, wood: 60, gold: 40 },
    cavalry: { ore: 40, mana: 0, wood: 40, gold: 40 },
    flying: { ore: 40, mana: 0, wood: 40, gold: 40 }
  },
  t2: {
    infantry: { ore: 0, mana: 0, wood: 100, gold: 100 },
    mage: { ore: 75, mana: 0, wood: 100, gold: 0 },
    archer: { ore: 0, mana: 0, wood: 100, gold: 75 },
    cavalry: { ore: 60, mana: 0, wood: 60, gold: 60 },
    flying: { ore: 60, mana: 0, wood: 60, gold: 60 }
  },
  t3: {
    infantry: { ore: 0, mana: 30, wood: 150, gold: 150 },
    mage: { ore: 112, mana: 30, wood: 150, gold: 0 },
    archer: { ore: 112, mana: 30, wood: 0, gold: 150 },
    cavalry: { ore: 90, mana: 30, wood: 90, gold: 90 },
    flying: { ore: 90, mana: 30, wood: 90, gold: 90 }
  },
  t4: {
    infantry: { ore: 0, mana: 100, wood: 300, gold: 300 },
    mage: { ore: 225, mana: 100, wood: 300, gold: 0 },
    archer: { ore: 225, mana: 100, wood: 0, gold: 300 },
    cavalry: { ore: 180, mana: 100, wood: 180, gold: 180 },
    flying: { ore: 180, mana: 100, wood: 180, gold: 180 }
  },
  t5: {
    infantry: { ore: 0, mana: 400, wood: 800, gold: 800 },
    mage: { ore: 600, mana: 400, wood: 800, gold: 0 },
    archer: { ore: 600, mana: 400, wood: 0, gold: 800 },
    cavalry: { ore: 480, mana: 400, wood: 480, gold: 480 },
    flying: { ore: 480, mana: 400, wood: 480, gold: 480 }
  },
  p34: {
    infantry: { ore: 0, mana: 70, wood: 150, gold: 150 },
    mage: { ore: 113, mana: 70, wood: 150, gold: 0 },
    archer: { ore: 112, mana: 70, wood: 0, gold: 150 },
    cavalry: { ore: 90, mana: 70, wood: 90, gold: 90 },
    flying: { ore: 90, mana: 70, wood: 90, gold: 90 }
  },
  p45: {
    infantry: { ore: 0, mana: 300, wood: 500, gold: 500 },
    mage: { ore: 375, mana: 300, wood: 500, gold: 0 },
    archer: { ore: 375, mana: 300, wood: 0, gold: 500 },
    cavalry: { ore: 300, mana: 300, wood: 300, gold: 300 },
    flying: { ore: 300, mana: 300, wood: 300, gold: 300 }
  }
};

export function trainingCostTotal(tier: TrainingTier, troop: TrainingTroop, amount: number): TrainingCost {
  const units = Number.isFinite(amount) ? Math.max(0, Math.floor(amount)) : 0;
  const perUnit = trainingResourceCosts[tier][troop];
  return {
    ore: units * perUnit.ore,
    mana: units * perUnit.mana,
    wood: units * perUnit.wood,
    gold: units * perUnit.gold
  };
}

export function trainingSpeedupPlan(tier: TrainableTier, troop: TrainingTroop, availableSeconds: number, trainingBuffPercent: number) {
  const seconds = Number.isFinite(availableSeconds) ? Math.max(0, availableSeconds) : 0;
  const buff = Number.isFinite(trainingBuffPercent) ? Math.max(0, trainingBuffPercent) : 0;
  const multiplier = 1 + buff / 100;
  const units = Math.min(Number.MAX_SAFE_INTEGER, Math.floor(seconds * multiplier / trainingUnitTierSeconds[tier]));
  return {
    units,
    resources: trainingCostTotal(tier, troop, units),
    usedSeconds: units * trainingUnitTierSeconds[tier] / multiplier,
    remainingSeconds: Math.max(0, seconds - units * trainingUnitTierSeconds[tier] / multiplier)
  };
}

export function trainingUnitEventEstimates(tier: TrainableTier, amount: number) {
  const units = Number.isFinite(amount) ? Math.max(0, Math.floor(amount)) : 0;
  const score = (rate: number | null) => rate === null ? null : units * rate;
  return {
    powerGain: score(trainingUnitPower[tier]),
    greatestHeights: score(trainingUnitEventRates.greatestHeights[tier]),
    mgeDay1: score(trainingUnitEventRates.mgeDay1[tier]),
    mgeDay5: score(trainingUnitEventRates.mgeDay5[tier])
  };
}
