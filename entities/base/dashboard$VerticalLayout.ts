import { DashboardLayout } from "./dashboard$DashboardLayout";
export class VerticalLayout extends DashboardLayout {
  static NAME = "dashboard$VerticalLayout";
}
export type VerticalLayoutViewName = "_base" | "_local" | "_minimal";
export type VerticalLayoutView<
  V extends VerticalLayoutViewName
> = V extends "_base"
  ? Pick<VerticalLayout, "id" | "caption">
  : V extends "_minimal"
  ? Pick<VerticalLayout, "id" | "caption">
  : never;
