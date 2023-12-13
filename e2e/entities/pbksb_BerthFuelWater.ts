import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { Supply, MarineStatus } from "../enums/enums";
export class BerthFuelWater extends StandardEntity {
  static NAME = "pbksb_BerthFuelWater";
  request_number?: string | null;
  date?: any | null;
  berth_form?: BerthForm | null;
  supply?: Supply | null;
  po_number?: string | null;
  booking_date?: any | null;
  remarks?: string | null;
  status?: MarineStatus | null;
  job_ticket?: string | null;
  update_cancelled_by?: string | null;
  update_cancelled_datetime?: any | null;
}
export type BerthFuelWaterViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthFuelWater-view"
  | "berthFuelWaterJob-view";
export type BerthFuelWaterView<
  V extends BerthFuelWaterViewName
> = V extends "_base"
  ? Pick<
      BerthFuelWater,
      | "id"
      | "request_number"
      | "date"
      | "supply"
      | "po_number"
      | "booking_date"
      | "remarks"
      | "status"
      | "job_ticket"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
    >
  : V extends "_local"
  ? Pick<
      BerthFuelWater,
      | "id"
      | "request_number"
      | "date"
      | "supply"
      | "po_number"
      | "booking_date"
      | "remarks"
      | "status"
      | "job_ticket"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
    >
  : V extends "berthFuelWater-view"
  ? Pick<
      BerthFuelWater,
      | "id"
      | "request_number"
      | "date"
      | "supply"
      | "po_number"
      | "booking_date"
      | "remarks"
      | "status"
      | "job_ticket"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "berth_form"
    >
  : V extends "berthFuelWaterJob-view"
  ? Pick<
      BerthFuelWater,
      | "id"
      | "request_number"
      | "date"
      | "supply"
      | "po_number"
      | "booking_date"
      | "remarks"
      | "status"
      | "job_ticket"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "berth_form"
    >
  : never;
