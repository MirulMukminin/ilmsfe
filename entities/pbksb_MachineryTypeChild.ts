import { StandardEntity } from "./base/sys$StandardEntity";
import { MachineryType } from "./pbksb_MachineryType";
import {
  CategoryEnum,
  OperatorToMapEnum,
  ChildStatusEnum
} from "../enums/enums";
import { MachineryPositionHandling } from "./pbksb_MachineryPositionHandling";
export class MachineryTypeChild extends StandardEntity {
  static NAME = "pbksb_MachineryTypeChild";
  parent?: MachineryType | null;
  category?: CategoryEnum | null;
  machinerytype?: MachineryType | null;
  manpowerdesignation?: MachineryPositionHandling | null;
  quantity?: number | null;
  operator_to_map?: OperatorToMapEnum | null;
  active?: ChildStatusEnum | null;
}
export type MachineryTypeChildViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "machineryTypeChild-view";
export type MachineryTypeChildView<
  V extends MachineryTypeChildViewName
> = V extends "_base"
  ? Pick<
      MachineryTypeChild,
      "id" | "category" | "quantity" | "operator_to_map" | "active"
    >
  : V extends "_local"
  ? Pick<
      MachineryTypeChild,
      "id" | "category" | "quantity" | "operator_to_map" | "active"
    >
  : V extends "machineryTypeChild-view"
  ? Pick<
      MachineryTypeChild,
      | "id"
      | "category"
      | "quantity"
      | "operator_to_map"
      | "active"
      | "manpowerdesignation"
      | "machinerytype"
      | "parent"
    >
  : never;
