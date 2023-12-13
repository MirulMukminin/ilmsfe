import { StandardEntity } from "./base/sys$StandardEntity";
import { Machine } from "./pbksb_Machine";
export class Machine_IN extends StandardEntity {
  static NAME = "pbksb_Machine_IN";
  machine?: Machine | null;
  date_in?: any | null;
  quantity?: number | null;
}
export type Machine_INViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "machine_IN-view";
export type Machine_INView<V extends Machine_INViewName> = V extends "_base"
  ? Pick<Machine_IN, "id" | "date_in" | "quantity">
  : V extends "_local"
  ? Pick<Machine_IN, "id" | "date_in" | "quantity">
  : V extends "machine_IN-view"
  ? Pick<Machine_IN, "id" | "date_in" | "quantity" | "machine">
  : never;
