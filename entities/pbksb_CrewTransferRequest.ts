import { StandardEntity } from "./base/sys$StandardEntity";
import {
  CrewTransferRequestType,
  CrewTransferPortOfOrigin,
  RequestStatus
} from "../enums/enums";
import { CrewTransferRequestItem } from "./pbksb_CrewTransferRequestItem";
export class CrewTransferRequest extends StandardEntity {
  static NAME = "pbksb_CrewTransferRequest";
  requestNumber?: string | null;
  poNumber?: string | null;
  requestedBy?: string | null;
  requestType?: CrewTransferRequestType | null;
  requestDate?: any | null;
  portOfOrigin?: CrewTransferPortOfOrigin | null;
  company?: string | null;
  agent?: string | null;
  vessel?: string | null;
  berthNo?: string | null;
  ksbSecurityOfficer?: string | null;
  requestStatus?: RequestStatus | null;
  crewTransferItem?: CrewTransferRequestItem[] | null;
  totalPax?: number | null;
  endorsedBy?: string | null;
  endorsedDate?: any | null;
  cancelledBy?: string | null;
  cancelledDate?: any | null;
}
export type CrewTransferRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "crewTransferRequest-view";
export type CrewTransferRequestView<
  V extends CrewTransferRequestViewName
> = V extends "_base"
  ? Pick<
      CrewTransferRequest,
      | "id"
      | "requestNumber"
      | "poNumber"
      | "requestedBy"
      | "requestType"
      | "requestDate"
      | "portOfOrigin"
      | "company"
      | "agent"
      | "vessel"
      | "berthNo"
      | "ksbSecurityOfficer"
      | "requestStatus"
      | "totalPax"
      | "endorsedBy"
      | "endorsedDate"
      | "cancelledBy"
      | "cancelledDate"
    >
  : V extends "_local"
  ? Pick<
      CrewTransferRequest,
      | "id"
      | "requestNumber"
      | "poNumber"
      | "requestedBy"
      | "requestType"
      | "requestDate"
      | "portOfOrigin"
      | "company"
      | "agent"
      | "vessel"
      | "berthNo"
      | "ksbSecurityOfficer"
      | "requestStatus"
      | "totalPax"
      | "endorsedBy"
      | "endorsedDate"
      | "cancelledBy"
      | "cancelledDate"
    >
  : V extends "crewTransferRequest-view"
  ? Pick<
      CrewTransferRequest,
      | "id"
      | "requestNumber"
      | "poNumber"
      | "requestedBy"
      | "requestType"
      | "requestDate"
      | "portOfOrigin"
      | "company"
      | "agent"
      | "vessel"
      | "berthNo"
      | "ksbSecurityOfficer"
      | "requestStatus"
      | "totalPax"
      | "endorsedBy"
      | "endorsedDate"
      | "cancelledBy"
      | "cancelledDate"
      | "crewTransferItem"
    >
  : never;
