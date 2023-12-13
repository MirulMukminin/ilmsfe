import { StandardEntity } from "./base/sys$StandardEntity";
import { MachineryCategory } from "./pbksb_MachineryCategory";
import { DisplayStatusEnum } from "../enums/enums";
import { PriceSchedule } from "./pbksb_PriceSchedule";
import { MachineryTypeChild } from "./pbksb_MachineryTypeChild";
export class MachineryType extends StandardEntity {
  static NAME = "pbksb_MachineryType";
  description?: string | null;
  machinerycategory?: MachineryCategory | null;
  ifs_tool_type?: string | null;
  display_in_requestform?: DisplayStatusEnum | null;
  need_quotation?: DisplayStatusEnum | null;
  console?: DisplayStatusEnum | null;
  trip?: number | null;
  price_rate_group?: PriceSchedule | null;
  code?: string | null;
  quantity?: number | null;
  machinery_type_child?: MachineryTypeChild[] | null;
  bySupplier?: boolean | null;
}
export type MachineryTypeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "machineryType-child-view"
  | "machineryType-objectID-view"
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
      | "ifs_tool_type"
      | "display_in_requestform"
      | "need_quotation"
      | "console"
      | "trip"
      | "code"
      | "quantity"
      | "bySupplier"
    >
  : V extends "_local"
  ? Pick<
      MachineryType,
      | "id"
      | "description"
      | "ifs_tool_type"
      | "display_in_requestform"
      | "need_quotation"
      | "console"
      | "trip"
      | "code"
      | "quantity"
      | "bySupplier"
    >
  : V extends "_minimal"
  ? Pick<MachineryType, "id" | "description">
  : V extends "machineryType-child-view"
  ? Pick<
      MachineryType,
      | "id"
      | "description"
      | "ifs_tool_type"
      | "display_in_requestform"
      | "need_quotation"
      | "console"
      | "trip"
      | "code"
      | "quantity"
      | "bySupplier"
      | "machinery_type_child"
    >
  : V extends "machineryType-objectID-view"
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
      | "display_in_requestform"
      | "need_quotation"
      | "console"
      | "trip"
      | "code"
      | "quantity"
      | "bySupplier"
      | "price_rate_group"
    >
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
      | "description"
      | "ifs_tool_type"
      | "display_in_requestform"
      | "need_quotation"
      | "console"
      | "trip"
      | "code"
      | "quantity"
      | "bySupplier"
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
      | "machinerycategory"
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
      | "description"
      | "ifs_tool_type"
      | "display_in_requestform"
      | "need_quotation"
      | "console"
      | "trip"
      | "code"
      | "quantity"
      | "bySupplier"
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
      | "description"
      | "ifs_tool_type"
      | "display_in_requestform"
      | "need_quotation"
      | "console"
      | "trip"
      | "code"
      | "quantity"
      | "bySupplier"
      | "machinerycategory"
      | "price_rate_group"
    >
  : never;
