import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthWharfage } from "./pbksb_BerthWharfage";
import { BerthForm } from "./pbksb_BerthForm";
export class ScopeWork_MarineOS extends StandardEntity {
  static NAME = "pbksb_ScopeWork_MarineOS";
  tableUUID?: string | null;
  berth_wharfage?: BerthWharfage | null;
  unit_price?: any | null;
  ifsobject?: string | null;
  berth_form?: BerthForm | null;
  scopework?: string | null;
  requestnumber?: string | null;
  totalRequestedQuantity?: any | null;
  total_qty_in?: any | null;
  total_qty_out?: any | null;
  grandTotalQuantity?: any | null;
  total_price?: any | null;
}
export type ScopeWork_MarineOSViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "scopeWork_MarineOS-view";
export type ScopeWork_MarineOSView<
  V extends ScopeWork_MarineOSViewName
> = V extends "_base"
  ? Pick<
      ScopeWork_MarineOS,
      | "id"
      | "tableUUID"
      | "unit_price"
      | "ifsobject"
      | "scopework"
      | "requestnumber"
      | "totalRequestedQuantity"
      | "total_qty_in"
      | "total_qty_out"
      | "grandTotalQuantity"
      | "total_price"
    >
  : V extends "_local"
  ? Pick<
      ScopeWork_MarineOS,
      | "id"
      | "tableUUID"
      | "unit_price"
      | "ifsobject"
      | "scopework"
      | "requestnumber"
      | "totalRequestedQuantity"
      | "total_qty_in"
      | "total_qty_out"
      | "grandTotalQuantity"
      | "total_price"
    >
  : V extends "scopeWork_MarineOS-view"
  ? Pick<
      ScopeWork_MarineOS,
      | "id"
      | "tableUUID"
      | "unit_price"
      | "ifsobject"
      | "scopework"
      | "requestnumber"
      | "totalRequestedQuantity"
      | "total_qty_in"
      | "total_qty_out"
      | "grandTotalQuantity"
      | "total_price"
      | "berth_form"
    >
  : never;
