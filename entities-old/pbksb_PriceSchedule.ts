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
export class PriceSchedule extends StandardEntity {
  static NAME = "pbksb_PriceSchedule";
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
      | "ot_rates"
      | "ratecode"
      | "effective_date"
      | "end_effective_date"
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
      | "ot_rates"
      | "ratecode"
      | "effective_date"
      | "end_effective_date"
    >
  : V extends "priceSchedule-CUBAView"
  ? Pick<
      PriceSchedule,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
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
      | "ifs_object"
      | "ot_rates"
      | "ratecode"
      | "effective_date"
    >
  : V extends "priceSchedule-CUBAbrowseView"
  ? Pick<
      PriceSchedule,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
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
      | "ifs_object"
      | "ot_rates"
      | "ratecode"
      | "effective_date"
    >
  : V extends "priceSchedule-view"
  ? Pick<
      PriceSchedule,
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
