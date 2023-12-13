import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { Category_Type, Type_Of_Goods, Status } from "../enums/enums";
import { Site } from "./pbksb_Site";
export class Transfer_Location extends StandardEntity {
  static NAME = "pbksb_Transfer_location";
  transfer_date?: any | null;
  customer?: Customer | null;
  request_no?: string | null;
  category?: Category_Type | null;
  type_of_goods?: Type_Of_Goods | null;
  remarks?: string | null;
  status?: Status | null;
  items?: string | null;
  quantity?: number | null;
  site_from?: Site | null;
  site_to?: Site | null;
  request_by?: string | null;
  request_date?: any | null;
  approved_by?: string | null;
  approved_date?: any | null;
}
export type Transfer_LocationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "transfer_Location_api-view"
  | "transfer_location-view";
export type Transfer_LocationView<
  V extends Transfer_LocationViewName
> = V extends "_base"
  ? Pick<
      Transfer_Location,
      | "id"
      | "transfer_date"
      | "request_no"
      | "category"
      | "type_of_goods"
      | "remarks"
      | "status"
      | "items"
      | "quantity"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
    >
  : V extends "_local"
  ? Pick<
      Transfer_Location,
      | "id"
      | "transfer_date"
      | "request_no"
      | "category"
      | "type_of_goods"
      | "remarks"
      | "status"
      | "items"
      | "quantity"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
    >
  : V extends "transfer_Location_api-view"
  ? Pick<
      Transfer_Location,
      | "id"
      | "transfer_date"
      | "request_no"
      | "category"
      | "type_of_goods"
      | "remarks"
      | "status"
      | "items"
      | "quantity"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "site_from"
      | "site_to"
      | "customer"
    >
  : V extends "transfer_location-view"
  ? Pick<
      Transfer_Location,
      | "id"
      | "transfer_date"
      | "request_no"
      | "category"
      | "type_of_goods"
      | "remarks"
      | "status"
      | "items"
      | "quantity"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "site_from"
      | "site_to"
      | "customer"
    >
  : never;
