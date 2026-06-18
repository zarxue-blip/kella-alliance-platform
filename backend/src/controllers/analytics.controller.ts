import { getAllianceAnalytics } from "../services/analytics.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

export const analyticsOverview = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const analytics = await getAllianceAnalytics(req.user.allianceId);
  res.json({ analytics });
});

export const analyticsCsvExport = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const analytics = await getAllianceAnalytics(req.user.allianceId);
  const lines = ["section,key,count,value"];

  for (const row of analytics.members) {
    lines.push(`members,${row._id},${row.count},${row.power ?? 0}`);
  }
  for (const row of analytics.operations) {
    lines.push(`operations,${row._id},${row.count},`);
  }
  for (const row of analytics.recruitment) {
    lines.push(`recruitment,${row._id},${row.count},`);
  }

  res.header("content-type", "text/csv");
  res.attachment("alliance-analytics.csv").send(lines.join("\n"));
});

export const analyticsPdfExport = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const analytics = await getAllianceAnalytics(req.user.allianceId);
  const rows = [
    "Dragon Command Analytics",
    `Generated: ${new Date().toISOString()}`,
    `Member segments: ${analytics.members.length}`,
    `Recent attendance events: ${analytics.attendance.length}`,
    `Operation states: ${analytics.operations.length}`,
    `Recruitment states: ${analytics.recruitment.length}`
  ];
  const pdf = createSimplePdf(rows);
  res.header("content-type", "application/pdf");
  res.attachment("alliance-analytics.pdf").send(Buffer.from(pdf, "binary"));
});

function createSimplePdf(lines: string[]) {
  const escaped = lines.map((line) => line.replace(/[()\\]/g, "\\$&"));
  const content = `BT /F1 18 Tf 72 760 Td (${escaped[0]}) Tj /F1 11 Tf ${escaped
    .slice(1)
    .map((line) => `0 -24 Td (${line}) Tj`)
    .join(" ")} ET`;
  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj",
    "4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
    `5 0 obj << /Length ${content.length} >> stream\n${content}\nendstream endobj`
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  pdf += offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join("");
  pdf += `trailer << /Root 1 0 R /Size ${objects.length + 1} >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}
