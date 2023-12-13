import { StandardEntity } from "./base/sys$StandardEntity";
import { DockVesselOperation } from "./pbksb_DockVesselOperation";
export class Status extends StandardEntity {
  static NAME = "pbksb_Status";
  description?: string | null;
  dockVesselOperation?: DockVesselOperation | null;
}
export type StatusViewName = "_base" | "_local" | "_minimal";
export type StatusView<V extends StatusViewName> = V extends "_base"
  ? Pick<Status, "id" | "description">
  : V extends "_local"
  ? Pick<Status, "id" | "description">
  : V extends "_minimal"
  ? Pick<Status, "id" | "description">
  : never;
