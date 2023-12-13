import { StandardEntity } from "./base/sys$StandardEntity";
import { CompanyBranch } from "../enums/enums";
import { RateAmount } from "./pbksb_RateAmount";
export class RateCodeDescription extends StandardEntity {
  static NAME = "pbksb_RateCodeDescription";
  branchCode?: CompanyBranch | null;
  code?: string | null;
  ifsCode?: string | null;
  description?: string | null;
  rateAmount?: RateAmount[] | null;
}
export type RateCodeDescriptionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "rateCodeDescription-view";
export type RateCodeDescriptionView<
  V extends RateCodeDescriptionViewName
> = V extends "_base"
  ? Pick<
      RateCodeDescription,
      "id" | "description" | "branchCode" | "code" | "ifsCode"
    >
  : V extends "_local"
  ? Pick<
      RateCodeDescription,
      "id" | "branchCode" | "code" | "ifsCode" | "description"
    >
  : V extends "_minimal"
  ? Pick<RateCodeDescription, "id" | "description">
  : V extends "rateCodeDescription-view"
  ? Pick<
      RateCodeDescription,
      "id" | "branchCode" | "code" | "ifsCode" | "description" | "rateAmount"
    >
  : never;
