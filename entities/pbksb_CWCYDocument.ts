import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { CWCYGoodsStorageRequest } from "./pbksb_CWCYGoodsStorageRequest";
import { CWCYGoodsReleaseRequest } from "./pbksb_CWCYGoodsReleaseRequest";
export class CWCYDocument extends StandardEntity {
  static NAME = "pbksb_CWCYDocument";
  name?: string | null;
  file?: FileDescriptor | null;
  type?: string | null;
  cwcyGoodsStorage?: CWCYGoodsStorageRequest | null;
  cWCYGoodsReleaseRequest?: CWCYGoodsReleaseRequest | null;
}
export type CWCYDocumentViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "cWCYDocument-view";
export type CWCYDocumentView<V extends CWCYDocumentViewName> = V extends "_base"
  ? Pick<CWCYDocument, "id" | "name" | "type">
  : V extends "_local"
  ? Pick<CWCYDocument, "id" | "name" | "type">
  : V extends "_minimal"
  ? Pick<CWCYDocument, "id" | "name">
  : V extends "cWCYDocument-view"
  ? Pick<CWCYDocument, "id" | "name" | "type" | "file">
  : never;
