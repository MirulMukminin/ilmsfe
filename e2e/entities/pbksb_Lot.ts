import { StandardEntity } from "./base/sys$StandardEntity";
import { WareHouse } from "./pbksb_WareHouse";
import { Status } from "./pbksb_Status";
export class Lot extends StandardEntity {
  static NAME = "pbksb_Lot";
  number?: WareHouse | null;
  lotSize?: any | null;
  statusLot?: Status | null;
}
export type LotViewName = "_base" | "_local" | "_minimal" | "lot-view";
export type LotView<V extends LotViewName> = V extends "_base"
  ? Pick<Lot, "id" | "lotSize">
  : V extends "_local"
  ? Pick<Lot, "id" | "lotSize">
  : V extends "lot-view"
  ? Pick<Lot, "id" | "lotSize" | "number" | "statusLot">
  : never;
