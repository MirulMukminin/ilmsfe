import { StandardEntity } from "./base/sys$StandardEntity";
import { CFSChargedOn } from "../enums/enums";
import { CFSRates } from "./pbksb_CFSRates";
export class CfsRateCharges extends StandardEntity {
  static NAME = "pbksb_CfsRateCharges";
  price?: any | null;
  chargedOn?: CFSChargedOn | null;
  startDate?: any | null;
  endDate?: any | null;
  inactive?: boolean | null;
  cfsRates?: CFSRates | null;
}
export type CfsRateChargesViewName = "_base" | "_local" | "_minimal";
export type CfsRateChargesView<
  V extends CfsRateChargesViewName
> = V extends "_base"
  ? Pick<
      CfsRateCharges,
      "id" | "price" | "chargedOn" | "startDate" | "endDate" | "inactive"
    >
  : V extends "_local"
  ? Pick<
      CfsRateCharges,
      "id" | "price" | "chargedOn" | "startDate" | "endDate" | "inactive"
    >
  : never;
