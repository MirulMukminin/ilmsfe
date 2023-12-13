import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthWharfage } from "./pbksb_BerthWharfage";
import { WorkProgram, MarineStatus } from "../enums/enums";
export class WharfageWorkProgram extends StandardEntity {
  static NAME = "pbksb_WharfageWorkProgram";
  wharfage_id?: BerthWharfage | null;
  unit?: any | null;
  start_time?: any | null;
  end_time?: any | null;
  request?: boolean | null;
  work_program?: WorkProgram | null;
  operation?: any | null;
  status?: MarineStatus | null;
  remarks?: string | null;
  unit_price?: any | null;
  total_price?: any | null;
  sort_ind?: number | null;
  dateTime?: any | null;
}
export type WharfageWorkProgramViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "wharfageWorkProgram-view";
export type WharfageWorkProgramView<
  V extends WharfageWorkProgramViewName
> = V extends "_base"
  ? Pick<
      WharfageWorkProgram,
      | "id"
      | "unit"
      | "start_time"
      | "end_time"
      | "request"
      | "work_program"
      | "operation"
      | "status"
      | "remarks"
      | "unit_price"
      | "total_price"
      | "sort_ind"
      | "dateTime"
    >
  : V extends "_local"
  ? Pick<
      WharfageWorkProgram,
      | "id"
      | "unit"
      | "start_time"
      | "end_time"
      | "request"
      | "work_program"
      | "operation"
      | "status"
      | "remarks"
      | "unit_price"
      | "total_price"
      | "sort_ind"
      | "dateTime"
    >
  : V extends "wharfageWorkProgram-view"
  ? Pick<
      WharfageWorkProgram,
      | "id"
      | "unit"
      | "start_time"
      | "end_time"
      | "request"
      | "work_program"
      | "operation"
      | "status"
      | "remarks"
      | "unit_price"
      | "total_price"
      | "sort_ind"
      | "dateTime"
      | "wharfage_id"
    >
  : never;
