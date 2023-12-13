import { StandardEntity } from "./base/sys$StandardEntity";
import { Build_Parts_Form } from "./pbksb_Build_Parts_Form";
import { Good } from "./pbksb_Good";
export class Parts_Issue extends StandardEntity {
  static NAME = "pbksb_Parts_Issue";
  form?: Build_Parts_Form | null;
  good?: Good | null;
  quantity?: any | null;
}
export type Parts_IssueViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "parts_Issue-view"
  | "parts_Issue_calculation-view";
export type Parts_IssueView<V extends Parts_IssueViewName> = V extends "_base"
  ? Pick<Parts_Issue, "id" | "quantity">
  : V extends "_local"
  ? Pick<Parts_Issue, "id" | "quantity">
  : V extends "parts_Issue-view"
  ? Pick<Parts_Issue, "id" | "quantity" | "form" | "good">
  : V extends "parts_Issue_calculation-view"
  ? Pick<Parts_Issue, "id" | "quantity" | "form" | "good">
  : never;
