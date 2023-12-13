import { StandardEntity } from "./base/sys$StandardEntity";
import { Site } from "./pbksb_Site";
import { ScheduledWaste } from "./pbksb_ScheduledWaste";
export class OutboundWasteDetails extends StandardEntity {
  static NAME = "pbksb_OutboundWasteDetails";
  palletId?: string | null;
  wasteCode?: string | null;
  quantity?: number | null;
  oum?: string | null;
  palletWeight?: any | null;
  location?: Site | null;
  expiryDate?: any | null;
  scheduledWaste?: ScheduledWaste | null;
}
export type OutboundWasteDetailsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "outboundWasteDetails-view";
export type OutboundWasteDetailsView<
  V extends OutboundWasteDetailsViewName
> = V extends "_base"
  ? Pick<
      OutboundWasteDetails,
      | "id"
      | "palletId"
      | "wasteCode"
      | "quantity"
      | "oum"
      | "palletWeight"
      | "expiryDate"
    >
  : V extends "_local"
  ? Pick<
      OutboundWasteDetails,
      | "id"
      | "palletId"
      | "wasteCode"
      | "quantity"
      | "oum"
      | "palletWeight"
      | "expiryDate"
    >
  : V extends "outboundWasteDetails-view"
  ? Pick<
      OutboundWasteDetails,
      | "id"
      | "palletId"
      | "wasteCode"
      | "quantity"
      | "oum"
      | "palletWeight"
      | "expiryDate"
      | "location"
    >
  : never;
