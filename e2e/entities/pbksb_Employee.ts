import { StandardEntity } from "./base/sys$StandardEntity";
import { MachineryPositionHandling } from "./pbksb_MachineryPositionHandling";
import { Group } from "./pbksb_Group";
import { Customer } from "./pbksb_Customer";
import { Site } from "./pbksb_Site";
import {
  EmployeeStatusWork,
  Employee_Status_Type,
  Employee_Type
} from "../enums/enums";
import { Employee_Clock_In } from "./pbksb_Employee_Clock_In";
import { User } from "./base/sec$User";
import { Employee_Token } from "./pbksb_Employee_Token";
export class Employee extends StandardEntity {
  static NAME = "pbksb_Employee";
  manpowercode?: string | null;
  position?: MachineryPositionHandling | null;
  emp_id?: string | null;
  name?: string | null;
  group?: Group | null;
  customer_preferred?: Customer | null;
  site?: Site | null;
  clock_in?: any | null;
  clock_out?: any | null;
  hours?: any | null;
  ifs_signature?: string | null;
  statuswork?: EmployeeStatusWork | null;
  status?: Employee_Status_Type | null;
  remark?: string | null;
  employee_type?: Employee_Type | null;
  email?: string | null;
  employee_Clock_In?: Employee_Clock_In | null;
  login?: User | null;
  license_machine?: string | null;
  employee_token?: Employee_Token[] | null;
}
export type EmployeeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "employee-view"
  | "employee-view-ForRequestForm"
  | "employee-view-MinimalRequestForm"
  | "employee-view_Attendance"
  | "employee-view_CreateNew"
  | "employee-view_gang";
export type EmployeeView<V extends EmployeeViewName> = V extends "_base"
  ? Pick<
      Employee,
      | "id"
      | "name"
      | "manpowercode"
      | "emp_id"
      | "clock_in"
      | "clock_out"
      | "hours"
      | "ifs_signature"
      | "statuswork"
      | "status"
      | "remark"
      | "employee_type"
      | "email"
      | "license_machine"
    >
  : V extends "_local"
  ? Pick<
      Employee,
      | "id"
      | "manpowercode"
      | "emp_id"
      | "name"
      | "clock_in"
      | "clock_out"
      | "hours"
      | "ifs_signature"
      | "statuswork"
      | "status"
      | "remark"
      | "employee_type"
      | "email"
      | "license_machine"
    >
  : V extends "_minimal"
  ? Pick<Employee, "id" | "name">
  : V extends "employee-view"
  ? Pick<
      Employee,
      | "id"
      | "manpowercode"
      | "emp_id"
      | "name"
      | "clock_in"
      | "clock_out"
      | "hours"
      | "ifs_signature"
      | "statuswork"
      | "status"
      | "remark"
      | "employee_type"
      | "email"
      | "license_machine"
      | "group"
      | "position"
      | "group"
      | "customer_preferred"
      | "employee_Clock_In"
      | "site"
    >
  : V extends "employee-view-ForRequestForm"
  ? Pick<Employee, "id" | "name" | "manpowercode" | "position" | "group">
  : V extends "employee-view-MinimalRequestForm"
  ? Pick<
      Employee,
      "id" | "name" | "manpowercode" | "emp_id" | "position" | "group"
    >
  : V extends "employee-view_Attendance"
  ? Pick<
      Employee,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "manpowercode"
      | "emp_id"
      | "name"
      | "clock_in"
      | "clock_out"
      | "hours"
      | "ifs_signature"
      | "statuswork"
      | "status"
      | "remark"
      | "employee_type"
      | "email"
      | "license_machine"
      | "group"
      | "position"
      | "employee_token"
    >
  : V extends "employee-view_CreateNew"
  ? Pick<
      Employee,
      | "id"
      | "manpowercode"
      | "emp_id"
      | "name"
      | "clock_in"
      | "clock_out"
      | "hours"
      | "ifs_signature"
      | "statuswork"
      | "status"
      | "remark"
      | "employee_type"
      | "email"
      | "license_machine"
      | "group"
      | "customer_preferred"
      | "position"
      | "login"
      | "employee_token"
    >
  : V extends "employee-view_gang"
  ? Pick<
      Employee,
      | "id"
      | "manpowercode"
      | "emp_id"
      | "name"
      | "clock_in"
      | "clock_out"
      | "hours"
      | "ifs_signature"
      | "statuswork"
      | "status"
      | "remark"
      | "employee_type"
      | "email"
      | "license_machine"
      | "group"
      | "position"
    >
  : never;
