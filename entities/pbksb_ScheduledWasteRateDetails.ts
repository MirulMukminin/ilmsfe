import { StandardEntity } from "./base/sys$StandardEntity";
import { ScheduledWasteRate } from "./pbksb_ScheduledWasteRate";
import { ScheduledWasteUOM } from "../enums/enums";
export class ScheduledWasteRateDetails extends StandardEntity {
  static NAME = "pbksb_ScheduledWasteRateDetails";
  scheduledWasteRate?: ScheduledWasteRate | null;
  rate?: any | null;
  unit?: ScheduledWasteUOM | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type ScheduledWasteRateDetailsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "scheduledWasteRateDetails-view";
export type ScheduledWasteRateDetailsView<
  V extends ScheduledWasteRateDetailsViewName
> = V extends "_base"
  ? Pick<
      ScheduledWasteRateDetails,
      "id" | "rate" | "unit" | "startDate" | "endDate"
    >
  : V extends "_local"
  ? Pick<
      ScheduledWasteRateDetails,
      "id" | "rate" | "unit" | "startDate" | "endDate"
    >
  : V extends "scheduledWasteRateDetails-view"
  ? Pick<
      ScheduledWasteRateDetails,
      "id" | "rate" | "unit" | "startDate" | "endDate" | "scheduledWasteRate"
    >
  : never;
