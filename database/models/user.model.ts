import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  portfolio?: string;
  learningGoals?: string[];
  role?: string[];
  technologyStack?: string[];
  experienceLevel?: string[];
  availability?: Date[];
  tags?: string[];
  socials?: string[];
  posts?: string[];
}

const SocialsSchema = new Schema({
  twitter: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  github: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  dribbble: {
    type: String,
    required: false,
  },
});
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
    learningGoals: {
      type: [String],
      required: false,
    },
    role: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: "Role",
    },
    technologyStack: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: "Technology",
    },
    experienceLevel: {
      type: [Schema.Types.ObjectId],
      required: false,
    },
    availability: {
      type: [Date],
      required: false,
    },
    tags: {
      type: [Schema.Types.ObjectId],
      ref: "Tag",
      required: false,
    },
    socials: {
      type: SocialsSchema,
      required: false,
      ref: "Social",
    },
    posts: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: "Post",
    },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
