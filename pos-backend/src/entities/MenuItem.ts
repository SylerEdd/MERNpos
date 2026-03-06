import { Schema, model, Document } from "mongoose";
import { SectionType } from "../enums/SectionType";

export interface IMenuItem extends Document {
  name: string;
  price: number;
  section: SectionType;
}

const menuItemSchema = new Schema<IMenuItem>(
  {
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

export const MenuItem = model<IMenuItem>("MenuItem", menuItemSchema);
