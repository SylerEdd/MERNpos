import { SectionType } from "../../enums/SectionType";

// DTO for sending menu item data in responsess

export interface MenuItemResponse {
  id: number;
  name: string;
  price: number;
  section: SectionType;
  createdAt: string;
}
