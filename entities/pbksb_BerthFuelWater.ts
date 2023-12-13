import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { Vessel } from "./pbksb_Vessel";
import { BerthForm } from "./pbksb_BerthForm";
import { Supply, BerthTerminal, MarineStatus } from "../enums/enums";
import { Berth } from "./pbksb_Berth";
import { BerthFuelWaterTank } from "./pbksb_BerthFuelWaterTank";
import { BerthWaterFuelJob } from "./pbksb_BerthWaterFuelJob";
import { BerthFuelWaterManpowerJob } from "./pbksb_BerthFuelWaterManpowerJob";
export class BerthFuelWater extends StandardEntity {
  static NAME = "pbksb_BerthFuelWater";
  request_number?: string | null;
  requested_by?: string | null;
  request_by_company?: Customer | null;
  request_on_behalf?: Customer | null;
  company?: Customer | null;
  vessel?: Vessel | null;
  bod_number?: string | null;
  log_number?: string | null;
  berth_form?: BerthForm | null;
  job_request_no?: string | null;
  request_date?: any | null;
  supply?: Supply | null;
  location?: string | null;
  terminal?: BerthTerminal | null;
  terminalBerth?: Berth | null;
  po_number?: string | null;
  booking_date?: any | null;
  est_arrival?: any | null;
  est_departure?: any | null;
  berth_request_number?: string | null;
  remarks?: string | null;
  status?: MarineStatus | null;
  job_ticket?: string | null;
  update_cancelled_by?: string | null;
  update_cancelled_datetime?: any | null;
  endorsed_by?: string | null;
  endorsed_date?: any | null;
  indicator?: boolean | null;
  comment?: string | null;
  water_tank?: BerthFuelWaterTank[] | null;
  job?: BerthWaterFuelJob[] | null;
  fuelwater_manpower?: BerthFuelWaterManpowerJob[] | null;
  isStandalone?: boolean | null;
}
export type BerthFuelWaterViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthFuelWater-vesselListview"
  | "berthFuelWater-view_Summary"
  | "berthFuelWaterEmail-view"
  | "berthFuelWaterJob-view"
  | "berthFuelWaterStandalone-view"
  | "berth_WaterFuel_Id-view"
  | "berth_WaterFuel_Id-view_Summary";
export type BerthFuelWaterView<
  V extends BerthFuelWaterViewName
