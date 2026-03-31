import { Schema, model, Document } from "mongoose";
import { SectionType } from "../enums/SectionType";

//added createdAt field to all entities for better tracking and sorting

export interface IMenuItem extends Document {
  id: number;
  name: string;
  price: number;
  section: SectionType;
  createdAt: any;
}

const menuItemSchema = new Schema<IMenuItem>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    section: {
      type: String,
      enum: Object.values(SectionType),
      required: true,
    },
  },
  { timestamps: true },
);

export const MenuItem = model<IMenuItem>("IMenuItem", menuItemSchema);
