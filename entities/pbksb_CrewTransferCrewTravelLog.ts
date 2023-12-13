import { StandardEntity } from "./base/sys$StandardEntity";
import { CrewTransferCrew } from "./pbksb_CrewTransferCrew";
import { CrewTransferRequestItem } from "./pbksb_CrewTransferRequestItem";
export class CrewTransferCrewTravelLog extends StandardEntity {
  static NAME = "pbksb_CrewTransferCrewTravelLog";
  crew?: CrewTransferCrew | null;
  signOnSignOffRequest?: CrewTransferRequestItem[] | null;
  crewTransferCrew?: CrewTransferCrew | null;
}
export type CrewTransferCrewTravelLogViewName = "_base" | "_local" | "_minimal";
export type CrewTransferCrewTravelLogView<
  V extends CrewTransferCrewTravelLogViewName
> = never;
