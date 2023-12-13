import { StandardEntity } from "./base/sys$StandardEntity";
import { Goods_OUT } from "./pbksb_Goods_OUT";
import { Good } from "./pbksb_Good";
export class Returning_Good extends StandardEntity {
  static NAME = "pbksb_Returning_Good";
  good_out?: Goods_OUT | null;
  good?: Good | null;
  return_quantity?: any | null;
}
export type Returning_GoodViewName = "_base" | "_local" | "_minimal";
export type Returning_GoodView<
  V extends Returning_GoodViewName
> = V extends "_base"
  ? Pick<Returning_Good, "id" | "return_quantity">
  : V extends "_local"
  ? Pick<Returning_Good, "id" | "return_quantity">
  : never;
