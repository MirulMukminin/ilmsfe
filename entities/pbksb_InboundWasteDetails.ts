import { StandardEntity } from "./base/sys$StandardEntity";
import { ScheduledWasteUomEnum, ScheduledWasteEnum } from "../enums/enums";
import { Site } from "./pbksb_Site";
import { ScheduledWaste } from "./pbksb_ScheduledWaste";
export class InboundWasteDetails extends StandardEntity {
  static NAME = "pbksb_InboundWasteDetails";
  oum?: ScheduledWasteUomEnum | null;
  location?: Site | null;
  quantity?: number | null;
  time?: any | null;
  scheduledWaste?: ScheduledWaste | null;
  status?: ScheduledWasteEnum | null;
  weight?: any | null;
  wasteCode?: string | null;
  wasteDescription?: string | null;
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
      "id" | "oum" | "quantity" | "time" | "status" | "weight" | "wasteCode"
    >
  : V extends "_local"
  ? Pick<
      InboundWasteDetails,
      "id" | "oum" | "quantity" | "time" | "status" | "weight" | "wasteCode"
    >
  : V extends "inboundWasteDetails-view"
  ? Pick<
      InboundWasteDetails,
      | "id"
      | "oum"
      | "quantity"
      | "time"
      | "status"
      | "weight"
      | "wasteCode"
      | "location"
      | "scheduledWaste"
    >
  : never;
