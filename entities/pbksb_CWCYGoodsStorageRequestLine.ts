import { StandardEntity } from "./base/sys$StandardEntity";
import { CWCYUnitOfMeasurement } from "./pbksb_CWCYUnitOfMeasurement";
import { CWCYGoodsStorageRequest } from "./pbksb_CWCYGoodsStorageRequest";
export class CWCYGoodsStorageRequestLine extends StandardEntity {
  static NAME = "pbksb_CWCYGoodsStorageRequestLine";
  lineNo?: number | null;
  description?: string | null;
  quantity?: number | null;
  unitOfMeasurement?: CWCYUnitOfMeasurement | null;
  remarks?: string | null;
  area?: any | null;
  actualArea?: any | null;
  weight?: any | null;
  actualWeight?: any | null;
  lineAllotmentNo?: string | null;
  cwcyGoodsStorageRequest?: CWCYGoodsStorageRequest | null;
}
export type CWCYGoodsStorageRequestLineViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "cwcyGoodsStorageRequestLine-view";
export type CWCYGoodsStorageRequestLineView<
  V extends CWCYGoodsStorageRequestLineViewName
> = V extends "_base"
  ? Pick<
      CWCYGoodsStorageRequestLine,
      | "id"
      | "description"
      | "lineNo"
      | "quantity"
      | "remarks"
      | "area"
      | "actualArea"
      | "weight"
      | "actualWeight"
      | "lineAllotmentNo"
    >
  : V extends "_local"
  ? Pick<
      CWCYGoodsStorageRequestLine,
      | "id"
      | "lineNo"
      | "description"
      | "quantity"
      | "remarks"
      | "area"
      | "actualArea"
      | "weight"
      | "actualWeight"
      | "lineAllotmentNo"
    >
  : V extends "_minimal"
  ? Pick<CWCYGoodsStorageRequestLine, "id" | "description">
  : V extends "cwcyGoodsStorageRequestLine-view"
  ? Pick<
      CWCYGoodsStorageRequestLine,
      | "id"
      | "lineNo"
      | "description"
      | "quantity"
      | "remarks"
      | "area"
      | "actualArea"
      | "weight"
      | "actualWeight"
      | "lineAllotmentNo"
      | "unitOfMeasurement"
    >
  : never;
