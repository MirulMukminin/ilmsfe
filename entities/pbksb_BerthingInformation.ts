import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { Shifting, BerthPosition, ChargeRate } from "../enums/enums";
import { Berth } from "./pbksb_Berth";
export class BerthingInformation extends StandardEntity {
  static NAME = "pbksb_BerthingInformation";
  berth_form?: BerthForm | null;
  total_price?: any | null;
  unit_price?: any | null;
  shifting?: Shifting | null;
  vessel_shifting?: string | null;
  berth_from?: Berth | null;
  berth_to?: Berth | null;
  position?: BerthPosition | null;
  charge_rate?: ChargeRate | null;
  alongside_datetime?: any | null;
  departure_datetime?: any | null;
  sort_ind?: number | null;
  duration?: number | null;
  usage?: any | null;
}
export type BerthingInformationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthingInformation-view";
export type BerthingInformationView<
  V extends BerthingInformationViewName
> = V extends "_base"
  ? Pick<
      BerthingInformation,
      | "id"
      | "total_price"
      | "unit_price"
      | "shifting"
      | "vessel_shifting"
      | "position"
      | "charge_rate"
      | "alongside_datetime"
      | "departure_datetime"
      | "sort_ind"
      | "duration"
      | "usage"
    >
  : V extends "_local"
  ? Pick<
      BerthingInformation,
      | "id"
      | "total_price"
      | "unit_price"
      | "shifting"
      | "vessel_shifting"
      | "position"
      | "charge_rate"
      | "alongside_datetime"
      | "departure_datetime"
      | "sort_ind"
      | "duration"
      | "usage"
    >
  : V extends "berthingInformation-view"
  ? Pick<
      BerthingInformation,
      | "id"
      | "total_price"
      | "unit_price"
      | "shifting"
      | "vessel_shifting"
      | "position"
      | "charge_rate"
      | "alongside_datetime"
      | "departure_datetime"
      | "sort_ind"
      | "duration"
      | "usage"
      | "berth_form"
      | "berth_from"
      | "berth_to"
    >
  : never;
