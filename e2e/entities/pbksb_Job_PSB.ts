import { StandardEntity } from "./base/sys$StandardEntity";
import { Job } from "./pbksb_Job";
import { Form_Type, Job_status } from "../enums/enums";
import { Agent } from "./pbksb_Agent";
import { Site } from "./pbksb_Site";
export class Job_PSB extends StandardEntity {
  static NAME = "pbksb_Job_PSB";
  job?: Job | null;
  form_type?: Form_Type | null;
  registration_number?: string | null;
  move_date?: any | null;
  agent?: Agent | null;
  site?: Site | null;
  total_value?: any | null;
  status?: Job_status | null;
}
export type Job_PSBViewName = "_base" | "_local" | "_minimal" | "job_PSB-view";
export type Job_PSBView<V extends Job_PSBViewName> = V extends "_base"
  ? Pick<
      Job_PSB,
      | "id"
      | "form_type"
      | "registration_number"
      | "move_date"
      | "total_value"
      | "status"
    >
  : V extends "_local"
  ? Pick<
      Job_PSB,
      | "id"
      | "form_type"
      | "registration_number"
      | "move_date"
      | "total_value"
      | "status"
    >
  : V extends "job_PSB-view"
  ? Pick<
      Job_PSB,
      | "id"
      | "form_type"
      | "registration_number"
      | "move_date"
      | "total_value"
      | "status"
      | "job"
      | "agent"
      | "site"
    >
  : never;
