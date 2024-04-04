import { Schema, Document, model, models } from "mongoose";

export interface IPost extends Document {
  _id: string;
  title: string;
  content: string;
  description: string;
  author: string;
  postType: "knowledge" | "component" | "workflow";
  tags: string[];
  resourceLink: {
    label: string;
    url: string;
  }[];
  experiences: {
    name: string;
  }[];

  code?: string;
  createdAt: Date;
  updatedAt: Date;
}
const ResourceSchema = new Schema({
  postType: {
    type: String,
    required: true,
    enum: ["knowledge", "component", "workflow"],
  },
});

const PostSchema = new Schema({
  postType: {
    type: ResourceSchema,
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
  resourceLink: [
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
  tags: [
    {
      type: [Schema.Types.ObjectId],
      ref: "Tag",
      required: true,
    },
  ],
});

export default models?.Post || model<IPost>("Post", PostSchema);
