import { StandardEntity } from "./base/sys$StandardEntity";
import { InventoryICYS } from "./pbksb_InventoryICYS";
import { User } from "./base/sec$User";
import { GoodsRelease } from "./pbksb_GoodsRelease";
export class InventoryItemOut extends StandardEntity {
  static NAME = "pbksb_InventoryItemOut";
  item?: InventoryICYS | null;
  qty?: number | null;
  outDate?: any | null;
  isCompleted?: boolean | null;
  user?: User | null;
  remarks?: string | null;
  goodsRelease?: GoodsRelease | null;
}
export type InventoryItemOutViewName = "_base" | "_local" | "_minimal";
export type InventoryItemOutView<
  V extends InventoryItemOutViewName
> = V extends "_base"
  ? Pick<InventoryItemOut, "id" | "qty" | "outDate" | "isCompleted" | "remarks">
  : V extends "_local"
  ? Pick<InventoryItemOut, "id" | "qty" | "outDate" | "isCompleted" | "remarks">
  : never;
