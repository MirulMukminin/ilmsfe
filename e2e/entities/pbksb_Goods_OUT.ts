import { StandardEntity } from "./base/sys$StandardEntity";
import {
  Exceed_Limit_Status,
  Form_Type,
  Transaction_Type,
  Good_In_Statu
} from "../enums/enums";
import { Customer } from "./pbksb_Customer";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { Goods_transaction } from "./pbksb_Goods_transaction";
export class Goods_OUT extends StandardEntity {
  static NAME = "pbksb_Goods_OUT";
  reference_no?: string | null;
  exceed_limit?: Exceed_Limit_Status | null;
  form_type?: Form_Type | null;
  registration_no?: string | null;
  move_date?: any | null;
  customer?: Customer | null;
  agent_name?: string | null;
  transaction_type?: Transaction_Type | null;
  destinantion?: string | null;
  status?: Good_In_Statu | null;
  expected_date?: any | null;
  expected_date_status?: string | null;
  k9_file?: FileDescriptor | null;
  goods_transaction?: Goods_transaction | null;
  request_by?: string | null;
  request_date?: any | null;
  approved_by?: string | null;
  approved_date?: any | null;
  override_by?: string | null;
  override_date?: any | null;
  reason?: string | null;
}
export type Goods_OUTViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "goods_OUT-view"
  | "goods_OUT-view-CUBABrowse";
export type Goods_OUTView<V extends Goods_OUTViewName> = V extends "_base"
  ? Pick<
      Goods_OUT,
      | "id"
      | "reference_no"
      | "registration_no"
      | "exceed_limit"
      | "form_type"
      | "move_date"
      | "agent_name"
      | "transaction_type"
      | "destinantion"
      | "status"
      | "expected_date"
      | "expected_date_status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "override_by"
      | "override_date"
      | "reason"
    >
  : V extends "_local"
  ? Pick<
      Goods_OUT,
      | "id"
      | "reference_no"
      | "exceed_limit"
      | "form_type"
      | "registration_no"
      | "move_date"
      | "agent_name"
      | "transaction_type"
      | "destinantion"
      | "status"
      | "expected_date"
      | "expected_date_status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "override_by"
      | "override_date"
      | "reason"
    >
  : V extends "_minimal"
  ? Pick<Goods_OUT, "id" | "reference_no" | "registration_no">
  : V extends "goods_OUT-view"
  ? Pick<
      Goods_OUT,
      | "id"
      | "reference_no"
      | "exceed_limit"
      | "form_type"
      | "registration_no"
      | "move_date"
      | "agent_name"
      | "transaction_type"
      | "destinantion"
      | "status"
      | "expected_date"
      | "expected_date_status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "override_by"
      | "override_date"
      | "reason"
      | "goods_transaction"
      | "k9_file"
      | "customer"
    >
  : V extends "goods_OUT-view-CUBABrowse"
  ? Pick<
      Goods_OUT,
      | "id"
      | "reference_no"
      | "exceed_limit"
      | "form_type"
      | "registration_no"
      | "move_date"
      | "agent_name"
      | "transaction_type"
      | "destinantion"
      | "status"
      | "expected_date"
      | "expected_date_status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "override_by"
      | "override_date"
      | "reason"
      | "customer"
      | "goods_transaction"
    >
  : never;
