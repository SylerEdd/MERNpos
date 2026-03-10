import { Schema, model, Document } from "mongoose";

//Role entity with fields: name (WAITER, BARTENDER, MANAGER, SUPERVISOR)
//Role can have multiple users, but for simplicity we will not implement the relationship in the database, we will handle it in the application logic
//added createdAt field to all entities for better tracking and sorting

export interface IRole extends Document {
  createdAt: Date;
  name: string; //WAITER, BARTEDNER, MANAGER, SUPERVISOR

  //many to many relationship with User
  users: string[]; //array of user ids
}

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

export const Role = model<IRole>("Role", roleSchema);
