import { StandardEntity } from "./base/sys$StandardEntity";
import { ScheduledWasteRateDetails } from "./pbksb_ScheduledWasteRateDetails";
export class ScheduledWasteRate extends StandardEntity {
  static NAME = "pbksb_ScheduledWasteRate";
  scopeOfServices?: string | null;
  scheduledWasteRateDetails?: ScheduledWasteRateDetails[] | null;
  description?: string | null;
}
export type ScheduledWasteRateViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "scheduledWasteRate-view";
export type ScheduledWasteRateView<
  V extends ScheduledWasteRateViewName
> = V extends "_base"
  ? Pick<ScheduledWasteRate, "id" | "description" | "scopeOfServices">
  : V extends "_local"
  ? Pick<ScheduledWasteRate, "id" | "scopeOfServices" | "description">
  : V extends "_minimal"
  ? Pick<ScheduledWasteRate, "id" | "description">
  : V extends "scheduledWasteRate-view"
  ? Pick<
      ScheduledWasteRate,
      "id" | "scopeOfServices" | "description" | "scheduledWasteRateDetails"
    >
  : never;
