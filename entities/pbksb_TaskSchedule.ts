import { StandardEntity } from "./base/sys$StandardEntity";
import { Job } from "./pbksb_Job";
import { Crew } from "./pbksb_Crew";
export class TaskSchedule extends StandardEntity {
  static NAME = "pbksb_TaskSchedule";
  job?: Job | null;
  crew?: Crew[] | null;
}
export type TaskScheduleViewName = "_base" | "_local" | "_minimal";
export type TaskScheduleView<V extends TaskScheduleViewName> = never;
