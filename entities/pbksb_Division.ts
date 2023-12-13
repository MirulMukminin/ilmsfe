import { BaseUuidEntity } from "./base/sys$BaseUuidEntity";
import { Site } from "./pbksb_Site";
export class Division extends BaseUuidEntity {
  static NAME = "pbksb_Division";
  name?: string | null;
  site?: Site[] | null;
  updateTs?: any | null;
  updatedBy?: string | null;
  createTs?: any | null;
  createdBy?: string | null;
  version?: number | null;
  deleteTs?: any | null;
  deletedBy?: string | null;
}
export type DivisionViewName = "_base" | "_local" | "_minimal";
export type DivisionView<V extends DivisionViewName> = V extends "_base"
  ? Pick<Division, "id" | "name">
  : V extends "_local"
  ? Pick<Division, "id" | "name">
  : V extends "_minimal"
  ? Pick<Division, "id" | "name">
  : never;
