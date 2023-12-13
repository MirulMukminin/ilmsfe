import { StandardEntity } from "./base/sys$StandardEntity";
import { Division } from "./pbksb_Division";
import { SiteViewInListBoxEnum, SiteCategory } from "../enums/enums";
import { Group_Site } from "./pbksb_Group_Site";
import { Job } from "./pbksb_Job";
export class Site extends StandardEntity {
  static NAME = "pbksb_Site";
  description?: string | null;
  division?: Division | null;
  view_in_list_box?: SiteViewInListBoxEnum | null;
  site_Group_1?: Group_Site | null;
  site_Group_2?: Group_Site | null;
  job?: Job | null;
  category?: SiteCategory | null;
}
export type SiteViewName = "_base" | "_local" | "_minimal" | "site-view";
export type SiteView<V extends SiteViewName> = V extends "_base"
  ? Pick<Site, "id" | "description" | "view_in_list_box" | "category">
  : V extends "_local"
  ? Pick<Site, "id" | "description" | "view_in_list_box" | "category">
  : V extends "_minimal"
  ? Pick<Site, "id" | "description">
  : V extends "site-view"
  ? Pick<
      Site,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "description"
      | "view_in_list_box"
      | "category"
      | "division"
    >
  : never;
