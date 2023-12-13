import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthMobile } from "./pbksb_BerthMobile";
import { FileDescriptor } from "./base/sys$FileDescriptor";
export class Mobile_JobMHE_FileUpload extends StandardEntity {
  static NAME = "pbksb_Mobile_JobMHE_FileUpload";
  berth_mobile?: BerthMobile | null;
  file_descriptor?: FileDescriptor | null;
  file_upload?: any | null;
  file_ID?: string | null;
  file_name?: string | null;
}
export type Mobile_JobMHE_FileUploadViewName = "_base" | "_local" | "_minimal";
export type Mobile_JobMHE_FileUploadView<
  V extends Mobile_JobMHE_FileUploadViewName
> = V extends "_base"
  ? Pick<
      Mobile_JobMHE_FileUpload,
      "id" | "file_upload" | "file_ID" | "file_name"
    >
  : V extends "_local"
  ? Pick<
      Mobile_JobMHE_FileUpload,
      "id" | "file_upload" | "file_ID" | "file_name"
    >
  : never;
