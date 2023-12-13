import { StandardEntity } from "./base/sys$StandardEntity";
import { Machine } from "./pbksb_Machine";
export class MachineryTools extends StandardEntity {
  static NAME = "pbksb_MachineryTools";
  toolname?: string | null;
  ifs_tools_id?: string | null;
  ifs_tool_type?: string | null;
  supplier_code?: string | null;
  status?: string | null;
  machine?: Machine | null;
}
export type MachineryToolsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "machineryTools-view";
export type MachineryToolsView<
  V extends MachineryToolsViewName
> = V extends "_base"
  ? Pick<
      MachineryTools,
      | "id"
      | "toolname"
      | "ifs_tools_id"
      | "ifs_tool_type"
      | "supplier_code"
      | "status"
    >
  : V extends "_local"
  ? Pick<
      MachineryTools,
      | "id"
      | "toolname"
      | "ifs_tools_id"
      | "ifs_tool_type"
      | "supplier_code"
      | "status"
    >
  : V extends "machineryTools-view"
  ? Pick<
      MachineryTools,
      | "id"
      | "toolname"
      | "ifs_tools_id"
      | "ifs_tool_type"
      | "supplier_code"
      | "status"
      | "machine"
    >
  : never;
