import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { Vessel } from "./pbksb_Vessel";
import { Agent } from "./pbksb_Agent";
import { MarineStatus } from "../enums/enums";
export class BerthForm extends StandardEntity {
  static NAME = "pbksb_BerthForm";
  request_number?: string | null;
  company?: Customer | null;
  vessel?: Vessel | null;
  request_on_behalf?: Customer | null;
  po_number?: string | null;
  est_arrival?: any | null;
  est_departure?: any | null;
  last_location?: string | null;
  next_location?: string | null;
  remarks?: string | null;
  agent?: Agent | null;
  bod_number?: string | null;
  log_number?: string | null;
  request_by?: string | null;
  request_date?: any | null;
  endorsed_by?: string | null;
  endorsed_date?: any | null;
  update_cancelled_by?: string | null;
  update_cancelled_datetime?: any | null;
  status?: MarineStatus | null;
}
export type BerthFormViewName =
  | "BerthFormVessel-view"
  | "_base"
  | "_local"
  | "_minimal"
  | "berthFormAPI-view"
  | "berthFormBOD-view";
export type BerthFormView<
  V extends BerthFormViewName
> = V extends "BerthFormVessel-view"
  ? Pick<
      BerthForm,
      | "id"
      | "request_number"
      | "po_number"
      | "est_arrival"
      | "est_departure"
      | "last_location"
      | "next_location"
      | "remarks"
      | "bod_number"
      | "log_number"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "status"
    >
  : V extends "_base"
  ? Pick<
      BerthForm,
      | "id"
      | "request_number"
      | "po_number"
      | "est_arrival"
      | "est_departure"
      | "last_location"
      | "next_location"
      | "remarks"
      | "bod_number"
      | "log_number"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "status"
    >
  : V extends "_local"
  ? Pick<
      BerthForm,
      | "id"
      | "request_number"
      | "po_number"
      | "est_arrival"
      | "est_departure"
      | "last_location"
      | "next_location"
      | "remarks"
      | "bod_number"
      | "log_number"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "status"
    >
  : V extends "berthFormAPI-view"
  ? Pick<
      BerthForm,
      | "id"
      | "request_number"
      | "po_number"
      | "est_arrival"
      | "est_departure"
      | "last_location"
      | "next_location"
      | "remarks"
      | "bod_number"
      | "log_number"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "status"
      | "company"
      | "vessel"
      | "request_on_behalf"
      | "agent"
    >
  : V extends "berthFormBOD-view"
  ? Pick<
      BerthForm,
      | "id"
      | "request_number"
      | "po_number"
      | "est_arrival"
      | "est_departure"
      | "last_location"
      | "next_location"
      | "remarks"
      | "bod_number"
      | "log_number"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "status"
      | "company"
      | "vessel"
      | "request_on_behalf"
      | "agent"
    >
  : never;
