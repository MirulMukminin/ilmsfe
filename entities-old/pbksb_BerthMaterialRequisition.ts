import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { Agent } from "./pbksb_Agent";
import { Vessel } from "./pbksb_Vessel";
import { BerthForm } from "./pbksb_BerthForm";
import { MarineStatus } from "../enums/enums";
export class BerthMaterialRequisition extends StandardEntity {
  static NAME = "pbksb_BerthMaterialRequisition";
  request_ref?: string | null;
  client?: Customer | null;
  customer_user?: Agent | null;
  location?: string | null;
  vessel?: Vessel | null;
  date?: any | null;
  remarks?: string | null;
  berth_form?: BerthForm | null;
  status?: MarineStatus | null;
  material_requisition_no?: string | null;
}
export type BerthMaterialRequisitionViewName = "_base" | "_local" | "_minimal";
export type BerthMaterialRequisitionView<
  V extends BerthMaterialRequisitionViewName
> = V extends "_base"
  ? Pick<
      BerthMaterialRequisition,
      | "id"
      | "request_ref"
      | "location"
      | "date"
      | "remarks"
      | "status"
      | "material_requisition_no"
    >
  : V extends "_local"
  ? Pick<
      BerthMaterialRequisition,
      | "id"
      | "request_ref"
      | "location"
      | "date"
      | "remarks"
      | "status"
      | "material_requisition_no"
    >
  : never;
