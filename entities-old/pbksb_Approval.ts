import { StandardEntity } from "./base/sys$StandardEntity";
export class Approval extends StandardEntity {
  static NAME = "pbksb_Approval";
  expensesAmount?: string | null;
  expensesDate?: any | null;
}
export type ApprovalViewName = "_base" | "_local" | "_minimal";
export type ApprovalView<V extends ApprovalViewName> = V extends "_base"
  ? Pick<Approval, "id" | "expensesAmount" | "expensesDate">
  : V extends "_local"
  ? Pick<Approval, "id" | "expensesAmount" | "expensesDate">
  : never;
