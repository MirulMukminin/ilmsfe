import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { CompanyCode, CompanyBranch, StatusInvoice } from "../enums/enums";
import { InvoiceItem } from "./pbksb_Invoice_item";
export class Invoice extends StandardEntity {
  static NAME = "pbksb_Invoice";
  customer?: Customer | null;
  fromDate?: any | null;
  toDate?: any | null;
  jobTicketNo?: string | null;
  companyCode?: CompanyCode | null;
  toolfacilityid?: string | null;
  toolfacilitydescription?: string | null;
  priceterm?: string | null;
  pricerate?: any | null;
  branchCode?: CompanyBranch | null;
  requestNo?: string | null;
  customerRef?: string | null;
  poNo?: string | null;
  invoiceNo?: string | null;
  invoiceDate?: any | null;
  serviceDate?: any | null;
  status?: StatusInvoice | null;
  totalAmount?: any | null;
  totalItem?: number | null;
  itemDetail?: InvoiceItem[] | null;
}
export type InvoiceViewName = "_base" | "_local" | "_minimal" | "invoice-view";
export type InvoiceView<V extends InvoiceViewName> = V extends "_base"
  ? Pick<
      Invoice,
      | "id"
      | "jobTicketNo"
      | "fromDate"
      | "toDate"
      | "companyCode"
      | "toolfacilityid"
      | "toolfacilitydescription"
      | "priceterm"
      | "pricerate"
      | "branchCode"
      | "requestNo"
      | "customerRef"
      | "poNo"
      | "invoiceNo"
      | "invoiceDate"
      | "serviceDate"
      | "status"
      | "totalAmount"
      | "totalItem"
    >
  : V extends "_local"
  ? Pick<
      Invoice,
      | "id"
      | "fromDate"
      | "toDate"
      | "jobTicketNo"
      | "companyCode"
      | "toolfacilityid"
      | "toolfacilitydescription"
      | "priceterm"
      | "pricerate"
      | "branchCode"
      | "requestNo"
      | "customerRef"
      | "poNo"
      | "invoiceNo"
      | "invoiceDate"
      | "serviceDate"
      | "status"
      | "totalAmount"
      | "totalItem"
    >
  : V extends "_minimal"
  ? Pick<Invoice, "id" | "jobTicketNo">
  : V extends "invoice-view"
  ? Pick<
      Invoice,
      | "id"
      | "fromDate"
      | "toDate"
      | "jobTicketNo"
      | "companyCode"
      | "toolfacilityid"
      | "toolfacilitydescription"
      | "priceterm"
      | "pricerate"
      | "branchCode"
      | "requestNo"
      | "customerRef"
      | "poNo"
      | "invoiceNo"
      | "invoiceDate"
      | "serviceDate"
      | "status"
      | "totalAmount"
      | "totalItem"
      | "customer"
      | "itemDetail"
    >
  : never;
