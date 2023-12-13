import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { Agent } from "./pbksb_Agent";
import { StorageLocation } from "./pbksb_StorageLocation";
import { StorageDurationEnum, StatusGRAEnum } from "../enums/enums";
import { User } from "./base/sec$User";
import { InventoryICYS } from "./pbksb_InventoryICYS";
import { LineGRAItem } from "./pbksb_LineGRAItem";
import { RequestDocument } from "./pbksb_RequestDocument";
export class GoodsReceiving extends StandardEntity {
  static NAME = "pbksb_GoodsReceiving";
  requestNo?: any | null;
  lineItemsSaved?: boolean | null;
  batchGenerated?: boolean | null;
  customer?: Customer | null;
  agent?: Agent | null;
  requestorName?: string | null;
  requestorIC?: string | null;
  requestorPhone?: string | null;
  arrivalDate?: any | null;
  storageLocation?: StorageLocation | null;
  storageDuration?: StorageDurationEnum | null;
  allotmentNo?: string | null;
  status?: StatusGRAEnum | null;
  endoseBy?: User | null;
  endorseDate?: any | null;
  mheRequetId?: string | null;
  inventoryICYS?: InventoryICYS | null;
  lineItem?: LineGRAItem[] | null;
  document?: RequestDocument[] | null;
}
export type GoodsReceivingViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "goodsReceiving-rest-view";
export type GoodsReceivingView<
  V extends GoodsReceivingViewName
> = V extends "_base"
  ? Pick<
      GoodsReceiving,
      | "id"
      | "requestNo"
      | "lineItemsSaved"
      | "batchGenerated"
      | "requestorName"
      | "requestorIC"
      | "requestorPhone"
      | "arrivalDate"
      | "storageDuration"
      | "allotmentNo"
      | "status"
      | "endorseDate"
      | "mheRequetId"
    >
  : V extends "_local"
  ? Pick<
      GoodsReceiving,
      | "id"
      | "requestNo"
      | "lineItemsSaved"
      | "batchGenerated"
      | "requestorName"
      | "requestorIC"
      | "requestorPhone"
      | "arrivalDate"
      | "storageDuration"
      | "allotmentNo"
      | "status"
      | "endorseDate"
      | "mheRequetId"
    >
  : V extends "goodsReceiving-rest-view"
  ? Pick<
      GoodsReceiving,
      | "id"
      | "requestNo"
      | "lineItemsSaved"
      | "batchGenerated"
      | "requestorName"
      | "requestorIC"
      | "requestorPhone"
      | "arrivalDate"
      | "storageDuration"
      | "allotmentNo"
      | "status"
      | "endorseDate"
      | "mheRequetId"
      | "customer"
      | "agent"
      | "storageLocation"
      | "endoseBy"
      | "lineItem"
    >
  : never;
