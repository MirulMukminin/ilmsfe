import { StandardEntity } from "./base/sys$StandardEntity";
import { Roro } from "./pbksb_Roro";
export class TripReportSetup extends StandardEntity {
  static NAME = "pbksb_TripReportSetup";
  platNumber?: string | null;
  reportPosition?: number | null;
  roro?: Roro | null;
}
export type TripReportSetupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "tripReportSetup-view";
export type TripReportSetupView<
  V extends TripReportSetupViewName
> = V extends "_base"
  ? Pick<TripReportSetup, "id" | "platNumber" | "reportPosition">
  : V extends "_local"
  ? Pick<TripReportSetup, "id" | "platNumber" | "reportPosition">
  : V extends "tripReportSetup-view"
  ? Pick<TripReportSetup, "id" | "platNumber" | "reportPosition" | "roro">
  : never;
