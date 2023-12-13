import { StandardEntity } from "./base/sys$StandardEntity";
import { Job_MHE } from "./pbksb_Job_MHE";
export class Job_MHE_Mobile_FileUpload extends StandardEntity {
  static NAME = "pbksb_Job_MHE_Mobile_FileUpload";
  jobMHE?: Job_MHE | null;
  imageFile?: string | null;
  sequence?: number | null;
}
export type Job_MHE_Mobile_FileUploadViewName = "_base" | "_local" | "_minimal";
export type Job_MHE_Mobile_FileUploadView<
  V extends Job_MHE_Mobile_FileUploadViewName
> = V extends "_base"
  ? Pick<Job_MHE_Mobile_FileUpload, "id" | "imageFile" | "sequence">
  : V extends "_local"
  ? Pick<Job_MHE_Mobile_FileUpload, "id" | "imageFile" | "sequence">
  : never;
