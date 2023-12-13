import { StandardEntity } from "./base/sys$StandardEntity";
export class WareHouse extends StandardEntity {
  static NAME = "pbksb_WareHouse";
  description?: string | null;
}
export type WareHouseViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "wareHouse-view";
export type WareHouseView<V extends WareHouseViewName> = V extends "_base"
  ? Pick<WareHouse, "id" | "description">
  : V extends "_local"
  ? Pick<WareHouse, "id" | "description">
  : V extends "_minimal"
  ? Pick<WareHouse, "id" | "description">
  : V extends "wareHouse-view"
  ? Pick<WareHouse, "id" | "description">
  : never;
