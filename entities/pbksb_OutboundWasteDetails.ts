import { StandardEntity } from "./base/sys$StandardEntity";
import { ScheduledWasteUomEnum } from "../enums/enums";
import { Site } from "./pbksb_Site";
import { ScheduledWaste } from "./pbksb_ScheduledWaste";
export class OutboundWasteDetails extends StandardEntity {
  static NAME = "pbksb_OutboundWasteDetails";
  palletId?: string | null;
  dateReceived?: any | null;
  wasteCode?: string | null;
  quantity?: number | null;
  oum?: ScheduledWasteUomEnum | null;
  palletWeight?: any | null;
  location?: Site | null;
  expiryDate?: any | null;
  scheduledWaste?: ScheduledWaste | null;
  packagingId?: string | null;
  packagingWeight?: any | null;
  revisePackageQty?: number | null;
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
      | "packagingId"
      | "packagingWeight"
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
      | "packagingId"
      | "packagingWeight"
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
      | "packagingId"
      | "packagingWeight"
      | "location"
      | "dateReceived"
      | "scheduledWaste"
    >
  : never;
