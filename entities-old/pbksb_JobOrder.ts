import { StandardEntity } from "./base/sys$StandardEntity";
export class JobOrder extends StandardEntity {
  static NAME = "pbksb_JobOrder";
  name?: string | null;
  timestart?: string | null;
}
export type JobOrderViewName = "_base" | "_local" | "_minimal";
export type JobOrderView<V extends JobOrderViewName> = V extends "_base"
  ? Pick<JobOrder, "id" | "name" | "timestart">
  : V extends "_local"
  ? Pick<JobOrder, "id" | "name" | "timestart">
  : V extends "_minimal"
  ? Pick<JobOrder, "id" | "name">
  : never;
