import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { RequestCFSType, RequestCFSStatus } from "../enums/enums";
import { RequestLine } from "./pbksb_RequestLine";
import { RequestPlugOnLine } from "./pbksb_RequestPlugOnLine";
import { RequestLoadingLine } from "./pbksb_RequestLoadingLine";
import { RequestHousekeepingLine } from "./pbksb_RequestHousekeepingLine";
import { RequestRepairLine } from "./pbksb_RequestRepairLine";
import { CustomerUser } from "./pbksb_CustomerUser";
import { Site } from "./pbksb_Site";
import { Vessel } from "./pbksb_Vessel";
export class RequestCFS extends StandardEntity {
  static NAME = "pbksb_RequestCFS";
  customerName?: Customer | null;
  isPrinted?: boolean | null;
  poNumber?: string | null;
  requestType?: RequestCFSType | null;
  requestPriority?: string | null;
  requestLine?: RequestLine[] | null;
  plugOnLine?: RequestPlugOnLine[] | null;
  loadingLine?: RequestLoadingLine[] | null;
  housekeepingLine?: RequestHousekeepingLine[] | null;
  repairLine?: RequestRepairLine[] | null;
  requestedBy?: CustomerUser | null;
  date?: any | null;
  location?: Site | null;
  ticketNumber?: string | null;
  oldTicketNumber?: string | null;
  status?: RequestCFSStatus | null;
  vessel?: Vessel | null;
  cancelDate?: any | null;
  cancelledBy?: string | null;
  endorsedDate?: any | null;
  endorsedBy?: string | null;
}
export type RequestCFSViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "requestCFS-view";
export type RequestCFSView<V extends RequestCFSViewName> = V extends "_base"
  ? Pick<
      RequestCFS,
      | "id"
      | "ticketNumber"
      | "status"
      | "isPrinted"
      | "poNumber"
      | "requestType"
      | "requestPriority"
      | "date"
      | "oldTicketNumber"
      | "cancelDate"
      | "cancelledBy"
      | "endorsedDate"
      | "endorsedBy"
    >
  : V extends "_local"
  ? Pick<
      RequestCFS,
      | "id"
      | "isPrinted"
      | "poNumber"
      | "requestType"
      | "requestPriority"
      | "date"
      | "ticketNumber"
      | "oldTicketNumber"
      | "status"
      | "cancelDate"
      | "cancelledBy"
      | "endorsedDate"
      | "endorsedBy"
    >
  : V extends "_minimal"
  ? Pick<RequestCFS, "id" | "ticketNumber" | "status">
  : V extends "requestCFS-view"
  ? Pick<
      RequestCFS,
      | "id"
      | "isPrinted"
      | "poNumber"
      | "requestType"
      | "requestPriority"
      | "date"
      | "ticketNumber"
      | "oldTicketNumber"
      | "status"
      | "cancelDate"
      | "cancelledBy"
      | "endorsedDate"
      | "endorsedBy"
      | "customerName"
      | "requestedBy"
      | "requestLine"
      | "location"
      | "vessel"
      | "plugOnLine"
      | "loadingLine"
      | "housekeepingLine"
      | "repairLine"
    >
  : never;
