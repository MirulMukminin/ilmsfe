import { StandardEntity } from "./base/sys$StandardEntity";
import { RequestCFSType, CFSChargedOn } from "../enums/enums";
import { CfsRateCharges } from "./pbksb_CfsRateCharges";
export class CFSRates extends StandardEntity {
  static NAME = "pbksb_CFSRates";
  code?: string | null;
  ifsCode?: string | null;
  requestType?: RequestCFSType | null;
  description?: string | null;
  chargedOn?: CFSChargedOn | null;
  price?: any | null;
  cfsRateCharges?: CfsRateCharges[] | null;
}
export type CFSRatesViewName =
  | "CFSRates-view"
  | "_base"
  | "_local"
  | "_minimal";
export type CFSRatesView<V extends CFSRatesViewName> = V extends "CFSRates-view"
  ? Pick<
      CFSRates,
      | "id"
      | "code"
      | "requestType"
      | "description"
      | "chargedOn"
      | "price"
      | "cfsRateCharges"
    >
  : V extends "_base"
  ? Pick<
      CFSRates,
      | "id"
      | "description"
      | "code"
      | "ifsCode"
      | "requestType"
      | "chargedOn"
      | "price"
    >
  : V extends "_local"
  ? Pick<
      CFSRates,
      | "id"
      | "code"
      | "ifsCode"
      | "requestType"
      | "description"
      | "chargedOn"
      | "price"
    >
  : V extends "_minimal"
  ? Pick<CFSRates, "id" | "description">
  : never;
