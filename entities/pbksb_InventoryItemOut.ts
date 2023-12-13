import { StandardEntity } from "./base/sys$StandardEntity";
import { InventoryICYS } from "./pbksb_InventoryICYS";
import { Customer } from "./pbksb_Customer";
import { User } from "./base/sec$User";
import { GoodsRelease } from "./pbksb_GoodsRelease";
export class InventoryItemOut extends StandardEntity {
  static NAME = "pbksb_InventoryItemOut";
  item?: InventoryICYS | null;
  customer?: Customer | null;
  qty?: number | null;
  outDate?: any | null;
  isCompleted?: boolean | null;
  user?: User | null;
  remarks?: string | null;
  actualFootPrintOrigin?: number | null;
  actualFootPrintRemained?: number | null;
  goodsRelease?: GoodsRelease | null;
  actualFootPrintOuted?: number | null;
}
export type InventoryItemOutViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "inventoryItemOut-rest-view";
export type InventoryItemOutView<
  V extends InventoryItemOutViewName
> = V extends "_base"
  ? Pick<
      InventoryItemOut,
      | "id"
      | "qty"
      | "outDate"
      | "isCompleted"
      | "remarks"
      | "actualFootPrintOrigin"
      | "actualFootPrintRemained"
      | "actualFootPrintOuted"
    >
  : V extends "_local"
  ? Pick<
      InventoryItemOut,
      | "id"
      | "qty"
      | "outDate"
      | "isCompleted"
      | "remarks"
      | "actualFootPrintOrigin"
      | "actualFootPrintRemained"
      | "actualFootPrintOuted"
    >
  : V extends "inventoryItemOut-rest-view"
  ? Pick<
      InventoryItemOut,
      | "id"
      | "item"
      | "customer"
      | "isCompleted"
      | "goodsRelease"
      | "qty"
      | "outDate"
      | "remarks"
      | "actualFootPrintOrigin"
      | "actualFootPrintRemained"
      | "actualFootPrintOuted"
    >
  : never;
