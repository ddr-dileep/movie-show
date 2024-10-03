import { model, Schema, Document, Types } from "mongoose";
import { Reaction } from "./reaction.model";
import { IUser } from "./user.model";
import { IComment } from "./comment.model";

interface IRating {
  user: Types.ObjectId | IUser;
  rating: number;
  comment?: string;
}

export interface IMovie extends Document {
  title: string;
  description: string;
  genre: string[];
  uploadedBy: Types.ObjectId | IUser;
  movieUrl: string;
  posterUrl?: string;
  comments: Types.ObjectId[] | IComment[];
  reactions: Types.Array<typeof Reaction>;
  views: number;
  ratings: {
    totalStars: number;
    averageRating: number;
    reviews: IRating[];
  };
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const movieSchema: Schema<IMovie> = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    genre: [{ type: String }],
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    movieUrl: { type: String, required: true },
    posterUrl: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
    views: { type: Number, default: 0 },
    ratings: {
      totalStars: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 },
      reviews: [
        {
          user: { type: Schema.Types.ObjectId, ref: "User" },
          rating: { type: Number, min: 1, max: 5 },
          comment: { type: String },
        },
      ],
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Movie = model<IMovie>("Movie", movieSchema);
