import { StandardEntity } from "./base/sys$StandardEntity";
import { ScheduledWasteUomEnum, ScheduledWasteEnum } from "../enums/enums";
import { Site } from "./pbksb_Site";
import { ScheduledWaste } from "./pbksb_ScheduledWaste";
export class InboundWasteDetails extends StandardEntity {
  static NAME = "pbksb_InboundWasteDetails";
  wasteCode?: string | null;
  oum?: ScheduledWasteUomEnum | null;
  location?: Site | null;
  quantity?: number | null;
  time?: any | null;
  scheduledWaste?: ScheduledWaste | null;
  status?: ScheduledWasteEnum | null;
  weight?: any | null;
}
export type InboundWasteDetailsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "inboundWasteDetails-view";
export type InboundWasteDetailsView<
  V extends InboundWasteDetailsViewName
> = V extends "_base"
  ? Pick<
      InboundWasteDetails,
      "id" | "wasteCode" | "oum" | "quantity" | "time" | "status" | "weight"
    >
  : V extends "_local"
  ? Pick<
      InboundWasteDetails,
      "id" | "wasteCode" | "oum" | "quantity" | "time" | "status" | "weight"
    >
  : V extends "inboundWasteDetails-view"
  ? Pick<
      InboundWasteDetails,
      | "id"
      | "wasteCode"
      | "oum"
      | "quantity"
      | "time"
      | "status"
      | "weight"
      | "location"
    >
  : never;
