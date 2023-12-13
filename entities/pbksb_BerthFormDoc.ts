import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { DocumentType } from "../enums/enums";
import { FileDescriptor } from "./base/sys$FileDescriptor";
export class BerthFormDoc extends StandardEntity {
  static NAME = "pbksb_BerthFormDoc";
  berth_form?: BerthForm | null;
  doc_type?: DocumentType | null;
  waste_code?: string | null;
  document_id?: string | null;
  file_descriptor?: FileDescriptor | null;
  upload_by?: string | null;
  upload_date?: any | null;
}
export type BerthFormDocViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthFormDoc-view";
export type BerthFormDocView<V extends BerthFormDocViewName> = V extends "_base"
  ? Pick<
      BerthFormDoc,
      | "id"
      | "doc_type"
      | "waste_code"
      | "document_id"
      | "upload_by"
      | "upload_date"
    >
  : V extends "_local"
  ? Pick<
      BerthFormDoc,
      | "id"
      | "doc_type"
      | "waste_code"
      | "document_id"
      | "upload_by"
      | "upload_date"
    >
  : V extends "berthFormDoc-view"
  ? Pick<
      BerthFormDoc,
      | "id"
      | "doc_type"
      | "waste_code"
      | "document_id"
      | "upload_by"
      | "upload_date"
      | "file_descriptor"
    >
  : never;
