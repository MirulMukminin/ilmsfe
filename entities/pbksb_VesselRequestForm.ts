import { StandardEntity } from "./base/sys$StandardEntity";
import { Requestform } from "./pbksb_Requestform";
import { Vessel } from "./pbksb_Vessel";
export class VesselRequestForm extends StandardEntity {
  static NAME = "pbksb_VesselRequestForm";
  requestform?: Requestform | null;
  vessel?: Vessel | null;
}
export type VesselRequestFormViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "vesselRequestForm-view";
export type VesselRequestFormView<
  V extends VesselRequestFormViewName
> = V extends "vesselRequestForm-view"
  ? Pick<VesselRequestForm, "id" | "requestform" | "vessel">
  : never;
