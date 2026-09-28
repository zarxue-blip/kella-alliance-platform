import { Schema, model } from "mongoose";

const kofiPaymentSchema = new Schema({
  messageId: { type: String, required: true, unique: true },
  transactionId: { type: String, required: true, unique: true },
  email: { type: String, required: true, lowercase: true, trim: true, index: true },
  amountCents: { type: Number, required: true },
  currency: { type: String, required: true },
  tierName: { type: String, required: true },
  paidAt: { type: Date, required: true },
  paidThrough: { type: Date, required: true, index: true }
}, { timestamps: true });

export const KofiPaymentModel = model("KofiPayment", kofiPaymentSchema);
