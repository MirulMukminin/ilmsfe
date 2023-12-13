import { StandardEntity } from "./base/sys$StandardEntity";
import { ChemicalType } from "./pbksb_ChemicalType";
import { RequestTransfer } from "./pbksb_RequestTransfer";
export class ICWRequestTransferLineItem extends StandardEntity {
  static NAME = "pbksb_ICWRequestTransferLineItem";
  chemicalType?: ChemicalType | null;
  outQuantity?: number | null;
  outDate?: any | null;
  remarks?: string | null;
  requestTransfer?: RequestTransfer | null;
}
export type ICWRequestTransferLineItemViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "iCWRequestTransferLineItem-view";
export type ICWRequestTransferLineItemView<
  V extends ICWRequestTransferLineItemViewName
> = V extends "_base"
  ? Pick<
      ICWRequestTransferLineItem,
      "id" | "outQuantity" | "outDate" | "remarks"
    >
  : V extends "_local"
  ? Pick<
      ICWRequestTransferLineItem,
      "id" | "outQuantity" | "outDate" | "remarks"
    >
  : V extends "iCWRequestTransferLineItem-view"
  ? Pick<
      ICWRequestTransferLineItem,
      "id" | "outQuantity" | "outDate" | "remarks" | "chemicalType"
    >
  : never;
