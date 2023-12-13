import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { Agent } from "./pbksb_Agent";
import { RequestTransferStatusEnum } from "../enums/enums";
import { User } from "./base/sec$User";
import { InventoryICWItemOut } from "./pbksb_InventoryICWItemOut";
import { ICWRequestTransferLineItem } from "./pbksb_ICWRequestTransferLineItem";
import { ICWTransferDocument } from "./pbksb_ICWTransferDocument";
export class RequestTransfer extends StandardEntity {
  static NAME = "pbksb_RequestTransfer";
  docketNo?: string | null;
  poNumber?: string | null;
  requestType?: string | null;
  customer?: Customer | null;
  agent?: Agent | null;
  requestDate?: any | null;
  status?: RequestTransferStatusEnum | null;
  lineItemSaved?: boolean | null;
  batchGenerated?: boolean | null;
  endorsedBy?: User | null;
  endorsedDate?: any | null;
  canceledBy?: User | null;
  canceledDate?: any | null;
  lineItem?: InventoryICWItemOut[] | null;
  transferLineItem?: ICWRequestTransferLineItem[] | null;
  document?: ICWTransferDocument[] | null;
}
export type RequestTransferViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "requestTransfer-view";
export type RequestTransferView<
  V extends RequestTransferViewName
> = V extends "_base"
  ? Pick<
      RequestTransfer,
      | "id"
      | "docketNo"
      | "poNumber"
      | "requestType"
      | "requestDate"
      | "status"
      | "lineItemSaved"
      | "batchGenerated"
      | "endorsedDate"
      | "canceledDate"
    >
  : V extends "_local"
  ? Pick<
      RequestTransfer,
      | "id"
      | "docketNo"
      | "poNumber"
      | "requestType"
      | "requestDate"
      | "status"
      | "lineItemSaved"
      | "batchGenerated"
      | "endorsedDate"
      | "canceledDate"
    >
  : V extends "_minimal"
  ? Pick<RequestTransfer, "id" | "docketNo">
  : V extends "requestTransfer-view"
  ? Pick<
      RequestTransfer,
      | "id"
      | "docketNo"
      | "poNumber"
      | "requestType"
      | "requestDate"
      | "status"
      | "lineItemSaved"
      | "batchGenerated"
      | "endorsedDate"
      | "canceledDate"
      | "customer"
      | "agent"
      | "endorsedBy"
      | "canceledBy"
      | "createdBy"
      | "createTs"
      | "updateTs"
      | "lineItem"
      | "document"
      | "transferLineItem"
      | "updatedBy"
    >
  : never;
