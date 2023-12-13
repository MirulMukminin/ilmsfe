import { DashboardLayout } from "./dashboard$DashboardLayout";
export class CssLayout extends DashboardLayout {
  static NAME = "dashboard$CssLayout";
  responsive?: boolean | null;
}
export type CssLayoutViewName = "_base" | "_local" | "_minimal";
export type CssLayoutView<V extends CssLayoutViewName> = V extends "_base"
  ? Pick<CssLayout, "id" | "caption">
  : V extends "_minimal"
  ? Pick<CssLayout, "id" | "caption">
  : never;
