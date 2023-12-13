import { StandardEntity } from "./base/sys$StandardEntity";
import {
  MaterialRequisitionServiceType,
  BerthName,
  MarineStatus
} from "../enums/enums";
import { Customer } from "./pbksb_Customer";
import { Vessel } from "./pbksb_Vessel";
import { BerthForm } from "./pbksb_BerthForm";
export class BerthMaterialRequisition extends StandardEntity {
  static NAME = "pbksb_BerthMaterialRequisition";
  request_ref?: string | null;
  type_service?: MaterialRequisitionServiceType | null;
  request_by_company?: Customer | null;
  client?: Customer | null;
  endorsed_by?: string | null;
  endorsed_date?: any | null;
  customer_user?: Customer | null;
  location?: BerthName | null;
  vessel?: Vessel | null;
  date?: any | null;
  remarks?: string | null;
  berth_form?: BerthForm | null;
  status?: MarineStatus | null;
  material_requisition_no?: string | null;
  reject_reason?: string | null;
}
export type BerthMaterialRequisitionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthMaterialRequisition-view";
export type BerthMaterialRequisitionView<
  V extends BerthMaterialRequisitionViewName
> = V extends "_base"
  ? Pick<
      BerthMaterialRequisition,
      | "id"
      | "request_ref"
      | "type_service"
      | "endorsed_by"
      | "endorsed_date"
      | "location"
      | "date"
      | "remarks"
      | "status"
      | "material_requisition_no"
      | "reject_reason"
    >
  : V extends "_local"
  ? Pick<
      BerthMaterialRequisition,
      | "id"
      | "request_ref"
      | "type_service"
      | "endorsed_by"
      | "endorsed_date"
      | "location"
      | "date"
      | "remarks"
      | "status"
      | "material_requisition_no"
      | "reject_reason"
    >
  : V extends "berthMaterialRequisition-view"
  ? Pick<
      BerthMaterialRequisition,
      | "id"
      | "request_ref"
      | "type_service"
      | "endorsed_by"
      | "endorsed_date"
      | "location"
      | "date"
      | "remarks"
      | "status"
      | "material_requisition_no"
      | "reject_reason"
      | "client"
      | "customer_user"
      | "vessel"
      | "request_by_company"
    >
  : never;
