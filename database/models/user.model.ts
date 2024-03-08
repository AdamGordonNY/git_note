import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  _id: string;
  fullname: string;
  username: string;
  password: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;

  portfolio?: string;
  learningGoals?: string[];
  role?: "user" | "admin";
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
// need to add enumeration for some fields but wanted to make sure signIn logic works first.
const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
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
      type: String,
      required: false,
      default: "user",
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
