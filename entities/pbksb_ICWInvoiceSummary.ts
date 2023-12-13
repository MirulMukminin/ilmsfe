import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
export class ICWInvoiceSummary extends StandardEntity {
  static NAME = "pbksb_ICWInvoiceSummary";
  chemicalIdDescription?: string | null;
  customer?: Customer | null;
  batchNo?: string | null;
  serviceOrderNumber?: string | null;
  duration?: string | null;
  serviceDate?: any | null;
  inQuantity?: number | null;
  inUom?: string | null;
  outQuantity?: number | null;
  outUom?: string | null;
  balanceQuantity?: number | null;
  uom?: string | null;
  quantityCharged?: number | null;
  rate?: any | null;
  totalInvoiced?: any | null;
}
export type ICWInvoiceSummaryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "iCWInvoiceSummary-view";
export type ICWInvoiceSummaryView<
  V extends ICWInvoiceSummaryViewName
> = V extends "_base"
  ? Pick<
      ICWInvoiceSummary,
      | "id"
      | "chemicalIdDescription"
      | "batchNo"
      | "serviceOrderNumber"
      | "duration"
      | "serviceDate"
      | "inQuantity"
      | "inUom"
      | "outQuantity"
      | "outUom"
      | "balanceQuantity"
      | "uom"
      | "quantityCharged"
      | "rate"
      | "totalInvoiced"
    >
  : V extends "_local"
  ? Pick<
      ICWInvoiceSummary,
      | "id"
      | "chemicalIdDescription"
      | "batchNo"
      | "serviceOrderNumber"
      | "duration"
      | "serviceDate"
      | "inQuantity"
      | "inUom"
      | "outQuantity"
      | "outUom"
      | "balanceQuantity"
      | "uom"
      | "quantityCharged"
      | "rate"
      | "totalInvoiced"
    >
  : V extends "iCWInvoiceSummary-view"
  ? Pick<
      ICWInvoiceSummary,
      | "id"
      | "chemicalIdDescription"
      | "batchNo"
      | "serviceOrderNumber"
      | "duration"
      | "serviceDate"
      | "inQuantity"
      | "inUom"
      | "outQuantity"
      | "outUom"
      | "balanceQuantity"
      | "uom"
      | "quantityCharged"
      | "rate"
      | "totalInvoiced"
      | "customer"
    >
  : never;
