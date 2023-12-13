import { StandardEntity } from "./base/sys$StandardEntity";
import { MachineOperatorEnum, WorkProgramType } from "../enums/enums";
import { MachineryType } from "./pbksb_MachineryType";
import { MachineryPositionHandling } from "./pbksb_MachineryPositionHandling";
import { Operator } from "./pbksb_Operator";
import { Machine } from "./pbksb_Machine";
import { JobMHE_SessionTime } from "./pbksb_JobMHE_SessionTime";
import { Job_MHE } from "./pbksb_Job_MHE";
import { Supplier } from "./pbksb_Supplier";
export class Machinery extends StandardEntity {
  static NAME = "pbksb_Machinery";
  num?: number | null;
  category?: MachineOperatorEnum | null;
  machinery_type?: MachineryType | null;
  manpowerdesignation?: MachineryPositionHandling | null;
  operator?: Operator | null;
  machine?: Machine | null;
  estimated_hours?: any | null;
  parent?: boolean | null;
  quantity?: number | null;
  usagehours?: any | null;
  session_time?: JobMHE_SessionTime | null;
  job_MHE?: Job_MHE | null;
  program?: WorkProgramType | null;
  supplier?: Supplier | null;
}
export type MachineryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "machinery-assign-operator-view"
  | "machinery-detail-breakdown-view"
  | "machinery-view"
  | "machinery-view-Angular"
  | "machinery-view-Display"
  | "machinery-view-PlannerPage"
  | "machinery-view-session-time"
  | "machinery-viewForRequestListingCUBA"
  | "machinery-view_Edit"
  | "machinery-view_OperatorJobTicket"
  | "machinery-view_TestOnly"
  | "machinery-view_minimal_Operator";
export type MachineryView<V extends MachineryViewName> = V extends "_base"
  ? Pick<
      Machinery,
      | "id"
      | "num"
      | "category"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "usagehours"
      | "program"
    >
  : V extends "_local"
  ? Pick<
      Machinery,
      | "id"
      | "num"
      | "category"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "usagehours"
      | "program"
    >
  : V extends "machinery-assign-operator-view"
  ? Pick<
      Machinery,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "category"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "usagehours"
      | "program"
      | "machinery_type"
      | "operator"
      | "job_MHE"
      | "machine"
      | "session_time"
    >
  : V extends "machinery-detail-breakdown-view"
  ? Pick<
      Machinery,
      | "id"
      | "num"
      | "category"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "usagehours"
      | "program"
      | "machinery_type"
      | "job_MHE"
      | "session_time"
    >
  : V extends "machinery-view"
  ? Pick<
      Machinery,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "category"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "usagehours"
      | "program"
      | "machinery_type"
      | "operator"
      | "job_MHE"
      | "machine"
      | "session_time"
    >
  : V extends "machinery-view-Angular"
  ? Pick<
      Machinery,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "category"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "usagehours"
      | "program"
      | "job_MHE"
      | "session_time"
      | "machinery_type"
      | "operator"
      | "machine"
    >
  : V extends "machinery-view-Display"
  ? Pick<
      Machinery,
      | "id"
      | "num"
      | "category"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "usagehours"
      | "program"
      | "machinery_type"
      | "operator"
      | "job_MHE"
      | "session_time"
    >
  : V extends "machinery-view-PlannerPage"
  ? Pick<
      Machinery,
      | "id"
      | "num"
      | "category"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "usagehours"
      | "program"
      | "job_MHE"
      | "operator"
      | "machine"
    >
  : V extends "machinery-view-session-time"
  ? Pick<
      Machinery,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "category"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "usagehours"
      | "program"
      | "machinery_type"
      | "operator"
      | "session_time"
      | "job_MHE"
      | "machine"
    >
  : V extends "machinery-viewForRequestListingCUBA"
  ? Pick<
      Machinery,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "category"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "usagehours"
      | "program"
      | "job_MHE"
      | "machinery_type"
      | "operator"
      | "session_time"
      | "machine"
    >
  : V extends "machinery-view_Edit"
  ? Pick<
      Machinery,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "job_MHE"
      | "machine"
      | "machinery_type"
      | "operator"
      | "category"
      | "session_time"
      | "parent"
      | "estimated_hours"
      | "quantity"
    >
  : V extends "machinery-view_OperatorJobTicket"
  ? Pick<
      Machinery,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "category"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "usagehours"
      | "program"
      | "job_MHE"
      | "machinery_type"
      | "machine"
      | "operator"
      | "session_time"
      | "supplier"
    >
  : V extends "machinery-view_TestOnly"
  ? Pick<
      Machinery,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "category"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "usagehours"
      | "program"
      | "session_time"
      | "job_MHE"
    >
  : V extends "machinery-view_minimal_Operator"
  ? Pick<
      Machinery,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "category"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "usagehours"
      | "program"
      | "operator"
      | "job_MHE"
      | "machinery_type"
      | "machine"
      | "session_time"
    >
  : never;
