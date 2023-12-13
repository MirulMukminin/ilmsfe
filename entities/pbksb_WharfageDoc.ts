import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthWharfage } from "./pbksb_BerthWharfage";
import { DocumentType } from "../enums/enums";
import { FileDescriptor } from "./base/sys$FileDescriptor";
export class WharfageDoc extends StandardEntity {
  static NAME = "pbksb_WharfageDoc";
  wharfage_id?: BerthWharfage | null;
  doc_type?: DocumentType | null;
  waste_code?: string | null;
  document_id?: string | null;
  file_descriptor?: FileDescriptor | null;
  upload_by?: string | null;
  upload_date?: any | null;
}
export type WharfageDocViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "wharfageDoc-view";
export type WharfageDocView<V extends WharfageDocViewName> = V extends "_base"
  ? Pick<
      WharfageDoc,
      | "id"
      | "doc_type"
      | "waste_code"
      | "document_id"
      | "upload_by"
      | "upload_date"
    >
  : V extends "_local"
  ? Pick<
      WharfageDoc,
      | "id"
      | "doc_type"
      | "waste_code"
      | "document_id"
      | "upload_by"
      | "upload_date"
    >
  : V extends "wharfageDoc-view"
  ? Pick<
      WharfageDoc,
      | "id"
      | "doc_type"
      | "waste_code"
      | "document_id"
      | "upload_by"
      | "upload_date"
      | "file_descriptor"
    >
  : never;
