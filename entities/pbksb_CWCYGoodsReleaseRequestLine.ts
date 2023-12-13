import { StandardEntity } from "./base/sys$StandardEntity";
import { CWCYUnitOfMeasurement } from "./pbksb_CWCYUnitOfMeasurement";
import { CWCYGoodsReleaseRequest } from "./pbksb_CWCYGoodsReleaseRequest";
import { CommonWarehouseInventory } from "./pbksb_CommonWarehouseInventory";
import { CommonYardInventory } from "./pbksb_CommonYardInventory";
export class CWCYGoodsReleaseRequestLine extends StandardEntity {
  static NAME = "pbksb_CWCYGoodsReleaseRequestLine";
  lineNo?: number | null;
  releaseDate?: any | null;
  isCompleted?: boolean | null;
  description?: string | null;
  quantity?: number | null;
  unitOfMeasurement?: CWCYUnitOfMeasurement | null;
  area?: any | null;
  actualArea?: any | null;
  weight?: any | null;
  actualWeight?: any | null;
  lineAllotmentNo?: string | null;
  remarks?: string | null;
  cwcyGoodsReleaseRequest?: CWCYGoodsReleaseRequest | null;
  commonWarehouseInventory?: CommonWarehouseInventory | null;
  commonYardInventory?: CommonYardInventory | null;
}
export type CWCYGoodsReleaseRequestLineViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "cwcyGoodsReleaseRequestLine-view";
export type CWCYGoodsReleaseRequestLineView<
  V extends CWCYGoodsReleaseRequestLineViewName
> = V extends "_base"
  ? Pick<
      CWCYGoodsReleaseRequestLine,
      | "id"
      | "description"
      | "lineNo"
      | "releaseDate"
      | "isCompleted"
      | "quantity"
      | "area"
      | "actualArea"
      | "weight"
      | "actualWeight"
      | "lineAllotmentNo"
      | "remarks"
    >
  : V extends "_local"
  ? Pick<
      CWCYGoodsReleaseRequestLine,
      | "id"
      | "lineNo"
      | "releaseDate"
      | "isCompleted"
      | "description"
      | "quantity"
      | "area"
      | "actualArea"
      | "weight"
      | "actualWeight"
      | "lineAllotmentNo"
      | "remarks"
    >
  : V extends "_minimal"
  ? Pick<CWCYGoodsReleaseRequestLine, "id" | "description">
  : V extends "cwcyGoodsReleaseRequestLine-view"
  ? Pick<
      CWCYGoodsReleaseRequestLine,
      | "id"
      | "lineNo"
      | "releaseDate"
      | "isCompleted"
      | "description"
      | "quantity"
      | "area"
      | "actualArea"
      | "weight"
      | "actualWeight"
      | "lineAllotmentNo"
      | "remarks"
      | "unitOfMeasurement"
      | "commonWarehouseInventory"
      | "commonYardInventory"
      | "cwcyGoodsReleaseRequest"
    >
  : never;
