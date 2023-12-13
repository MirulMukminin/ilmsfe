import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthFuelWater } from "./pbksb_BerthFuelWater";
import { BerthWaterFuelJobDetails } from "./pbksb_BerthWaterFuelJobDetails";
import { MachineryPositionHandling } from "./pbksb_MachineryPositionHandling";
import { PriceSchedule } from "./pbksb_PriceSchedule";
import { RateCode } from "../enums/enums";
export class BerthFuelWaterManpowerJob extends StandardEntity {
  static NAME = "pbksb_BerthFuelWaterManpowerJob";
  fuel_water?: BerthFuelWater | null;
  fuel_water_job_details?: BerthWaterFuelJobDetails | null;
  manpower?: MachineryPositionHandling | null;
  price?: PriceSchedule | null;
  manpower_qty?: any | null;
  hours?: any | null;
  unit_price?: any | null;
  ratecode?: RateCode | null;
  object_id?: string | null;
  totalPrice?: any | null;
}
export type BerthFuelWaterManpowerJobViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthFuelWaterManpowerJob-view";
export type BerthFuelWaterManpowerJobView<
  V extends BerthFuelWaterManpowerJobViewName
> = V extends "_base"
  ? Pick<
      BerthFuelWaterManpowerJob,
      | "id"
      | "manpower_qty"
      | "hours"
      | "unit_price"
      | "ratecode"
      | "object_id"
      | "totalPrice"
    >
  : V extends "_local"
  ? Pick<
      BerthFuelWaterManpowerJob,
      | "id"
      | "manpower_qty"
      | "hours"
      | "unit_price"
      | "ratecode"
      | "object_id"
      | "totalPrice"
    >
  : V extends "berthFuelWaterManpowerJob-view"
  ? Pick<
      BerthFuelWaterManpowerJob,
      | "id"
      | "manpower_qty"
      | "hours"
      | "unit_price"
      | "ratecode"
      | "object_id"
      | "totalPrice"
      | "fuel_water_job_details"
    >
  : never;
