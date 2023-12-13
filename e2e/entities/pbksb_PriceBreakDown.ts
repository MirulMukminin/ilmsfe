import { StandardEntity } from "./base/sys$StandardEntity";
export class PriceBreakDown extends StandardEntity {
  static NAME = "pbksb_PriceBreakDown";
  request_number?: string | null;
  jobticket?: string | null;
  item?: string | null;
  quantity?: any | null;
  estimated_hours?: any | null;
  price?: any | null;
  subnumber?: number | null;
  itemRate?: any | null;
}
export type PriceBreakDownViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "priceBreakDown-browseView"
  | "priceBreakDown-view";
export type PriceBreakDownView<
  V extends PriceBreakDownViewName
> = V extends "_base"
  ? Pick<
      PriceBreakDown,
      | "id"
      | "request_number"
      | "jobticket"
      | "item"
      | "quantity"
      | "estimated_hours"
      | "price"
      | "subnumber"
      | "itemRate"
    >
  : V extends "_local"
  ? Pick<
      PriceBreakDown,
      | "id"
      | "request_number"
      | "jobticket"
      | "item"
      | "quantity"
      | "estimated_hours"
      | "price"
      | "subnumber"
      | "itemRate"
    >
  : V extends "priceBreakDown-browseView"
  ? Pick<
      PriceBreakDown,
      | "id"
      | "item"
      | "quantity"
      | "estimated_hours"
      | "price"
      | "request_number"
      | "jobticket"
      | "subnumber"
    >
  : V extends "priceBreakDown-view"
  ? Pick<
      PriceBreakDown,
      | "id"
      | "request_number"
      | "jobticket"
      | "item"
      | "quantity"
      | "estimated_hours"
      | "price"
      | "subnumber"
      | "itemRate"
    >
  : never;
