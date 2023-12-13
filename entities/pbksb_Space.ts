import { StandardEntity } from "./base/sys$StandardEntity";
import { SpaceType } from "../enums/enums";
export class Space extends StandardEntity {
  static NAME = "pbksb_Space";
  spaceType?: SpaceType | null;
  area?: any | null;
  address?: string | null;
}
export type SpaceViewName = "_base" | "_local" | "_minimal" | "space-view";
export type SpaceView<V extends SpaceViewName> = V extends "_base"
  ? Pick<Space, "id" | "spaceType" | "area" | "address">
  : V extends "_local"
  ? Pick<Space, "id" | "spaceType" | "area" | "address">
  : V extends "_minimal"
  ? Pick<Space, "id" | "spaceType">
  : V extends "space-view"
  ? Pick<
      Space,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "spaceType"
      | "area"
      | "address"
    >
  : never;
