import { model, Schema, Document } from "mongoose";

export interface IActor extends Document {
  name: string;
  birthdate: Date;
  bio?: string;
  nationality?: string;
  movies: string[];
  awards?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  height?: number;
  weight?: number;
  gender?: string;
  occupation?: string;
  birthPlace?: string;
  died?: Date;
  deathPlace?: string;
  spouse: { type: Schema.Types.ObjectId; ref: "Actor" };
  parents: [{ type: Schema.Types.ObjectId; ref: "Actor" }];
  children: [{ type: Schema.Types.ObjectId; ref: "Actor" }];
  image?: [string];
  instagram?: string;
  twitter: { type: String };
  facebook: { type: String };
  email: { type: String };
  phone: { type: String };
  address: { type: String };
  website: { type: String };
}

const actorSchema: Schema<IActor> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    birthdate: { type: Date, required: true },
    bio: { type: String },
    nationality: { type: String },
    movies: [{ type: String }],
    awards: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    height: { type: Number },
    weight: { type: Number },
    image: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    occupation: { type: String },
    birthPlace: { type: String },
    died: { type: Date },
    deathPlace: { type: String },
    spouse: { type: Schema.Types.ObjectId, ref: "Actor" },
    parents: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
    children: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
    instagram: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    website: { type: String },
  },
  { timestamps: true }
);

export const Actor = model<IActor>("Actor", actorSchema);
