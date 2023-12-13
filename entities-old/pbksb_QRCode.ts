import { StandardEntity } from "./base/sys$StandardEntity";
export class QRCode extends StandardEntity {
  static NAME = "pbksb_QRCode";
}
export type QRCodeViewName = "_base" | "_local" | "_minimal";
export type QRCodeView<V extends QRCodeViewName> = never;
