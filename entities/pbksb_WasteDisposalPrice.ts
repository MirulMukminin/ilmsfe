import { StandardEntity } from "./base/sys$StandardEntity";
import { WasteDisposalPriceList } from "./pbksb_WasteDisposalPriceList";
export class WasteDisposalPrice extends StandardEntity {
  static NAME = "pbksb_WasteDisposalPrice";
  serviceCode?: string | null;
  ifsCode?: string | null;
  description?: string | null;
  priceList?: WasteDisposalPriceList[] | null;
}
export type WasteDisposalPriceViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "wasteDisposalPrice-view";
export type WasteDisposalPriceView<
  V extends WasteDisposalPriceViewName
> = V extends "_base"
  ? Pick<WasteDisposalPrice, "id" | "description" | "serviceCode" | "ifsCode">
  : V extends "_local"
  ? Pick<WasteDisposalPrice, "id" | "serviceCode" | "ifsCode" | "description">
  : V extends "_minimal"
  ? Pick<WasteDisposalPrice, "id" | "description">
  : V extends "wasteDisposalPrice-view"
  ? Pick<
      WasteDisposalPrice,
      "id" | "ifsCode" | "serviceCode" | "description" | "priceList"
    >
  : never;
