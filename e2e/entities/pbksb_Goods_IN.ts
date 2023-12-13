import { StandardEntity } from "./base/sys$StandardEntity";
import {
  Form_Type,
  Storage,
  Good_Category,
  Good_In_Statu,
  Transaction_Form_Type
} from "../enums/enums";
import { Customer } from "./pbksb_Customer";
import { Site } from "./pbksb_Site";
export class Goods_IN extends StandardEntity {
  static NAME = "pbksb_Goods_IN";
  reference_no?: string | null;
  adjustment_approved_date?: any | null;
  adjustment_approved_by?: string | null;
  adjustment_date?: any | null;
  form_type?: Form_Type | null;
  registration_no?: string | null;
  move_date?: any | null;
  customer?: Customer | null;
  agent_name?: string | null;
  storage?: Storage | null;
  location?: Site | null;
  invoice_no?: string | null;
  category?: Good_Category | null;
  total_value?: any | null;
  status?: Good_In_Statu | null;
  request_by?: string | null;
  request_date?: any | null;
  approved_by?: string | null;
  approved_date?: any | null;
  transaction_form_type?: Transaction_Form_Type | null;
  remarks?: string | null;
}
export type Goods_INViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "goods_IN-registrationNo-view"
  | "goods_IN-view"
  | "goods_IN-view-inventory-adjustment"
  | "goods_IN-view_CUBABrowse"
  | "goods_IN-view_kastam"
  | "goods_IN_Email-view";
export type Goods_INView<V extends Goods_INViewName> = V extends "_base"
  ? Pick<
      Goods_IN,
      | "id"
      | "reference_no"
      | "registration_no"
      | "adjustment_approved_date"
      | "adjustment_approved_by"
      | "adjustment_date"
      | "form_type"
      | "move_date"
      | "agent_name"
      | "storage"
      | "invoice_no"
      | "category"
      | "total_value"
      | "status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "transaction_form_type"
      | "remarks"
    >
  : V extends "_local"
  ? Pick<
      Goods_IN,
      | "id"
      | "reference_no"
      | "adjustment_approved_date"
      | "adjustment_approved_by"
      | "adjustment_date"
      | "form_type"
      | "registration_no"
      | "move_date"
      | "agent_name"
      | "storage"
      | "invoice_no"
      | "category"
      | "total_value"
      | "status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "transaction_form_type"
      | "remarks"
    >
  : V extends "_minimal"
  ? Pick<Goods_IN, "id" | "reference_no" | "registration_no">
  : V extends "goods_IN-registrationNo-view"
  ? Pick<Goods_IN, "id" | "registration_no">
  : V extends "goods_IN-view"
  ? Pick<
      Goods_IN,
      | "id"
      | "reference_no"
      | "adjustment_approved_date"
      | "adjustment_approved_by"
      | "adjustment_date"
      | "form_type"
      | "registration_no"
      | "move_date"
      | "agent_name"
      | "storage"
      | "invoice_no"
      | "category"
      | "total_value"
      | "status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "transaction_form_type"
      | "remarks"
      | "customer"
      | "location"
    >
  : V extends "goods_IN-view-inventory-adjustment"
  ? Pick<
      Goods_IN,
      | "id"
      | "reference_no"
      | "adjustment_approved_date"
      | "adjustment_approved_by"
      | "adjustment_date"
      | "form_type"
      | "registration_no"
      | "move_date"
      | "agent_name"
      | "storage"
      | "invoice_no"
      | "category"
      | "total_value"
      | "status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "transaction_form_type"
      | "remarks"
      | "customer"
      | "location"
    >
  : V extends "goods_IN-view_CUBABrowse"
  ? Pick<
      Goods_IN,
      | "id"
      | "reference_no"
      | "adjustment_approved_date"
      | "adjustment_approved_by"
      | "adjustment_date"
      | "form_type"
      | "registration_no"
      | "move_date"
      | "agent_name"
      | "storage"
      | "invoice_no"
      | "category"
      | "total_value"
      | "status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "transaction_form_type"
      | "remarks"
      | "customer"
      | "location"
    >
  : V extends "goods_IN-view_kastam"
  ? Pick<
      Goods_IN,
      | "id"
      | "reference_no"
      | "adjustment_approved_date"
      | "adjustment_approved_by"
      | "adjustment_date"
      | "form_type"
      | "registration_no"
      | "move_date"
      | "agent_name"
      | "storage"
      | "invoice_no"
      | "category"
      | "total_value"
      | "status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "transaction_form_type"
      | "remarks"
      | "customer"
      | "location"
    >
  : V extends "goods_IN_Email-view"
  ? Pick<
      Goods_IN,
      | "id"
      | "reference_no"
      | "adjustment_approved_date"
      | "adjustment_approved_by"
      | "adjustment_date"
      | "form_type"
      | "registration_no"
      | "move_date"
      | "agent_name"
      | "storage"
      | "invoice_no"
      | "category"
      | "total_value"
      | "status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "transaction_form_type"
      | "remarks"
      | "customer"
    >
  : never;
