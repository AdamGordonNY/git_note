import { IUser } from "@/database/models/user.model";
import { Schema } from "mongoose";

export interface UpdateUserParams {
  _id: Schema.Types.ObjectId;
  updateData: Partial<IUser>;
  path: string;
}
