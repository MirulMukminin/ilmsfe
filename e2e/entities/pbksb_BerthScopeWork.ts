import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { ScopeWork } from "../enums/enums";
export class BerthScopeWork extends StandardEntity {
  static NAME = "pbksb_BerthScopeWork";
  berth_form?: BerthForm | null;
  scope_work?: ScopeWork | null;
  quantity_in?: any | null;
  quantity_out?: any | null;
  total?: any | null;
  uom?: string | null;
  start_date?: any | null;
  end_date?: any | null;
  remarks?: string | null;
  sort_ind?: number | null;
}
export type BerthScopeWorkViewName = "_base" | "_local" | "_minimal";
export type BerthScopeWorkView<
  V extends BerthScopeWorkViewName
> = V extends "_base"
  ? Pick<
      BerthScopeWork,
      | "id"
      | "scope_work"
      | "quantity_in"
      | "quantity_out"
      | "total"
      | "uom"
      | "start_date"
      | "end_date"
      | "remarks"
      | "sort_ind"
    >
  : V extends "_local"
  ? Pick<
      BerthScopeWork,
      | "id"
      | "scope_work"
      | "quantity_in"
      | "quantity_out"
      | "total"
      | "uom"
      | "start_date"
      | "end_date"
      | "remarks"
      | "sort_ind"
    >
  : never;
