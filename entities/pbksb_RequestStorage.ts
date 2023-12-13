import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { Agent } from "./pbksb_Agent";
import { StorageDurationEnum, RequestStorageStatusEnum } from "../enums/enums";
import { User } from "./base/sec$User";
import { RequestStorageLineItem } from "./pbksb_RequestStorageLineItem";
import { ICWStorageDocument } from "./pbksb_ICWStorageDocument";
export class RequestStorage extends StandardEntity {
  static NAME = "pbksb_RequestStorage";
  docketNo?: string | null;
  poNumber?: string | null;
  billingCompleted?: boolean | null;
  lastBilled?: any | null;
  requestType?: string | null;
  customer?: Customer | null;
  agent?: Agent | null;
  requestDate?: any | null;
  duration?: StorageDurationEnum | null;
  pacSupp?: boolean | null;
  pacSuppName?: string | null;
  skidReturn?: boolean | null;
  status?: RequestStorageStatusEnum | null;
  skidTrips?: number | null;
  batchNo?: string | null;
  endorsedBy?: User | null;
  endorsedDate?: any | null;
  canceledBy?: User | null;
  canceledDate?: any | null;
  mheRequestId?: string | null;
  lineItem?: RequestStorageLineItem[] | null;
  document?: ICWStorageDocument[] | null;
  lineItemSaved?: boolean | null;
  batchGenerated?: boolean | null;
}
export type RequestStorageViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "requestStorage-rest-view"
  | "requestStorage-view11";
export type RequestStorageView<
  V extends RequestStorageViewName
> = V extends "_base"
  ? Pick<
      RequestStorage,
      | "id"
      | "docketNo"
      | "poNumber"
      | "billingCompleted"
      | "lastBilled"
      | "requestType"
      | "requestDate"
      | "duration"
      | "pacSupp"
      | "pacSuppName"
      | "skidReturn"
      | "status"
      | "skidTrips"
      | "batchNo"
      | "endorsedDate"
      | "canceledDate"
      | "mheRequestId"
      | "lineItemSaved"
      | "batchGenerated"
    >
  : V extends "_local"
  ? Pick<
      RequestStorage,
      | "id"
      | "docketNo"
      | "poNumber"
      | "billingCompleted"
      | "lastBilled"
      | "requestType"
      | "requestDate"
      | "duration"
      | "pacSupp"
      | "pacSuppName"
      | "skidReturn"
      | "status"
      | "skidTrips"
      | "batchNo"
      | "endorsedDate"
      | "canceledDate"
      | "mheRequestId"
      | "lineItemSaved"
      | "batchGenerated"
    >
  : V extends "_minimal"
  ? Pick<RequestStorage, "id" | "docketNo">
  : V extends "requestStorage-rest-view"
  ? Pick<
      RequestStorage,
      | "id"
      | "docketNo"
      | "poNumber"
      | "billingCompleted"
      | "lastBilled"
      | "requestType"
      | "requestDate"
      | "duration"
      | "pacSupp"
      | "pacSuppName"
      | "skidReturn"
      | "status"
      | "skidTrips"
      | "batchNo"
      | "endorsedDate"
      | "canceledDate"
      | "mheRequestId"
      | "lineItemSaved"
      | "batchGenerated"
      | "customer"
      | "endorsedBy"
      | "lineItem"
      | "canceledBy"
      | "document"
      | "agent"
    >
  : V extends "requestStorage-view11"
  ? Pick<
      RequestStorage,
      | "id"
      | "docketNo"
      | "poNumber"
      | "billingCompleted"
      | "lastBilled"
      | "requestType"
      | "requestDate"
      | "duration"
      | "pacSupp"
      | "pacSuppName"
      | "skidReturn"
      | "status"
      | "skidTrips"
      | "batchNo"
      | "endorsedDate"
      | "canceledDate"
      | "mheRequestId"
      | "lineItemSaved"
      | "batchGenerated"
      | "customer"
    >
  : never;
