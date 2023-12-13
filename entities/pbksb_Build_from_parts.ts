import { StandardEntity } from "./base/sys$StandardEntity";
import { Category_Type, Type_Of_Goods } from "../enums/enums";
import { Site } from "./pbksb_Site";
export class Build_from_parts extends StandardEntity {
  static NAME = "pbksb_Build_from_parts";
  part_issue_date?: any | null;
  category?: Category_Type | null;
  type_of_goods?: Type_Of_Goods | null;
  file_upload?: any | null;
  remarks?: string | null;
  part_issues?: string | null;
  quanlity_part_issue?: number | null;
  location_part_issue?: Site | null;
  new_parts?: string | null;
  quantity_new_parts?: number | null;
  location_new_parts?: Site | null;
}
export type Build_from_partsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "build_from_parts-view";
export type Build_from_partsView<
  V extends Build_from_partsViewName
> = V extends "_base"
  ? Pick<
      Build_from_parts,
      | "id"
      | "part_issue_date"
      | "category"
      | "type_of_goods"
      | "file_upload"
      | "remarks"
      | "part_issues"
      | "quanlity_part_issue"
      | "new_parts"
      | "quantity_new_parts"
    >
  : V extends "_local"
  ? Pick<
      Build_from_parts,
      | "id"
      | "part_issue_date"
      | "category"
      | "type_of_goods"
      | "file_upload"
      | "remarks"
      | "part_issues"
      | "quanlity_part_issue"
      | "new_parts"
      | "quantity_new_parts"
    >
  : V extends "build_from_parts-view"
  ? Pick<
      Build_from_parts,
      | "id"
      | "part_issue_date"
      | "category"
      | "type_of_goods"
      | "file_upload"
      | "remarks"
      | "part_issues"
      | "quanlity_part_issue"
      | "new_parts"
      | "quantity_new_parts"
      | "location_part_issue"
      | "location_new_parts"
    >
  : never;
