import { StandardEntity } from "./base/sys$StandardEntity";
import { CWCYRates } from "./pbksb_CWCYRates";
export class CWCYRateCharges extends StandardEntity {
  static NAME = "pbksb_CWCYRateCharges";
  startDate?: any | null;
  inactive?: boolean | null;
  endDate?: any | null;
  price?: any | null;
  cWCYRates?: CWCYRates | null;
}
export type CWCYRateChargesViewName = "_base" | "_local" | "_minimal";
export type CWCYRateChargesView<
  V extends CWCYRateChargesViewName
> = V extends "_base"
  ? Pick<CWCYRateCharges, "id" | "startDate" | "inactive" | "endDate" | "price">
  : V extends "_local"
  ? Pick<CWCYRateCharges, "id" | "startDate" | "inactive" | "endDate" | "price">
  : never;
