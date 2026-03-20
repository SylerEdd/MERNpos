import { TableStatus } from "../../enums/TableStatus";

export interface CreateTabRequest {
  tableNumber: string;
  tableStatus?: TableStatus;
}
