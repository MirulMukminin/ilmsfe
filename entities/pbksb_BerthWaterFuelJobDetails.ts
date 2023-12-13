import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { BerthWaterFuelJob } from "./pbksb_BerthWaterFuelJob";
import { BerthFuelWaterTank } from "./pbksb_BerthFuelWaterTank";
import { Tank, FullTank, MarineServiceCode } from "../enums/enums";
export class BerthWaterFuelJobDetails extends StandardEntity {
  static NAME = "pbksb_BerthWaterFuelJobDetails";
  berth_form?: BerthForm | null;
  water_fuel_job?: BerthWaterFuelJob | null;
  berthFuelWaterTank?: BerthFuelWaterTank | null;
  sort_ind?: number | null;
  unit?: any | null;
  unit_price?: any | null;
  total_price?: any | null;
  custom_id?: string | null;
  item?: Tank | null;
  full_tank?: boolean | null;
  full_tank_report?: FullTank | null;
  remarks?: string | null;
  service_code?: MarineServiceCode | null;
  operators?: string | null;
  request_quantity?: any | null;
  actual_quantity_in?: any | null;
  actual_quantity_in_tonnes?: any | null;
  actual_quantity_out?: any | null;
  actual_quantity_out_tonnes?: any | null;
  actual_datetime?: any | null;
  request_time?: any | null;
  session1_start?: any | null;
  session1_end?: any | null;
  session2_start?: any | null;
  session2_end?: any | null;
  session3_start?: any | null;
  session3_end?: any | null;
  session4_start?: any | null;
  session4_end?: any | null;
  total_hours?: any | null;
  session4_hours?: any | null;
  session1_hours?: any | null;
  session2_hours?: any | null;
  session3_hours?: any | null;
  price?: any | null;
  actualQuantityIn_T?: any | null;
  actualQuantityOut_T?: any | null;
  actualTotalQuantity_T?: any | null;
}
export type BerthWaterFuelJobDetailsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthWaterFuelJobDetails-VesselListView"
  | "berthWaterFuelJobDetails-view"
  | "berthWaterFuelJobDetailsChargers-view";
export type BerthWaterFuelJobDetailsView<
  V extends BerthWaterFuelJobDetailsViewName
