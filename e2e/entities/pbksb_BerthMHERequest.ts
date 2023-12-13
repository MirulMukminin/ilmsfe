import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import {
  BerthMHERequestType,
  com_company_pbksb_entity_marine_BookingType,
  MarineStatus
} from "../enums/enums";
import { Customer } from "./pbksb_Customer";
export class BerthMHERequest extends StandardEntity {
  static NAME = "pbksb_BerthMHERequest";
  request_number?: string | null;
  berth_form?: BerthForm | null;
  request_type?: BerthMHERequestType | null;
  request_behalf?: Customer | null;
  job_description?: string | null;
  po_number?: string | null;
  booking_type?: com_company_pbksb_entity_marine_BookingType | null;
  booking_date?: any | null;
  estimated_duration?: number | null;
  estimated_trip?: number | null;
  estimated_quantity?: number | null;
  remarks?: string | null;
  reference_number?: string | null;
  status?: MarineStatus | null;
}
export type BerthMHERequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthMHERequestAPI-view";
export type BerthMHERequestView<
  V extends BerthMHERequestViewName
> = V extends "_base"
  ? Pick<
      BerthMHERequest,
      | "id"
      | "request_number"
      | "request_type"
      | "job_description"
      | "po_number"
      | "booking_type"
      | "booking_date"
      | "estimated_duration"
      | "estimated_trip"
      | "estimated_quantity"
      | "remarks"
      | "reference_number"
      | "status"
    >
  : V extends "_local"
  ? Pick<
      BerthMHERequest,
      | "id"
      | "request_number"
      | "request_type"
      | "job_description"
      | "po_number"
      | "booking_type"
      | "booking_date"
      | "estimated_duration"
      | "estimated_trip"
      | "estimated_quantity"
      | "remarks"
      | "reference_number"
      | "status"
    >
  : V extends "berthMHERequestAPI-view"
  ? Pick<
      BerthMHERequest,
      | "id"
      | "request_number"
      | "request_type"
      | "job_description"
      | "po_number"
      | "booking_type"
      | "booking_date"
      | "estimated_duration"
      | "estimated_trip"
      | "estimated_quantity"
      | "remarks"
      | "reference_number"
      | "status"
      | "request_behalf"
    >
  : never;
