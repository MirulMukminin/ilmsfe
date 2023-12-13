import { StandardEntity } from "./base/sys$StandardEntity";
import { RentalRequest } from "./pbksb_RentalRequest";
import { SpaceRentalStatusEnums } from "../enums/enums";
import { SpaceRentalTerminationDocuments } from "./pbksb_SpaceRentalTerminationDocuments";
export class RentalTerminationRequest extends StandardEntity {
  static NAME = "pbksb_RentalTerminationRequest";
  rentalRequest?: RentalRequest | null;
  signedByDate?: any | null;
  terminationReason?: string | null;
  outstandingPayment?: any | null;
  outstandingPaymentAsOfDate?: any | null;
  status?: SpaceRentalStatusEnums | null;
  terminationId?: any | null;
  remarks?: string | null;
  actionNeeded?: string | null;
  endorsedBy?: string | null;
  endorsedDate?: any | null;
  signedBy?: string | null;
  documents?: SpaceRentalTerminationDocuments[] | null;
}
export type RentalTerminationRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "rentalTerminationRequest-view";
export type RentalTerminationRequestView<
  V extends RentalTerminationRequestViewName
> = V extends "_base"
  ? Pick<
      RentalTerminationRequest,
      | "id"
      | "signedByDate"
      | "terminationReason"
      | "outstandingPayment"
      | "outstandingPaymentAsOfDate"
      | "status"
      | "terminationId"
      | "remarks"
      | "actionNeeded"
      | "endorsedBy"
      | "endorsedDate"
      | "signedBy"
    >
  : V extends "_local"
  ? Pick<
      RentalTerminationRequest,
      | "id"
      | "signedByDate"
      | "terminationReason"
      | "outstandingPayment"
      | "outstandingPaymentAsOfDate"
      | "status"
      | "terminationId"
      | "remarks"
      | "actionNeeded"
      | "endorsedBy"
      | "endorsedDate"
      | "signedBy"
    >
  : V extends "rentalTerminationRequest-view"
  ? Pick<
      RentalTerminationRequest,
      | "id"
      | "signedByDate"
      | "terminationReason"
      | "outstandingPayment"
      | "outstandingPaymentAsOfDate"
      | "status"
      | "terminationId"
      | "remarks"
      | "actionNeeded"
      | "endorsedBy"
      | "endorsedDate"
      | "signedBy"
      | "rentalRequest"
    >
  : never;