> = V extends "_base"
  ? Pick<
      BerthWaterFuelJobDetails,
      | "id"
      | "sort_ind"
      | "unit"
      | "unit_price"
      | "total_price"
      | "custom_id"
      | "item"
      | "full_tank"
      | "full_tank_report"
      | "remarks"
      | "service_code"
      | "operators"
      | "request_quantity"
      | "actual_quantity_in"
      | "actual_quantity_in_tonnes"
      | "actual_quantity_out"
      | "actual_quantity_out_tonnes"
      | "actual_datetime"
      | "request_time"
      | "session1_start"
      | "session1_end"
      | "session2_start"
      | "session2_end"
      | "session3_start"
      | "session3_end"
      | "session4_start"
      | "session4_end"
      | "session4_hours"
      | "session1_hours"
      | "session2_hours"
      | "session3_hours"
      | "price"
      | "actualQuantityIn_T"
      | "actualQuantityOut_T"
      | "actualTotalQuantity_T"
    >
  : V extends "_local"
  ? Pick<
      BerthWaterFuelJobDetails,
      | "id"
      | "sort_ind"
      | "unit"
      | "unit_price"
      | "total_price"
      | "custom_id"
      | "item"
      | "full_tank"
      | "full_tank_report"
      | "remarks"
      | "service_code"
      | "operators"
      | "request_quantity"
      | "actual_quantity_in"
      | "actual_quantity_in_tonnes"
      | "actual_quantity_out"
      | "actual_quantity_out_tonnes"
      | "actual_datetime"
      | "request_time"
      | "session1_start"
      | "session1_end"
      | "session2_start"
      | "session2_end"
      | "session3_start"
      | "session3_end"
      | "session4_start"
      | "session4_end"
      | "session4_hours"
      | "session1_hours"
      | "session2_hours"
      | "session3_hours"
      | "price"
      | "actualQuantityIn_T"
      | "actualQuantityOut_T"
      | "actualTotalQuantity_T"
    >
  : V extends "berthWaterFuelJobDetails-VesselListView"
  ? Pick<
      BerthWaterFuelJobDetails,
      | "id"
      | "water_fuel_job"
      | "total_hours"
      | "berthFuelWaterTank"
      | "berth_form"
      | "sort_ind"
      | "unit"
      | "unit_price"
      | "total_price"
      | "custom_id"
      | "item"
      | "full_tank"
      | "full_tank_report"
      | "remarks"
      | "service_code"
      | "operators"
      | "request_quantity"
      | "actual_quantity_in"
      | "actual_quantity_in_tonnes"
      | "actual_quantity_out"
      | "actual_quantity_out_tonnes"
      | "actual_datetime"
      | "request_time"
      | "session1_start"
      | "session1_end"
      | "session2_start"
      | "session2_end"
      | "session3_start"
      | "session3_end"
      | "session4_start"
      | "session4_end"
      | "session1_hours"
      | "session2_hours"
      | "session3_hours"
      | "session4_hours"
      | "price"
      | "actualQuantityIn_T"
      | "actualQuantityOut_T"
      | "actualTotalQuantity_T"
      | "item"
      | "actualTotalQuantity_T"
      | "actualQuantityOut_T"
      | "sort_ind"
      | "unit"
      | "unit_price"
      | "total_price"
      | "custom_id"
      | "full_tank"
      | "full_tank_report"
      | "remarks"
      | "service_code"
      | "operators"
      | "request_quantity"
      | "actual_quantity_in"
      | "actual_quantity_in_tonnes"
      | "actual_quantity_out"
      | "actual_quantity_out_tonnes"
      | "actual_datetime"
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
      | "price"
      | "actualQuantityIn_T"
      | "water_fuel_job"
    >
  : V extends "berthWaterFuelJobDetails-view"
  ? Pick<
      BerthWaterFuelJobDetails,
      | "id"
      | "water_fuel_job"
      | "total_hours"
      | "berthFuelWaterTank"
      | "berth_form"
      | "sort_ind"
      | "unit"
      | "unit_price"
      | "total_price"
      | "custom_id"
      | "item"
      | "full_tank"
      | "full_tank_report"
      | "remarks"
      | "service_code"
      | "operators"
      | "request_quantity"
      | "actual_quantity_in"
      | "actual_quantity_in_tonnes"
      | "actual_quantity_out"
      | "actual_quantity_out_tonnes"
      | "actual_datetime"
      | "request_time"
      | "session1_start"
      | "session1_end"
      | "session2_start"
      | "session2_end"
      | "session3_start"
      | "session3_end"
      | "session4_start"
      | "session4_end"
      | "session1_hours"
      | "session2_hours"
      | "session3_hours"
      | "session4_hours"
      | "price"
      | "actualQuantityIn_T"
      | "actualQuantityOut_T"
      | "actualTotalQuantity_T"
    >
  : V extends "berthWaterFuelJobDetailsChargers-view"
  ? Pick<
      BerthWaterFuelJobDetails,
      | "id"
      | "sort_ind"
      | "unit"
      | "unit_price"
      | "total_price"
      | "custom_id"
      | "item"
      | "full_tank"
      | "full_tank_report"
      | "remarks"
      | "service_code"
      | "operators"
      | "request_quantity"
      | "actual_quantity_in"
      | "actual_quantity_in_tonnes"
      | "actual_quantity_out"
      | "actual_quantity_out_tonnes"
      | "actual_datetime"
      | "request_time"
      | "session1_start"
      | "session1_end"
      | "session2_start"
      | "session2_end"
      | "session3_start"
      | "session3_end"
      | "session4_start"
      | "session4_end"
      | "session4_hours"
      | "session1_hours"
      | "session2_hours"
      | "session3_hours"
      | "price"
      | "actualQuantityIn_T"
      | "actualQuantityOut_T"
      | "actualTotalQuantity_T"
      | "water_fuel_job"
      | "berth_form"
      | "total_hours"
      | "berthFuelWaterTank"
    >
  : never;
