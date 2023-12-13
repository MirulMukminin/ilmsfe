import { BaseUuidEntity } from "./base/sys$BaseUuidEntity";
export class TripMonthReport extends BaseUuidEntity {
  static NAME = "pbksb_TripMonthReport";
  tripDate?: any | null;
  vehicle1?: number | null;
  vehicle2?: number | null;
  vehicle3?: number | null;
  vehicle4?: number | null;
  vehicle5?: number | null;
  totalTrip?: number | null;
}
export type TripMonthReportViewName = "_base" | "_local" | "_minimal";
export type TripMonthReportView<V extends TripMonthReportViewName> = never;
