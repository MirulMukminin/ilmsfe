import { StandardEntity } from "./base/sys$StandardEntity";
import { CWCYRateCharges } from "./pbksb_CWCYRateCharges";
export class CWCYRates extends StandardEntity {
  static NAME = "pbksb_CWCYRates";
  code?: string | null;
  ifsCode?: string | null;
  description?: string | null;
  cwcyRateCharges?: CWCYRateCharges[] | null;
}
export type CWCYRatesViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "cWCYRates-view";
export type CWCYRatesView<V extends CWCYRatesViewName> = V extends "_base"
  ? Pick<CWCYRates, "id" | "description" | "code" | "ifsCode">
  : V extends "_local"
  ? Pick<CWCYRates, "id" | "code" | "ifsCode" | "description">
  : V extends "_minimal"
  ? Pick<CWCYRates, "id" | "description">
  : V extends "cWCYRates-view"
  ? Pick<
      CWCYRates,
      "id" | "code" | "ifsCode" | "description" | "cwcyRateCharges"
    >
  : never;
