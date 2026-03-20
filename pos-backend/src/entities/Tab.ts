import { Schema, model, Document } from "mongoose";
import { TableStatus } from "../enums/TableStatus";

export interface ITab extends Document {
  id: number;
  tableNumber: string;
  tableStatus: TableStatus;
  createdAt: Date;
}

const tabSchema = new Schema<ITab>(
  {
    id: { type: Number, required: true, unique: true },
    tableNumber: { type: String, required: true },
    tableStatus: {
      type: String,
      enum: Object.values(TableStatus),
      required: true,
    },
  },
  { timestamps: true },
);

export const Tab = model<ITab>("Tab", tabSchema);
