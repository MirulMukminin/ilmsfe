import { StandardEntity } from "./base/sys$StandardEntity";
import { Job_MHE } from "./pbksb_Job_MHE";
import { Operator } from "./pbksb_Operator";
import { JobMHE_SessionTime } from "./pbksb_JobMHE_SessionTime";
import { MachineryPositionHandling } from "./pbksb_MachineryPositionHandling";
import { ManPowerDesignation } from "./pbksb_ManPowerDesignation";
export class ManPower extends StandardEntity {
  static NAME = "pbksb_ManPower";
  num?: number | null;
  job_MHE?: Job_MHE | null;
  operator?: Operator | null;
  estimated_hours?: any | null;
  session_time?: JobMHE_SessionTime | null;
  machinery_position_handling?: MachineryPositionHandling | null;
  manpowerdesignation?: ManPowerDesignation | null;
  parent?: boolean | null;
  quantity?: number | null;
}
export type ManPowerViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "manPower-view"
  | "manPower-view-Angular"
  | "manPower-view-For-Planner"
  | "manPower-view-SessionTime";
export type ManPowerView<V extends ManPowerViewName> = V extends "_base"
  ? Pick<ManPower, "id" | "num" | "estimated_hours" | "parent" | "quantity">
  : V extends "_local"
  ? Pick<ManPower, "id" | "num" | "estimated_hours" | "parent" | "quantity">
  : V extends "manPower-view"
  ? Pick<
      ManPower,
      | "id"
      | "num"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "job_MHE"
      | "operator"
      | "manpowerdesignation"
      | "session_time"
      | "machinery_position_handling"
    >
  : V extends "manPower-view-Angular"
  ? Pick<
      ManPower,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "job_MHE"
      | "session_time"
      | "operator"
      | "machinery_position_handling"
    >
  : V extends "manPower-view-For-Planner"
  ? Pick<
      ManPower,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "job_MHE"
      | "manpowerdesignation"
      | "session_time"
      | "machinery_position_handling"
      | "operator"
    >
  : V extends "manPower-view-SessionTime"
  ? Pick<
      ManPower,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num"
      | "estimated_hours"
      | "parent"
      | "quantity"
      | "job_MHE"
      | "operator"
      | "session_time"
      | "machinery_position_handling"
    >
  : never;
