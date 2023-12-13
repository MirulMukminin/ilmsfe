import { StandardEntity } from "./base/sys$StandardEntity";
import {
  ServiceType,
  CompanyCode,
  InvoiceType,
  TaxCode,
  BranchCode
} from "../enums/enums";
export class InvoiceDataSetup extends StandardEntity {
  static NAME = "pbksb_InvoiceDataSetup";
  serviceType?: ServiceType | null;
  serviceCode?: string | null;
  companyCode?: CompanyCode | null;
  invoiceType?: InvoiceType | null;
  taxCode?: TaxCode | null;
  branchCode?: BranchCode | null;
  amendBy_Date?: string | null;
}
export type InvoiceDataSetupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "invoiceDataSetup-view";
export type InvoiceDataSetupView<
  V extends InvoiceDataSetupViewName
> = V extends "_base"
  ? Pick<
      InvoiceDataSetup,
      | "id"
      | "serviceType"
      | "serviceCode"
      | "companyCode"
      | "invoiceType"
      | "taxCode"
      | "branchCode"
      | "amendBy_Date"
    >
  : V extends "_local"
  ? Pick<
      InvoiceDataSetup,
      | "id"
      | "serviceType"
      | "serviceCode"
      | "companyCode"
      | "invoiceType"
      | "taxCode"
      | "branchCode"
      | "amendBy_Date"
    >
  : V extends "invoiceDataSetup-view"
  ? Pick<
      InvoiceDataSetup,
      | "id"
      | "serviceType"
      | "serviceCode"
      | "companyCode"
      | "invoiceType"
      | "taxCode"
      | "branchCode"
      | "amendBy_Date"
    >
  : never;
