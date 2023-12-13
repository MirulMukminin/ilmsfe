import { StandardEntity } from "./base/sys$StandardEntity";
import { MachineryPositionHandling } from "./pbksb_MachineryPositionHandling";
import { MachineryType } from "./pbksb_MachineryType";
import { Employee } from "./pbksb_Employee";
import { Employee_Status_Type } from "../enums/enums";
import { Machinery } from "./pbksb_Machinery";
import { ManPower } from "./pbksb_ManPower";
export class Operator extends StandardEntity {
  static NAME = "pbksb_Operator";
  position?: MachineryPositionHandling | null;
  machine_operate?: MachineryType | null;
  employee?: Employee | null;
  statusOperator?: Employee_Status_Type | null;
  machinery?: Machinery | null;
  manPower?: ManPower | null;
  last_job_assigned?: any | null;
  last_berth_job_assigned?: any | null;
  last_nonberth_job_assigned?: any | null;
  last_job_assigned_previus?: any | null;
}
export type OperatorViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "operator-auto-assign-view"
  | "operator-view"
  | "operator-view-CUBA"
  | "operator-view-RequestFormView"
  | "operatorCustom-view";
export type OperatorView<V extends OperatorViewName> = V extends "_base"
  ? Pick<
      Operator,
      | "id"
      | "employee"
      | "statusOperator"
      | "last_job_assigned"
      | "last_berth_job_assigned"
      | "last_nonberth_job_assigned"
      | "last_job_assigned_previus"
    >
  : V extends "_local"
  ? Pick<
      Operator,
      | "id"
      | "statusOperator"
      | "last_job_assigned"
      | "last_berth_job_assigned"
      | "last_nonberth_job_assigned"
      | "last_job_assigned_previus"
    >
  : V extends "_minimal"
  ? Pick<Operator, "id" | "employee">
  : V extends "operator-auto-assign-view"
  ? Pick<
      Operator,
      | "id"
      | "statusOperator"
      | "last_job_assigned"
      | "last_berth_job_assigned"
      | "last_nonberth_job_assigned"
      | "last_job_assigned_previus"
      | "position"
      | "employee"
    >
  : V extends "operator-view"
  ? Pick<
      Operator,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "statusOperator"
      | "last_job_assigned"
      | "last_berth_job_assigned"
      | "last_nonberth_job_assigned"
      | "last_job_assigned_previus"
      | "employee"
      | "position"
      | "machine_operate"
    >
  : V extends "operator-view-CUBA"
  ? Pick<
      Operator,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "statusOperator"
      | "last_job_assigned"
      | "last_berth_job_assigned"
      | "last_nonberth_job_assigned"
      | "last_job_assigned_previus"
      | "employee"
      | "position"
    >
  : V extends "operator-view-RequestFormView"
  ? Pick<Operator, "id" | "employee" | "employee" | "position">
  : V extends "operatorCustom-view"
  ? Pick<
      Operator,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "statusOperator"
      | "last_job_assigned"
      | "last_berth_job_assigned"
      | "last_nonberth_job_assigned"
      | "last_job_assigned_previus"
      | "position"
      | "employee"
      | "machine_operate"
      | "machinery"
    >
  : never;
