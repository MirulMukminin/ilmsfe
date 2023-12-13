import { StandardEntity } from "./base/sys$StandardEntity";
import { OddSizeCargoType } from "../enums/enums";
import { AdditionalServices } from "./pbksb_AdditionalServices";
export class AdditionalServicesOddSizeCargo extends StandardEntity {
  static NAME = "pbksb_AdditionalServicesOddSizeCargo";
  cargoType?: OddSizeCargoType | null;
  mheRequestNo?: string | null;
  jtNo?: string | null;
  additionalServices?: AdditionalServices | null;
}
export type AdditionalServicesOddSizeCargoViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "additionalServicesOddSizeCargo-view";
export type AdditionalServicesOddSizeCargoView<
  V extends AdditionalServicesOddSizeCargoViewName
> = V extends "_base"
  ? Pick<
      AdditionalServicesOddSizeCargo,
      "id" | "cargoType" | "mheRequestNo" | "jtNo"
    >
  : V extends "_local"
  ? Pick<
      AdditionalServicesOddSizeCargo,
      "id" | "cargoType" | "mheRequestNo" | "jtNo"
    >
  : V extends "additionalServicesOddSizeCargo-view"
  ? Pick<
      AdditionalServicesOddSizeCargo,
      "id" | "cargoType" | "mheRequestNo" | "jtNo" | "additionalServices"
    >
  : never;
