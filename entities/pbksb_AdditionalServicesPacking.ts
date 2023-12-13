import { StandardEntity } from "./base/sys$StandardEntity";
import { ScheduledWasteRepackagingType } from "../enums/enums";
import { AdditionalServices } from "./pbksb_AdditionalServices";
export class AdditionalServicesPacking extends StandardEntity {
  static NAME = "pbksb_AdditionalServicesPacking";
  quantity?: number | null;
  remarks?: string | null;
  unitPrice?: any | null;
  amount?: any | null;
  oum?: ScheduledWasteRepackagingType | null;
  additionalServices?: AdditionalServices | null;
  activity?: string | null;
}
export type AdditionalServicesPackingViewName = "_base" | "_local" | "_minimal";
export type AdditionalServicesPackingView<
  V extends AdditionalServicesPackingViewName
> = V extends "_base"
  ? Pick<
      AdditionalServicesPacking,
      | "id"
      | "quantity"
      | "remarks"
      | "unitPrice"
      | "amount"
      | "oum"
      | "activity"
    >
  : V extends "_local"
  ? Pick<
      AdditionalServicesPacking,
      | "id"
      | "quantity"
      | "remarks"
      | "unitPrice"
      | "amount"
      | "oum"
      | "activity"
    >
  : never;
