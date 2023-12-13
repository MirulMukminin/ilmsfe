import { StandardEntity } from "./base/sys$StandardEntity";
import { ScheduledWaste } from "./pbksb_ScheduledWaste";
import { FileDescriptor } from "./base/sys$FileDescriptor";
export class InboundSoFileUpload extends StandardEntity {
  static NAME = "pbksb_InboundSoFileUpload";
  scheduledWaste?: ScheduledWaste | null;
  uploadedFile?: FileDescriptor | null;
}
export type InboundSoFileUploadViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "inboundSoFileUpload-view";
export type InboundSoFileUploadView<
  V extends InboundSoFileUploadViewName
> = V extends "inboundSoFileUpload-view"
  ? Pick<InboundSoFileUpload, "id" | "scheduledWaste" | "uploadedFile">
  : never;
