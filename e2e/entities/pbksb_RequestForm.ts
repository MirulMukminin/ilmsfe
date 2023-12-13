import { StandardEntity } from "./base/sys$StandardEntity";
import {
  RequestServiceType,
  RequestFormStatus,
  com_company_pbksb_entity_requestform_BookingType
} from "../enums/enums";
import { CustomerUser } from "./pbksb_CustomerUser";
import { Job } from "./pbksb_Job";
export class Requestform extends StandardEntity {
  static NAME = "pbksb_Requestform";
  running_number?: number | null;
  requestnumber?: string | null;
  requestservicetype?: RequestServiceType | null;
  datesubmit?: any | null;
  booking_date_start?: any | null;
  booking_date_end?: any | null;
  customeruser?: CustomerUser | null;
  job?: Job[] | null;
  status?: RequestFormStatus | null;
  remark?: string | null;
  po_number?: string | null;
  booking_type?: com_company_pbksb_entity_requestform_BookingType | null;
  job_description?: string | null;
  request_on_behalf?: string | null;
  request_by?: CustomerUser | null;
  reference_number?: string | null;
  cancel_Date?: any | null;
  endorsed_by?: string | null;
  console_estimatedHour?: number | null;
  console_estimatedTrip?: number | null;
  console_estimatedQuantity?: number | null;
}
export type RequestformViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "requestform-view"
  | "requestform-view-Angular"
  | "requestform-view-EndorsedRequest"
  | "requestform-view-EndorsedRequestDetails"
  | "requestform-view_RequestListimg";
export type RequestformView<V extends RequestformViewName> = V extends "_base"
  ? Pick<
      Requestform,
      | "id"
      | "running_number"
      | "requestnumber"
      | "requestservicetype"
      | "datesubmit"
      | "booking_date_start"
      | "booking_date_end"
      | "status"
      | "remark"
      | "po_number"
      | "booking_type"
      | "job_description"
      | "request_on_behalf"
      | "reference_number"
      | "cancel_Date"
      | "endorsed_by"
      | "console_estimatedHour"
      | "console_estimatedTrip"
      | "console_estimatedQuantity"
    >
  : V extends "_local"
  ? Pick<
      Requestform,
      | "id"
      | "running_number"
      | "requestnumber"
      | "requestservicetype"
      | "datesubmit"
      | "booking_date_start"
      | "booking_date_end"
      | "status"
      | "remark"
      | "po_number"
      | "booking_type"
      | "job_description"
      | "request_on_behalf"
      | "reference_number"
      | "cancel_Date"
      | "endorsed_by"
      | "console_estimatedHour"
      | "console_estimatedTrip"
      | "console_estimatedQuantity"
    >
  : V extends "requestform-view"
  ? Pick<
      Requestform,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "running_number"
      | "requestnumber"
      | "requestservicetype"
      | "datesubmit"
      | "booking_date_start"
      | "booking_date_end"
      | "status"
      | "remark"
      | "po_number"
      | "booking_type"
      | "job_description"
      | "request_on_behalf"
      | "reference_number"
      | "cancel_Date"
      | "endorsed_by"
      | "console_estimatedHour"
      | "console_estimatedTrip"
      | "console_estimatedQuantity"
      | "customeruser"
      | "request_by"
    >
  : V extends "requestform-view-Angular"
  ? Pick<
      Requestform,
      | "id"
      | "running_number"
      | "requestnumber"
      | "requestservicetype"
      | "datesubmit"
      | "booking_date_start"
      | "booking_date_end"
      | "status"
      | "remark"
      | "po_number"
      | "booking_type"
      | "job_description"
      | "request_on_behalf"
      | "reference_number"
      | "cancel_Date"
      | "endorsed_by"
      | "console_estimatedHour"
      | "console_estimatedTrip"
      | "console_estimatedQuantity"
      | "customeruser"
      | "job"
      | "request_by"
    >
  : V extends "requestform-view-EndorsedRequest"
  ? Pick<
      Requestform,
      | "id"
      | "running_number"
      | "requestnumber"
      | "requestservicetype"
      | "datesubmit"
      | "booking_date_start"
      | "booking_date_end"
      | "status"
      | "remark"
      | "po_number"
      | "booking_type"
      | "job_description"
      | "request_on_behalf"
      | "reference_number"
      | "cancel_Date"
      | "endorsed_by"
      | "console_estimatedHour"
      | "console_estimatedTrip"
      | "console_estimatedQuantity"
    >
  : V extends "requestform-view-EndorsedRequestDetails"
  ? Pick<
      Requestform,
      | "id"
      | "running_number"
      | "requestnumber"
      | "requestservicetype"
      | "datesubmit"
      | "booking_date_start"
      | "booking_date_end"
      | "status"
      | "remark"
      | "po_number"
      | "booking_type"
      | "job_description"
      | "request_on_behalf"
      | "reference_number"
      | "cancel_Date"
      | "endorsed_by"
      | "console_estimatedHour"
      | "console_estimatedTrip"
      | "console_estimatedQuantity"
      | "customeruser"
      | "request_by"
    >
  : V extends "requestform-view_RequestListimg"
  ? Pick<
      Requestform,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "running_number"
      | "requestnumber"
      | "requestservicetype"
      | "datesubmit"
      | "booking_date_start"
      | "booking_date_end"
      | "status"
      | "remark"
      | "po_number"
      | "booking_type"
      | "job_description"
      | "request_on_behalf"
      | "reference_number"
      | "cancel_Date"
      | "endorsed_by"
      | "console_estimatedHour"
      | "console_estimatedTrip"
      | "console_estimatedQuantity"
      | "job"
      | "customeruser"
    >
  : never;
