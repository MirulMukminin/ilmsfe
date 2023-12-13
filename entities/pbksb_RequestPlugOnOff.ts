import { RequestCFS } from "./pbksb_RequestCFS";
export class RequestPlugOnOff extends RequestCFS {
  static NAME = "pbksb_RequestPlugOnOff";
}
export type RequestPlugOnOffViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "requestPlugOnOff-view";
export type RequestPlugOnOffView<
  V extends RequestPlugOnOffViewName
> = V extends "_base"
  ? Pick<
      RequestPlugOnOff,
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
      RequestPlugOnOff,
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
  ? Pick<RequestPlugOnOff, "id" | "ticketNumber" | "status">
  : V extends "requestPlugOnOff-view"
  ? Pick<
      RequestPlugOnOff,
      | "id"
      | "customerName"
      | "requestLine"
      | "requestType"
      | "requestedBy"
      | "date"
      | "location"
      | "ticketNumber"
      | "status"
      | "vessel"
      | "cancelDate"
      | "cancelledBy"
      | "endorsedDate"
      | "endorsedBy"
    >
  : never;
