import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { DocumentTypeEnum } from "../enums/enums";
import { RequestStorage } from "./pbksb_RequestStorage";
export class ICWStorageDocument extends StandardEntity {
  static NAME = "pbksb_ICWStorageDocument";
  name?: string | null;
  file?: FileDescriptor | null;
  type?: DocumentTypeEnum | null;
  requestStorage?: RequestStorage | null;
}
export type ICWStorageDocumentViewName = "_base" | "_local" | "_minimal";
export type ICWStorageDocumentView<
  V extends ICWStorageDocumentViewName
> = V extends "_base"
  ? Pick<ICWStorageDocument, "id" | "name" | "type">
  : V extends "_local"
  ? Pick<ICWStorageDocument, "id" | "name" | "type">
  : V extends "_minimal"
  ? Pick<ICWStorageDocument, "id" | "name">
  : never;
