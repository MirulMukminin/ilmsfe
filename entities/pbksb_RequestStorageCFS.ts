import { RequestCFS } from "./pbksb_RequestCFS";
export class RequestStorageCFS extends RequestCFS {
  static NAME = "pbksb_RequestStorageCFS";
}
export type RequestStorageCFSViewName = "_base" | "_local" | "_minimal";
export type RequestStorageCFSView<
  V extends RequestStorageCFSViewName
> = V extends "_base"
  ? Pick<
      RequestStorageCFS,
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
      RequestStorageCFS,
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
  ? Pick<RequestStorageCFS, "id" | "ticketNumber" | "status">
  : never;
