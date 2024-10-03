import { model, Schema, Document, Types } from "mongoose";
import { IUser } from "./user.model";

export interface IReaction extends Document {
  user: Types.ObjectId | IUser;
  type: "like" | "dislike";
  createdAt?: Date;
  updatedAt?: Date;
}

const reactionSchema: Schema<IReaction> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Reaction = model<IReaction>("Reaction", reactionSchema);
