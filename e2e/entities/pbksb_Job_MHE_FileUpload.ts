import { StandardEntity } from "./base/sys$StandardEntity";
import { Job_MHE } from "./pbksb_Job_MHE";
import { FileDescriptor } from "./base/sys$FileDescriptor";
export class Job_MHE_FileUpload extends StandardEntity {
  static NAME = "pbksb_Job_MHE_FileUpload";
  job_MHE?: Job_MHE | null;
  file_descriptor?: FileDescriptor | null;
  file_upload?: any | null;
  file_ID?: string | null;
  file_name?: string | null;
}
export type Job_MHE_FileUploadViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "job_MHE_FileUpload-view";
export type Job_MHE_FileUploadView<
  V extends Job_MHE_FileUploadViewName
> = V extends "_base"
  ? Pick<Job_MHE_FileUpload, "id" | "file_upload" | "file_ID" | "file_name">
  : V extends "_local"
  ? Pick<Job_MHE_FileUpload, "id" | "file_upload" | "file_ID" | "file_name">
  : V extends "job_MHE_FileUpload-view"
  ? Pick<
      Job_MHE_FileUpload,
      | "id"
      | "file_upload"
      | "file_ID"
      | "file_name"
      | "file_descriptor"
      | "job_MHE"
    >
  : never;
