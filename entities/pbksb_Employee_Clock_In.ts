import { StandardEntity } from "./base/sys$StandardEntity";
import { Clock_In_Type, Employee_Status_Type } from "../enums/enums";
import { Employee } from "./pbksb_Employee";
export class Employee_Clock_In extends StandardEntity {
  static NAME = "pbksb_Employee_Clock_In";
  clock_in_type?: Clock_In_Type | null;
  employee_staff?: Employee | null;
  status?: Employee_Status_Type | null;
}
export type Employee_Clock_InViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "employee_Clock_In-view";
export type Employee_Clock_InView<
  V extends Employee_Clock_InViewName
> = V extends "_base"
  ? Pick<Employee_Clock_In, "id" | "clock_in_type" | "status">
  : V extends "_local"
  ? Pick<Employee_Clock_In, "id" | "clock_in_type" | "status">
  : V extends "employee_Clock_In-view"
  ? Pick<
      Employee_Clock_In,
      "id" | "clock_in_type" | "status" | "employee_staff"
    >
  : never;
