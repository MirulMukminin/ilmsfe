import { StandardEntity } from "./base/sys$StandardEntity";
import { Job_MHE } from "./pbksb_Job_MHE";
import { Machinery } from "./pbksb_Machinery";
import { ManPower } from "./pbksb_ManPower";
import { Job_status } from "../enums/enums";
export class JobMHE_SessionTime extends StandardEntity {
  static NAME = "pbksb_JobMHE_SessionTime";
  job_MHE?: Job_MHE | null;
  machinery_session_time?: Machinery | null;
  manpower_session_time?: ManPower | null;
  sess1_start?: any | null;
  sess1_end?: any | null;
  sess1_hours?: any | null;
  sess2_start?: any | null;
  sess2_end?: any | null;
  sess2_hours?: any | null;
  sess3_start?: any | null;
  sess3_end?: any | null;
  sess3_hours?: any | null;
  session_status?: Job_status | null;
  sess1_break_start?: any | null;
  sess1_break_end?: any | null;
  sess2_break_start?: any | null;
  sess2_break_end?: any | null;
  sess3_break_start?: any | null;
  sess3_break_end?: any | null;
  totalhours?: any | null;
  remarks?: string | null;
  status_invoice?: boolean | null;
  timeCompleted?: any | null;
}
export type JobMHE_SessionTimeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "jobMHE_SessionTime-browseView"
  | "jobMHE_SessionTime-view"
  | "jobMHE_SessionTime-view-Details"
  | "jobMHE_SessionTime-view-ManPower"
  | "jobMHE_SessionTime-view-machinery"
  | "jobMHE_SessionTime-view_Endorsed"
  | "jobMHE_SessionTime-view_JobMHE-Only"
  | "jobMHE_SessionTime-view_Machinery_Angular";
export type JobMHE_SessionTimeView<
  V extends JobMHE_SessionTimeViewName
> = V extends "_base"
  ? Pick<
      JobMHE_SessionTime,
      | "id"
      | "sess1_start"
      | "sess1_end"
      | "sess1_hours"
      | "sess2_start"
      | "sess2_end"
      | "sess2_hours"
      | "sess3_start"
      | "sess3_end"
      | "sess3_hours"
      | "session_status"
      | "sess1_break_start"
      | "sess1_break_end"
      | "sess2_break_start"
      | "sess2_break_end"
      | "sess3_break_start"
      | "sess3_break_end"
      | "totalhours"
      | "remarks"
      | "status_invoice"
      | "timeCompleted"
    >
  : V extends "_local"
  ? Pick<
      JobMHE_SessionTime,
      | "id"
      | "sess1_start"
      | "sess1_end"
      | "sess1_hours"
      | "sess2_start"
      | "sess2_end"
      | "sess2_hours"
      | "sess3_start"
      | "sess3_end"
      | "sess3_hours"
      | "session_status"
      | "sess1_break_start"
      | "sess1_break_end"
      | "sess2_break_start"
      | "sess2_break_end"
      | "sess3_break_start"
      | "sess3_break_end"
      | "totalhours"
      | "remarks"
      | "status_invoice"
      | "timeCompleted"
    >
  : V extends "jobMHE_SessionTime-browseView"
  ? Pick<JobMHE_SessionTime, "id" | "job_MHE">
  : V extends "jobMHE_SessionTime-view"
  ? Pick<
      JobMHE_SessionTime,
      | "id"
      | "sess1_start"
      | "sess1_end"
      | "sess1_hours"
      | "sess2_start"
      | "sess2_end"
      | "sess2_hours"
      | "sess3_start"
      | "sess3_end"
      | "sess3_hours"
      | "session_status"
      | "sess1_break_start"
      | "sess1_break_end"
      | "sess2_break_start"
      | "sess2_break_end"
      | "sess3_break_start"
      | "sess3_break_end"
      | "totalhours"
      | "remarks"
      | "status_invoice"
      | "timeCompleted"
      | "job_MHE"
    >
  : V extends "jobMHE_SessionTime-view-Details"
  ? Pick<JobMHE_SessionTime, "id" | "job_MHE">
  : V extends "jobMHE_SessionTime-view-ManPower"
  ? Pick<
      JobMHE_SessionTime,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "sess1_start"
      | "sess1_end"
      | "sess1_hours"
      | "sess2_start"
      | "sess2_end"
      | "sess2_hours"
      | "sess3_start"
      | "sess3_end"
      | "sess3_hours"
      | "session_status"
      | "sess1_break_start"
      | "sess1_break_end"
      | "sess2_break_start"
      | "sess2_break_end"
      | "sess3_break_start"
      | "sess3_break_end"
      | "totalhours"
      | "remarks"
      | "status_invoice"
      | "timeCompleted"
      | "job_MHE"
    >
  : V extends "jobMHE_SessionTime-view-machinery"
  ? Pick<
      JobMHE_SessionTime,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "job_MHE"
      | "sess1_start"
      | "sess1_end"
      | "sess1_hours"
      | "sess2_start"
      | "sess2_end"
      | "sess2_hours"
      | "sess3_start"
      | "sess3_end"
      | "sess3_hours"
      | "session_status"
    >
  : V extends "jobMHE_SessionTime-view_Endorsed"
  ? Pick<JobMHE_SessionTime, "id" | "job_MHE">
  : V extends "jobMHE_SessionTime-view_JobMHE-Only"
  ? Pick<
      JobMHE_SessionTime,
      | "id"
      | "sess1_start"
      | "sess1_end"
      | "sess1_hours"
      | "sess2_start"
      | "sess2_end"
      | "sess2_hours"
      | "sess3_start"
      | "sess3_end"
      | "sess3_hours"
      | "session_status"
      | "sess1_break_start"
      | "sess1_break_end"
      | "sess2_break_start"
      | "sess2_break_end"
      | "sess3_break_start"
      | "sess3_break_end"
      | "totalhours"
      | "remarks"
      | "status_invoice"
      | "timeCompleted"
    >
  : V extends "jobMHE_SessionTime-view_Machinery_Angular"
  ? Pick<
      JobMHE_SessionTime,
      | "id"
      | "sess1_start"
      | "sess1_end"
      | "sess1_hours"
      | "sess2_start"
      | "sess2_end"
      | "sess2_hours"
      | "sess3_start"
      | "sess3_end"
      | "sess3_hours"
      | "session_status"
      | "sess1_break_start"
      | "sess1_break_end"
      | "sess2_break_start"
      | "sess2_break_end"
      | "sess3_break_start"
      | "sess3_break_end"
      | "totalhours"
      | "remarks"
      | "status_invoice"
      | "timeCompleted"
      | "job_MHE"
      | "machinery_session_time"
    >
  : never;
