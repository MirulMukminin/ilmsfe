import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthMHERequest } from "./pbksb_BerthMHERequest";
export class BerthMHERequestDateRecurring extends StandardEntity {
  static NAME = "pbksb_BerthMHERequestDateRecurring";
  berth_mhe_normal?: BerthMHERequest | null;
  start_date?: any | null;
  end_date?: any | null;
}
export type BerthMHERequestDateRecurringViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthMHERequestDateRecurring-APIview";
export type BerthMHERequestDateRecurringView<
  V extends BerthMHERequestDateRecurringViewName
> = V extends "_base"
  ? Pick<BerthMHERequestDateRecurring, "id" | "start_date" | "end_date">
  : V extends "_local"
  ? Pick<BerthMHERequestDateRecurring, "id" | "start_date" | "end_date">
  : V extends "berthMHERequestDateRecurring-APIview"
  ? Pick<BerthMHERequestDateRecurring, "id" | "start_date" | "end_date">
  : never;
