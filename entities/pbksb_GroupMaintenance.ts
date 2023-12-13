import { StandardEntity } from "./base/sys$StandardEntity";
import { Gang_Type } from "../enums/enums";
export class GroupMaintenance extends StandardEntity {
  static NAME = "pbksb_GroupMaintenance";
  current_gang?: Gang_Type | null;
}
export type GroupMaintenanceViewName = "_base" | "_local" | "_minimal";
export type GroupMaintenanceView<
  V extends GroupMaintenanceViewName
> = V extends "_base"
  ? Pick<GroupMaintenance, "id" | "current_gang">
  : V extends "_local"
  ? Pick<GroupMaintenance, "id" | "current_gang">
  : never;
