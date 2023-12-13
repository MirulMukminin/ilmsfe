import { WidgetLayout } from "./dashboard$WidgetLayout";
export class WidgetTemplateLayout extends WidgetLayout {
  static NAME = "dashboard$WidgetTemplateLayout";
}
export type WidgetTemplateLayoutViewName = "_base" | "_local" | "_minimal";
export type WidgetTemplateLayoutView<
  V extends WidgetTemplateLayoutViewName
> = V extends "_base"
  ? Pick<WidgetTemplateLayout, "id" | "caption">
  : V extends "_minimal"
  ? Pick<WidgetTemplateLayout, "id" | "caption">
  : never;
