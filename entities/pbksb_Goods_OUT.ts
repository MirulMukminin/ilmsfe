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
import { CustomerUser } from "./pbksb_CustomerUser";
import { Good_Out_Issue } from "./pbksb_Issue_Out_Good";
import { Good_Out_Temp } from "./pbksb_Good_Out_Temp";
import { Good_Out_Return } from "./pbksb_Good_Out_Return";
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
  agent_company?: CustomerUser | null;
  issue_out?: Good_Out_Issue[] | null;
  temp_out?: Good_Out_Temp[] | null;
  return_good?: Good_Out_Return[] | null;
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
      | "agent_company"
    >
  : V extends "goods_OUT-view-CUBABrowse"
  ? Pick<
      Goods_OUT,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
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
      | "agent_company"
    >
  : never;
