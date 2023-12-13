import { StandardEntity } from "./base/sys$StandardEntity";
import { MachineryPositionHandling } from "./pbksb_MachineryPositionHandling";
import { Gang_Type, GroupEnum, SiteCategory } from "../enums/enums";
import { Operator } from "./pbksb_Operator";
export class LastOperatorByPosition extends StandardEntity {
  static NAME = "pbksb_LastOperatorByPosition";
  position?: MachineryPositionHandling | null;
  gang?: Gang_Type | null;
  group?: GroupEnum | null;
  site_category?: SiteCategory | null;
  operator?: Operator | null;
}
export type LastOperatorByPositionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "lastOperatorByPosition-auto-assign-view";
export type LastOperatorByPositionView<
  V extends LastOperatorByPositionViewName
> = V extends "_base"
  ? Pick<LastOperatorByPosition, "id" | "gang" | "group" | "site_category">
  : V extends "_local"
  ? Pick<LastOperatorByPosition, "id" | "gang" | "group" | "site_category">
  : V extends "lastOperatorByPosition-auto-assign-view"
  ? Pick<
      LastOperatorByPosition,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "gang"
      | "group"
      | "site_category"
      | "position"
      | "operator"
    >
  : never;
