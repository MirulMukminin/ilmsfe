import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { MarineStatus } from "../enums/enums";
import { BerthFuelWater } from "./pbksb_BerthFuelWater";
export class BerthWaterFuelJob extends StandardEntity {
  static NAME = "pbksb_BerthWaterFuelJob";
  berth_form?: BerthForm | null;
  status?: MarineStatus | null;
  job_ticket?: string | null;
  log_number?: string | null;
  remarks?: string | null;
  completion_date?: any | null;
  bod_number?: string | null;
  berth_fuelwater?: BerthFuelWater | null;
}
export type BerthWaterFuelJobViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthWaterFuelJob-view";
export type BerthWaterFuelJobView<
  V extends BerthWaterFuelJobViewName
> = V extends "_base"
  ? Pick<
      BerthWaterFuelJob,
      | "id"
      | "status"
      | "job_ticket"
      | "log_number"
      | "remarks"
      | "completion_date"
      | "bod_number"
    >
  : V extends "_local"
  ? Pick<
      BerthWaterFuelJob,
      | "id"
      | "status"
      | "job_ticket"
      | "log_number"
      | "remarks"
      | "completion_date"
      | "bod_number"
    >
  : V extends "berthWaterFuelJob-view"
  ? Pick<
      BerthWaterFuelJob,
      | "id"
      | "status"
      | "job_ticket"
      | "log_number"
      | "remarks"
      | "completion_date"
      | "bod_number"
      | "berth_form"
      | "berth_fuelwater"
    >
  : never;
