import { StandardEntity } from "./base/sys$StandardEntity";
export class MheSessionTimeSummary extends StandardEntity {
  static NAME = "pbksb_MheSessionTimeSummary";
  requestFormNumber?: string | null;
  jobTicketNumber?: string | null;
  rateAHours?: any | null;
  rateA?: any | null;
  rateBHours?: any | null;
  rateB?: any | null;
  rateDHours?: any | null;
  rateD?: any | null;
}
export type MheSessionTimeSummaryViewName = "_base" | "_local" | "_minimal";
export type MheSessionTimeSummaryView<
  V extends MheSessionTimeSummaryViewName
> = V extends "_base"
  ? Pick<
      MheSessionTimeSummary,
      | "id"
      | "requestFormNumber"
      | "jobTicketNumber"
      | "rateAHours"
      | "rateA"
      | "rateBHours"
      | "rateB"
      | "rateDHours"
      | "rateD"
    >
  : V extends "_local"
  ? Pick<
      MheSessionTimeSummary,
      | "id"
      | "requestFormNumber"
      | "jobTicketNumber"
      | "rateAHours"
      | "rateA"
      | "rateBHours"
      | "rateB"
      | "rateDHours"
      | "rateD"
    >
  : never;
