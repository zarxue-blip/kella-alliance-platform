import { shieldAlertMinutes } from "@cod-amp/shared";
import { AnnouncementModel } from "../models/announcement.model.js";
import { ShieldModel } from "../models/shield.model.js";
import { emitNotification, moduleNotification } from "./realtime.service.js";

const minute = 60_000;

export function startSchedulers() {
  setInterval(() => {
    void processShieldAlerts();
    void processScheduledAnnouncements();
  }, minute);

  void processShieldAlerts();
  void processScheduledAnnouncements();
}

async function processShieldAlerts() {
  const now = new Date();
  const maxWindow = Math.max(...shieldAlertMinutes);
  const upperBound = new Date(now.getTime() + maxWindow * minute);

  const shields = await ShieldModel.find({ expiresAt: { $gt: now, $lte: upperBound } })
    .populate("memberId", "ign uid")
    .limit(1000);

  await Promise.all(
    shields.map(async (shield) => {
      const minutesLeft = Math.ceil((shield.expiresAt.getTime() - now.getTime()) / minute);
      const threshold = [...shieldAlertMinutes].reverse().find((candidate) => minutesLeft <= candidate);
      if (!threshold || (shield.lastAlertMinutes && shield.lastAlertMinutes <= threshold)) return;

      shield.lastAlertMinutes = threshold;
      await shield.save();

      const member = shield.memberId as unknown as { ign?: string; uid?: string };
      emitNotification(
        shield.allianceId.toString(),
        moduleNotification(
          "shields",
          "Shield expiring",
          `${member.ign ?? "A member"} has ${minutesLeft} minutes left on shield.`,
          minutesLeft <= 60 ? "CRITICAL" : "HIGH"
        )
      );
    })
  );
}

async function processScheduledAnnouncements() {
  const due = await AnnouncementModel.find({
    scheduledFor: { $lte: new Date() },
    sentAt: { $exists: false }
  }).limit(100);

  await Promise.all(
    due.map(async (announcement) => {
      announcement.sentAt = new Date();
      await announcement.save();
      emitNotification(
        announcement.allianceId.toString(),
        moduleNotification("announcements", announcement.title, announcement.body, "HIGH")
      );
    })
  );
}
