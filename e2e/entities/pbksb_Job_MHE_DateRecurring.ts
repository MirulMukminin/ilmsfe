import { StandardEntity } from "./base/sys$StandardEntity";
import { Requestform } from "./pbksb_Requestform";
export class Job_MHE_DateRecurring extends StandardEntity {
  static NAME = "pbksb_Job_MHE_DateRecurring";
  requestform?: Requestform | null;
  datestart?: any | null;
  dateend?: any | null;
}
export type Job_MHE_DateRecurringViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "job_MHE_DateRecurring-view";
export type Job_MHE_DateRecurringView<
  V extends Job_MHE_DateRecurringViewName
> = V extends "_base"
  ? Pick<Job_MHE_DateRecurring, "id" | "datestart" | "dateend">
  : V extends "_local"
  ? Pick<Job_MHE_DateRecurring, "id" | "datestart" | "dateend">
  : V extends "job_MHE_DateRecurring-view"
  ? Pick<Job_MHE_DateRecurring, "id" | "datestart" | "dateend" | "requestform">
  : never;
