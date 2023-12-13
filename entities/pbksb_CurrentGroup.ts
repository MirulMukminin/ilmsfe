import { StandardEntity } from "./base/sys$StandardEntity";
import { Gang_Type, GroupEnum, SiteCategory } from "../enums/enums";
export class CurrentGroup extends StandardEntity {
  static NAME = "pbksb_CurrentGroup";
  gang?: Gang_Type | null;
  group?: GroupEnum | null;
  site_category?: SiteCategory | null;
}
export type CurrentGroupViewName = "_base" | "_local" | "_minimal";
export type CurrentGroupView<V extends CurrentGroupViewName> = V extends "_base"
  ? Pick<CurrentGroup, "id" | "gang" | "group" | "site_category">
  : V extends "_local"
  ? Pick<CurrentGroup, "id" | "gang" | "group" | "site_category">
  : never;
