import { StandardEntity } from "./base/sys$StandardEntity";
import { ScheduledWasteUomEnum } from "../enums/enums";
import { AdditionalServices } from "./pbksb_AdditionalServices";
export class AdditionalServicesPacking extends StandardEntity {
  static NAME = "pbksb_AdditionalServicesPacking";
  quantity?: number | null;
  oum?: ScheduledWasteUomEnum | null;
  additionalServices?: AdditionalServices | null;
}
export type AdditionalServicesPackingViewName = "_base" | "_local" | "_minimal";
export type AdditionalServicesPackingView<
  V extends AdditionalServicesPackingViewName
> = V extends "_base"
  ? Pick<AdditionalServicesPacking, "id" | "quantity" | "oum">
  : V extends "_local"
  ? Pick<AdditionalServicesPacking, "id" | "quantity" | "oum">
  : never;
