import mongoose, { Schema, Document } from "mongoose";

export interface IAlert extends Document {
  userId: string;
  message: string;
  createdAt: Date;
}

const alertSchema: Schema = new Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Alert = mongoose.model<IAlert>("Alert", alertSchema);
