import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { Customer } from "./pbksb_Customer";
import { com_company_pbksb_entity_marine_BookingType } from "../enums/enums";
export class BerthMHERequestNormal extends StandardEntity {
  static NAME = "pbksb_BerthMHERequestNormal";
  berth_form?: BerthForm | null;
  request_behalf?: Customer | null;
  job_description?: string | null;
  po_number?: string | null;
  booking_type?: com_company_pbksb_entity_marine_BookingType | null;
  booking_date?: any | null;
  remarks?: string | null;
}
export type BerthMHERequestNormalViewName = "_base" | "_local" | "_minimal";
export type BerthMHERequestNormalView<
  V extends BerthMHERequestNormalViewName
> = V extends "_base"
  ? Pick<
      BerthMHERequestNormal,
      | "id"
      | "job_description"
      | "po_number"
      | "booking_type"
      | "booking_date"
      | "remarks"
    >
  : V extends "_local"
  ? Pick<
      BerthMHERequestNormal,
      | "id"
      | "job_description"
      | "po_number"
      | "booking_type"
      | "booking_date"
      | "remarks"
    >
  : never;
