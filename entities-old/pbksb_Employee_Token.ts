import { StandardEntity } from "./base/sys$StandardEntity";
import { Employee } from "./pbksb_Employee";
export class Employee_Token extends StandardEntity {
  static NAME = "pbksb_Employee_Token";
  employee?: Employee | null;
  token?: string | null;
}
export type Employee_TokenViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "employee_Token-view";
export type Employee_TokenView<
  V extends Employee_TokenViewName
> = V extends "_base"
  ? Pick<Employee_Token, "id" | "token">
  : V extends "_local"
  ? Pick<Employee_Token, "id" | "token">
  : V extends "employee_Token-view"
  ? Pick<Employee_Token, "id" | "token" | "employee">
  : never;
