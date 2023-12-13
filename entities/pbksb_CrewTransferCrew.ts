import { StandardEntity } from "./base/sys$StandardEntity";
import { Nationality } from "./pbksb_Nationality";
import { CrewTransferSignOnStatus } from "../enums/enums";
import { CrewTransferCrewTravelLog } from "./pbksb_CrewTransferCrewTravelLog";
export class CrewTransferCrew extends StandardEntity {
  static NAME = "pbksb_CrewTransferCrew";
  name?: string | null;
  destination?: string | null;
  icPassport?: string | null;
  passportExpiry?: any | null;
  nationality?: Nationality | null;
  company?: string | null;
  mobileNumber?: string | null;
  signOnStatus?: CrewTransferSignOnStatus | null;
  couponNumber?: string | null;
  departureDate?: any | null;
  crewTravelLog?: CrewTransferCrewTravelLog | null;
}
export type CrewTransferCrewViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "crewTransferCrew-view";
export type CrewTransferCrewView<
  V extends CrewTransferCrewViewName
> = V extends "_base"
  ? Pick<
      CrewTransferCrew,
      | "id"
      | "name"
      | "destination"
      | "icPassport"
      | "passportExpiry"
      | "company"
      | "mobileNumber"
      | "signOnStatus"
      | "couponNumber"
      | "departureDate"
    >
  : V extends "_local"
  ? Pick<
      CrewTransferCrew,
      | "id"
      | "name"
      | "destination"
      | "icPassport"
      | "passportExpiry"
      | "company"
      | "mobileNumber"
      | "signOnStatus"
      | "couponNumber"
      | "departureDate"
    >
  : V extends "_minimal"
  ? Pick<CrewTransferCrew, "id" | "name">
  : V extends "crewTransferCrew-view"
  ? Pick<
      CrewTransferCrew,
      | "id"
      | "name"
      | "destination"
      | "icPassport"
      | "passportExpiry"
      | "company"
      | "mobileNumber"
      | "signOnStatus"
      | "couponNumber"
      | "departureDate"
      | "nationality"
    >
  : never;
