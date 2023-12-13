import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { WorkProgram, MarineStatus } from "../enums/enums";
export class BerthWorkProgramSummary extends StandardEntity {
  static NAME = "pbksb_BerthWorkProgramSummary";
  berth_form?: BerthForm | null;
  work_program?: WorkProgram | null;
  request_number?: string | null;
  date_time?: any | null;
  status?: MarineStatus | null;
  update_cancelled_by?: string | null;
  update_cancelled_datetime?: any | null;
  sort_ind?: number | null;
}
export type BerthWorkProgramSummaryViewName = "_base" | "_local" | "_minimal";
export type BerthWorkProgramSummaryView<
  V extends BerthWorkProgramSummaryViewName
> = V extends "_base"
  ? Pick<
      BerthWorkProgramSummary,
      | "id"
      | "work_program"
      | "request_number"
      | "date_time"
      | "status"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "sort_ind"
    >
  : V extends "_local"
  ? Pick<
      BerthWorkProgramSummary,
      | "id"
      | "work_program"
      | "request_number"
      | "date_time"
      | "status"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "sort_ind"
    >
  : never;
