import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { Shifting, BerthID, BerthPosition, ChargeRate } from "../enums/enums";
export class BerthingInformation extends StandardEntity {
  static NAME = "pbksb_BerthingInformation";
  berth_form?: BerthForm | null;
  shifting?: Shifting | null;
  berth_id?: BerthID | null;
  position?: BerthPosition | null;
  charge_rate?: ChargeRate | null;
  alongside_datetime?: any | null;
  departure_datetime?: any | null;
  sort_ind?: number | null;
}
export type BerthingInformationViewName = "_base" | "_local" | "_minimal";
export type BerthingInformationView<
  V extends BerthingInformationViewName
> = V extends "_base"
  ? Pick<
      BerthingInformation,
      | "id"
      | "shifting"
      | "berth_id"
      | "position"
      | "charge_rate"
      | "alongside_datetime"
      | "departure_datetime"
      | "sort_ind"
    >
  : V extends "_local"
  ? Pick<
      BerthingInformation,
      | "id"
      | "shifting"
      | "berth_id"
      | "position"
      | "charge_rate"
      | "alongside_datetime"
      | "departure_datetime"
      | "sort_ind"
    >
  : never;
