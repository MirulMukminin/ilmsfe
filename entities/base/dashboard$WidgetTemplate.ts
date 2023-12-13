import { StandardEntity } from "./sys$StandardEntity";
import { WidgetTemplateGroup } from "./dashboard$WidgetTemplateGroup";
export class WidgetTemplate extends StandardEntity {
  static NAME = "dashboard$WidgetTemplate";
  name?: string | null;
  isAvailableForAllUsers?: boolean | null;
  widgetModel?: string | null;
  group?: WidgetTemplateGroup | null;
}
export type WidgetTemplateViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "widget-group-view";
export type WidgetTemplateView<
  V extends WidgetTemplateViewName
> = V extends "_base"
  ? Pick<
      WidgetTemplate,
      "id" | "name" | "isAvailableForAllUsers" | "widgetModel"
    >
  : V extends "_local"
  ? Pick<
      WidgetTemplate,
      "id" | "name" | "isAvailableForAllUsers" | "widgetModel"
    >
  : V extends "widget-group-view"
  ? Pick<
      WidgetTemplate,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "name"
      | "isAvailableForAllUsers"
      | "widgetModel"
      | "group"
    >
  : never;
