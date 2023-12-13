import { RequestCFS } from "./pbksb_RequestCFS";
export class CfsHandlingFeeTransport extends RequestCFS {
  static NAME = "pbksb_CfsHandlingFeeTransport";
}
export type CfsHandlingFeeTransportViewName = "_base" | "_local" | "_minimal";
export type CfsHandlingFeeTransportView<
  V extends CfsHandlingFeeTransportViewName
> = V extends "_base"
  ? Pick<
      CfsHandlingFeeTransport,
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
      CfsHandlingFeeTransport,
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
  ? Pick<CfsHandlingFeeTransport, "id" | "ticketNumber" | "status">
  : never;
