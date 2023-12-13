import { StandardEntity } from "./base/sys$StandardEntity";
import { Site } from "./pbksb_Site";
import { ScheduledWaste } from "./pbksb_ScheduledWaste";
import { Customer } from "./pbksb_Customer";
import { ScheduledWasteEnum } from "../enums/enums";
import { AdditionalServicesPacking } from "./pbksb_AdditionalServicesPacking";
import { AdditionalServicesNewPacking } from "./pbksb_AdditionalServicesNewPacking";
export class AdditionalServices extends StandardEntity {
  static NAME = "pbksb_AdditionalServices";
  formNo?: string | null;
  expiryDate?: any | null;
  location?: Site | null;
  reportFormNo?: string | null;
  scheduledWaste?: ScheduledWaste | null;
  customer?: Customer | null;
  date?: any | null;
  palletNum?: number | null;
  totalWeight?: any | null;
  totalUnitWeight?: any | null;
  drumCrushNo?: number | null;
  trips?: number | null;
  status?: ScheduledWasteEnum | null;
  inboundFormNo?: string | null;
  packingList?: AdditionalServicesPacking[] | null;
  newPackingList?: AdditionalServicesNewPacking[] | null;
  palletUnit?: number | null;
  drumUnit?: number | null;
  endorsedBy?: string | null;
  endorsedDate?: any | null;
}
export type AdditionalServicesViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "additionalServices-view";
export type AdditionalServicesView<
  V extends AdditionalServicesViewName
> = V extends "_base"
  ? Pick<
      AdditionalServices,
      | "id"
      | "formNo"
      | "expiryDate"
      | "reportFormNo"
      | "date"
      | "palletNum"
      | "totalWeight"
      | "totalUnitWeight"
      | "drumCrushNo"
      | "trips"
      | "status"
      | "inboundFormNo"
      | "palletUnit"
      | "drumUnit"
      | "endorsedBy"
      | "endorsedDate"
    >
  : V extends "_local"
  ? Pick<
      AdditionalServices,
      | "id"
      | "formNo"
      | "expiryDate"
      | "reportFormNo"
      | "date"
      | "palletNum"
      | "totalWeight"
      | "totalUnitWeight"
      | "drumCrushNo"
      | "trips"
      | "status"
      | "inboundFormNo"
      | "palletUnit"
      | "drumUnit"
      | "endorsedBy"
      | "endorsedDate"
    >
  : V extends "additionalServices-view"
  ? Pick<
      AdditionalServices,
      | "id"
      | "formNo"
      | "expiryDate"
      | "reportFormNo"
      | "date"
      | "palletNum"
      | "totalWeight"
      | "totalUnitWeight"
      | "drumCrushNo"
      | "trips"
      | "status"
      | "inboundFormNo"
      | "palletUnit"
      | "drumUnit"
      | "endorsedBy"
      | "endorsedDate"
      | "location"
      | "customer"
      | "packingList"
      | "scheduledWaste"
    >
  : never;
