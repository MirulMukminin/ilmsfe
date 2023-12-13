import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { SpaceRentalDocuments } from "./pbksb_SpaceRentalDocuments";
import { Space } from "./pbksb_Space";
import { SpaceRentalStatusEnums } from "../enums/enums";
export class RentalRequest extends StandardEntity {
  static NAME = "pbksb_RentalRequest";
  requestId?: any | null;
  company?: Customer | null;
  documents?: SpaceRentalDocuments[] | null;
  bankerName?: string | null;
  bankerAddress?: string | null;
  space?: Space | null;
  area?: any | null;
  address?: string | null;
  telephone?: string | null;
  contactPerson?: string | null;
  contractPeriod?: number | null;
  commencementDate?: any | null;
  designation?: string | null;
  email?: string | null;
  scopeOfActivities?: string | null;
  status?: SpaceRentalStatusEnums | null;
  currentContractOrganisation?: string | null;
  currentContractPeriod?: string | null;
  companyDirector?: string | null;
  companyDirectorAddress?: string | null;
  principalName?: string | null;
  principalActivities?: string | null;
  projectedTurnover?: string | null;
  contractActivitiesDetails?: string | null;
  sharesAmongstShareholders?: string | null;
  sharesNonMalaysian?: string | null;
  sharesBumi?: string | null;
  shareNonBumi?: string | null;
}
export type RentalRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "rentalRequest-view";
export type RentalRequestView<
  V extends RentalRequestViewName
> = V extends "_base"
  ? Pick<
      RentalRequest,
      | "id"
      | "company"
      | "requestId"
      | "bankerName"
      | "bankerAddress"
      | "area"
      | "address"
      | "telephone"
      | "contactPerson"
      | "contractPeriod"
      | "commencementDate"
      | "designation"
      | "email"
      | "scopeOfActivities"
      | "status"
      | "currentContractOrganisation"
      | "currentContractPeriod"
      | "companyDirector"
      | "companyDirectorAddress"
      | "principalName"
      | "principalActivities"
      | "projectedTurnover"
      | "contractActivitiesDetails"
      | "sharesAmongstShareholders"
      | "sharesNonMalaysian"
      | "sharesBumi"
      | "shareNonBumi"
    >
  : V extends "_local"
  ? Pick<
      RentalRequest,
      | "id"
      | "requestId"
      | "bankerName"
      | "bankerAddress"
      | "area"
      | "address"
      | "telephone"
      | "contactPerson"
      | "contractPeriod"
      | "commencementDate"
      | "designation"
      | "email"
      | "scopeOfActivities"
      | "status"
      | "currentContractOrganisation"
      | "currentContractPeriod"
      | "companyDirector"
      | "companyDirectorAddress"
      | "principalName"
      | "principalActivities"
      | "projectedTurnover"
      | "contractActivitiesDetails"
      | "sharesAmongstShareholders"
      | "sharesNonMalaysian"
      | "sharesBumi"
      | "shareNonBumi"
    >
  : V extends "_minimal"
  ? Pick<RentalRequest, "id" | "company" | "requestId">
  : V extends "rentalRequest-view"
  ? Pick<
      RentalRequest,
      | "id"
      | "requestId"
      | "bankerName"
      | "bankerAddress"
      | "area"
      | "address"
      | "telephone"
      | "contactPerson"
      | "contractPeriod"
      | "commencementDate"
      | "designation"
      | "email"
      | "scopeOfActivities"
      | "status"
      | "currentContractOrganisation"
      | "currentContractPeriod"
      | "companyDirector"
      | "companyDirectorAddress"
      | "principalName"
      | "principalActivities"
      | "projectedTurnover"
      | "contractActivitiesDetails"
      | "sharesAmongstShareholders"
      | "sharesNonMalaysian"
      | "sharesBumi"
      | "shareNonBumi"
      | "company"
      | "documents"
      | "space"
    >
  : never;
