import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { PriceSchedule } from "./pbksb_PriceSchedule";
import { UOM } from "../enums/enums";
export class BerthAdditionalServices extends StandardEntity {
  static NAME = "pbksb_BerthAdditionalServices";
  berth_form?: BerthForm | null;
  sort_ind?: number | null;
  service?: PriceSchedule | null;
  duration?: any | null;
  unit?: any | null;
  uom?: UOM | null;
  unit_price?: any | null;
  total_price?: any | null;
  start_time?: any | null;
  end_time?: any | null;
  indicator?: boolean | null;
  remarks?: string | null;
  operation?: string | null;
  price?: any | null;
}
export type BerthAdditionalServicesViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthAdditionalServices-view";
export type BerthAdditionalServicesView<
  V extends BerthAdditionalServicesViewName
> = V extends "_base"
  ? Pick<
      BerthAdditionalServices,
      | "id"
      | "sort_ind"
      | "duration"
      | "unit"
      | "uom"
      | "unit_price"
      | "total_price"
      | "start_time"
      | "end_time"
      | "indicator"
      | "remarks"
      | "operation"
      | "price"
    >
  : V extends "_local"
  ? Pick<
      BerthAdditionalServices,
      | "id"
      | "sort_ind"
      | "duration"
      | "unit"
      | "uom"
      | "unit_price"
      | "total_price"
      | "start_time"
      | "end_time"
      | "indicator"
      | "remarks"
      | "operation"
      | "price"
    >
  : V extends "berthAdditionalServices-view"
  ? Pick<
      BerthAdditionalServices,
      | "id"
      | "sort_ind"
      | "duration"
      | "unit"
      | "uom"
      | "unit_price"
      | "total_price"
      | "start_time"
      | "end_time"
      | "indicator"
      | "remarks"
      | "operation"
      | "price"
      | "berth_form"
      | "service"
    >
  : never;
