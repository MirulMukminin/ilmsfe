import { StandardEntity } from "./base/sys$StandardEntity";
import { ScheduledWaste } from "./pbksb_ScheduledWaste";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { OutboundSoDocumentType } from "../enums/enums";
export class OutboundSoFileUpload extends StandardEntity {
  static NAME = "pbksb_OutboundSoFileUpload";
  scheduledWaste?: ScheduledWaste | null;
  uploadedFile?: FileDescriptor | null;
  soDocType?: OutboundSoDocumentType | null;
}
export type OutboundSoFileUploadViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "outboundSoFileUpload-view";
export type OutboundSoFileUploadView<
  V extends OutboundSoFileUploadViewName
> = V extends "_base"
  ? Pick<OutboundSoFileUpload, "id" | "soDocType">
  : V extends "_local"
  ? Pick<OutboundSoFileUpload, "id" | "soDocType">
  : V extends "outboundSoFileUpload-view"
  ? Pick<
      OutboundSoFileUpload,
      "id" | "soDocType" | "scheduledWaste" | "uploadedFile"
    >
  : never;
