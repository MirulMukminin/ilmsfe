import { StandardEntity } from "./base/sys$StandardEntity";
import {
  Job_MHE_ServiceType,
  PriceScheduleType,
  UOM,
  CustomerPriceGroupEnum,
  RateCode
} from "../enums/enums";
import { MachineryType } from "./pbksb_MachineryType";
import { MachineryPositionHandling } from "./pbksb_MachineryPositionHandling";
import { MachineryCategory } from "./pbksb_MachineryCategory";
import { ObjectID } from "./pbksb_ObjectID";
export class PriceScheduleArchive extends StandardEntity {
  static NAME = "pbksb_PriceScheduleArchive";
  service_type?: Job_MHE_ServiceType | null;
  price_schedule_type?: PriceScheduleType | null;
  machinerytype?: MachineryType | null;
  positiontype?: MachineryPositionHandling | null;
  scope_of_work?: string | null;
  scope_of_work_item?: string | null;
  machine_price_rate_group?: string | null;
  uom?: UOM | null;
  rates?: any | null;
  customerPriceGroup?: CustomerPriceGroupEnum | null;
  machinerycategory?: MachineryCategory | null;
  ifs_object?: ObjectID | null;
  ot_rates?: any | null;
  ratecode?: RateCode | null;
  effective_date?: any | null;
  end_effective_date?: any | null;
}
export type PriceScheduleArchiveViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "priceScheduleArchive-view";
export type PriceScheduleArchiveView<
  V extends PriceScheduleArchiveViewName
> = V extends "_base"
  ? Pick<
      PriceScheduleArchive,
      | "id"
      | "service_type"
      | "price_schedule_type"
      | "scope_of_work"
      | "scope_of_work_item"
      | "machine_price_rate_group"
      | "uom"
      | "rates"
      | "customerPriceGroup"
      | "ot_rates"
      | "ratecode"
      | "effective_date"
      | "end_effective_date"
    >
  : V extends "_local"
  ? Pick<
      PriceScheduleArchive,
      | "id"
      | "service_type"
      | "price_schedule_type"
      | "scope_of_work"
      | "scope_of_work_item"
      | "machine_price_rate_group"
      | "uom"
      | "rates"
      | "customerPriceGroup"
      | "ot_rates"
      | "ratecode"
      | "effective_date"
      | "end_effective_date"
    >
  : V extends "priceScheduleArchive-view"
  ? Pick<
      PriceScheduleArchive,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "service_type"
      | "price_schedule_type"
      | "scope_of_work"
      | "scope_of_work_item"
      | "machine_price_rate_group"
      | "uom"
      | "rates"
      | "customerPriceGroup"
      | "ot_rates"
      | "ratecode"
      | "effective_date"
      | "end_effective_date"
      | "machinerytype"
      | "positiontype"
      | "machinerycategory"
      | "ifs_object"
    >
  : never;
