import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
