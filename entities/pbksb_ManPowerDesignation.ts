import { StandardEntity } from "./base/sys$StandardEntity";
import { ManPowerViewInRequestFormEnum } from "../enums/enums";
export class ManPowerDesignation extends StandardEntity {
  static NAME = "pbksb_ManPowerDesignation";
  designation_id?: string | null;
  description?: string | null;
  viewinrequestform?: ManPowerViewInRequestFormEnum | null;
  ifs_craft_id?: string | null;
}
export type ManPowerDesignationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "manPowerDesignation-view";
export type ManPowerDesignationView<
  V extends ManPowerDesignationViewName
> = V extends "_base"
  ? Pick<
      ManPowerDesignation,
      | "id"
      | "description"
      | "designation_id"
      | "viewinrequestform"
      | "ifs_craft_id"
    >
  : V extends "_local"
  ? Pick<
      ManPowerDesignation,
      | "id"
      | "designation_id"
      | "description"
      | "viewinrequestform"
      | "ifs_craft_id"
    >
  : V extends "_minimal"
  ? Pick<ManPowerDesignation, "id" | "description">
  : V extends "manPowerDesignation-view"
  ? Pick<
      ManPowerDesignation,
      | "id"
      | "designation_id"
      | "description"
      | "viewinrequestform"
      | "ifs_craft_id"
    >
  : never;
