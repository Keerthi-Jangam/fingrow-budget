import mongoose, { Document, Schema } from "mongoose";

interface ISavingsGoal extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  targetAmount: number;
  currentAmount: number;
}

const savingsGoalSchema: Schema<ISavingsGoal> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
});

const SavingsGoal = mongoose.model<ISavingsGoal>(
  "SavingsGoal",
  savingsGoalSchema
);
export default SavingsGoal;
