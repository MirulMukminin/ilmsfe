import { StandardEntity } from "./base/sys$StandardEntity";
import { Job_MHE } from "./pbksb_Job_MHE";
import { InvoiceType, ChargeCycle, JobStatus } from "../enums/enums";
export class PriceInvoice extends StandardEntity {
  static NAME = "pbksb_PriceInvoice";
  jobmhe?: Job_MHE | null;
  invoicetype?: InvoiceType | null;
  chargecycle?: ChargeCycle | null;
  totalprice?: any | null;
  status?: JobStatus | null;
  invoice_no?: string | null;
  invoice_date?: any | null;
}
export type PriceInvoiceViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "priceInvoice-view";
export type PriceInvoiceView<V extends PriceInvoiceViewName> = V extends "_base"
  ? Pick<
      PriceInvoice,
      | "id"
      | "invoicetype"
      | "chargecycle"
      | "totalprice"
      | "status"
      | "invoice_no"
      | "invoice_date"
    >
  : V extends "_local"
  ? Pick<
      PriceInvoice,
      | "id"
      | "invoicetype"
      | "chargecycle"
      | "totalprice"
      | "status"
      | "invoice_no"
      | "invoice_date"
    >
  : V extends "priceInvoice-view"
  ? Pick<
      PriceInvoice,
      | "id"
      | "invoicetype"
      | "chargecycle"
      | "totalprice"
      | "status"
      | "invoice_no"
      | "invoice_date"
      | "jobmhe"
    >
  : never;
