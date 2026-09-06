export const bestOnlineTimeOptions = ["00-04 UTC", "04-08 UTC", "08-12 UTC", "12-16 UTC", "16-20 UTC", "20-24 UTC"];

export function pollOptionsWithKeys(options: Array<{ label?: string; roleId?: string }>) {
  return options.map((option, index) => ({
    key: `o${index + 1}`,
    label: String(option.label || "").trim(),
    roleId: String(option.roleId || "").trim()
  }));
}

export function pollDto(poll: any) {
  const votes = Array.isArray(poll.votes) ? poll.votes : [];
  const options = (poll.options || []).map((option: any) => {
    const optionVotes = votes.filter((vote: any) => vote.optionKey === option.key);
    return {
      key: option.key,
      label: option.label,
      roleId: option.roleId || "",
      count: optionVotes.length,
      voters: optionVotes.map((vote: any) => ({
        discordId: vote.discordId,
        displayName: vote.displayName || vote.discordId,
        votedAt: vote.votedAt
      }))
    };
  });
  return {
    id: poll._id.toString(),
    kind: poll.kind || "poll",
    question: poll.question,
    description: poll.description || "",
    options,
    totalVotes: votes.length,
    status: poll.status || "Open",
    channelId: poll.channelId || "",
    messageId: poll.messageId || "",
    messageLink: poll.messageLink || "",
    createdBy: poll.createdByDiscordId || "Dashboard",
    createdAt: poll.createdAt,
    closedAt: poll.closedAt || null
  };
}
