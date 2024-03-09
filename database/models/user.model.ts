import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  fullname: string;
  username: string;
  password: string;
  image: string;
  location?: string;
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
  posts?: Schema.Types.ObjectId[];
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
const technologyStackSchema = new Schema({
  name: {
    type: String,
    required: true,
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
    location: {
      type: String,
      required: false,
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
      type: technologyStackSchema,
      required: false,
    },
    experienceLevel: {
      type: [String],
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
    },
    posts: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: "Post",
    },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
