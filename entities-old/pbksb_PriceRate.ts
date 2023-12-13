import { StandardEntity } from "./base/sys$StandardEntity";
import { WeekendStatus } from "../enums/enums";
export class PriceRate extends StandardEntity {
  static NAME = "pbksb_PriceRate";
  manpower_rate?: string | null;
  start_time?: any | null;
  end_time?: any | null;
  weekend_status?: WeekendStatus | null;
}
export type PriceRateViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "priceRate-view";
export type PriceRateView<V extends PriceRateViewName> = V extends "_base"
  ? Pick<
      PriceRate,
      "id" | "manpower_rate" | "start_time" | "end_time" | "weekend_status"
    >
  : V extends "_local"
  ? Pick<
      PriceRate,
      "id" | "manpower_rate" | "start_time" | "end_time" | "weekend_status"
    >
  : V extends "priceRate-view"
  ? Pick<
      PriceRate,
      "id" | "manpower_rate" | "start_time" | "end_time" | "weekend_status"
    >
  : never;
