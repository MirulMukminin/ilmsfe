import { StandardEntity } from "./base/sys$StandardEntity";
export class CalenderSetup extends StandardEntity {
  static NAME = "pbksb_CalenderSetup";
  holidayName?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  totalDay?: number | null;
  ramadhan_month?: boolean | null;
}
export type CalenderSetupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "calenderSetup-view";
export type CalenderSetupView<
  V extends CalenderSetupViewName
> = V extends "_base"
  ? Pick<
      CalenderSetup,
      | "id"
      | "holidayName"
      | "startDate"
      | "endDate"
      | "totalDay"
      | "ramadhan_month"
    >
  : V extends "_local"
  ? Pick<
      CalenderSetup,
      | "id"
      | "holidayName"
      | "startDate"
      | "endDate"
      | "totalDay"
      | "ramadhan_month"
    >
  : V extends "calenderSetup-view"
  ? Pick<
      CalenderSetup,
      | "id"
      | "holidayName"
      | "startDate"
      | "endDate"
      | "totalDay"
      | "ramadhan_month"
    >
  : never;
