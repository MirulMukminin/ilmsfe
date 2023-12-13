import { DashboardLayout } from "./dashboard$DashboardLayout";
export class HorizontalLayout extends DashboardLayout {
  static NAME = "dashboard$HorizontalLayout";
}
export type HorizontalLayoutViewName = "_base" | "_local" | "_minimal";
export type HorizontalLayoutView<
  V extends HorizontalLayoutViewName
> = V extends "_base"
  ? Pick<HorizontalLayout, "id" | "caption">
  : V extends "_minimal"
  ? Pick<HorizontalLayout, "id" | "caption">
  : never;