> = V extends "_base"
  ? Pick<
      BerthFuelWater,
      | "id"
      | "request_number"
      | "requested_by"
      | "bod_number"
      | "log_number"
      | "job_request_no"
      | "request_date"
      | "supply"
      | "location"
      | "terminal"
      | "po_number"
      | "booking_date"
      | "est_arrival"
      | "est_departure"
      | "berth_request_number"
      | "remarks"
      | "status"
      | "job_ticket"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "endorsed_by"
      | "endorsed_date"
      | "indicator"
      | "comment"
      | "isStandalone"
    >
  : V extends "_local"
  ? Pick<
      BerthFuelWater,
      | "id"
      | "request_number"
      | "requested_by"
      | "bod_number"
      | "log_number"
      | "job_request_no"
      | "request_date"
      | "supply"
      | "location"
      | "terminal"
      | "po_number"
      | "booking_date"
      | "est_arrival"
      | "est_departure"
      | "berth_request_number"
      | "remarks"
      | "status"
      | "job_ticket"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "endorsed_by"
      | "endorsed_date"
      | "indicator"
      | "comment"
      | "isStandalone"
    >
  : V extends "berthFuelWater-vesselListview"
  ? Pick<
      BerthFuelWater,
      | "id"
      | "request_number"
      | "requested_by"
      | "bod_number"
      | "log_number"
      | "job_request_no"
      | "request_date"
      | "supply"
      | "location"
      | "terminal"
      | "po_number"
      | "booking_date"
      | "est_arrival"
      | "est_departure"
      | "berth_request_number"
      | "remarks"
      | "status"
      | "job_ticket"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "endorsed_by"
      | "endorsed_date"
      | "indicator"
      | "comment"
      | "isStandalone"
      | "water_tank"
      | "vessel"
      | "company"
      | "berth_form"
    >
  : V extends "berthFuelWater-view_Summary"
  ? Pick<
      BerthFuelWater,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "request_number"
      | "requested_by"
      | "bod_number"
      | "log_number"
      | "job_request_no"
      | "request_date"
      | "supply"
      | "location"
      | "terminal"
      | "po_number"
      | "booking_date"
      | "est_arrival"
      | "est_departure"
      | "berth_request_number"
      | "remarks"
      | "status"
      | "job_ticket"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "endorsed_by"
      | "endorsed_date"
      | "indicator"
      | "comment"
      | "isStandalone"
      | "berth_form"
    >
  : V extends "berthFuelWaterEmail-view"
  ? Pick<
      BerthFuelWater,
      | "id"
      | "request_number"
      | "requested_by"
      | "bod_number"
      | "log_number"
      | "job_request_no"
      | "request_date"
      | "supply"
      | "location"
      | "terminal"
      | "po_number"
      | "booking_date"
      | "est_arrival"
      | "est_departure"
      | "berth_request_number"
      | "remarks"
      | "status"
      | "job_ticket"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "endorsed_by"
      | "endorsed_date"
      | "indicator"
      | "comment"
      | "isStandalone"
      | "company"
    >
  : V extends "berthFuelWaterJob-view"
  ? Pick<
      BerthFuelWater,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "request_number"
      | "requested_by"
      | "bod_number"
      | "log_number"
      | "job_request_no"
      | "request_date"
      | "supply"
      | "location"
      | "terminal"
      | "po_number"
      | "booking_date"
      | "est_arrival"
      | "est_departure"
      | "berth_request_number"
      | "remarks"
      | "status"
      | "job_ticket"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "endorsed_by"
      | "endorsed_date"
      | "indicator"
      | "comment"
      | "isStandalone"
      | "berth_form"
      | "request_on_behalf"
      | "request_by_company"
      | "terminalBerth"
    >
  : V extends "berthFuelWaterStandalone-view"
  ? Pick<
      BerthFuelWater,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "request_number"
      | "requested_by"
      | "bod_number"
      | "log_number"
      | "job_request_no"
      | "request_date"
      | "supply"
      | "location"
      | "terminal"
      | "po_number"
      | "booking_date"
      | "est_arrival"
      | "est_departure"
      | "berth_request_number"
      | "remarks"
      | "status"
      | "job_ticket"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "endorsed_by"
      | "endorsed_date"
      | "indicator"
      | "comment"
      | "isStandalone"
      | "company"
      | "vessel"
      | "request_on_behalf"
      | "request_by_company"
      | "job"
    >
  : V extends "berth_WaterFuel_Id-view"
  ? Pick<
      BerthFuelWater,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "request_number"
      | "requested_by"
      | "bod_number"
      | "log_number"
      | "job_request_no"
      | "request_date"
      | "supply"
      | "location"
      | "terminal"
      | "po_number"
      | "booking_date"
      | "est_arrival"
      | "est_departure"
      | "berth_request_number"
      | "remarks"
      | "status"
      | "job_ticket"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "endorsed_by"
      | "endorsed_date"
      | "indicator"
      | "comment"
      | "isStandalone"
      | "berth_form"
      | "request_on_behalf"
      | "request_by_company"
      | "vessel"
      | "company"
    >
  : V extends "berth_WaterFuel_Id-view_Summary"
  ? Pick<
      BerthFuelWater,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "request_number"
      | "requested_by"
      | "bod_number"
      | "log_number"
      | "job_request_no"
      | "request_date"
      | "supply"
      | "location"
      | "terminal"
      | "po_number"
      | "booking_date"
      | "est_arrival"
      | "est_departure"
      | "berth_request_number"
      | "remarks"
      | "status"
      | "job_ticket"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "endorsed_by"
      | "endorsed_date"
      | "indicator"
      | "comment"
      | "isStandalone"
      | "request_by_company"
    >
  : never;
