import { SectionType } from "../../enums/SectionType";

export interface MenuItemResponse {
  id: string;
  name: string;
  price: number;
  section: SectionType;
  createdAt: string;
}
