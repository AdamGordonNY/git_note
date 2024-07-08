import { Schema, model, models, Document } from "mongoose";

export interface IInteraction extends Document {
  user: string;
  action: "view" | "like" | "star";
  post: string;
  tags: string[]; // reference to tag
  createdAt: Date;
}

const InteractionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const Interaction =
  models.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
