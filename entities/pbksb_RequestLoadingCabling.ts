import { RequestCFS } from "./pbksb_RequestCFS";
export class RequestLoadingCabling extends RequestCFS {
  static NAME = "pbksb_RequestLoadingCabling";
}
export type RequestLoadingCablingViewName = "_base" | "_local" | "_minimal";
export type RequestLoadingCablingView<
  V extends RequestLoadingCablingViewName
> = V extends "_base"
  ? Pick<
      RequestLoadingCabling,
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
      RequestLoadingCabling,
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
  ? Pick<RequestLoadingCabling, "id" | "ticketNumber" | "status">
  : never;
