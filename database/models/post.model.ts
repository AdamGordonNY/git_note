import { Schema, Document, model, models } from "mongoose";

export interface IPost extends Document {
  _id: string;
  title: string;
  content: string;
  description: string;
  author: string;
  postType: string;
  tags?: string[];
  resourceLinks?: {
    title: string;
    url: string;
  }[];
  steps?: {
    stepName: string;
    stepContent: string;
  }[];

  experiences?: string[];
  image?: string;
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
  steps: [
    {
      stepName: {
        type: String,
        required: false,
      },
      stepContent: { type: String, required: false },
      completed: { type: Boolean, default: false },
    },
  ],

  resourceLinks: [
    {
      title: {
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
  views: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models?.Post || model<IPost>("Post", PostSchema);
