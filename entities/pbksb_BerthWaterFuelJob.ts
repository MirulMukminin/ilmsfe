import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { BerthActualQty, MarineStatus, PrintStatus } from "../enums/enums";
import { BerthFuelWater } from "./pbksb_BerthFuelWater";
import { BerthWaterFuelJobDetails } from "./pbksb_BerthWaterFuelJobDetails";
export class BerthWaterFuelJob extends StandardEntity {
  static NAME = "pbksb_BerthWaterFuelJob";
  berth_form?: BerthForm | null;
  actual_quantity?: BerthActualQty | null;
  job_request_no?: string | null;
  status?: MarineStatus | null;
  job_ticket?: string | null;
  log_number?: string | null;
  remarks?: string | null;
  completion_date?: any | null;
  bod_number?: string | null;
  berth_fuelwater?: BerthFuelWater | null;
  print_status?: PrintStatus | null;
  endorsed_by?: string | null;
  endorsed_date?: any | null;
  cancelledBy?: string | null;
  cancelledDate?: any | null;
  job_details?: BerthWaterFuelJobDetails[] | null;
  comment?: string | null;
}
export type BerthWaterFuelJobViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthWaterFuelJob-view"
  | "berthWaterFuelJobTicket-view";
export type BerthWaterFuelJobView<
  V extends BerthWaterFuelJobViewName
> = V extends "_base"
  ? Pick<
      BerthWaterFuelJob,
      | "id"
      | "actual_quantity"
      | "job_request_no"
      | "status"
      | "job_ticket"
      | "log_number"
      | "remarks"
      | "completion_date"
      | "bod_number"
      | "print_status"
      | "endorsed_by"
      | "endorsed_date"
      | "cancelledBy"
      | "cancelledDate"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      BerthWaterFuelJob,
      | "id"
      | "actual_quantity"
      | "job_request_no"
      | "status"
      | "job_ticket"
      | "log_number"
      | "remarks"
      | "completion_date"
      | "bod_number"
      | "print_status"
      | "endorsed_by"
      | "endorsed_date"
      | "cancelledBy"
      | "cancelledDate"
      | "comment"
    >
  : V extends "berthWaterFuelJob-view"
  ? Pick<
      BerthWaterFuelJob,
      | "id"
      | "actual_quantity"
      | "job_request_no"
      | "status"
      | "job_ticket"
      | "log_number"
      | "remarks"
      | "completion_date"
      | "bod_number"
      | "print_status"
      | "endorsed_by"
      | "endorsed_date"
      | "cancelledBy"
      | "cancelledDate"
      | "comment"
      | "berth_fuelwater"
      | "berth_form"
    >
  : V extends "berthWaterFuelJobTicket-view"
  ? Pick<
      BerthWaterFuelJob,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "actual_quantity"
      | "job_request_no"
      | "status"
      | "job_ticket"
      | "log_number"
      | "remarks"
      | "completion_date"
      | "bod_number"
      | "print_status"
      | "endorsed_by"
      | "endorsed_date"
      | "cancelledBy"
      | "cancelledDate"
      | "comment"
      | "berth_fuelwater"
      | "berth_form"
      | "berth_form"
      | "berth_fuelwater"
    >
  : never;
