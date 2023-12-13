import { StandardEntity } from "./sys$StandardEntity";
import { WidgetTemplate } from "./dashboard$WidgetTemplate";
export class WidgetTemplateGroup extends StandardEntity {
  static NAME = "dashboard$WidgetTemplateGroup";
  name?: string | null;
  widgetTemplates?: WidgetTemplate[] | null;
}
export type WidgetTemplateGroupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "widget-templates";
export type WidgetTemplateGroupView<
  V extends WidgetTemplateGroupViewName
> = V extends "_base"
  ? Pick<WidgetTemplateGroup, "id" | "name">
  : V extends "_local"
  ? Pick<WidgetTemplateGroup, "id" | "name">
  : V extends "_minimal"
  ? Pick<WidgetTemplateGroup, "id" | "name">
  : V extends "widget-templates"
  ? Pick<WidgetTemplateGroup, "id" | "name" | "widgetTemplates">
  : never;
