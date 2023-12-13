import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { RentalTerminationRequest } from "./pbksb_RentalTerminationRequest";
export class SpaceRentalTerminationDocuments extends StandardEntity {
  static NAME = "pbksb_SpaceRentalTerminationDocuments";
  name?: string | null;
  file?: FileDescriptor | null;
  type?: string | null;
  rentalTerminationRequest?: RentalTerminationRequest | null;
}
export type SpaceRentalTerminationDocumentsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "spaceRentalTerminationDocuments-view";
export type SpaceRentalTerminationDocumentsView<
  V extends SpaceRentalTerminationDocumentsViewName
> = V extends "_base"
  ? Pick<SpaceRentalTerminationDocuments, "id" | "name" | "type">
  : V extends "_local"
  ? Pick<SpaceRentalTerminationDocuments, "id" | "name" | "type">
  : V extends "_minimal"
  ? Pick<SpaceRentalTerminationDocuments, "id" | "name">
  : V extends "spaceRentalTerminationDocuments-view"
  ? Pick<SpaceRentalTerminationDocuments, "id" | "name" | "type" | "file">
  : never;
