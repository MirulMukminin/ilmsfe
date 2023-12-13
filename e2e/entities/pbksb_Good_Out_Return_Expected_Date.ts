import { StandardEntity } from "./base/sys$StandardEntity";
import { Goods_OUT } from "./pbksb_Goods_OUT";
import { Good_Out_Return } from "./pbksb_Good_Out_Return";
export class Good_Out_Return_Expected_Date extends StandardEntity {
  static NAME = "pbksb_Good_Out_Return_Expected_Date";
  good_out?: Goods_OUT | null;
  good_out_return?: Good_Out_Return | null;
  previus_expected_date?: any | null;
  expected_date?: any | null;
  request_by?: string | null;
  request_date?: any | null;
  approved_by?: string | null;
  approved_date?: any | null;
  remarks?: string | null;
}
export type Good_Out_Return_Expected_DateViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "good_Out_Return_Expected_Date-CUBAview";
export type Good_Out_Return_Expected_DateView<
  V extends Good_Out_Return_Expected_DateViewName
> = V extends "_base"
  ? Pick<
      Good_Out_Return_Expected_Date,
      | "id"
      | "previus_expected_date"
      | "expected_date"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "remarks"
    >
  : V extends "_local"
  ? Pick<
      Good_Out_Return_Expected_Date,
      | "id"
      | "previus_expected_date"
      | "expected_date"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "remarks"
    >
  : V extends "good_Out_Return_Expected_Date-CUBAview"
  ? Pick<
      Good_Out_Return_Expected_Date,
      | "id"
      | "previus_expected_date"
      | "expected_date"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "remarks"
    >
  : never;
