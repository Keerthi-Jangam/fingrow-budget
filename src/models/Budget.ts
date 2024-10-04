import mongoose, { Document, Schema } from "mongoose";

interface IBudget extends Document {
  userId: mongoose.Types.ObjectId;
  category: string;
  limit: number;
  spent: number;
}

const budgetSchema: Schema<IBudget> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
  category: { type: String, required: true },
  limit: { type: Number, required: true },
  spent: { type: Number, default: 0 },
});

const Budget = mongoose.model<IBudget>("Budget", budgetSchema);
export default Budget;
