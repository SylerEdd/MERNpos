import { SectionType } from "../../enums/SectionType";

// DTO for sending menu item data in responsess

export interface MenuItemResponse {
  id: string;
  name: string;
  price: number;
  section: SectionType;
  createdAt: string;
}
