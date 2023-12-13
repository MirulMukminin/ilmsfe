import { StandardEntity } from "./base/sys$StandardEntity";
import { PriceInvoice } from "./pbksb_PriceInvoice";
import { Job_MHE_ServiceType, JobStatus, RateCode, UOM } from "../enums/enums";
import { ObjectID } from "./pbksb_ObjectID";
import { PriceSchedule } from "./pbksb_PriceSchedule";
export class PriceBreakDown extends StandardEntity {
  static NAME = "pbksb_PriceBreakDown";
  num_line?: number | null;
  priceInvoice?: PriceInvoice | null;
  request_number?: string | null;
  servicetype?: Job_MHE_ServiceType | null;
  jobticket?: string | null;
  item?: string | null;
  quantity?: any | null;
  estimated_hours?: any | null;
  price?: any | null;
  subnumber?: number | null;
  itemRate?: any | null;
  ifs_object?: ObjectID | null;
  price_schedule?: PriceSchedule | null;
  status?: JobStatus | null;
  ratecode?: RateCode | null;
  uom?: UOM | null;
  remarks?: string | null;
}
export type PriceBreakDownViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "priceBreakDown-browseView"
  | "priceBreakDown-view";
export type PriceBreakDownView<
  V extends PriceBreakDownViewName
> = V extends "_base"
  ? Pick<
      PriceBreakDown,
      | "id"
      | "num_line"
      | "request_number"
      | "servicetype"
      | "jobticket"
      | "item"
      | "quantity"
      | "estimated_hours"
      | "price"
      | "subnumber"
      | "itemRate"
      | "status"
      | "ratecode"
      | "uom"
      | "remarks"
    >
  : V extends "_local"
  ? Pick<
      PriceBreakDown,
      | "id"
      | "num_line"
      | "request_number"
      | "servicetype"
      | "jobticket"
      | "item"
      | "quantity"
      | "estimated_hours"
      | "price"
      | "subnumber"
      | "itemRate"
      | "status"
      | "ratecode"
      | "uom"
      | "remarks"
    >
  : V extends "priceBreakDown-browseView"
  ? Pick<
      PriceBreakDown,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "item"
      | "quantity"
      | "estimated_hours"
      | "price"
      | "request_number"
      | "jobticket"
      | "subnumber"
      | "num_line"
      | "servicetype"
      | "itemRate"
      | "ifs_object"
      | "price_schedule"
      | "status"
      | "uom"
      | "ratecode"
      | "priceInvoice"
    >
  : V extends "priceBreakDown-view"
  ? Pick<
      PriceBreakDown,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "num_line"
      | "request_number"
      | "servicetype"
      | "jobticket"
      | "item"
      | "quantity"
      | "estimated_hours"
      | "price"
      | "subnumber"
      | "itemRate"
      | "status"
      | "ratecode"
      | "uom"
      | "remarks"
      | "ifs_object"
      | "price_schedule"
      | "priceInvoice"
    >
  : never;
