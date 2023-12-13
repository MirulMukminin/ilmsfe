import { VerticalLayout } from "./dashboard$VerticalLayout";
export class RootLayout extends VerticalLayout {
  static NAME = "dashboard$RootLayout";
}
export type RootLayoutViewName = "_base" | "_local" | "_minimal";
export type RootLayoutView<V extends RootLayoutViewName> = V extends "_base"
  ? Pick<RootLayout, "id" | "caption">
  : V extends "_minimal"
  ? Pick<RootLayout, "id" | "caption">
  : never;
