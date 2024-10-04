import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId; 
  username: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
