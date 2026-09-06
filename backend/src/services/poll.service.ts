import { Types } from "mongoose";
import { MemberModel } from "../models/member.model.js";
import { PollModel } from "../models/poll.model.js";
import { HttpError } from "../utils/httpError.js";
import { assignDiscordRole, removeDiscordRole } from "./discord.service.js";
import { pollDto } from "./pollData.service.js";

export { bestOnlineTimeOptions, pollDto, pollOptionsWithKeys } from "./pollData.service.js";

export async function recordPollVote(input: {
  allianceId: string;
  pollId: string;
  discordId: string;
  displayName?: string;
  optionKey: string;
}) {
  if (!Types.ObjectId.isValid(input.pollId)) throw new HttpError(400, "Invalid poll id");
  const currentPoll = await PollModel.findOne({ _id: input.pollId, allianceId: input.allianceId });
  if (!currentPoll) throw new HttpError(404, "Poll not found");
  if (currentPoll.status !== "Open") throw new HttpError(409, "This poll is closed");
  const option = currentPoll.options.find((item: any) => item.key === input.optionKey);
  if (!option) throw new HttpError(400, "Poll option not found");

  const previousVote = currentPoll.votes.find((vote: any) => vote.discordId === input.discordId);
  const previousOption = previousVote
    ? currentPoll.options.find((item: any) => item.key === previousVote.optionKey)
    : null;
  const votedAt = new Date();
  const poll = await PollModel.findOneAndUpdate(
    { _id: input.pollId, allianceId: input.allianceId, status: "Open", "options.key": input.optionKey },
    [{
      $set: {
        votes: {
          $concatArrays: [
            {
              $filter: {
                input: { $ifNull: ["$votes", []] },
                as: "vote",
                cond: { $ne: ["$$vote.discordId", input.discordId] }
              }
            },
            [{
              discordId: input.discordId,
              displayName: input.displayName || input.discordId,
              optionKey: input.optionKey,
              votedAt
            }]
          ]
        },
        updatedAt: votedAt
      }
    }],
    { new: true }
  );
  if (!poll) throw new HttpError(409, "This poll is no longer open");

  await MemberModel.updateOne(
    { allianceId: input.allianceId, discordId: input.discordId },
    { $set: { lastActivity: new Date() } }
  );

  let roleUpdated = false;
  let roleWarning = "";
  try {
    if (previousOption?.roleId && previousOption.roleId !== option.roleId) {
      await removeDiscordRole(input.discordId, previousOption.roleId);
    }
    if (option.roleId) {
      await assignDiscordRole(input.discordId, option.roleId);
      roleUpdated = true;
    }
  } catch (error) {
    roleWarning = error instanceof Error ? error.message : String(error);
  }

  return {
    poll: pollDto(poll),
    selection: option.label,
    changed: Boolean(previousVote && previousVote.optionKey !== input.optionKey),
    roleUpdated,
    roleWarning
  };
}
