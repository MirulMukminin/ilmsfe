import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { DocumentTypeEnum } from "../enums/enums";
import { GoodsReceiving } from "./pbksb_GoodsReceiving";
export class RequestDocument extends StandardEntity {
  static NAME = "pbksb_RequestDocument";
  name?: string | null;
  file?: FileDescriptor | null;
  type?: DocumentTypeEnum | null;
  goodsReceiving?: GoodsReceiving | null;
}
export type RequestDocumentViewName = "_base" | "_local" | "_minimal";
export type RequestDocumentView<
  V extends RequestDocumentViewName
> = V extends "_base"
  ? Pick<RequestDocument, "id" | "name" | "type">
  : V extends "_local"
  ? Pick<RequestDocument, "id" | "name" | "type">
  : V extends "_minimal"
  ? Pick<RequestDocument, "id" | "name">
  : never;
