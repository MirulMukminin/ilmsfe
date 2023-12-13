import { StandardEntity } from "./base/sys$StandardEntity";
import { WasteDisposalPriceUnit } from "../enums/enums";
export class WasteDisposalPrice extends StandardEntity {
  static NAME = "pbksb_WasteDisposalPrice";
  serviceCode?: string | null;
  description?: string | null;
  rate?: any | null;
  unit?: WasteDisposalPriceUnit | null;
}
export type WasteDisposalPriceViewName = "_base" | "_local" | "_minimal";
export type WasteDisposalPriceView<
  V extends WasteDisposalPriceViewName
> = V extends "_base"
  ? Pick<
      WasteDisposalPrice,
      "id" | "description" | "serviceCode" | "rate" | "unit"
    >
  : V extends "_local"
  ? Pick<
      WasteDisposalPrice,
      "id" | "serviceCode" | "description" | "rate" | "unit"
    >
  : V extends "_minimal"
  ? Pick<WasteDisposalPrice, "id" | "description">
  : never;
