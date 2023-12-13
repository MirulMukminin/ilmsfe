import { StandardEntity } from "./base/sys$StandardEntity";
import { Build_Parts_Form } from "./pbksb_Build_Parts_Form";
import { FileDescriptor } from "./base/sys$FileDescriptor";
export class Build_Parts_Form_Doc extends StandardEntity {
  static NAME = "pbksb_Build_Parts_Form_Doc";
  form?: Build_Parts_Form | null;
  file_descriptor?: FileDescriptor | null;
  file_upload?: any | null;
  file_ID?: string | null;
  file_name?: string | null;
}
export type Build_Parts_Form_DocViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "build_Parts_Form_Doc-view";
export type Build_Parts_Form_DocView<
  V extends Build_Parts_Form_DocViewName
> = V extends "_base"
  ? Pick<Build_Parts_Form_Doc, "id" | "file_upload" | "file_ID" | "file_name">
  : V extends "_local"
  ? Pick<Build_Parts_Form_Doc, "id" | "file_upload" | "file_ID" | "file_name">
  : V extends "build_Parts_Form_Doc-view"
  ? Pick<
      Build_Parts_Form_Doc,
      | "id"
      | "file_upload"
      | "file_ID"
      | "file_name"
      | "form"
      | "file_descriptor"
    >
  : never;
