import assert from "node:assert/strict";
import { bestOnlineTimeOptions, pollDto, pollOptionsWithKeys } from "../src/services/pollData.service.js";

const options = pollOptionsWithKeys([
  { label: "14 UTC", roleId: "123456789012345678" },
  { label: "20 UTC" }
]);
assert.deepEqual(options, [
  { key: "o1", label: "14 UTC", roleId: "123456789012345678" },
  { key: "o2", label: "20 UTC", roleId: "" }
]);
assert.equal(bestOnlineTimeOptions.length, 6);
assert.equal(bestOnlineTimeOptions[0], "00-04 UTC");
assert.equal(bestOnlineTimeOptions.at(-1), "20-24 UTC");

const dto = pollDto({
  _id: { toString: () => "poll-1" },
  kind: "poll",
  question: "Which slot?",
  options,
  votes: [
    { discordId: "1", displayName: "Toxic", optionKey: "o1", votedAt: new Date("2026-09-06T00:00:00Z") },
    { discordId: "2", displayName: "Kella", optionKey: "o2", votedAt: new Date("2026-09-06T00:00:00Z") }
  ],
  status: "Open",
  createdAt: new Date("2026-09-06T00:00:00Z")
});
assert.equal(dto.totalVotes, 2);
assert.equal(dto.options[0].count, 1);
assert.equal(dto.options[0].voters[0].displayName, "Toxic");

console.log("Poll regression tests passed.");
