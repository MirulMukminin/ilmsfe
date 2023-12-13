import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthMaterialRequisition } from "./pbksb_BerthMaterialRequisition";
import { DocumentType } from "../enums/enums";
import { FileDescriptor } from "./base/sys$FileDescriptor";
export class BerthMaterialRequisitionDoc extends StandardEntity {
  static NAME = "pbksb_BerthMaterialRequisitionDoc";
  material_requisition?: BerthMaterialRequisition | null;
  waste_code?: string | null;
  document_id?: string | null;
  doc_type?: DocumentType | null;
  upload_by?: string | null;
  upload_date?: any | null;
  file_descriptor?: FileDescriptor | null;
}
export type BerthMaterialRequisitionDocViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthMaterialRequisitionDoc-view";
export type BerthMaterialRequisitionDocView<
  V extends BerthMaterialRequisitionDocViewName
> = V extends "_base"
  ? Pick<
      BerthMaterialRequisitionDoc,
      | "id"
      | "waste_code"
      | "document_id"
      | "doc_type"
      | "upload_by"
      | "upload_date"
    >
  : V extends "_local"
  ? Pick<
      BerthMaterialRequisitionDoc,
      | "id"
      | "waste_code"
      | "document_id"
      | "doc_type"
      | "upload_by"
      | "upload_date"
    >
  : V extends "berthMaterialRequisitionDoc-view"
  ? Pick<
      BerthMaterialRequisitionDoc,
      | "id"
      | "waste_code"
      | "document_id"
      | "doc_type"
      | "upload_by"
      | "upload_date"
      | "material_requisition"
      | "file_descriptor"
    >
  : never;
