import { StandardEntity } from "./base/sys$StandardEntity";
import {
  Job_MHE_ServiceType,
  PriceScheduleType,
  CustomerPriceGroupEnum
} from "../enums/enums";
import { MachineryType } from "./pbksb_MachineryType";
import { MachineryPositionHandling } from "./pbksb_MachineryPositionHandling";
import { MachineryCategory } from "./pbksb_MachineryCategory";
export class PriceSchedule extends StandardEntity {
  static NAME = "pbksb_PriceSchedule";
  service_type?: Job_MHE_ServiceType | null;
  price_schedule_type?: PriceScheduleType | null;
  machinerytype?: MachineryType | null;
  positiontype?: MachineryPositionHandling | null;
  scope_of_work?: string | null;
  scope_of_work_item?: string | null;
  machine_price_rate_group?: string | null;
  uom?: string | null;
  rates?: any | null;
  customerPriceGroup?: CustomerPriceGroupEnum | null;
  machinerycategory?: MachineryCategory | null;
}
export type PriceScheduleViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "priceSchedule-CUBAView"
  | "priceSchedule-CUBAbrowseView"
  | "priceSchedule-view";
export type PriceScheduleView<
  V extends PriceScheduleViewName
> = V extends "_base"
  ? Pick<
      PriceSchedule,
      | "id"
      | "service_type"
      | "price_schedule_type"
      | "scope_of_work"
      | "scope_of_work_item"
      | "machine_price_rate_group"
      | "uom"
      | "rates"
      | "customerPriceGroup"
    >
  : V extends "_local"
  ? Pick<
      PriceSchedule,
      | "id"
      | "service_type"
      | "price_schedule_type"
      | "scope_of_work"
      | "scope_of_work_item"
      | "machine_price_rate_group"
      | "uom"
      | "rates"
      | "customerPriceGroup"
    >
  : V extends "priceSchedule-CUBAView"
  ? Pick<
      PriceSchedule,
      | "id"
      | "machinerytype"
      | "machine_price_rate_group"
      | "uom"
      | "rates"
      | "customerPriceGroup"
      | "scope_of_work"
      | "service_type"
      | "price_schedule_type"
      | "positiontype"
      | "scope_of_work_item"
      | "machinerycategory"
    >
  : V extends "priceSchedule-CUBAbrowseView"
  ? Pick<
      PriceSchedule,
      | "id"
      | "machinerytype"
      | "scope_of_work"
      | "machine_price_rate_group"
      | "uom"
      | "rates"
      | "customerPriceGroup"
      | "service_type"
      | "price_schedule_type"
      | "positiontype"
      | "scope_of_work_item"
      | "machinerycategory"
    >
  : V extends "priceSchedule-view"
  ? Pick<
      PriceSchedule,
      | "id"
      | "service_type"
      | "price_schedule_type"
      | "scope_of_work"
      | "scope_of_work_item"
      | "machine_price_rate_group"
      | "uom"
      | "rates"
      | "customerPriceGroup"
      | "machinerytype"
      | "positiontype"
      | "machinerycategory"
    >
  : never;
