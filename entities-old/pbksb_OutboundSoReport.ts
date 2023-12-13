import { StandardEntity } from "./base/sys$StandardEntity";
import { ScheduledWaste } from "./pbksb_ScheduledWaste";
import { Customer } from "./pbksb_Customer";
import { ScheduledWasteEnum } from "../enums/enums";
export class OutboundSoReport extends StandardEntity {
  static NAME = "pbksb_OutboundSoReport";
  scheduledWaste?: ScheduledWaste | null;
  dateReceived?: any | null;
  formNo?: string | null;
  customer?: Customer | null;
  status?: ScheduledWasteEnum | null;
  endorsedBy?: string | null;
  endorsedDate?: any | null;
  expiryDate?: any | null;
}
export type OutboundSoReportViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "outboundSoReport-view";
export type OutboundSoReportView<
  V extends OutboundSoReportViewName
> = V extends "_base"
  ? Pick<
      OutboundSoReport,
      | "id"
      | "dateReceived"
      | "formNo"
      | "status"
      | "endorsedBy"
      | "endorsedDate"
      | "expiryDate"
    >
  : V extends "_local"
  ? Pick<
      OutboundSoReport,
      | "id"
      | "dateReceived"
      | "formNo"
      | "status"
      | "endorsedBy"
      | "endorsedDate"
      | "expiryDate"
    >
  : V extends "outboundSoReport-view"
  ? Pick<
      OutboundSoReport,
      | "id"
      | "dateReceived"
      | "formNo"
      | "status"
      | "endorsedBy"
      | "endorsedDate"
      | "expiryDate"
      | "scheduledWaste"
      | "customer"
    >
  : never;
