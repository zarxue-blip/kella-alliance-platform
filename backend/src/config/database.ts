import { TicketModel,TicketMessageModel } from '../models/ticket.model.js';
import { KofiPaymentModel } from "../models/kofiPayment.model.js";
import { UserModel } from "../models/user.model.js";
import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.MONGODB_URI, {
    autoIndex: env.NODE_ENV !== "production"
  });
  // Production disables automatic indexes, so create the payment dedupe keys explicitly.
  await Promise.all([TicketModel.createIndexes(), TicketMessageModel.createIndexes(), KofiPaymentModel.createIndexes()]);
  await UserModel.collection.createIndex({ kofiPaymentEmail: 1 }, { unique: true,
    partialFilterExpression: { kofiPaymentRequired: true, kofiPaymentEmail: { $type: "string" } } });
}
