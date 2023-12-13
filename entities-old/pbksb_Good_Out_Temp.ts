import { StandardEntity } from "./base/sys$StandardEntity";
import { Goods_OUT } from "./pbksb_Goods_OUT";
import { Good } from "./pbksb_Good";
import { Form_Type } from "../enums/enums";
export class Good_Out_Temp extends StandardEntity {
  static NAME = "pbksb_Good_Out_Temp";
  good_out?: Goods_OUT | null;
  good?: Good | null;
  form_type?: Form_Type | null;
  form_no?: string | null;
  withdraw_quantity?: any | null;
  pending_return_quantity?: any | null;
  complete_return_quantity?: any | null;
}
export type Good_Out_TempViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "good_Out_Temp-CUBAview"
  | "good_Out_Temp_API-view";
export type Good_Out_TempView<
  V extends Good_Out_TempViewName
> = V extends "_base"
  ? Pick<
      Good_Out_Temp,
      | "id"
      | "form_type"
      | "form_no"
      | "withdraw_quantity"
      | "pending_return_quantity"
      | "complete_return_quantity"
    >
  : V extends "_local"
  ? Pick<
      Good_Out_Temp,
      | "id"
      | "form_type"
      | "form_no"
      | "withdraw_quantity"
      | "pending_return_quantity"
      | "complete_return_quantity"
    >
  : V extends "good_Out_Temp-CUBAview"
  ? Pick<
      Good_Out_Temp,
      | "id"
      | "form_type"
      | "form_no"
      | "withdraw_quantity"
      | "pending_return_quantity"
      | "complete_return_quantity"
      | "good_out"
      | "good"
    >
  : V extends "good_Out_Temp_API-view"
  ? Pick<
      Good_Out_Temp,
      | "id"
      | "form_type"
      | "form_no"
      | "withdraw_quantity"
      | "pending_return_quantity"
      | "complete_return_quantity"
      | "good"
      | "good_out"
    >
  : never;
