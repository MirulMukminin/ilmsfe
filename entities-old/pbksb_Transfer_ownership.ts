import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import {
  Good_Category,
  Good_Type,
  Type_Of_Goods,
  Good_In_Statu
} from "../enums/enums";
export class Transfer_Ownership extends StandardEntity {
  static NAME = "pbksb_Transfer_ownership";
  k8_form_No?: string | null;
  request_no?: string | null;
  requested_by?: string | null;
  seller?: Customer | null;
  buyer?: Customer | null;
  po_no?: string | null;
  invoice_no?: string | null;
  item_sold?: string | null;
  quantity?: string | null;
  selling_price?: any | null;
  sale?: string | null;
  selling_date?: any | null;
  category?: Good_Category | null;
  good_type?: Good_Type | null;
  type_of_goods?: Type_Of_Goods | null;
  remarks?: string | null;
  status?: Good_In_Statu | null;
  request_date?: any | null;
  approved_by?: string | null;
  approved_date?: any | null;
}
export type Transfer_OwnershipViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "transfer_ownership-view";
export type Transfer_OwnershipView<
  V extends Transfer_OwnershipViewName
> = V extends "_base"
  ? Pick<
      Transfer_Ownership,
      | "id"
      | "k8_form_No"
      | "request_no"
      | "requested_by"
      | "po_no"
      | "invoice_no"
      | "item_sold"
      | "quantity"
      | "selling_price"
      | "sale"
      | "selling_date"
      | "category"
      | "good_type"
      | "type_of_goods"
      | "remarks"
      | "status"
      | "request_date"
      | "approved_by"
      | "approved_date"
    >
  : V extends "_local"
  ? Pick<
      Transfer_Ownership,
      | "id"
      | "k8_form_No"
      | "request_no"
      | "requested_by"
      | "po_no"
      | "invoice_no"
      | "item_sold"
      | "quantity"
      | "selling_price"
      | "sale"
      | "selling_date"
      | "category"
      | "good_type"
      | "type_of_goods"
      | "remarks"
      | "status"
      | "request_date"
      | "approved_by"
      | "approved_date"
    >
  : V extends "transfer_ownership-view"
  ? Pick<
      Transfer_Ownership,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "k8_form_No"
      | "request_no"
      | "requested_by"
      | "po_no"
      | "invoice_no"
      | "item_sold"
      | "quantity"
      | "selling_price"
      | "sale"
      | "selling_date"
      | "category"
      | "good_type"
      | "type_of_goods"
      | "remarks"
      | "status"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "buyer"
      | "seller"
    >
  : never;
