import { StandardEntity } from "./base/sys$StandardEntity";
import { PriceInvoice } from "./pbksb_PriceInvoice";
export class MhePriceInvoiceIndentSummary extends StandardEntity {
  static NAME = "pbksb_MhePriceInvoiceIndentSummary";
  rateATotalHours?: any | null;
  rateBTotalHours?: any | null;
  rateDTotalHours?: any | null;
  rateAPrice?: any | null;
  rateBPrice?: any | null;
  rateDPrice?: any | null;
  fixRate?: any | null;
  rateASum?: any | null;
  rateBSum?: any | null;
  rateDSum?: any | null;
  grandTotal?: any | null;
  priceInvoice?: PriceInvoice | null;
}
export type MhePriceInvoiceIndentSummaryViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type MhePriceInvoiceIndentSummaryView<
  V extends MhePriceInvoiceIndentSummaryViewName
> = V extends "_base"
  ? Pick<
      MhePriceInvoiceIndentSummary,
      | "id"
      | "rateATotalHours"
      | "rateBTotalHours"
      | "rateDTotalHours"
      | "rateAPrice"
      | "rateBPrice"
      | "rateDPrice"
      | "fixRate"
      | "rateASum"
      | "rateBSum"
      | "rateDSum"
      | "grandTotal"
    >
  : V extends "_local"
  ? Pick<
      MhePriceInvoiceIndentSummary,
      | "id"
      | "rateATotalHours"
      | "rateBTotalHours"
      | "rateDTotalHours"
      | "rateAPrice"
      | "rateBPrice"
      | "rateDPrice"
      | "fixRate"
      | "rateASum"
      | "rateBSum"
      | "rateDSum"
      | "grandTotal"
    >
  : never;
