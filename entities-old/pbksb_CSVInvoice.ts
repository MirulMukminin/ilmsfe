import { StandardEntity } from "./base/sys$StandardEntity";
import { JobStatus } from "../enums/enums";
export class CSVInvoice extends StandardEntity {
  static NAME = "pbksb_CSVInvoice";
  companycode?: string | null;
  invoicetype?: string | null;
  servicedate?: string | null;
  customerID?: string | null;
  ourReference?: string | null;
  customerReference?: string | null;
  lineBillNo?: string | null;
  objectID?: string | null;
  itemQuantity?: string | null;
  itemAmount?: string | null;
  itemRate?: string | null;
  taxCode?: string | null;
  branchCode?: string | null;
  po_No?: string | null;
  position_no?: string | null;
  text_desc?: string | null;
  status?: JobStatus | null;
}
export type CSVInvoiceViewName =
  | "CSVInvoice-view"
  | "_base"
  | "_local"
  | "_minimal";
export type CSVInvoiceView<
  V extends CSVInvoiceViewName
> = V extends "CSVInvoice-view"
  ? Pick<
      CSVInvoice,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "companycode"
      | "invoicetype"
      | "servicedate"
      | "customerID"
      | "ourReference"
      | "customerReference"
      | "lineBillNo"
      | "objectID"
      | "itemQuantity"
      | "itemAmount"
      | "itemRate"
      | "taxCode"
      | "branchCode"
      | "po_No"
      | "position_no"
      | "text_desc"
      | "status"
    >
  : V extends "_base"
  ? Pick<
      CSVInvoice,
      | "id"
      | "companycode"
      | "invoicetype"
      | "servicedate"
      | "customerID"
      | "ourReference"
      | "customerReference"
      | "lineBillNo"
      | "objectID"
      | "itemQuantity"
      | "itemAmount"
      | "itemRate"
      | "taxCode"
      | "branchCode"
      | "po_No"
      | "position_no"
      | "text_desc"
      | "status"
    >
  : V extends "_local"
  ? Pick<
      CSVInvoice,
      | "id"
      | "companycode"
      | "invoicetype"
      | "servicedate"
      | "customerID"
      | "ourReference"
      | "customerReference"
      | "lineBillNo"
      | "objectID"
      | "itemQuantity"
      | "itemAmount"
      | "itemRate"
      | "taxCode"
      | "branchCode"
      | "po_No"
      | "position_no"
      | "text_desc"
      | "status"
    >
  : never;
