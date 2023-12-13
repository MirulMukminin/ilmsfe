import { StandardEntity } from "./base/sys$StandardEntity";
import { CrewTransferRequest } from "./pbksb_CrewTransferRequest";
import { ImigJlMohStatus } from "../enums/enums";
import { CrewTransferCrewTravelLog } from "./pbksb_CrewTransferCrewTravelLog";
export class CrewTransferRequestItem extends StandardEntity {
  static NAME = "pbksb_CrewTransferRequestItem";
  crewTransferRequest?: CrewTransferRequest | null;
  crewName?: string | null;
  crewIcPassport?: string | null;
  crewPassportExpiry?: any | null;
  crewNationality?: string | null;
  crewCompany?: string | null;
  crewMobileNumber?: string | null;
  imigJlMohPass?: ImigJlMohStatus | null;
  referenceNumberImigJlMoh?: string | null;
  noShow?: boolean | null;
  remarks?: string | null;
  origin?: string | null;
  destination?: string | null;
  couponNumber?: string | null;
  crewTransferCrewTravelLog?: CrewTransferCrewTravelLog | null;
}
export type CrewTransferRequestItemViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "crewTransferRequestItem-view";
export type CrewTransferRequestItemView<
  V extends CrewTransferRequestItemViewName
> = V extends "_base"
  ? Pick<
      CrewTransferRequestItem,
      | "id"
      | "crewName"
      | "crewIcPassport"
      | "crewPassportExpiry"
      | "crewNationality"
      | "crewCompany"
      | "crewMobileNumber"
      | "imigJlMohPass"
      | "referenceNumberImigJlMoh"
      | "noShow"
      | "remarks"
      | "origin"
      | "destination"
      | "couponNumber"
    >
  : V extends "_local"
  ? Pick<
      CrewTransferRequestItem,
      | "id"
      | "crewName"
      | "crewIcPassport"
      | "crewPassportExpiry"
      | "crewNationality"
      | "crewCompany"
      | "crewMobileNumber"
      | "imigJlMohPass"
      | "referenceNumberImigJlMoh"
      | "noShow"
      | "remarks"
      | "origin"
      | "destination"
      | "couponNumber"
    >
  : V extends "crewTransferRequestItem-view"
  ? Pick<
      CrewTransferRequestItem,
      | "id"
      | "crewName"
      | "crewIcPassport"
      | "crewPassportExpiry"
      | "crewNationality"
      | "crewCompany"
      | "crewMobileNumber"
      | "imigJlMohPass"
      | "referenceNumberImigJlMoh"
      | "noShow"
      | "remarks"
      | "origin"
      | "destination"
      | "couponNumber"
    >
  : never;
