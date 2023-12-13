import { StandardEntity } from "./base/sys$StandardEntity";
import { Requestform } from "./pbksb_Requestform";
import { Job_Service_Type, JobStatus } from "../enums/enums";
import { Site } from "./pbksb_Site";
import { Console } from "./pbksb_Console";
import { Job_MHE } from "./pbksb_Job_MHE";
export class Job extends StandardEntity {
  static NAME = "pbksb_Job";
  requestform?: Requestform | null;
  running_number?: number | null;
  job_number?: number | null;
  job_ticket?: string | null;
  job_service_type?: Job_Service_Type | null;
  date_start?: any | null;
  date_end?: any | null;
  description?: string | null;
  quantity?: number | null;
  site?: Site | null;
  status?: JobStatus | null;
  console?: Console | null;
  job_mhe?: Job_MHE[] | null;
  estimated_hours?: any | null;
}
export type JobViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "job-detail-breakdown-view"
  | "job-view"
  | "job-view-MHE"
  | "job-view-Machinery-Angular";
export type JobView<V extends JobViewName> = V extends "_base"
  ? Pick<
      Job,
      | "id"
      | "running_number"
      | "job_number"
      | "job_ticket"
      | "job_service_type"
      | "date_start"
      | "date_end"
      | "description"
      | "quantity"
      | "status"
      | "estimated_hours"
    >
  : V extends "_local"
  ? Pick<
      Job,
      | "id"
      | "running_number"
      | "job_number"
      | "job_ticket"
      | "job_service_type"
      | "date_start"
      | "date_end"
      | "description"
      | "quantity"
      | "status"
      | "estimated_hours"
    >
  : V extends "job-detail-breakdown-view"
  ? Pick<
      Job,
      | "id"
      | "running_number"
      | "job_number"
      | "job_ticket"
      | "job_service_type"
      | "date_start"
      | "date_end"
      | "description"
      | "quantity"
      | "status"
      | "estimated_hours"
      | "job_mhe"
      | "requestform"
    >
  : V extends "job-view"
  ? Pick<
      Job,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "running_number"
      | "job_number"
      | "job_ticket"
      | "job_service_type"
      | "date_start"
      | "date_end"
      | "description"
      | "quantity"
      | "status"
      | "estimated_hours"
      | "requestform"
      | "site"
      | "job_mhe"
    >
  : V extends "job-view-MHE"
  ? Pick<
      Job,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "running_number"
      | "job_number"
      | "job_ticket"
      | "job_service_type"
      | "date_start"
      | "date_end"
      | "description"
      | "quantity"
      | "status"
      | "estimated_hours"
      | "requestform"
      | "site"
      | "job_mhe"
    >
  : V extends "job-view-Machinery-Angular"
  ? Pick<
      Job,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "running_number"
      | "job_number"
      | "job_ticket"
      | "job_service_type"
      | "date_start"
      | "date_end"
      | "description"
      | "quantity"
      | "status"
      | "estimated_hours"
      | "site"
      | "job_mhe"
    >
  : never;
