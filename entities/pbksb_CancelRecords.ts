import { StandardEntity } from "./base/sys$StandardEntity";
import { Job_MHE } from "./pbksb_Job_MHE";
import { BerthForm } from "./pbksb_BerthForm";
import { ScopeOfWorkItem, RateCode } from "../enums/enums";
export class CancelRecords extends StandardEntity {
  static NAME = "pbksb_CancelRecords";
  jobmhe?: Job_MHE | null;
  berthForm?: BerthForm | null;
  timecancelation?: any | null;
  hours_to_charge?: any | null;
  rate_charge?: ScopeOfWorkItem | null;
  ratecode?: RateCode | null;
  remarks?: string | null;
}
export type CancelRecordsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "cancelRecords-view";
export type CancelRecordsView<
  V extends CancelRecordsViewName
> = V extends "_base"
  ? Pick<
      CancelRecords,
      | "id"
      | "timecancelation"
      | "hours_to_charge"
      | "rate_charge"
      | "ratecode"
      | "remarks"
    >
  : V extends "_local"
  ? Pick<
      CancelRecords,
      | "id"
      | "timecancelation"
      | "hours_to_charge"
      | "rate_charge"
      | "ratecode"
      | "remarks"
    >
  : V extends "cancelRecords-view"
  ? Pick<
      CancelRecords,
      | "id"
      | "timecancelation"
      | "hours_to_charge"
      | "rate_charge"
      | "ratecode"
      | "remarks"
      | "jobmhe"
      | "berthForm"
    >
  : never;
