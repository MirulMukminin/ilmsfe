import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { ScopeWork } from "../enums/enums";
export class BerthScopeWork extends StandardEntity {
  static NAME = "pbksb_BerthScopeWork";
  berth_form?: BerthForm | null;
  total_price?: any | null;
  unit_price?: any | null;
  scope_work?: ScopeWork | null;
  requested_qty?: any | null;
  requestedQuantityIn?: any | null;
  requestedQuantityOut?: any | null;
  quantity_in?: any | null;
  quantity_out?: any | null;
  total?: any | null;
  uom?: string | null;
  start_date?: any | null;
  end_date?: any | null;
  remarks?: string | null;
  sort_ind?: number | null;
  indicator?: boolean | null;
  admin_remarks?: string | null;
  calTotal?: any | null;
}
export type BerthScopeWorkViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthScopeWork-view";
export type BerthScopeWorkView<
  V extends BerthScopeWorkViewName
> = V extends "_base"
  ? Pick<
      BerthScopeWork,
      | "id"
      | "total_price"
      | "unit_price"
      | "scope_work"
      | "requested_qty"
      | "requestedQuantityIn"
      | "requestedQuantityOut"
      | "quantity_in"
      | "quantity_out"
      | "total"
      | "uom"
      | "start_date"
      | "end_date"
      | "remarks"
      | "sort_ind"
      | "indicator"
      | "admin_remarks"
      | "calTotal"
    >
  : V extends "_local"
  ? Pick<
      BerthScopeWork,
      | "id"
      | "total_price"
      | "unit_price"
      | "scope_work"
      | "requested_qty"
      | "requestedQuantityIn"
      | "requestedQuantityOut"
      | "quantity_in"
      | "quantity_out"
      | "total"
      | "uom"
      | "start_date"
      | "end_date"
      | "remarks"
      | "sort_ind"
      | "indicator"
      | "admin_remarks"
      | "calTotal"
    >
  : V extends "berthScopeWork-view"
  ? Pick<
      BerthScopeWork,
      | "id"
      | "total_price"
      | "unit_price"
      | "scope_work"
      | "requested_qty"
      | "requestedQuantityIn"
      | "requestedQuantityOut"
      | "quantity_in"
      | "quantity_out"
      | "total"
      | "uom"
      | "start_date"
      | "end_date"
      | "remarks"
      | "sort_ind"
      | "indicator"
      | "admin_remarks"
      | "calTotal"
      | "berth_form"
    >
  : never;
