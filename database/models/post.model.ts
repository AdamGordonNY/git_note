import { Schema, Document, model, models } from "mongoose";

export interface IPost extends Document {
  _id: string;
  title: string;
  content: string;
  description: string;
  author: string;
  postType: "knowledge" | "component" | "workflow";
  tags?: string[];
  resourceLinks?: {
    label: string;
    url: string;
  }[];
  experiences?: {
    name: string;
  }[];

  code?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PostSchema = new Schema({
  postType: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  experiences: {
    type: [String],
    required: false,
  },
  code: {
    type: String,
    required: false,
  },
  resourceLinks: [
    {
      label: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
  ],
  tags: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

export default models?.Post || model<IPost>("Post", PostSchema);
