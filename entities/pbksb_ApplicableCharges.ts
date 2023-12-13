import { StandardEntity } from "./base/sys$StandardEntity";
import { RentalUOMEnum } from "../enums/enums";
import { Quotation_Customer } from "./pbksb_Quotation_Customer";
export class ApplicableCharges extends StandardEntity {
  static NAME = "pbksb_ApplicableCharges";
  type?: string | null;
  qty?: string | null;
  rental_price?: string | null;
  rental_uom?: RentalUOMEnum | null;
  min_rental?: string | null;
  period_start?: string | null;
  period_end?: string | null;
  quotation_customer?: Quotation_Customer | null;
}
export type ApplicableChargesViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "applicableCharges-view";
export type ApplicableChargesView<
  V extends ApplicableChargesViewName
> = V extends "_base"
  ? Pick<
      ApplicableCharges,
      | "id"
      | "type"
      | "qty"
      | "rental_price"
      | "rental_uom"
      | "min_rental"
      | "period_start"
      | "period_end"
    >
  : V extends "_local"
  ? Pick<
      ApplicableCharges,
      | "id"
      | "type"
      | "qty"
      | "rental_price"
      | "rental_uom"
      | "min_rental"
      | "period_start"
      | "period_end"
    >
  : V extends "applicableCharges-view"
  ? Pick<
      ApplicableCharges,
      | "id"
      | "type"
      | "qty"
      | "rental_price"
      | "rental_uom"
      | "min_rental"
      | "period_start"
      | "period_end"
      | "quotation_customer"
    >
  : never;
