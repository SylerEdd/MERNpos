import { TableStatus } from "../../enums/TableStatus";

export interface TabResponse {
  id: number;
  tableNumber: string;
  tableStatus: TableStatus;
  createdAt: any;
}
