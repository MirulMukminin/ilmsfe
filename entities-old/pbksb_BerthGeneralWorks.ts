import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { MarineStatus, GeneralWorkItem } from "../enums/enums";
export class BerthGeneralWorks extends StandardEntity {
  static NAME = "pbksb_BerthGeneralWorks";
  berth_form?: BerthForm | null;
  update_cancelled_datetime?: any | null;
  booking_date?: any | null;
  service_code?: string | null;
  bo?: string | null;
  start_time?: any | null;
  end_time?: any | null;
  job_ticket?: string | null;
  status?: MarineStatus | null;
  item?: GeneralWorkItem | null;
  remarks?: string | null;
  indicator?: boolean | null;
}
export type BerthGeneralWorksViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthGeneralWorks-view"
  | "berthGeneralWorks_Summary-view";
export type BerthGeneralWorksView<
  V extends BerthGeneralWorksViewName
> = V extends "_base"
  ? Pick<
      BerthGeneralWorks,
      | "id"
      | "update_cancelled_datetime"
      | "booking_date"
      | "service_code"
      | "bo"
      | "start_time"
      | "end_time"
      | "job_ticket"
      | "status"
      | "item"
      | "remarks"
      | "indicator"
    >
  : V extends "_local"
  ? Pick<
      BerthGeneralWorks,
      | "id"
      | "update_cancelled_datetime"
      | "booking_date"
      | "service_code"
      | "bo"
      | "start_time"
      | "end_time"
      | "job_ticket"
      | "status"
      | "item"
      | "remarks"
      | "indicator"
    >
  : V extends "berthGeneralWorks-view"
  ? Pick<
      BerthGeneralWorks,
      | "id"
      | "update_cancelled_datetime"
      | "booking_date"
      | "service_code"
      | "bo"
      | "start_time"
      | "end_time"
      | "job_ticket"
      | "status"
      | "item"
      | "remarks"
      | "indicator"
      | "berth_form"
    >
  : V extends "berthGeneralWorks_Summary-view"
  ? Pick<
      BerthGeneralWorks,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "update_cancelled_datetime"
      | "booking_date"
      | "service_code"
      | "bo"
      | "start_time"
      | "end_time"
      | "job_ticket"
      | "status"
      | "item"
      | "remarks"
      | "indicator"
    >
  : never;
