import { StandardEntity } from "./base/sys$StandardEntity";
import { Group } from "./pbksb_Group";
import { Site } from "./pbksb_Site";
import { Decision_Site, Group_Site_Status } from "../enums/enums";
export class Group_Site extends StandardEntity {
  static NAME = "pbksb_Group_Site";
  employee_group?: Group | null;
  site_1?: Site | null;
  site_2?: Site | null;
  decision?: Decision_Site | null;
  site_group_status?: Group_Site_Status | null;
}
export type Group_SiteViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "group_Site-view";
export type Group_SiteView<V extends Group_SiteViewName> = V extends "_base"
  ? Pick<Group_Site, "id" | "decision" | "site_group_status">
  : V extends "_local"
  ? Pick<Group_Site, "id" | "decision" | "site_group_status">
  : V extends "group_Site-view"
  ? Pick<
      Group_Site,
      | "id"
      | "decision"
      | "site_group_status"
      | "employee_group"
      | "site_1"
      | "site_2"
    >
  : never;
