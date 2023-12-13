import { RequestCFS } from "./pbksb_RequestCFS";
export class RequestRepair extends RequestCFS {
  static NAME = "pbksb_RequestRepair";
}
export type RequestRepairViewName = "_base" | "_local" | "_minimal";
export type RequestRepairView<
  V extends RequestRepairViewName
> = V extends "_base"
  ? Pick<
      RequestRepair,
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
      RequestRepair,
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
  ? Pick<RequestRepair, "id" | "ticketNumber" | "status">
  : never;
