import { StandardEntity } from "./base/sys$StandardEntity";
import { Gang_Type_Status, StatusGang } from "../enums/enums";
import { Group } from "./pbksb_Group";
export class Gang extends StandardEntity {
  static NAME = "pbksb_Gang";
  type_gang?: Gang_Type_Status | null;
  status?: StatusGang | null;
  group?: Group | null;
}
export type GangViewName = "_base" | "_local" | "_minimal" | "gang-view";
export type GangView<V extends GangViewName> = V extends "_base"
  ? Pick<Gang, "id" | "type_gang" | "status">
  : V extends "_local"
  ? Pick<Gang, "id" | "type_gang" | "status">
  : V extends "gang-view"
  ? Pick<Gang, "id" | "type_gang" | "status" | "group">
  : never;
