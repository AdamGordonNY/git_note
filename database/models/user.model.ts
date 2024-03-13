import { Schema, Document, model, models } from "mongoose";
export interface IGoal extends Document {
  name: string;
  completed: string;
}
export interface IUser extends Document {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  image: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  portfolio?: string;
  learningGoals?: {
    name: string;
    completed: boolean;
  };
  role?: "user" | "admin";
  technologyStack?: string[];
  experienceLevel?: string[];
  availability?: Date[];
  socials?: Object[];
  posts?: Schema.Types.ObjectId[];
}

const GoalSchema = new Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, required: true },
});
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
    email: {
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
      type: [GoalSchema],
      required: false,
    },
    role: {
      type: String,
      required: false,
      default: "user",
    },
    technologyStack: {
      type: [technologyStackSchema],
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

export default models?.User || model<IUser>("User", UserSchema);
