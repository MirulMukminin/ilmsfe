import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { DocumentTypeEnum } from "../enums/enums";
import { RequestTransfer } from "./pbksb_RequestTransfer";
export class ICWTransferDocument extends StandardEntity {
  static NAME = "pbksb_ICWTransferDocument";
  name?: string | null;
  file?: FileDescriptor | null;
  type?: DocumentTypeEnum | null;
  requestTransfer?: RequestTransfer | null;
}
export type ICWTransferDocumentViewName = "_base" | "_local" | "_minimal";
export type ICWTransferDocumentView<
  V extends ICWTransferDocumentViewName
> = V extends "_base"
  ? Pick<ICWTransferDocument, "id" | "name" | "type">
  : V extends "_local"
  ? Pick<ICWTransferDocument, "id" | "name" | "type">
  : V extends "_minimal"
  ? Pick<ICWTransferDocument, "id" | "name">
  : never;
