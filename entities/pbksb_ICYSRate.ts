import { StandardEntity } from "./base/sys$StandardEntity";
export class ICYSRate extends StandardEntity {
  static NAME = "pbksb_ICYSRate";
  startDate?: any | null;
  active?: boolean | null;
  monthly?: boolean | null;
  cost?: any | null;
}
export type ICYSRateViewName = "_base" | "_local" | "_minimal";
export type ICYSRateView<V extends ICYSRateViewName> = V extends "_base"
  ? Pick<ICYSRate, "id" | "startDate" | "active" | "monthly" | "cost">
  : V extends "_local"
  ? Pick<ICYSRate, "id" | "startDate" | "active" | "monthly" | "cost">
  : never;
