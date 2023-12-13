import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { Twg } from "./pbksb_Twg";
export class TwgFileUpload extends StandardEntity {
  static NAME = "pbksb_TwgFileUpload";
  uploadedFile?: FileDescriptor | null;
  twg?: Twg | null;
  fileName?: string | null;
  fileId?: string | null;
}
export type TwgFileUploadViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "twgFileUpload-view";
export type TwgFileUploadView<
  V extends TwgFileUploadViewName
> = V extends "_base"
  ? Pick<TwgFileUpload, "id" | "fileName" | "fileId">
  : V extends "_local"
  ? Pick<TwgFileUpload, "id" | "fileName" | "fileId">
  : V extends "twgFileUpload-view"
  ? Pick<
      TwgFileUpload,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "fileName"
      | "fileId"
      | "uploadedFile"
    >
  : never;
