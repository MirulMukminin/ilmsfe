import { DashboardLayout } from "./dashboard$DashboardLayout";
import { GridArea } from "./dashboard$GridArea";
export class GridLayout extends DashboardLayout {
  static NAME = "dashboard$GridLayout";
  rows?: number | null;
  columns?: number | null;
  areas?: GridArea | null;
}
export type GridLayoutViewName = "_base" | "_local" | "_minimal";
export type GridLayoutView<V extends GridLayoutViewName> = V extends "_base"
  ? Pick<GridLayout, "id" | "caption">
  : V extends "_minimal"
  ? Pick<GridLayout, "id" | "caption">
  : never;
