import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { MarineStatus, CancellationType } from "../enums/enums";
export class BerthMobile extends StandardEntity {
  static NAME = "pbksb_BerthMobile";
  berth_form?: BerthForm | null;
  time_completed?: any | null;
  remarks?: string | null;
  quantity?: any | null;
  name?: string | null;
  status?: MarineStatus | null;
  request_date?: any | null;
  request_no?: string | null;
  job_ticket_no?: string | null;
  cancellation_type?: CancellationType | null;
  service_type?: string | null;
  request_by?: string | null;
}
export type BerthMobileViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthMobileDetails-view";
export type BerthMobileView<V extends BerthMobileViewName> = V extends "_base"
  ? Pick<
      BerthMobile,
      | "id"
      | "name"
      | "time_completed"
      | "remarks"
      | "quantity"
      | "status"
      | "request_date"
      | "request_no"
      | "job_ticket_no"
      | "cancellation_type"
      | "service_type"
      | "request_by"
    >
  : V extends "_local"
  ? Pick<
      BerthMobile,
      | "id"
      | "time_completed"
      | "remarks"
      | "quantity"
      | "name"
      | "status"
      | "request_date"
      | "request_no"
      | "job_ticket_no"
      | "cancellation_type"
      | "service_type"
      | "request_by"
    >
  : V extends "_minimal"
  ? Pick<BerthMobile, "id" | "name">
  : V extends "berthMobileDetails-view"
  ? Pick<
      BerthMobile,
      | "id"
      | "time_completed"
      | "remarks"
      | "quantity"
      | "name"
      | "status"
      | "request_date"
      | "request_no"
      | "job_ticket_no"
      | "cancellation_type"
      | "service_type"
      | "request_by"
      | "berth_form"
    >
  : never;
