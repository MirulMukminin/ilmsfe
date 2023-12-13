import { StandardEntity } from "./base/sys$StandardEntity";
import { Quotation_Customer } from "./pbksb_Quotation_Customer";
import { RentalUOMEnum, ExternalItemStatus } from "../enums/enums";
import { Site } from "./pbksb_Site";
export class External_Item extends StandardEntity {
  static NAME = "pbksb_External_Item";
  item?: string | null;
  description?: string | null;
  quotation?: string | null;
  quotation_customer?: Quotation_Customer | null;
  uom?: RentalUOMEnum | null;
  quantity?: number | null;
  rent_period?: any | null;
  start_time?: any | null;
  site?: Site | null;
  unit?: string | null;
  status?: ExternalItemStatus | null;
}
export type External_ItemViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "external_Item-view";
export type External_ItemView<
  V extends External_ItemViewName
> = V extends "_base"
  ? Pick<
      External_Item,
      | "id"
      | "description"
      | "item"
      | "quotation"
      | "uom"
      | "quantity"
      | "rent_period"
      | "start_time"
      | "unit"
      | "status"
    >
  : V extends "_local"
  ? Pick<
      External_Item,
      | "id"
      | "item"
      | "description"
      | "quotation"
      | "uom"
      | "quantity"
      | "rent_period"
      | "start_time"
      | "unit"
      | "status"
    >
  : V extends "_minimal"
  ? Pick<External_Item, "id" | "description">
  : V extends "external_Item-view"
  ? Pick<
      External_Item,
      | "id"
      | "item"
      | "description"
      | "quotation"
      | "uom"
      | "quantity"
      | "rent_period"
      | "start_time"
      | "unit"
      | "status"
      | "quotation_customer"
      | "site"
    >
  : never;
