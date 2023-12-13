import { StandardEntity } from "./base/sys$StandardEntity";
import { Employee } from "./pbksb_Employee";
import { ManPowerViewInRequestFormEnum } from "../enums/enums";
import { PriceSchedule } from "./pbksb_PriceSchedule";
export class MachineryPositionHandling extends StandardEntity {
  static NAME = "pbksb_MachineryPositionHandling";
  designation_id?: string | null;
  code?: string | null;
  description?: string | null;
  employee?: Employee | null;
  viewinrequestform?: ManPowerViewInRequestFormEnum | null;
  ifs_craft_id?: string | null;
  price_rate_group?: PriceSchedule | null;
}
export type MachineryPositionHandlingViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "machineryPositionHandling-view"
  | "machineryPositionHandling-view-showDescription";
export type MachineryPositionHandlingView<
  V extends MachineryPositionHandlingViewName
> = V extends "_base"
  ? Pick<
      MachineryPositionHandling,
      | "id"
      | "description"
      | "designation_id"
      | "code"
      | "viewinrequestform"
      | "ifs_craft_id"
    >
  : V extends "_local"
  ? Pick<
      MachineryPositionHandling,
      | "id"
      | "designation_id"
      | "code"
      | "description"
      | "viewinrequestform"
      | "ifs_craft_id"
    >
  : V extends "_minimal"
  ? Pick<MachineryPositionHandling, "id" | "description">
  : V extends "machineryPositionHandling-view"
  ? Pick<
      MachineryPositionHandling,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "designation_id"
      | "code"
      | "description"
      | "viewinrequestform"
      | "ifs_craft_id"
      | "price_rate_group"
    >
  : V extends "machineryPositionHandling-view-showDescription"
  ? Pick<
      MachineryPositionHandling,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "description"
      | "code"
      | "designation_id"
      | "viewinrequestform"
      | "ifs_craft_id"
      | "price_rate_group"
    >
  : never;
