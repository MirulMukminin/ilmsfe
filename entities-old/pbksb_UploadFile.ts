import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
export class UploadFile extends StandardEntity {
  static NAME = "pbksb_UploadFile";
  file?: FileDescriptor | null;
  nameID?: string | null;
  name?: string | null;
}
export type UploadFileViewName = "_base" | "_local" | "_minimal";
export type UploadFileView<V extends UploadFileViewName> = V extends "_base"
  ? Pick<UploadFile, "id" | "name" | "nameID">
  : V extends "_local"
  ? Pick<UploadFile, "id" | "nameID" | "name">
  : V extends "_minimal"
  ? Pick<UploadFile, "id" | "name">
  : never;
