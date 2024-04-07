import { Schema, Document, model, models } from "mongoose";

export interface ITag extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  postId: Schema.Types.ObjectId[];
}

export const Tag = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    postId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default models?.Tag || model<ITag>("Tag", Tag);
