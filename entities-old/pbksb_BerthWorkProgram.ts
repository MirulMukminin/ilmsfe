import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { MarineStatus, WorkProgram } from "../enums/enums";
export class BerthWorkProgram extends StandardEntity {
  static NAME = "pbksb_BerthWorkProgram";
  berth_form?: BerthForm | null;
  date?: any | null;
  indicator?: boolean | null;
  update_cancelled_datetime?: any | null;
  job_ticket?: string | null;
  booking_date?: any | null;
  bo?: number | null;
  start_time?: any | null;
  end_time?: any | null;
  status?: MarineStatus | null;
  work_program?: WorkProgram | null;
  request?: boolean | null;
  remarks?: string | null;
  sort_ind?: number | null;
}
export type BerthWorkProgramViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthWorkProgram-view";
export type BerthWorkProgramView<
  V extends BerthWorkProgramViewName
> = V extends "_base"
  ? Pick<
      BerthWorkProgram,
      | "id"
      | "work_program"
      | "date"
      | "indicator"
      | "update_cancelled_datetime"
      | "job_ticket"
      | "booking_date"
      | "bo"
      | "start_time"
      | "end_time"
      | "status"
      | "request"
      | "remarks"
      | "sort_ind"
    >
  : V extends "_local"
  ? Pick<
      BerthWorkProgram,
      | "id"
      | "date"
      | "indicator"
      | "update_cancelled_datetime"
      | "job_ticket"
      | "booking_date"
      | "bo"
      | "start_time"
      | "end_time"
      | "status"
      | "work_program"
      | "request"
      | "remarks"
      | "sort_ind"
    >
  : V extends "_minimal"
  ? Pick<BerthWorkProgram, "id" | "work_program">
  : V extends "berthWorkProgram-view"
  ? Pick<
      BerthWorkProgram,
      | "id"
      | "date"
      | "indicator"
      | "update_cancelled_datetime"
      | "job_ticket"
      | "booking_date"
      | "bo"
      | "start_time"
      | "end_time"
      | "status"
      | "work_program"
      | "request"
      | "remarks"
      | "sort_ind"
      | "berth_form"
    >
  : never;
