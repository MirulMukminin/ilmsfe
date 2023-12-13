import { StandardEntity } from "./base/sys$StandardEntity";
import { MachineryCategory } from "./pbksb_MachineryCategory";
import { DisplayStatusEnum } from "../enums/enums";
import { PriceSchedule } from "./pbksb_PriceSchedule";
export class MachineryType extends StandardEntity {
  static NAME = "pbksb_MachineryType";
  code?: string | null;
  description?: string | null;
  machinerycategory?: MachineryCategory | null;
  ifs_tool_type?: string | null;
  display_in_requestform?: DisplayStatusEnum | null;
  need_quotation?: DisplayStatusEnum | null;
  console?: DisplayStatusEnum | null;
  trip?: number | null;
  price_rate_group?: PriceSchedule | null;
}
export type MachineryTypeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "machineryType-view"
  | "machineryType-view-IFSType"
  | "machineryType-view-PSB"
  | "machineryType-view_CUBAView";
export type MachineryTypeView<
  V extends MachineryTypeViewName
> = V extends "_base"
  ? Pick<
      MachineryType,
      | "id"
      | "description"
      | "code"
      | "ifs_tool_type"
      | "display_in_requestform"
      | "need_quotation"
      | "console"
      | "trip"
    >
  : V extends "_local"
  ? Pick<
      MachineryType,
      | "id"
      | "code"
      | "description"
      | "ifs_tool_type"
      | "display_in_requestform"
      | "need_quotation"
      | "console"
      | "trip"
    >
  : V extends "_minimal"
  ? Pick<MachineryType, "id" | "description">
  : V extends "machineryType-view"
  ? Pick<
      MachineryType,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "code"
      | "description"
      | "ifs_tool_type"
      | "display_in_requestform"
      | "need_quotation"
      | "console"
      | "trip"
      | "machinerycategory"
      | "price_rate_group"
    >
  : V extends "machineryType-view-IFSType"
  ? Pick<
      MachineryType,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "description"
      | "ifs_tool_type"
      | "price_rate_group"
    >
  : V extends "machineryType-view-PSB"
  ? Pick<
      MachineryType,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "code"
      | "description"
      | "ifs_tool_type"
      | "display_in_requestform"
      | "need_quotation"
      | "console"
      | "trip"
      | "machinerycategory"
      | "price_rate_group"
    >
  : V extends "machineryType-view_CUBAView"
  ? Pick<
      MachineryType,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "code"
      | "description"
      | "ifs_tool_type"
      | "display_in_requestform"
      | "need_quotation"
      | "console"
      | "trip"
      | "machinerycategory"
      | "price_rate_group"
    >
  : never;
