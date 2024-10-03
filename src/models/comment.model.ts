import { model, Schema, Document, Types } from "mongoose";
import { IUser } from "./user.model";
import { IMovie } from "./movie.model";

//
interface IReply {
  user: Types.ObjectId | IUser;
  content: string;
  createdAt: Date;
}

export interface IComment extends Document {
  user: Types.ObjectId | IUser;
  movie: Types.ObjectId | IMovie;
  content: string;
  replies: IReply[];
  createdAt?: Date;
  updatedAt?: Date;
}

const commentSchema: Schema<IComment> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    content: { type: String, required: true },
    replies: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Comment = model<IComment>("Comment", commentSchema);
