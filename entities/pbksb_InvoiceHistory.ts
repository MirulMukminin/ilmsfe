import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
export class InvoiceHistory extends StandardEntity {
  static NAME = "pbksb_InvoiceHistory";
  berth_form?: BerthForm | null;
  item?: string | null;
  prev_data?: any | null;
  curr_data?: any | null;
  diff_data?: any | null;
  item_type?: string | null;
  prev_price?: any | null;
  curr_price?: any | null;
  diff_price?: any | null;
}
export type InvoiceHistoryViewName = "_base" | "_local" | "_minimal";
export type InvoiceHistoryView<
  V extends InvoiceHistoryViewName
> = V extends "_base"
  ? Pick<
      InvoiceHistory,
      | "id"
      | "item"
      | "prev_data"
      | "curr_data"
      | "diff_data"
      | "item_type"
      | "prev_price"
      | "curr_price"
      | "diff_price"
    >
  : V extends "_local"
  ? Pick<
      InvoiceHistory,
      | "id"
      | "item"
      | "prev_data"
      | "curr_data"
      | "diff_data"
      | "item_type"
      | "prev_price"
      | "curr_price"
      | "diff_price"
    >
  : never;
