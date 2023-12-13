import { StandardEntity } from "./base/sys$StandardEntity";
import { JobMHE_SessionTime } from "./pbksb_JobMHE_SessionTime";
import { DocumentStatus, Job_status } from "../enums/enums";
import { Machinery } from "./pbksb_Machinery";
import { ManPower } from "./pbksb_ManPower";
export class JobMHE_SessionArchive extends StandardEntity {
  static NAME = "pbksb_JobMHE_SessionArchive";
  jobMHESessionTime?: JobMHE_SessionTime | null;
  documentstatus?: DocumentStatus | null;
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
  sess4_start?: any | null;
  sess4_end?: any | null;
  sess4_hours?: any | null;
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
export type JobMHE_SessionArchiveViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "jobMHE_SessionArchive-view";
export type JobMHE_SessionArchiveView<
  V extends JobMHE_SessionArchiveViewName
> = V extends "_base"
  ? Pick<
      JobMHE_SessionArchive,
      | "id"
      | "documentstatus"
      | "sess1_start"
      | "sess1_end"
      | "sess1_hours"
      | "sess2_start"
      | "sess2_end"
      | "sess2_hours"
      | "sess3_start"
      | "sess3_end"
      | "sess3_hours"
      | "sess4_start"
      | "sess4_end"
      | "sess4_hours"
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
      JobMHE_SessionArchive,
      | "id"
      | "documentstatus"
      | "sess1_start"
      | "sess1_end"
      | "sess1_hours"
      | "sess2_start"
      | "sess2_end"
      | "sess2_hours"
      | "sess3_start"
      | "sess3_end"
      | "sess3_hours"
      | "sess4_start"
      | "sess4_end"
      | "sess4_hours"
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
  : V extends "jobMHE_SessionArchive-view"
  ? Pick<
      JobMHE_SessionArchive,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "documentstatus"
      | "sess1_start"
      | "sess1_end"
      | "sess1_hours"
      | "sess2_start"
      | "sess2_end"
      | "sess2_hours"
      | "sess3_start"
      | "sess3_end"
      | "sess3_hours"
      | "sess4_start"
      | "sess4_end"
      | "sess4_hours"
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
      | "jobMHESessionTime"
      | "machinery_session_time"
      | "manpower_session_time"
    >
  : never;
