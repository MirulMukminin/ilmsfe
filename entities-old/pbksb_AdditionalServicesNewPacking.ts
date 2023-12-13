import { StandardEntity } from "./base/sys$StandardEntity";
import { ScheduledWasteUomEnum } from "../enums/enums";
import { AdditionalServices } from "./pbksb_AdditionalServices";
export class AdditionalServicesNewPacking extends StandardEntity {
  static NAME = "pbksb_AdditionalServicesNewPacking";
  quantity?: number | null;
  material?: ScheduledWasteUomEnum | null;
  additionalServices?: AdditionalServices | null;
}
export type AdditionalServicesNewPackingViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type AdditionalServicesNewPackingView<
  V extends AdditionalServicesNewPackingViewName
> = V extends "_base"
  ? Pick<AdditionalServicesNewPacking, "id" | "quantity" | "material">
  : V extends "_local"
  ? Pick<AdditionalServicesNewPacking, "id" | "quantity" | "material">
  : never;
