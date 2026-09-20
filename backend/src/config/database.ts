import { TicketModel,TicketMessageModel } from '../models/ticket.model.js';
import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.MONGODB_URI, {
    autoIndex: env.NODE_ENV !== "production"
  });
  // Additive ticket indexes enforce one active ticket and idempotent archives.
  await Promise.all([TicketModel.createIndexes(),TicketMessageModel.createIndexes()]);
}
