import { StandardEntity } from "./base/sys$StandardEntity";
import { JobMHE_SessionTime } from "./pbksb_JobMHE_SessionTime";
import { Job } from "./pbksb_Job";
import { Machinery } from "./pbksb_Machinery";
import { ManPower } from "./pbksb_ManPower";
import {
  Job_MHE_ServiceType,
  JobStatus,
  Cancellation,
  CancellationType
} from "../enums/enums";
export class Job_MHE extends StandardEntity {
  static NAME = "pbksb_Job_MHE";
  num?: number | null;
  dateCompleted?: any | null;
  session_time_job?: JobMHE_SessionTime | null;
  job?: Job | null;
  running_number?: number | null;
  machinery?: Machinery[] | null;
  manpower?: ManPower[] | null;
  job_ticket?: string | null;
  job_mhe_service_type?: Job_MHE_ServiceType | null;
  status?: JobStatus | null;
  cancel_date?: any | null;
  cancellation?: Cancellation | null;
  cancellationtype?: CancellationType | null;
  timeCompleted?: any | null;
  remarks?: string | null;
  date_start?: any | null;
  endorsedby?: string | null;
  endorsedTime?: any | null;
  notes?: string | null;
}
export type Job_MHEViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "job_MHE-Mobile-View"
  | "job_MHE-Ticket-View"
  | "job_MHE-view"
  | "job_MHE-view-Mobile"
  | "job_MHE-view-only-Angular"
  | "job_MHE-view-planner"
  | "job_MHE-view_Custom"
  | "job_MHE-view_Custom_Test";
export type Job_MHEView<V extends Job_MHEViewName> = V extends "_base"
  ? Pick<
      Job_MHE,
      | "id"
      | "num"
      | "dateCompleted"
      | "running_number"
      | "job_ticket"
      | "job_mhe_service_type"
      | "status"
      | "cancel_date"
      | "cancellation"
      | "cancellationtype"
      | "timeCompleted"
      | "remarks"
      | "date_start"
      | "endorsedby"
      | "endorsedTime"
      | "notes"
    >
  : V extends "_local"
  ? Pick<
      Job_MHE,
      | "id"
      | "num"
      | "dateCompleted"
      | "running_number"
      | "job_ticket"
      | "job_mhe_service_type"
      | "status"
      | "cancel_date"
      | "cancellation"
      | "cancellationtype"
      | "timeCompleted"
      | "remarks"
      | "date_start"
      | "endorsedby"
      | "endorsedTime"
      | "notes"
    >
  : V extends "job_MHE-Mobile-View"
  ? Pick<
      Job_MHE,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "dateCompleted"
      | "running_number"
      | "job_ticket"
      | "job_mhe_service_type"
      | "status"
      | "cancel_date"
      | "cancellation"
      | "cancellationtype"
      | "timeCompleted"
      | "remarks"
      | "date_start"
      | "endorsedby"
      | "endorsedTime"
      | "notes"
      | "job"
      | "machinery"
      | "manpower"
      | "session_time_job"
      | "endorsedby"
    >
  : V extends "job_MHE-Ticket-View"
  ? Pick<
      Job_MHE,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "dateCompleted"
      | "running_number"
      | "job_ticket"
      | "job_mhe_service_type"
      | "status"
      | "cancel_date"
      | "cancellation"
      | "cancellationtype"
      | "timeCompleted"
      | "remarks"
      | "date_start"
      | "endorsedby"
      | "endorsedTime"
      | "notes"
      | "job"
      | "machinery"
      | "manpower"
      | "session_time_job"
    >
  : V extends "job_MHE-view"
  ? Pick<
      Job_MHE,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "dateCompleted"
      | "running_number"
      | "job_ticket"
      | "job_mhe_service_type"
      | "status"
      | "cancel_date"
      | "cancellation"
      | "cancellationtype"
      | "timeCompleted"
      | "remarks"
      | "date_start"
      | "endorsedby"
      | "endorsedTime"
      | "notes"
      | "machinery"
      | "manpower"
      | "job"
      | "session_time_job"
    >
  : V extends "job_MHE-view-Mobile"
  ? Pick<
      Job_MHE,
      | "id"
      | "num"
      | "dateCompleted"
      | "running_number"
      | "job_ticket"
      | "job_mhe_service_type"
      | "status"
      | "cancel_date"
      | "cancellation"
      | "cancellationtype"
      | "timeCompleted"
      | "remarks"
      | "date_start"
      | "endorsedby"
      | "endorsedTime"
      | "notes"
      | "job"
      | "manpower"
      | "session_time_job"
    >
  : V extends "job_MHE-view-only-Angular"
  ? Pick<
      Job_MHE,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "dateCompleted"
      | "running_number"
      | "job_ticket"
      | "job_mhe_service_type"
      | "status"
      | "cancel_date"
      | "cancellation"
      | "cancellationtype"
      | "timeCompleted"
      | "remarks"
      | "date_start"
      | "endorsedby"
      | "endorsedTime"
      | "notes"
      | "job"
      | "machinery"
      | "manpower"
      | "session_time_job"
      | "endorsedby"
    >
  : V extends "job_MHE-view-planner"
  ? Pick<
      Job_MHE,
      | "id"
      | "num"
      | "dateCompleted"
      | "running_number"
      | "job_ticket"
      | "job_mhe_service_type"
      | "status"
      | "cancel_date"
      | "cancellation"
      | "cancellationtype"
      | "timeCompleted"
      | "remarks"
      | "date_start"
      | "endorsedby"
      | "endorsedTime"
      | "notes"
      | "session_time_job"
      | "job"
      | "manpower"
      | "machinery"
    >
  : V extends "job_MHE-view_Custom"
  ? Pick<
      Job_MHE,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "dateCompleted"
      | "running_number"
      | "job_ticket"
      | "job_mhe_service_type"
      | "status"
      | "cancel_date"
      | "cancellation"
      | "cancellationtype"
      | "timeCompleted"
      | "remarks"
      | "date_start"
      | "endorsedby"
      | "endorsedTime"
      | "notes"
      | "job"
      | "manpower"
      | "machinery"
      | "session_time_job"
    >
  : V extends "job_MHE-view_Custom_Test"
  ? Pick<
      Job_MHE,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "dateCompleted"
      | "running_number"
      | "job_ticket"
      | "job_mhe_service_type"
      | "status"
      | "cancel_date"
      | "cancellation"
      | "cancellationtype"
      | "timeCompleted"
      | "remarks"
      | "date_start"
      | "endorsedby"
      | "endorsedTime"
      | "notes"
      | "machinery"
      | "manpower"
      | "session_time_job"
      | "job"
    >
  : never;
