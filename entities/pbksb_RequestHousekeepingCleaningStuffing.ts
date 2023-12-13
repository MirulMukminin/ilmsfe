import { RequestCFS } from "./pbksb_RequestCFS";
export class RequestHousekeepingCleaningStuffing extends RequestCFS {
  static NAME = "pbksb_RequestHousekeepingCleaningStuffing";
}
export type RequestHousekeepingCleaningStuffingViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type RequestHousekeepingCleaningStuffingView<
  V extends RequestHousekeepingCleaningStuffingViewName
> = V extends "_base"
  ? Pick<
      RequestHousekeepingCleaningStuffing,
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
      RequestHousekeepingCleaningStuffing,
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
  ? Pick<RequestHousekeepingCleaningStuffing, "id" | "ticketNumber" | "status">
  : never;
