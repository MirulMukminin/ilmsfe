import { StandardEntity } from "./base/sys$StandardEntity";
import { Invoice } from "./pbksb_Invoice";
export class InvoiceItem extends StandardEntity {
  static NAME = "pbksb_Invoice_item";
  refNo?: string | null;
  description?: string | null;
  quantity?: number | null;
  quantityBD?: any | null;
  hours?: any | null;
  price?: any | null;
  rateObjectId?: string | null;
  amount?: any | null;
  taxCode?: string | null;
  sst?: any | null;
  grossAmount?: any | null;
  lineNo?: number | null;
  invoice?: Invoice | null;
}
export type InvoiceItemViewName =
  | "InvoiceItemReportCSV"
  | "_base"
  | "_local"
  | "_minimal";
export type InvoiceItemView<
  V extends InvoiceItemViewName
> = V extends "InvoiceItemReportCSV"
  ? Pick<
      InvoiceItem,
      | "id"
      | "refNo"
      | "description"
      | "quantity"
      | "quantityBD"
      | "hours"
      | "price"
      | "rateObjectId"
      | "amount"
      | "taxCode"
      | "sst"
      | "grossAmount"
      | "lineNo"
      | "invoice"
    >
  : V extends "_base"
  ? Pick<
      InvoiceItem,
      | "id"
      | "description"
      | "refNo"
      | "quantity"
      | "quantityBD"
      | "hours"
      | "price"
      | "rateObjectId"
      | "amount"
      | "taxCode"
      | "sst"
      | "grossAmount"
      | "lineNo"
    >
  : V extends "_local"
  ? Pick<
      InvoiceItem,
      | "id"
      | "refNo"
      | "description"
      | "quantity"
      | "quantityBD"
      | "hours"
      | "price"
      | "rateObjectId"
      | "amount"
      | "taxCode"
      | "sst"
      | "grossAmount"
      | "lineNo"
    >
  : V extends "_minimal"
  ? Pick<InvoiceItem, "id" | "description">
  : never;
