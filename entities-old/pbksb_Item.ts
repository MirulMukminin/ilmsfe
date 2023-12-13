import { StandardEntity } from "./base/sys$StandardEntity";
export class Item extends StandardEntity {
  static NAME = "pbksb_Item";
  price?: any | null;
  name?: string | null;
}
export type ItemViewName = "_base" | "_local" | "_minimal";
export type ItemView<V extends ItemViewName> = V extends "_base"
  ? Pick<Item, "id" | "name" | "price">
  : V extends "_local"
  ? Pick<Item, "id" | "price" | "name">
  : V extends "_minimal"
  ? Pick<Item, "id" | "name">
  : never;
