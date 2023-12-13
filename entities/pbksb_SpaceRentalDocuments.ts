import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { RentalRequest } from "./pbksb_RentalRequest";
export class SpaceRentalDocuments extends StandardEntity {
  static NAME = "pbksb_SpaceRentalDocuments";
  name?: string | null;
  file?: FileDescriptor | null;
  type?: string | null;
  rentalRequest?: RentalRequest | null;
}
export type SpaceRentalDocumentsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "spaceRentalDocuments-view";
export type SpaceRentalDocumentsView<
  V extends SpaceRentalDocumentsViewName
> = V extends "_base"
  ? Pick<SpaceRentalDocuments, "id" | "name" | "type">
  : V extends "_local"
  ? Pick<SpaceRentalDocuments, "id" | "name" | "type">
  : V extends "_minimal"
  ? Pick<SpaceRentalDocuments, "id" | "name">
  : V extends "spaceRentalDocuments-view"
  ? Pick<SpaceRentalDocuments, "id" | "name" | "type" | "file">
  : never;
