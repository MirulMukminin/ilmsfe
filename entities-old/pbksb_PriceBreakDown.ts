import { StandardEntity } from "./base/sys$StandardEntity";
import { Job_MHE_ServiceType, JobStatus, RateCode } from "../enums/enums";
import { ObjectID } from "./pbksb_ObjectID";
import { PriceSchedule } from "./pbksb_PriceSchedule";
export class PriceBreakDown extends StandardEntity {
  static NAME = "pbksb_PriceBreakDown";
  num_line?: number | null;
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
      | "ifs_object"
      | "price_schedule"
    >
  : never;
