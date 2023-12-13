import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { DocumentTypeEnum } from "../enums/enums";
import { ICWAS } from "./pbksb_ICWAS";
export class ICWASDocument extends StandardEntity {
  static NAME = "pbksb_ICWASDocument";
  name?: string | null;
  file?: FileDescriptor | null;
  type?: DocumentTypeEnum | null;
  iCWAS?: ICWAS | null;
}
export type ICWASDocumentViewName = "_base" | "_local" | "_minimal";
export type ICWASDocumentView<
  V extends ICWASDocumentViewName
> = V extends "_base"
  ? Pick<ICWASDocument, "id" | "name" | "type">
  : V extends "_local"
  ? Pick<ICWASDocument, "id" | "name" | "type">
  : V extends "_minimal"
  ? Pick<ICWASDocument, "id" | "name">
  : never;
