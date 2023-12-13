import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { MachineryType } from "./pbksb_MachineryType";
import { RentalUOMEnum } from "../enums/enums";
export class Quotation_Customer extends StandardEntity {
  static NAME = "pbksb_Quotation_Customer";
  quotationID?: string | null;
  request_number?: string | null;
  customer?: Customer | null;
  requested_item?: MachineryType | null;
  supplier_name?: string | null;
  date_required?: any | null;
  unit_quantity?: number | null;
  uom?: RentalUOMEnum | null;
}
export type Quotation_CustomerViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "quotation_Customer-view"
  | "quotation_Customer-view-MHEplanner"
  | "quotation_Customer-view_1";
export type Quotation_CustomerView<
  V extends Quotation_CustomerViewName
> = V extends "_base"
  ? Pick<
      Quotation_Customer,
      | "id"
      | "quotationID"
      | "request_number"
      | "supplier_name"
      | "date_required"
      | "unit_quantity"
      | "uom"
    >
  : V extends "_local"
  ? Pick<
      Quotation_Customer,
      | "id"
      | "quotationID"
      | "request_number"
      | "supplier_name"
      | "date_required"
      | "unit_quantity"
      | "uom"
    >
  : V extends "quotation_Customer-view"
  ? Pick<
      Quotation_Customer,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "quotationID"
      | "request_number"
      | "supplier_name"
      | "date_required"
      | "unit_quantity"
      | "uom"
      | "customer"
    >
  : V extends "quotation_Customer-view-MHEplanner"
  ? Pick<
      Quotation_Customer,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "quotationID"
      | "request_number"
      | "supplier_name"
      | "date_required"
      | "unit_quantity"
      | "uom"
      | "customer"
      | "requested_item"
    >
  : V extends "quotation_Customer-view_1"
  ? Pick<
      Quotation_Customer,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "quotationID"
      | "request_number"
      | "supplier_name"
      | "date_required"
      | "unit_quantity"
      | "uom"
      | "customer"
      | "requested_item"
    >
  : never;
