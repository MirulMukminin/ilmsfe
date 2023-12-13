import { StandardEntity } from "./base/sys$StandardEntity";
import { Status } from "./pbksb_Status";
import { Dock } from "./pbksb_Dock";
import { Vessel } from "./pbksb_Vessel";
export class DockVesselOperation extends StandardEntity {
  static NAME = "pbksb_DockVesselOperation";
  date_arrival?: any | null;
  status?: Status | null;
  dock?: Dock | null;
  vessel?: Vessel | null;
}
export type DockVesselOperationViewName = "_base" | "_local" | "_minimal";
export type DockVesselOperationView<
  V extends DockVesselOperationViewName
> = V extends "_base"
  ? Pick<DockVesselOperation, "id" | "date_arrival">
  : V extends "_local"
  ? Pick<DockVesselOperation, "id" | "date_arrival">
  : never;
