import { StandardEntity } from "./base/sys$StandardEntity";
import { CWCYGoodsStorageRequest } from "./pbksb_CWCYGoodsStorageRequest";
import { CWCYUnitOfMeasurement } from "./pbksb_CWCYUnitOfMeasurement";
import { Customer } from "./pbksb_Customer";
import { Agent } from "./pbksb_Agent";
import { CWCYGoodsReleaseRequestLine } from "./pbksb_CWCYGoodsReleaseRequestLine";
export class CommonYardInventory extends StandardEntity {
  static NAME = "pbksb_CommonYardInventory";
  requestNo?: CWCYGoodsStorageRequest | null;
  description?: string | null;
  quantity?: number | null;
  initialQuantity?: number | null;
  unitOfMeasurement?: CWCYUnitOfMeasurement | null;
  area?: any | null;
  actualArea?: any | null;
  lineAllotmentNo?: string | null;
  incomingDate?: any | null;
  customer?: Customer | null;
  agent?: Agent | null;
  isCompleted?: boolean | null;
  goodsRelease?: CWCYGoodsReleaseRequestLine[] | null;
}
export type CommonYardInventoryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "commonYardInventory-view";
export type CommonYardInventoryView<
  V extends CommonYardInventoryViewName
> = V extends "_base"
  ? Pick<
      CommonYardInventory,
      | "id"
      | "description"
      | "quantity"
      | "initialQuantity"
      | "area"
      | "actualArea"
      | "lineAllotmentNo"
      | "incomingDate"
      | "isCompleted"
    >
  : V extends "_local"
  ? Pick<
      CommonYardInventory,
      | "id"
      | "description"
      | "quantity"
      | "initialQuantity"
      | "area"
      | "actualArea"
      | "lineAllotmentNo"
      | "incomingDate"
      | "isCompleted"
    >
  : V extends "_minimal"
  ? Pick<CommonYardInventory, "id" | "description">
  : V extends "commonYardInventory-view"
  ? Pick<
      CommonYardInventory,
      | "id"
      | "description"
      | "quantity"
      | "initialQuantity"
      | "area"
      | "actualArea"
      | "lineAllotmentNo"
      | "incomingDate"
      | "isCompleted"
      | "unitOfMeasurement"
      | "customer"
      | "agent"
      | "requestNo"
      | "goodsRelease"
    >
  : never;
