import { StandardEntity } from "./base/sys$StandardEntity";
import { Goods_OUT } from "./pbksb_Goods_OUT";
import { Good_Out_Temp } from "./pbksb_Good_Out_Temp";
import { Good } from "./pbksb_Good";
import { Form_Type, Good_Category, Return_Status } from "../enums/enums";
import { Site } from "./pbksb_Site";
export class Good_Out_Return extends StandardEntity {
  static NAME = "pbksb_Good_Out_Return";
  good_out?: Goods_OUT | null;
  good_out_temp?: Good_Out_Temp | null;
  good?: Good | null;
  registration_no?: string | null;
  good_name?: string | null;
  used_quantity?: any | null;
  return_quantity?: any | null;
  remain_quantity?: any | null;
  value?: any | null;
  form_type?: Form_Type | null;
  form_no?: string | null;
  expected_return?: any | null;
  return_date?: any | null;
  customs_code?: string | null;
  category?: Good_Category | null;
  uom?: string | null;
  location?: Site | null;
  status?: Return_Status | null;
  totalValue?: any | null;
}
export type Good_Out_ReturnViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "good_Out_Return-CUBAView"
  | "good_Out_Return-view"
  | "good_Out_Return_API-view";
export type Good_Out_ReturnView<
  V extends Good_Out_ReturnViewName
> = V extends "_base"
  ? Pick<
      Good_Out_Return,
      | "id"
      | "registration_no"
      | "good_name"
      | "used_quantity"
      | "return_quantity"
      | "remain_quantity"
      | "value"
      | "form_type"
      | "form_no"
      | "expected_return"
      | "return_date"
      | "customs_code"
      | "category"
      | "uom"
      | "status"
      | "totalValue"
    >
  : V extends "_local"
  ? Pick<
      Good_Out_Return,
      | "id"
      | "registration_no"
      | "good_name"
      | "used_quantity"
      | "return_quantity"
      | "remain_quantity"
      | "value"
      | "form_type"
      | "form_no"
      | "expected_return"
      | "return_date"
      | "customs_code"
      | "category"
      | "uom"
      | "status"
      | "totalValue"
    >
  : V extends "good_Out_Return-CUBAView"
  ? Pick<
      Good_Out_Return,
      | "id"
      | "registration_no"
      | "good_name"
      | "used_quantity"
      | "return_quantity"
      | "remain_quantity"
      | "value"
      | "form_type"
      | "form_no"
      | "expected_return"
      | "return_date"
      | "customs_code"
      | "category"
      | "uom"
      | "status"
      | "totalValue"
      | "good_out"
    >
  : V extends "good_Out_Return-view"
  ? Pick<
      Good_Out_Return,
      | "id"
      | "registration_no"
      | "good_name"
      | "used_quantity"
      | "return_quantity"
      | "remain_quantity"
      | "value"
      | "form_type"
      | "form_no"
      | "expected_return"
      | "return_date"
      | "customs_code"
      | "category"
      | "uom"
      | "status"
      | "totalValue"
      | "good_out"
      | "good_out_temp"
    >
  : V extends "good_Out_Return_API-view"
  ? Pick<
      Good_Out_Return,
      | "id"
      | "registration_no"
      | "good_name"
      | "used_quantity"
      | "return_quantity"
      | "remain_quantity"
      | "value"
      | "form_type"
      | "form_no"
      | "expected_return"
      | "return_date"
      | "customs_code"
      | "category"
      | "uom"
      | "status"
      | "totalValue"
      | "good_out"
      | "location"
      | "good_out_temp"
      | "good"
    >
  : never;
