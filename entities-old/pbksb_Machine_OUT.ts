import { StandardEntity } from "./base/sys$StandardEntity";
import { Machine } from "./pbksb_Machine";
export class Machine_OUT extends StandardEntity {
  static NAME = "pbksb_Machine_OUT";
  machine?: Machine | null;
  quantity?: number | null;
  date_out?: any | null;
}
export type Machine_OUTViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "machine_OUT-view";
export type Machine_OUTView<V extends Machine_OUTViewName> = V extends "_base"
  ? Pick<Machine_OUT, "id" | "quantity" | "date_out">
  : V extends "_local"
  ? Pick<Machine_OUT, "id" | "quantity" | "date_out">
  : V extends "machine_OUT-view"
  ? Pick<Machine_OUT, "id" | "quantity" | "date_out" | "machine">
  : never;
