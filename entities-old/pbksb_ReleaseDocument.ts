import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { DocumentTypeEnum } from "../enums/enums";
import { GoodsRelease } from "./pbksb_GoodsRelease";
export class ReleaseDocument extends StandardEntity {
  static NAME = "pbksb_ReleaseDocument";
  name?: string | null;
  file?: FileDescriptor | null;
  type?: DocumentTypeEnum | null;
  goodsRelease?: GoodsRelease | null;
}
export type ReleaseDocumentViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "releaseDocument-view";
export type ReleaseDocumentView<
  V extends ReleaseDocumentViewName
> = V extends "_base"
  ? Pick<ReleaseDocument, "id" | "name" | "type">
  : V extends "_local"
  ? Pick<ReleaseDocument, "id" | "name" | "type">
  : V extends "_minimal"
  ? Pick<ReleaseDocument, "id" | "name">
  : V extends "releaseDocument-view"
  ? Pick<ReleaseDocument, "id" | "name" | "type" | "file">
  : never;
