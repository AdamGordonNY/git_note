import { Schema, Document, model, models } from "mongoose";

export interface ITag extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  posts: Schema.Types.ObjectId[];
  users: Schema.Types.ObjectId[];
}

export const Tag = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: [Schema.Types.ObjectId],
        ref: "Post",
        required: false,
      },
    ],
    users: [
      {
        type: [Schema.Types.ObjectId],
        ref: "User",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

export default models.Tag || model<ITag>("Tag", Tag);
