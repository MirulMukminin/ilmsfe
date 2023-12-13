import { BaseUuidEntity } from "./base/sys$BaseUuidEntity";
export class TripReport extends BaseUuidEntity {
  static NAME = "pbksb_TripReport";
  platNumber?: string | null;
  groupType?: string | null;
  groupDate?: any | null;
  year?: string | null;
  month?: string | null;
  tripCount?: number | null;
}
export type TripReportViewName = "_base" | "_local" | "_minimal";
export type TripReportView<V extends TripReportViewName> = never;
