import { StandardEntity } from "./base/sys$StandardEntity";
import { Employee } from "./pbksb_Employee";
import { Customer } from "./pbksb_Customer";
import { User } from "./base/sec$User";
export class Planner extends StandardEntity {
  static NAME = "pbksb_Planner";
  employee?: Employee | null;
  customer?: Customer | null;
  user?: User | null;
  status?: string | null;
}
export type PlannerViewName = "_base" | "_local" | "_minimal" | "planner-view";
export type PlannerView<V extends PlannerViewName> = V extends "_base"
  ? Pick<Planner, "id" | "status">
  : V extends "_local"
  ? Pick<Planner, "id" | "status">
  : V extends "planner-view"
  ? Pick<Planner, "id" | "status" | "user" | "customer" | "employee">
  : never;
