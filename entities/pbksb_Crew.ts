import { StandardEntity } from "./base/sys$StandardEntity";
import { TaskSchedule } from "./pbksb_TaskSchedule";
export class Crew extends StandardEntity {
  static NAME = "pbksb_Crew";
  crewid?: number | null;
  taskSchedule?: TaskSchedule | null;
}
export type CrewViewName = "_base" | "_local" | "_minimal";
export type CrewView<V extends CrewViewName> = V extends "_base"
  ? Pick<Crew, "id" | "crewid">
  : V extends "_local"
  ? Pick<Crew, "id" | "crewid">
  : never;
