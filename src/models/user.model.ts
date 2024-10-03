import { model, Schema, Document, Types } from "mongoose";
import { IMovie } from "./movie.model";
import { IActor } from "./actor.model";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  avatar?: string;
  bio?: string;
  favirateMovies: Types.ObjectId[] | IMovie[];
  favirateActors: Types.ObjectId[] | IActor[];
  favirateActresses: Types.ObjectId[] | IActor[];
  mostVisitedMovies: Types.ObjectId[] | IMovie[];
  movies?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    avatar: { type: String },
    bio: { type: String },
    favirateMovies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    favirateActors: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
    favirateActresses: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
    mostVisitedMovies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
