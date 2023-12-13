import { StandardEntity } from "./base/sys$StandardEntity";
export class OrganisationParticulars extends StandardEntity {
  static NAME = "pbksb_OrganisationParticulars";
  scopeOfActivities?: string | null;
  currentContractOrganisation?: string | null;
  currentContractPeriod?: string | null;
  contractActivitiesDetails?: string | null;
  sharesAmongstShareholders?: string | null;
  sharesNonMalaysian?: string | null;
  sharesBumi?: string | null;
  shareNonBumi?: string | null;
}
export type OrganisationParticularsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "organisationParticulars-view";
export type OrganisationParticularsView<
  V extends OrganisationParticularsViewName
> = V extends "_base"
  ? Pick<
      OrganisationParticulars,
      | "id"
      | "scopeOfActivities"
      | "currentContractOrganisation"
      | "currentContractPeriod"
      | "contractActivitiesDetails"
      | "sharesAmongstShareholders"
      | "sharesNonMalaysian"
      | "sharesBumi"
      | "shareNonBumi"
    >
  : V extends "_local"
  ? Pick<
      OrganisationParticulars,
      | "id"
      | "scopeOfActivities"
      | "currentContractOrganisation"
      | "currentContractPeriod"
      | "contractActivitiesDetails"
      | "sharesAmongstShareholders"
      | "sharesNonMalaysian"
      | "sharesBumi"
      | "shareNonBumi"
    >
  : V extends "organisationParticulars-view"
  ? Pick<
      OrganisationParticulars,
      | "id"
      | "scopeOfActivities"
      | "currentContractOrganisation"
      | "currentContractPeriod"
      | "contractActivitiesDetails"
      | "sharesAmongstShareholders"
      | "sharesNonMalaysian"
      | "sharesBumi"
      | "shareNonBumi"
    >
  : never;
