import { StandardEntity } from "./base/sys$StandardEntity";
import { CustomerUser } from "./pbksb_CustomerUser";
import { Customer } from "./pbksb_Customer";
import { Agent } from "./pbksb_Agent";
import { RequestStatus } from "../enums/enums";
import { CWCYDocument } from "./pbksb_CWCYDocument";
import { CWCYGoodsStorageRequestLine } from "./pbksb_CWCYGoodsStorageRequestLine";
import { CommonWarehouseInventory } from "./pbksb_CommonWarehouseInventory";
import { CommonYardInventory } from "./pbksb_CommonYardInventory";
export class CWCYGoodsStorageRequest extends StandardEntity {
  static NAME = "pbksb_CWCYGoodsStorageRequest";
  requestNo?: string | null;
  poNumber?: string | null;
  requestBy?: CustomerUser | null;
  requestType?: string | null;
  requestPriority?: string | null;
  customer?: Customer | null;
  agent?: Agent | null;
  requesterName?: string | null;
  requesterIc?: string | null;
  requesterPhoneNo?: string | null;
  arrivalDate?: any | null;
  location?: string | null;
  storageDuration?: string | null;
  status?: RequestStatus | null;
  endorsedBy?: string | null;
  endorsedDate?: any | null;
  cancelledBy?: string | null;
  cancelledDate?: any | null;
  batchGenerated?: boolean | null;
  lineItemsSaved?: boolean | null;
  lastBilled?: any | null;
  billingCompleted?: boolean | null;
  document?: CWCYDocument[] | null;
  cwcyGoodsStorageRequestLine?: CWCYGoodsStorageRequestLine[] | null;
  commonWarehouseInventory?: CommonWarehouseInventory | null;
  commonYardInventory?: CommonYardInventory | null;
}
export type CWCYGoodsStorageRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "cwcyGoodsStorageRequest-view";
export type CWCYGoodsStorageRequestView<
  V extends CWCYGoodsStorageRequestViewName
> = V extends "_base"
  ? Pick<
      CWCYGoodsStorageRequest,
      | "id"
      | "requestNo"
      | "poNumber"
      | "requestType"
      | "requestPriority"
      | "requesterName"
      | "requesterIc"
      | "requesterPhoneNo"
      | "arrivalDate"
      | "location"
      | "storageDuration"
      | "status"
      | "endorsedBy"
      | "endorsedDate"
      | "cancelledBy"
      | "cancelledDate"
      | "batchGenerated"
      | "lineItemsSaved"
      | "lastBilled"
      | "billingCompleted"
    >
  : V extends "_local"
  ? Pick<
      CWCYGoodsStorageRequest,
      | "id"
      | "requestNo"
      | "poNumber"
      | "requestType"
      | "requestPriority"
      | "requesterName"
      | "requesterIc"
      | "requesterPhoneNo"
      | "arrivalDate"
      | "location"
      | "storageDuration"
      | "status"
      | "endorsedBy"
      | "endorsedDate"
      | "cancelledBy"
      | "cancelledDate"
      | "batchGenerated"
      | "lineItemsSaved"
      | "lastBilled"
      | "billingCompleted"
    >
  : V extends "cwcyGoodsStorageRequest-view"
  ? Pick<
      CWCYGoodsStorageRequest,
      | "id"
      | "requestNo"
      | "poNumber"
      | "requestType"
      | "requestPriority"
      | "requesterName"
      | "requesterIc"
      | "requesterPhoneNo"
      | "arrivalDate"
      | "location"
      | "storageDuration"
      | "status"
      | "endorsedBy"
      | "endorsedDate"
      | "cancelledBy"
      | "cancelledDate"
      | "batchGenerated"
      | "lineItemsSaved"
      | "lastBilled"
      | "billingCompleted"
      | "customer"
      | "agent"
      | "cwcyGoodsStorageRequestLine"
      | "document"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
    >
  : never;
