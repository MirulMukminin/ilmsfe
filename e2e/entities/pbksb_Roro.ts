import { StandardEntity } from "./base/sys$StandardEntity";
export class Roro extends StandardEntity {
  static NAME = "pbksb_Roro";
  platNumber?: string | null;
  model?: string | null;
  roro_company?: string | null;
  status?: string | null;
}
export type RoroViewName = "_base" | "_local" | "_minimal" | "roro-view";
export type RoroView<V extends RoroViewName> = V extends "_base"
  ? Pick<Roro, "id" | "platNumber" | "model" | "roro_company" | "status">
  : V extends "_local"
  ? Pick<Roro, "id" | "platNumber" | "model" | "roro_company" | "status">
  : V extends "_minimal"
  ? Pick<Roro, "id" | "platNumber">
  : V extends "roro-view"
  ? Pick<
      Roro,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "platNumber"
      | "model"
      | "roro_company"
      | "status"
    >
  : never;
