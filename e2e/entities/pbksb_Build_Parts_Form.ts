import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { Good_Category, Type_Of_Goods, Status } from "../enums/enums";
export class Build_Parts_Form extends StandardEntity {
  static NAME = "pbksb_Build_Parts_Form";
  issue_date?: any | null;
  customer?: Customer | null;
  request_no?: string | null;
  category?: Good_Category | null;
  good_type?: Type_Of_Goods | null;
  remarks?: string | null;
  status?: Status | null;
  request_by?: string | null;
  request_date?: any | null;
  approved_by?: string | null;
  approved_date?: any | null;
}
export type Build_Parts_FormViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "build_Parts_Form-view";
export type Build_Parts_FormView<
  V extends Build_Parts_FormViewName
> = V extends "_base"
  ? Pick<
      Build_Parts_Form,
      | "id"
      | "issue_date"
      | "request_no"
      | "category"
      | "good_type"
      | "remarks"
      | "status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
    >
  : V extends "_local"
  ? Pick<
      Build_Parts_Form,
      | "id"
      | "issue_date"
      | "request_no"
      | "category"
      | "good_type"
      | "remarks"
      | "status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
    >
  : V extends "build_Parts_Form-view"
  ? Pick<
      Build_Parts_Form,
      | "id"
      | "issue_date"
      | "request_no"
      | "category"
      | "good_type"
      | "remarks"
      | "status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "customer"
    >
  : never;
