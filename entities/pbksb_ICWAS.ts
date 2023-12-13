import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { Agent } from "./pbksb_Agent";
import { RequestTransferStatusEnum } from "../enums/enums";
import { User } from "./base/sec$User";
import { ICWASLineItem } from "./pbksb_ICWASLineItem";
import { ICWASDocument } from "./pbksb_ICWASDocument";
export class ICWAS extends StandardEntity {
  static NAME = "pbksb_ICWAS";
  docketNo?: string | null;
  poNumber?: string | null;
  requestType?: string | null;
  customer?: Customer | null;
  agent?: Agent | null;
  requestDate?: any | null;
  status?: RequestTransferStatusEnum | null;
  lineItemSaved?: boolean | null;
  jobStarted?: boolean | null;
  jobStartDate?: any | null;
  jobStartedBy?: User | null;
  endorsedBy?: User | null;
  endorsedDate?: any | null;
  canceledBy?: User | null;
  canceledDate?: any | null;
  mheRequestId?: string | null;
  lineItem?: ICWASLineItem[] | null;
  document?: ICWASDocument[] | null;
}
export type ICWASViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "iCWAS-all"
  | "iCWAS-view-rest";
export type ICWASView<V extends ICWASViewName> = V extends "_base"
  ? Pick<
      ICWAS,
      | "id"
      | "docketNo"
      | "poNumber"
      | "requestType"
      | "requestDate"
      | "status"
      | "lineItemSaved"
      | "jobStarted"
      | "jobStartDate"
      | "endorsedDate"
      | "canceledDate"
      | "mheRequestId"
    >
  : V extends "_local"
  ? Pick<
      ICWAS,
      | "id"
      | "docketNo"
      | "poNumber"
      | "requestType"
      | "requestDate"
      | "status"
      | "lineItemSaved"
      | "jobStarted"
      | "jobStartDate"
      | "endorsedDate"
      | "canceledDate"
      | "mheRequestId"
    >
  : V extends "iCWAS-all"
  ? Pick<
      ICWAS,
      | "id"
      | "docketNo"
      | "poNumber"
      | "requestType"
      | "requestDate"
      | "status"
      | "lineItemSaved"
      | "jobStarted"
      | "jobStartDate"
      | "endorsedDate"
      | "canceledDate"
      | "mheRequestId"
      | "customer"
      | "agent"
      | "jobStarted"
      | "jobStartedBy"
      | "jobStartDate"
      | "endorsedBy"
      | "canceledBy"
      | "lineItem"
    >
  : V extends "iCWAS-view-rest"
  ? Pick<
      ICWAS,
      | "id"
      | "docketNo"
      | "poNumber"
      | "requestType"
      | "requestDate"
      | "status"
      | "lineItemSaved"
      | "jobStarted"
      | "jobStartDate"
      | "endorsedDate"
      | "canceledDate"
      | "mheRequestId"
      | "customer"
      | "agent"
      | "endorsedBy"
      | "canceledBy"
      | "lineItem"
    >
  : never;
