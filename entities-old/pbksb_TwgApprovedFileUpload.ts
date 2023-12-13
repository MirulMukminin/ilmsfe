import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { Twg } from "./pbksb_Twg";
export class TwgApprovedFileUpload extends StandardEntity {
  static NAME = "pbksb_TwgApprovedFileUpload";
  approvedFile?: FileDescriptor | null;
  twg?: Twg | null;
  fileName?: string | null;
}
export type TwgApprovedFileUploadViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "twgApprovedFileUpload-view";
export type TwgApprovedFileUploadView<
  V extends TwgApprovedFileUploadViewName
> = V extends "_base"
  ? Pick<TwgApprovedFileUpload, "id" | "fileName">
  : V extends "_local"
  ? Pick<TwgApprovedFileUpload, "id" | "fileName">
  : V extends "twgApprovedFileUpload-view"
  ? Pick<
      TwgApprovedFileUpload,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "fileName"
      | "approvedFile"
    >
  : never;
