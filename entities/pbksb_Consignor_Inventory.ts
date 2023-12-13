import { StandardEntity } from "./base/sys$StandardEntity";
import { Category_Type } from "../enums/enums";
export class Consignor_Inventory extends StandardEntity {
  static NAME = "pbksb_Consignor_Inventory";
  consignor?: string | null;
  description?: string | null;
  custom_code?: string | null;
  category?: Category_Type | null;
  quantity?: any | null;
  value_quantity?: any | null;
}
export type Consignor_InventoryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "consignor_Inventory-view";
export type Consignor_InventoryView<
  V extends Consignor_InventoryViewName
> = V extends "_base"
  ? Pick<
      Consignor_Inventory,
      | "id"
      | "description"
      | "consignor"
      | "custom_code"
      | "category"
      | "quantity"
      | "value_quantity"
    >
  : V extends "_local"
  ? Pick<
      Consignor_Inventory,
      | "id"
      | "consignor"
      | "description"
      | "custom_code"
      | "category"
      | "quantity"
      | "value_quantity"
    >
  : V extends "_minimal"
  ? Pick<Consignor_Inventory, "id" | "description">
  : V extends "consignor_Inventory-view"
  ? Pick<
      Consignor_Inventory,
      | "id"
      | "consignor"
      | "description"
      | "custom_code"
      | "category"
      | "quantity"
      | "value_quantity"
    >
  : never;
