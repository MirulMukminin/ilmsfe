import { StandardEntity } from "./base/sys$StandardEntity";
import { Gang_Type_Status, GroupStatusEnum } from "../enums/enums";
import { Site } from "./pbksb_Site";
import { Group_Site } from "./pbksb_Group_Site";
export class Group extends StandardEntity {
  static NAME = "pbksb_Group";
  name?: string | null;
  gang?: Gang_Type_Status | null;
  site?: Site | null;
  site_Group?: Group_Site | null;
  group_Status?: GroupStatusEnum | null;
}
export type GroupViewName = "_base" | "_local" | "_minimal" | "group-view";
export type GroupView<V extends GroupViewName> = V extends "_base"
  ? Pick<Group, "id" | "name" | "gang" | "group_Status">
  : V extends "_local"
  ? Pick<Group, "id" | "name" | "gang" | "group_Status">
  : V extends "_minimal"
  ? Pick<Group, "id" | "name">
  : V extends "group-view"
  ? Pick<Group, "id" | "name" | "gang" | "group_Status" | "site" | "site_Group">
  : never;
