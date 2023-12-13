import { StandardEntity } from "./base/sys$StandardEntity";
import { MachineryType } from "./pbksb_MachineryType";
import {
  QuotationStatus,
  Console_Status,
  MachineStatus,
  MachineOwnerShip,
  MachineType
} from "../enums/enums";
import { Machinery } from "./pbksb_Machinery";
import { Operator } from "./pbksb_Operator";
import { PriceSchedule } from "./pbksb_PriceSchedule";
import { MachineDownTimeHistory } from "./pbksb_MachineDownTimeHistory";
import { Supplier } from "./pbksb_Supplier";
export class Machine extends StandardEntity {
  static NAME = "pbksb_Machine";
  machine_spec?: MachineryType | null;
  quantity?: number | null;
  description?: string | null;
  ifs_tool_type?: string | null;
  ifstoolsID?: string | null;
  quotation?: QuotationStatus | null;
  trip_no?: any | null;
  console?: Console_Status | null;
  status?: MachineStatus | null;
  machine_ownership?: MachineOwnerShip | null;
  machinetype?: MachineType | null;
  machinery?: Machinery | null;
  operator?: Operator | null;
  supplier_code?: string | null;
  price_rate_group?: PriceSchedule | null;
  downtime?: MachineDownTimeHistory[] | null;
  supplier?: Supplier | null;
}
export type MachineViewName = "_base" | "_local" | "_minimal" | "machine-view";
export type MachineView<V extends MachineViewName> = V extends "_base"
  ? Pick<
      Machine,
      | "id"
      | "description"
      | "quantity"
      | "ifs_tool_type"
      | "ifstoolsID"
      | "quotation"
      | "trip_no"
      | "console"
      | "status"
      | "machine_ownership"
      | "machinetype"
      | "supplier_code"
    >
  : V extends "_local"
  ? Pick<
      Machine,
      | "id"
      | "quantity"
      | "description"
      | "ifs_tool_type"
      | "ifstoolsID"
      | "quotation"
      | "trip_no"
      | "console"
      | "status"
      | "machine_ownership"
      | "machinetype"
      | "supplier_code"
    >
  : V extends "_minimal"
  ? Pick<Machine, "id" | "description">
  : V extends "machine-view"
  ? Pick<
      Machine,
      | "id"
      | "quantity"
      | "description"
      | "ifs_tool_type"
      | "ifstoolsID"
      | "quotation"
      | "trip_no"
      | "console"
      | "status"
      | "machine_ownership"
      | "machinetype"
      | "supplier_code"
      | "machine_spec"
      | "price_rate_group"
      | "downtime"
      | "machinery"
      | "supplier"
    >
  : never;
