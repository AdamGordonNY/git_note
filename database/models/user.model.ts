import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  _id: string;
  fullname?: string;
  email: string;
  password: string;
  image: string;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
  portfolio?: string;
  learningGoals?: {
    name: string;
    completed: boolean;
  }[];
  role?: "user" | "admin";
  technologies?: string[];
  experiences: string[];
  startTime: Date;
  endTime: Date;
  newProjects?: boolean;
  socials?: {
    twitter?: {
      username: string;
      url: string;
    };
    facebook?: {
      username: string;
      url: string;
    };
    linkedin?: {
      username: string;
      url: string;
    };
    github?: {
      username: string;
      url: string;
    };
    instagram?: {
      username: string;
      url: string;
    };
    dribbble?: {
      username: string;
      url: string;
    };
  };
  posts?: Schema.Types.ObjectId[];
}
const GoalSchema = new Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, required: true },
});
const SocialNetworkSchema = new Schema({
  username: { type: String, required: false },
  url: { type: String, required: false },
});

const SocialsSchema = new Schema({
  twitter: {
    type: SocialNetworkSchema,
    required: false,
  },
  facebook: {
    type: SocialNetworkSchema,
    required: false,
  },
  linkedin: {
    type: SocialNetworkSchema,
    required: false,
  },
  github: {
    type: SocialNetworkSchema,
    required: false,
  },
  instagram: {
    type: SocialNetworkSchema,
    required: false,
  },
  dribbble: {
    type: SocialNetworkSchema,
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
    learningGoals: [
      {
        type: GoalSchema,
        required: false,
      },
    ],
    role: {
      type: String,
      required: false,
      default: "user",
    },
    technologies: {
      type: [String],
      required: false,
      unique: true,
    },

    experiences: {
      type: [String],
      required: false,
    },
    startTime: {
      type: Date,
      required: false,
    },
    endTime: {
      type: Date,
      required: false,
    },
    newProjects: {
      type: Boolean,
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
