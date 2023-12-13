import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthWaterFuelJob } from "./pbksb_BerthWaterFuelJob";
import { MarineServiceCode } from "../enums/enums";
export class BerthWaterFuelJobDetails extends StandardEntity {
  static NAME = "pbksb_BerthWaterFuelJobDetails";
  water_fuel_job?: BerthWaterFuelJob | null;
  custom_id?: string | null;
  full_tank?: boolean | null;
  remarks?: string | null;
  service_code?: MarineServiceCode | null;
  operators?: string | null;
  request_quantity?: any | null;
  actual_quantity_in?: any | null;
  actual_quantity_out?: any | null;
  request_time?: any | null;
  session1_start?: any | null;
  session1_end?: any | null;
  session2_start?: any | null;
  session2_end?: any | null;
  session3_start?: any | null;
  session3_end?: any | null;
  session1_hours?: any | null;
  session2_hours?: any | null;
  session3_hours?: any | null;
}
export type BerthWaterFuelJobDetailsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthWaterFuelJobDetails-view";
export type BerthWaterFuelJobDetailsView<
  V extends BerthWaterFuelJobDetailsViewName
> = V extends "_base"
  ? Pick<
      BerthWaterFuelJobDetails,
      | "id"
      | "custom_id"
      | "full_tank"
      | "remarks"
      | "service_code"
      | "operators"
      | "request_quantity"
      | "actual_quantity_in"
      | "actual_quantity_out"
      | "request_time"
      | "session1_start"
      | "session1_end"
      | "session2_start"
      | "session2_end"
      | "session3_start"
      | "session3_end"
      | "session1_hours"
      | "session2_hours"
      | "session3_hours"
    >
  : V extends "_local"
  ? Pick<
      BerthWaterFuelJobDetails,
      | "id"
      | "custom_id"
      | "full_tank"
      | "remarks"
      | "service_code"
      | "operators"
      | "request_quantity"
      | "actual_quantity_in"
      | "actual_quantity_out"
      | "request_time"
      | "session1_start"
      | "session1_end"
      | "session2_start"
      | "session2_end"
      | "session3_start"
      | "session3_end"
      | "session1_hours"
      | "session2_hours"
      | "session3_hours"
    >
  : V extends "berthWaterFuelJobDetails-view"
  ? Pick<
      BerthWaterFuelJobDetails,
      | "id"
      | "custom_id"
      | "full_tank"
      | "remarks"
      | "service_code"
      | "operators"
      | "request_quantity"
      | "actual_quantity_in"
      | "actual_quantity_out"
      | "request_time"
      | "session1_start"
      | "session1_end"
      | "session2_start"
      | "session2_end"
      | "session3_start"
      | "session3_end"
      | "session1_hours"
      | "session2_hours"
      | "session3_hours"
    >
  : never;
