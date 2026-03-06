import { SectionType } from "../../enums/SectionType";

export interface CreateMenuItemRequest {
  name: string;
  price: number;
  section: SectionType;
}
