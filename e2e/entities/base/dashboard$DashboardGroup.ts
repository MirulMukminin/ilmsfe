import { StandardEntity } from "./sys$StandardEntity";
import { PersistentDashboard } from "./dashboard$PersistentDashboard";
export class DashboardGroup extends StandardEntity {
  static NAME = "dashboard$DashboardGroup";
  name?: string | null;
  dashboards?: PersistentDashboard[] | null;
}
export type DashboardGroupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dashboards";
export type DashboardGroupView<
  V extends DashboardGroupViewName
> = V extends "_base"
  ? Pick<DashboardGroup, "id" | "name">
  : V extends "_local"
  ? Pick<DashboardGroup, "id" | "name">
  : V extends "_minimal"
  ? Pick<DashboardGroup, "id" | "name">
  : V extends "dashboards"
  ? Pick<DashboardGroup, "id" | "name" | "dashboards">
  : never;
