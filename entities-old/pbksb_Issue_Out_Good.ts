import { StandardEntity } from "./base/sys$StandardEntity";
import { Goods_OUT } from "./pbksb_Goods_OUT";
import { Good } from "./pbksb_Good";
export class Good_Out_Issue extends StandardEntity {
  static NAME = "pbksb_Issue_Out_Good";
  good_out?: Goods_OUT | null;
  good?: Good | null;
  withdrawal_quantity?: any | null;
}
export type Good_Out_IssueViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "good_Out_Issue-view-CUBAView"
  | "good_Out_Issue_API-view";
export type Good_Out_IssueView<
  V extends Good_Out_IssueViewName
> = V extends "_base"
  ? Pick<Good_Out_Issue, "id" | "withdrawal_quantity">
  : V extends "_local"
  ? Pick<Good_Out_Issue, "id" | "withdrawal_quantity">
  : V extends "good_Out_Issue-view-CUBAView"
  ? Pick<Good_Out_Issue, "id" | "withdrawal_quantity" | "good_out" | "good">
  : V extends "good_Out_Issue_API-view"
  ? Pick<Good_Out_Issue, "id" | "withdrawal_quantity" | "good">
  : never;
