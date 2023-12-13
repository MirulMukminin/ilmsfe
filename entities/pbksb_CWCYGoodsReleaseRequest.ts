import { StandardEntity } from "./base/sys$StandardEntity";
import { CustomerUser } from "./pbksb_CustomerUser";
import { CWCYDocument } from "./pbksb_CWCYDocument";
import { Customer } from "./pbksb_Customer";
import { Agent } from "./pbksb_Agent";
import { RequestStatus } from "../enums/enums";
import { CWCYGoodsReleaseRequestLine } from "./pbksb_CWCYGoodsReleaseRequestLine";
export class CWCYGoodsReleaseRequest extends StandardEntity {
  static NAME = "pbksb_CWCYGoodsReleaseRequest";
  requestNo?: string | null;
  poNumber?: string | null;
  requestPriority?: string | null;
  requestBy?: CustomerUser | null;
  document?: CWCYDocument[] | null;
  customer?: Customer | null;
  agent?: Agent | null;
  requesterName?: string | null;
  requesterIc?: string | null;
  requesterPhoneNo?: string | null;
  releaseDate?: any | null;
  location?: string | null;
  status?: RequestStatus | null;
  endorsedBy?: string | null;
  endorsedDate?: any | null;
  cancelledBy?: string | null;
  cancelledDate?: any | null;
  lineItemsSaved?: boolean | null;
  cwcyGoodsReleaseRequestLine?: CWCYGoodsReleaseRequestLine[] | null;
}
export type CWCYGoodsReleaseRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "cwcyGoodsReleaseRequest-view";
export type CWCYGoodsReleaseRequestView<
  V extends CWCYGoodsReleaseRequestViewName
> = V extends "_base"
  ? Pick<
      CWCYGoodsReleaseRequest,
      | "id"
      | "requestNo"
      | "poNumber"
      | "requestPriority"
      | "requesterName"
      | "requesterIc"
      | "requesterPhoneNo"
      | "releaseDate"
      | "location"
      | "status"
      | "endorsedBy"
      | "endorsedDate"
      | "cancelledBy"
      | "cancelledDate"
      | "lineItemsSaved"
    >
  : V extends "_local"
  ? Pick<
      CWCYGoodsReleaseRequest,
      | "id"
      | "requestNo"
      | "poNumber"
      | "requestPriority"
      | "requesterName"
      | "requesterIc"
      | "requesterPhoneNo"
      | "releaseDate"
      | "location"
      | "status"
      | "endorsedBy"
      | "endorsedDate"
      | "cancelledBy"
      | "cancelledDate"
      | "lineItemsSaved"
    >
  : V extends "cwcyGoodsReleaseRequest-view"
  ? Pick<
      CWCYGoodsReleaseRequest,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "requestNo"
      | "poNumber"
      | "requestPriority"
      | "requesterName"
      | "requesterIc"
      | "requesterPhoneNo"
      | "releaseDate"
      | "location"
      | "status"
      | "endorsedBy"
      | "endorsedDate"
      | "cancelledBy"
      | "cancelledDate"
      | "lineItemsSaved"
      | "customer"
      | "agent"
      | "cwcyGoodsReleaseRequestLine"
      | "document"
    >
  : never;
