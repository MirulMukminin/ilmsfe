import { StandardEntity } from "./base/sys$StandardEntity";
import { Goods_OUT } from "./pbksb_Goods_OUT";
import { Good } from "./pbksb_Good";
export class Temporary_Out_Good extends StandardEntity {
  static NAME = "pbksb_Temporary_Out_Good";
  good_out?: Goods_OUT | null;
  good?: Good | null;
  withdrawal_quantity?: any | null;
}
export type Temporary_Out_GoodViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "temporary_Out_Good_API-view";
export type Temporary_Out_GoodView<
  V extends Temporary_Out_GoodViewName
> = V extends "_base"
  ? Pick<Temporary_Out_Good, "id" | "withdrawal_quantity">
  : V extends "_local"
  ? Pick<Temporary_Out_Good, "id" | "withdrawal_quantity">
  : V extends "temporary_Out_Good_API-view"
  ? Pick<Temporary_Out_Good, "id" | "withdrawal_quantity" | "good">
  : never;
