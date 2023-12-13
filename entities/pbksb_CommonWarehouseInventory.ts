import { StandardEntity } from "./base/sys$StandardEntity";
import { CWCYGoodsStorageRequest } from "./pbksb_CWCYGoodsStorageRequest";
import { CWCYUnitOfMeasurement } from "./pbksb_CWCYUnitOfMeasurement";
import { Customer } from "./pbksb_Customer";
import { Agent } from "./pbksb_Agent";
import { CWCYGoodsReleaseRequestLine } from "./pbksb_CWCYGoodsReleaseRequestLine";
export class CommonWarehouseInventory extends StandardEntity {
  static NAME = "pbksb_CommonWarehouseInventory";
  requestNo?: CWCYGoodsStorageRequest | null;
  description?: string | null;
  quantity?: number | null;
  uom?: CWCYUnitOfMeasurement | null;
  initialQuantity?: number | null;
  lineAllotmentNo?: string | null;
  weight?: any | null;
  actualWeight?: any | null;
  incomingDate?: any | null;
  customer?: Customer | null;
  agent?: Agent | null;
  isCompleted?: boolean | null;
  goodsRelease?: CWCYGoodsReleaseRequestLine[] | null;
}
export type CommonWarehouseInventoryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "commonWarehouseInventory-view";
export type CommonWarehouseInventoryView<
  V extends CommonWarehouseInventoryViewName
> = V extends "_base"
  ? Pick<
      CommonWarehouseInventory,
      | "id"
      | "description"
      | "quantity"
      | "initialQuantity"
      | "lineAllotmentNo"
      | "weight"
      | "actualWeight"
      | "incomingDate"
      | "isCompleted"
    >
  : V extends "_local"
  ? Pick<
      CommonWarehouseInventory,
      | "id"
      | "description"
      | "quantity"
      | "initialQuantity"
      | "lineAllotmentNo"
      | "weight"
      | "actualWeight"
      | "incomingDate"
      | "isCompleted"
    >
  : V extends "_minimal"
  ? Pick<CommonWarehouseInventory, "id" | "description">
  : V extends "commonWarehouseInventory-view"
  ? Pick<
      CommonWarehouseInventory,
      | "id"
      | "description"
      | "quantity"
      | "initialQuantity"
      | "lineAllotmentNo"
      | "weight"
      | "actualWeight"
      | "incomingDate"
      | "isCompleted"
      | "customer"
      | "agent"
      | "uom"
      | "requestNo"
      | "goodsRelease"
    >
  : never;
