import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { Customer } from "./pbksb_Customer";
export class BerthMHERequestConsole extends StandardEntity {
  static NAME = "pbksb_BerthMHERequestConsole";
  berth_form?: BerthForm | null;
  request_behalf?: Customer | null;
  job_description?: string | null;
  booking_date?: any | null;
  estimated_duration?: number | null;
  estimated_trip?: number | null;
  estimated_quantity?: number | null;
  remarks?: string | null;
  reference_number?: string | null;
}
export type BerthMHERequestConsoleViewName = "_base" | "_local" | "_minimal";
export type BerthMHERequestConsoleView<
  V extends BerthMHERequestConsoleViewName
> = V extends "_base"
  ? Pick<
      BerthMHERequestConsole,
      | "id"
      | "job_description"
      | "booking_date"
      | "estimated_duration"
      | "estimated_trip"
      | "estimated_quantity"
      | "remarks"
      | "reference_number"
    >
  : V extends "_local"
  ? Pick<
      BerthMHERequestConsole,
      | "id"
      | "job_description"
      | "booking_date"
      | "estimated_duration"
      | "estimated_trip"
      | "estimated_quantity"
      | "remarks"
      | "reference_number"
    >
  : never;
