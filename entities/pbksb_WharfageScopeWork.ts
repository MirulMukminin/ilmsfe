import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthWharfage } from "./pbksb_BerthWharfage";
import { ScopeWork, MarineStatus } from "../enums/enums";
export class WharfageScopeWork extends StandardEntity {
  static NAME = "pbksb_WharfageScopeWork";
  wharfage_id?: BerthWharfage | null;
  scope_work?: ScopeWork | null;
  requested_qty?: any | null;
  requestedQuantityIn?: any | null;
  requestedQuantityOut?: any | null;
  quantity_in?: any | null;
  quantity_out?: any | null;
  total?: any | null;
  request?: boolean | null;
  start_date?: any | null;
  end_date?: any | null;
  status?: MarineStatus | null;
  remarks?: string | null;
  unit_price?: any | null;
  total_price?: any | null;
  sort_ind?: number | null;
}
export type WharfageScopeWorkViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "wharfageScopeWork-view";
export type WharfageScopeWorkView<
  V extends WharfageScopeWorkViewName
> = V extends "_base"
  ? Pick<
      WharfageScopeWork,
      | "id"
      | "scope_work"
      | "requested_qty"
      | "requestedQuantityIn"
      | "requestedQuantityOut"
      | "quantity_in"
      | "quantity_out"
      | "total"
      | "request"
      | "start_date"
      | "end_date"
      | "status"
      | "remarks"
      | "unit_price"
      | "total_price"
      | "sort_ind"
    >
  : V extends "_local"
  ? Pick<
      WharfageScopeWork,
      | "id"
      | "scope_work"
      | "requested_qty"
      | "requestedQuantityIn"
      | "requestedQuantityOut"
      | "quantity_in"
      | "quantity_out"
      | "total"
      | "request"
      | "start_date"
      | "end_date"
      | "status"
      | "remarks"
      | "unit_price"
      | "total_price"
      | "sort_ind"
    >
  : V extends "wharfageScopeWork-view"
  ? Pick<
      WharfageScopeWork,
      | "id"
      | "scope_work"
      | "requested_qty"
      | "requestedQuantityIn"
      | "requestedQuantityOut"
      | "quantity_in"
      | "quantity_out"
      | "total"
      | "request"
      | "start_date"
      | "end_date"
      | "status"
      | "remarks"
      | "unit_price"
      | "total_price"
      | "sort_ind"
      | "wharfage_id"
    >
  : never;
