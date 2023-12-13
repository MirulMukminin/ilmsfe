import { StandardEntity } from "./base/sys$StandardEntity";
import { Job } from "./pbksb_Job";
export class Console extends StandardEntity {
  static NAME = "pbksb_Console";
  estimated_duration?: number | null;
  estimated_trip?: number | null;
  estimated_quantity?: number | null;
  remarks?: string | null;
  reference_number?: string | null;
  job?: Job | null;
}
export type ConsoleViewName = "_base" | "_local" | "_minimal";
export type ConsoleView<V extends ConsoleViewName> = V extends "_base"
  ? Pick<
      Console,
      | "id"
      | "estimated_duration"
      | "estimated_trip"
      | "estimated_quantity"
      | "remarks"
      | "reference_number"
    >
  : V extends "_local"
  ? Pick<
      Console,
      | "id"
      | "estimated_duration"
      | "estimated_trip"
      | "estimated_quantity"
      | "remarks"
      | "reference_number"
    >
  : never;
