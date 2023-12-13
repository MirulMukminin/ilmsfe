import { StandardEntity } from "./base/sys$StandardEntity";
import {
  RequestServiceType,
  Job_Service_Type,
  RequestFormStatus,
  com_company_pbksb_entity_requestform_BookingType
} from "../enums/enums";
import { CustomerUser } from "./pbksb_CustomerUser";
import { Customer } from "./pbksb_Customer";
import { Job } from "./pbksb_Job";
import { MheEndorserMap } from "./pbksb_MheEndorserMap";
import { Contract } from "./pbksb_Contract";
export class Requestform extends StandardEntity {
  static NAME = "pbksb_Requestform";
  running_number?: number | null;
  requestnumber?: string | null;
  requestservicetype?: RequestServiceType | null;
  jobservicetype?: Job_Service_Type | null;
  datesubmit?: any | null;
  booking_date_start?: any | null;
  booking_date_end?: any | null;
  customeruser?: CustomerUser | null;
  customer?: Customer | null;
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
  endorsed_by_map?: MheEndorserMap[] | null;
  console_estimatedHour?: number | null;
  console_estimatedTrip?: number | null;
  console_estimatedQuantity?: number | null;
  contract?: Contract | null;
}
export type RequestformViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "requestform-console-view"
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
      | "jobservicetype"
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
      | "jobservicetype"
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
  : V extends "requestform-console-view"
  ? Pick<
      Requestform,
      | "id"
      | "running_number"
      | "requestnumber"
      | "requestservicetype"
      | "jobservicetype"
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
      | "jobservicetype"
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
      | "customer"
      | "job"
    >
  : V extends "requestform-view-Angular"
  ? Pick<
      Requestform,
      | "id"
      | "running_number"
      | "requestnumber"
      | "requestservicetype"
      | "jobservicetype"
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
      | "contract"
      | "customer"
    >
  : V extends "requestform-view-EndorsedRequest"
  ? Pick<
      Requestform,
      | "id"
      | "running_number"
      | "requestnumber"
      | "requestservicetype"
      | "jobservicetype"
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
      | "request_by"
      | "customer"
    >
  : V extends "requestform-view-EndorsedRequestDetails"
  ? Pick<
      Requestform,
      | "id"
      | "running_number"
      | "requestnumber"
      | "requestservicetype"
      | "jobservicetype"
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
      | "request_by"
      | "customer"
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
      | "jobservicetype"
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
      | "request_by"
      | "customer"
    >
  : never;
