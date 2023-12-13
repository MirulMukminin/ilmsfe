import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthMHERequest } from "./pbksb_BerthMHERequest";
import { MarineStatus } from "../enums/enums";
import { External_Item } from "./pbksb_External_Item";
import { Site } from "./pbksb_Site";
export class BerthMHERequestExternalItem extends StandardEntity {
  static NAME = "pbksb_BerthMHERequestExternalItem";
  mhe_request?: BerthMHERequest | null;
  job_ticket?: string | null;
  status?: MarineStatus | null;
  usage?: any | null;
  quotation?: External_Item | null;
  item?: External_Item | null;
  uom?: string | null;
  quantity?: number | null;
  rent_period?: number | null;
  unit?: number | null;
  time?: any | null;
  location?: Site | null;
}
export type BerthMHERequestExternalItemViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthMHERequestExternalItemAPI-view";
export type BerthMHERequestExternalItemView<
  V extends BerthMHERequestExternalItemViewName
> = V extends "_base"
  ? Pick<
      BerthMHERequestExternalItem,
      | "id"
      | "job_ticket"
      | "status"
      | "usage"
      | "uom"
      | "quantity"
      | "rent_period"
      | "unit"
      | "time"
    >
  : V extends "_local"
  ? Pick<
      BerthMHERequestExternalItem,
      | "id"
      | "job_ticket"
      | "status"
      | "usage"
      | "uom"
      | "quantity"
      | "rent_period"
      | "unit"
      | "time"
    >
  : V extends "berthMHERequestExternalItemAPI-view"
  ? Pick<
      BerthMHERequestExternalItem,
      | "id"
      | "job_ticket"
      | "status"
      | "usage"
      | "uom"
      | "quantity"
      | "rent_period"
      | "unit"
      | "time"
      | "quotation"
      | "item"
      | "location"
    >
  : never;
