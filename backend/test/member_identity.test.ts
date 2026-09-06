import assert from "node:assert/strict";
import {
  canAdoptGameIdentity,
  canonicalAllianceLabel,
  canonicalAllianceTag,
  normalizeRosterIdentityName,
  uniqueDiscordRosterMatch
} from "../src/services/memberIdentity.service.js";

assert.equal(canonicalAllianceTag("ᴷᵒᴳ"), "kog", "superscript KoG tag must normalize");
assert.equal(canonicalAllianceLabel("[ᴷᵒᴳ]"), "KoG", "superscript KoG must be stored canonically");
assert.equal(normalizeRosterIdentityName("ᴷᵒᴳ Toxic"), "toxic", "decorative alliance prefix must not alter identity");

const toxicFarm = {
  uid: "900001",
  ign: "Toxic Farm",
  discordId: "123456789012345678",
  discordDisplayName: "ᴷᵒᴳ Toxic",
  power: 42_000_000,
  powerHistory: [{ date: new Date() }]
};
assert.equal(
  canAdoptGameIdentity(toxicFarm, "900002"),
  false,
  "an established farm must not absorb a newly ranked main UID"
);

const discordOnlyToxic = {
  uid: "discord-123456789012345678",
  ign: "ᴷᵒᴳ Toxic",
  discordId: "123456789012345678",
  discordDisplayName: "ᴷᵒᴳ Toxic",
  power: 0,
  powerHistory: []
};
assert.equal(
  canAdoptGameIdentity(discordOnlyToxic, "900002"),
  true,
  "a Discord-only shell may adopt its first stable game UID"
);

const toxicMain = { uid: "900002", ign: "Toxic", discordId: "topn:900002", power: 90_000_000 };
assert.equal(
  uniqueDiscordRosterMatch([toxicFarm, toxicMain], "ᴷᵒᴳ Toxic", "toxic"),
  toxicMain,
  "an exact normalized main IGN must win over a related farm name"
);

assert.equal(
  uniqueDiscordRosterMatch(
    [toxicMain, { ...toxicMain, uid: "900003", discordId: "topn:900003" }],
    "ᴷᵒᴳ Toxic",
    "toxic"
  ),
  null,
  "ambiguous exact names must remain separate instead of being guessed"
);

console.log("Member identity regression tests passed.");
