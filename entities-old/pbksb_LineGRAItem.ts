import { StandardEntity } from "./base/sys$StandardEntity";
import { ItemType } from "./pbksb_ItemType";
import { GoodsReceiving } from "./pbksb_GoodsReceiving";
export class LineGRAItem extends StandardEntity {
  static NAME = "pbksb_LineGRAItem";
  type?: ItemType | null;
  description?: string | null;
  qty?: number | null;
  reviseQty?: number | null;
  remarks?: string | null;
  actualFootprint?: number | null;
  batchNo?: string | null;
  qrLabel?: any | null;
  inventoyLocation?: string | null;
  goodsReceiving?: GoodsReceiving | null;
}
export type LineGRAItemViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "lineGRAItem-2label"
  | "lineGRAItem-sample-view";
export type LineGRAItemView<V extends LineGRAItemViewName> = V extends "_base"
  ? Pick<
      LineGRAItem,
      | "id"
      | "description"
      | "qty"
      | "reviseQty"
      | "remarks"
      | "actualFootprint"
      | "batchNo"
      | "qrLabel"
      | "inventoyLocation"
    >
  : V extends "_local"
  ? Pick<
      LineGRAItem,
      | "id"
      | "description"
      | "qty"
      | "reviseQty"
      | "remarks"
      | "actualFootprint"
      | "batchNo"
      | "qrLabel"
      | "inventoyLocation"
    >
  : V extends "_minimal"
  ? Pick<LineGRAItem, "id" | "description">
  : V extends "lineGRAItem-2label"
  ? Pick<
      LineGRAItem,
      | "id"
      | "description"
      | "qty"
      | "reviseQty"
      | "remarks"
      | "actualFootprint"
      | "batchNo"
      | "qrLabel"
      | "inventoyLocation"
      | "type"
      | "goodsReceiving"
    >
  : V extends "lineGRAItem-sample-view"
  ? Pick<LineGRAItem, "id" | "description">
  : never;
