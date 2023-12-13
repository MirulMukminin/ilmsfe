import { StandardEntity } from "./base/sys$StandardEntity";
import { WasteDisposalPriceUnit } from "../enums/enums";
import { WasteDisposalPrice } from "./pbksb_WasteDisposalPrice";
export class WasteDisposalPriceList extends StandardEntity {
  static NAME = "pbksb_WasteDisposalPriceList";
  rate?: any | null;
  unit?: WasteDisposalPriceUnit | null;
  startDate?: any | null;
  endDate?: any | null;
  inactive?: boolean | null;
  wasteDisposalPrice?: WasteDisposalPrice | null;
}
export type WasteDisposalPriceListViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "wasteDisposalPriceList-view";
export type WasteDisposalPriceListView<
  V extends WasteDisposalPriceListViewName
> = V extends "_base"
  ? Pick<
      WasteDisposalPriceList,
      "id" | "rate" | "unit" | "startDate" | "endDate" | "inactive"
    >
  : V extends "_local"
  ? Pick<
      WasteDisposalPriceList,
      "id" | "rate" | "unit" | "startDate" | "endDate" | "inactive"
    >
  : V extends "_minimal"
  ? Pick<WasteDisposalPriceList, "id" | "rate" | "unit">
  : V extends "wasteDisposalPriceList-view"
  ? Pick<
      WasteDisposalPriceList,
      | "id"
      | "wasteDisposalPrice"
      | "rate"
      | "unit"
      | "startDate"
      | "endDate"
      | "inactive"
    >
  : never;
