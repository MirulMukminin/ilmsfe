import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthMaterialRequisition } from "./pbksb_BerthMaterialRequisition";
import { MaterialRequisitionItem } from "../enums/enums";
export class BerthMaterialRequisitionForm extends StandardEntity {
  static NAME = "pbksb_MaterialRequisitionForm";
  material_requisition?: BerthMaterialRequisition | null;
  underdeck_services?: MaterialRequisitionItem | null;
  tank_no?: string | null;
  product?: string | null;
  barrels_quantity?: number | null;
  tonnes_quantity?: number | null;
  tonnesQuantity?: any | null;
  start_time?: any | null;
  end_time?: any | null;
  invoiceQuantity?: number | null;
  invoiceQuantityBD?: any | null;
  invoiceUnitRate?: any | null;
  invoiceTotalPrice?: any | null;
  lineNo?: number | null;
  rateObjectId?: string | null;
}
export type BerthMaterialRequisitionFormViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthMaterialRequisitionForm-view";
export type BerthMaterialRequisitionFormView<
  V extends BerthMaterialRequisitionFormViewName
> = V extends "_base"
  ? Pick<
      BerthMaterialRequisitionForm,
      | "id"
      | "underdeck_services"
      | "tank_no"
      | "product"
      | "barrels_quantity"
      | "tonnes_quantity"
      | "tonnesQuantity"
      | "start_time"
      | "end_time"
      | "invoiceQuantity"
      | "invoiceQuantityBD"
      | "invoiceUnitRate"
      | "invoiceTotalPrice"
      | "lineNo"
      | "rateObjectId"
    >
  : V extends "_local"
  ? Pick<
      BerthMaterialRequisitionForm,
      | "id"
      | "underdeck_services"
      | "tank_no"
      | "product"
      | "barrels_quantity"
      | "tonnes_quantity"
      | "tonnesQuantity"
      | "start_time"
      | "end_time"
      | "invoiceQuantity"
      | "invoiceQuantityBD"
      | "invoiceUnitRate"
      | "invoiceTotalPrice"
      | "lineNo"
      | "rateObjectId"
    >
  : V extends "berthMaterialRequisitionForm-view"
  ? Pick<
      BerthMaterialRequisitionForm,
      | "id"
      | "underdeck_services"
      | "tank_no"
      | "product"
      | "barrels_quantity"
      | "tonnes_quantity"
      | "tonnesQuantity"
      | "start_time"
      | "end_time"
      | "invoiceQuantity"
      | "invoiceQuantityBD"
      | "invoiceUnitRate"
      | "invoiceTotalPrice"
      | "lineNo"
      | "rateObjectId"
      | "material_requisition"
    >
  : never;
