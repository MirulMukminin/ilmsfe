import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthTerminal, MarineStatus } from "../enums/enums";
import { Customer } from "./pbksb_Customer";
import { Vessel } from "./pbksb_Vessel";
export class BerthWharfage extends StandardEntity {
  static NAME = "pbksb_BerthWharfage";
  request_number?: string | null;
  terminal?: BerthTerminal | null;
  company?: Customer | null;
  vessel?: Vessel | null;
  request_on_behalf?: Customer | null;
  po_number?: string | null;
  arrival_datetime?: any | null;
  departure_datetime?: any | null;
  remarks?: string | null;
  agent?: Customer | null;
  request_by?: string | null;
  request_date?: any | null;
  endorsed_by?: string | null;
  endorsed_date?: any | null;
  update_cancelled_by?: string | null;
  update_cancelled_datetime?: any | null;
  status?: MarineStatus | null;
  comment?: string | null;
  log_number?: string | null;
}
export type BerthWharfageViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthWharfage-view";
export type BerthWharfageView<
  V extends BerthWharfageViewName
> = V extends "_base"
  ? Pick<
      BerthWharfage,
      | "id"
      | "request_number"
      | "terminal"
      | "po_number"
      | "arrival_datetime"
      | "departure_datetime"
      | "remarks"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "status"
      | "comment"
      | "log_number"
    >
  : V extends "_local"
  ? Pick<
      BerthWharfage,
      | "id"
      | "request_number"
      | "terminal"
      | "po_number"
      | "arrival_datetime"
      | "departure_datetime"
      | "remarks"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "status"
      | "comment"
      | "log_number"
    >
  : V extends "berthWharfage-view"
  ? Pick<
      BerthWharfage,
      | "id"
      | "request_number"
      | "terminal"
      | "po_number"
      | "arrival_datetime"
      | "departure_datetime"
      | "remarks"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "status"
      | "comment"
      | "log_number"
      | "company"
      | "request_on_behalf"
      | "agent"
      | "vessel"
    >
  : never;
