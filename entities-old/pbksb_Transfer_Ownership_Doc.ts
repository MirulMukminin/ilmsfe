import { StandardEntity } from "./base/sys$StandardEntity";
import { Transfer_Ownership } from "./pbksb_Transfer_ownership";
import { FileDescriptor } from "./base/sys$FileDescriptor";
export class Transfer_Ownership_Doc extends StandardEntity {
  static NAME = "pbksb_Transfer_Ownership_Doc";
  transfer_ownership?: Transfer_Ownership | null;
  file_descriptor?: FileDescriptor | null;
  file_upload?: any | null;
  file_ID?: string | null;
  file_name?: string | null;
}
export type Transfer_Ownership_DocViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "transfer_Ownership_Doc-view";
export type Transfer_Ownership_DocView<
  V extends Transfer_Ownership_DocViewName
> = V extends "_base"
  ? Pick<Transfer_Ownership_Doc, "id" | "file_upload" | "file_ID" | "file_name">
  : V extends "_local"
  ? Pick<Transfer_Ownership_Doc, "id" | "file_upload" | "file_ID" | "file_name">
  : V extends "transfer_Ownership_Doc-view"
  ? Pick<
      Transfer_Ownership_Doc,
      | "id"
      | "file_upload"
      | "file_ID"
      | "file_name"
      | "transfer_ownership"
      | "file_descriptor"
    >
  : never;
