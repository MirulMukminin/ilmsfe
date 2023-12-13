import { StandardEntity } from "./base/sys$StandardEntity";
import { ICYSActiveStatus } from "../enums/enums";
export class ItemType extends StandardEntity {
  static NAME = "pbksb_ItemType";
  typeName?: string | null;
  active?: ICYSActiveStatus | null;
}
export type ItemTypeViewName = "_base" | "_local" | "_minimal";
export type ItemTypeView<V extends ItemTypeViewName> = V extends "_base"
  ? Pick<ItemType, "id" | "typeName" | "active">
  : V extends "_local"
  ? Pick<ItemType, "id" | "typeName" | "active">
  : V extends "_minimal"
  ? Pick<ItemType, "id" | "typeName">
  : never;
