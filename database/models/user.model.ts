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
// User Schema is going to include references to other collections that havent't been created yet,
//  Object Id type is used to reference other collections
// TechnologyStack, ExperienceLevel, and Tags are going to be arrays of Object Ids, and Role Based Authentication
// required is off for now until I get to that implementation.
// I'm not totally sure if this is correct, but I'm submitting it for Review for feedback
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
      default: "user",
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
      type: [Schema.Types.ObjectId],
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
