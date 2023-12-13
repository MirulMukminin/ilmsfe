import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthFuelWater } from "./pbksb_BerthFuelWater";
import { BerthWaterFuelJob } from "./pbksb_BerthWaterFuelJob";
import { BerthWaterFuelJobDetails } from "./pbksb_BerthWaterFuelJobDetails";
import { MarineStatus, Tank } from "../enums/enums";
export class BerthFuelWaterTank extends StandardEntity {
  static NAME = "pbksb_BerthFuelWaterTank";
  fuel_water?: BerthFuelWater | null;
  fuel_water_job?: BerthWaterFuelJob | null;
  fuel_water_job_details?: BerthWaterFuelJobDetails | null;
  status?: MarineStatus | null;
  usage?: any | null;
  tank?: Tank | null;
  full_tank?: boolean | null;
  weight?: any | null;
  indicator?: boolean | null;
  start_time?: any | null;
}
export type BerthFuelWaterTankViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthFuelWaterTank-view";
export type BerthFuelWaterTankView<
  V extends BerthFuelWaterTankViewName
> = V extends "_base"
  ? Pick<
      BerthFuelWaterTank,
      | "id"
      | "status"
      | "usage"
      | "tank"
      | "full_tank"
      | "weight"
      | "indicator"
      | "start_time"
    >
  : V extends "_local"
  ? Pick<
      BerthFuelWaterTank,
      | "id"
      | "status"
      | "usage"
      | "tank"
      | "full_tank"
      | "weight"
      | "indicator"
      | "start_time"
    >
  : V extends "berthFuelWaterTank-view"
  ? Pick<
      BerthFuelWaterTank,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "status"
      | "usage"
      | "tank"
      | "full_tank"
      | "weight"
      | "indicator"
      | "start_time"
      | "fuel_water_job"
      | "fuel_water"
      | "fuel_water_job_details"
    >
  : never;
