import { StandardEntity } from "./base/sys$StandardEntity";
import { Good } from "./pbksb_Good";
import { Goods_IN } from "./pbksb_Goods_IN";
import { Good_In_Statu } from "../enums/enums";
export class Inventory_Adjusment extends StandardEntity {
  static NAME = "pbksb_Inventory_Adjusment";
  good?: Good | null;
  good_in?: Goods_IN | null;
  quantity_adjustment?: any | null;
  status?: Good_In_Statu | null;
  request_by?: string | null;
  request_date?: any | null;
  approved_by?: string | null;
  approved_date?: any | null;
}
export type Inventory_AdjusmentViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "inventory_Adjusment-view-CUBABrowse";
export type Inventory_AdjusmentView<
  V extends Inventory_AdjusmentViewName
> = V extends "_base"
  ? Pick<
      Inventory_Adjusment,
      | "id"
      | "quantity_adjustment"
      | "status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
    >
  : V extends "_local"
  ? Pick<
      Inventory_Adjusment,
      | "id"
      | "quantity_adjustment"
      | "status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
    >
  : V extends "inventory_Adjusment-view-CUBABrowse"
  ? Pick<
      Inventory_Adjusment,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "quantity_adjustment"
      | "status"
      | "request_by"
      | "request_date"
      | "approved_by"
      | "approved_date"
      | "good"
      | "good_in"
    >
  : never;
