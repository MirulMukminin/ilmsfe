import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { Parameter } from "./dashboard$Parameter";
import { Dashboard } from "./dashboard$Dashboard";
export class Widget extends BaseUuidEntity {
  static NAME = "dashboard$Widget";
  showWidgetCaption?: boolean | null;
  widgetId?: string | null;
  caption?: string | null;
  name?: string | null;
  description?: string | null;
  parameters?: Parameter | null;
  widgetFields?: Parameter | null;
  frameId?: string | null;
  dashboard?: Dashboard | null;
  createdBy?: string | null;
}
export type WidgetViewName = "_base" | "_local" | "_minimal";
export type WidgetView<V extends WidgetViewName> = V extends "_base"
  ? Pick<Widget, "id" | "caption">
  : V extends "_minimal"
  ? Pick<Widget, "id" | "caption">
  : never;
