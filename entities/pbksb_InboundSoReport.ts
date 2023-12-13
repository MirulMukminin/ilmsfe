import { StandardEntity } from "./base/sys$StandardEntity";
import { ScheduledWaste } from "./pbksb_ScheduledWaste";
import { Customer } from "./pbksb_Customer";
import { ScheduledWasteEnum } from "../enums/enums";
import { SOReportInventoryItem } from "./pbksb_SOReportInventoryItem";
export class InboundSoReport extends StandardEntity {
  static NAME = "pbksb_InboundSoReport";
  scheduledWaste?: ScheduledWaste | null;
  dateReceived?: any | null;
  formNo?: string | null;
  customer?: Customer | null;
  status?: ScheduledWasteEnum | null;
  endorsedBy?: string | null;
  endorsedDate?: any | null;
  expiryDate?: any | null;
  additionalServices?: boolean | null;
  inventoryItems?: SOReportInventoryItem[] | null;
  additionalServiceRequired?: boolean | null;
}
export type InboundSoReportViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "inboundSoReport-view";
export type InboundSoReportView<
  V extends InboundSoReportViewName
> = V extends "_base"
  ? Pick<
      InboundSoReport,
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
      InboundSoReport,
      | "id"
      | "dateReceived"
      | "formNo"
      | "status"
      | "endorsedBy"
      | "endorsedDate"
      | "expiryDate"
    >
  : V extends "inboundSoReport-view"
  ? Pick<
      InboundSoReport,
      | "id"
      | "dateReceived"
      | "formNo"
      | "status"
      | "endorsedBy"
      | "endorsedDate"
      | "expiryDate"
      | "scheduledWaste"
      | "customer"
      | "inventoryItems"
    >
  : never;
