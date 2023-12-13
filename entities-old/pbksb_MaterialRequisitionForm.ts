import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthMaterialRequisition } from "./pbksb_BerthMaterialRequisition";
import { UnderdeckItem } from "../enums/enums";
export class BerthMaterialRequisitionForm extends StandardEntity {
  static NAME = "pbksb_MaterialRequisitionForm";
  material_requisition?: BerthMaterialRequisition | null;
  underdeck_services?: UnderdeckItem | null;
  product?: string | null;
  barrels_quantity?: number | null;
  tonnes_quantity?: number | null;
  start_time?: any | null;
  end_time?: any | null;
}
export type BerthMaterialRequisitionFormViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type BerthMaterialRequisitionFormView<
  V extends BerthMaterialRequisitionFormViewName
> = V extends "_base"
  ? Pick<
      BerthMaterialRequisitionForm,
      | "id"
      | "underdeck_services"
      | "product"
      | "barrels_quantity"
      | "tonnes_quantity"
      | "start_time"
      | "end_time"
    >
  : V extends "_local"
  ? Pick<
      BerthMaterialRequisitionForm,
      | "id"
      | "underdeck_services"
      | "product"
      | "barrels_quantity"
      | "tonnes_quantity"
      | "start_time"
      | "end_time"
    >
  : never;
