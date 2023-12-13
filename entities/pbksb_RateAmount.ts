import { StandardEntity } from "./base/sys$StandardEntity";
import { RateCodeDescription } from "./pbksb_RateCodeDescription";
export class RateAmount extends StandardEntity {
  static NAME = "pbksb_RateAmount";
  startDate?: any | null;
  inactive?: boolean | null;
  endDate?: any | null;
  price?: any | null;
  rateCodeDescription?: RateCodeDescription | null;
}
export type RateAmountViewName = "_base" | "_local" | "_minimal";
export type RateAmountView<V extends RateAmountViewName> = V extends "_base"
  ? Pick<RateAmount, "id" | "startDate" | "inactive" | "endDate" | "price">
  : V extends "_local"
  ? Pick<RateAmount, "id" | "startDate" | "inactive" | "endDate" | "price">
  : never;
