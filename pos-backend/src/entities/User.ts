import { Schema, model, Document } from "mongoose";
import { IRole } from "./Role";

//added createdAt field to all entities for better tracking and sorting
// passwordHash is used instead of password for security reasons, we will hash the password before saving to the database
//User can have multiple roles, but for simplicity we will not implement the relationship in the database, we will handle it in the application logic

export interface IUser extends Document {
  id: number;
  createdAt: Date;
  fullName: string;
  username: string;
  email: string;
  passwordHash: string;
  roles: IRole[]; // we will store role ids in the user document, but we will populate the role names when fetching users
}

const userSchema = new Schema<IUser>(
  {
    id: { type: Number, required: true, unique: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
    // roles: [{ type: Number, ref: "Role" }],
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
