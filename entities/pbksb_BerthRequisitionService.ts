import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthMaterialRequisition } from "./pbksb_BerthMaterialRequisition";
import { MaterialRequisitionServiceType } from "../enums/enums";
export class BerthMaterialRequisitionService extends StandardEntity {
  static NAME = "pbksb_BerthRequisitionService";
  material_requisition?: BerthMaterialRequisition | null;
  service_type?: MaterialRequisitionServiceType | null;
  indicator?: boolean | null;
}
export type BerthMaterialRequisitionServiceViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type BerthMaterialRequisitionServiceView<
  V extends BerthMaterialRequisitionServiceViewName
> = V extends "_base"
  ? Pick<BerthMaterialRequisitionService, "id" | "service_type" | "indicator">
  : V extends "_local"
  ? Pick<BerthMaterialRequisitionService, "id" | "service_type" | "indicator">
  : never;
