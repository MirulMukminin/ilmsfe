import { StandardEntity } from "./base/sys$StandardEntity";
import { Machine } from "./pbksb_Machine";
export class MachineDownTimeHistory extends StandardEntity {
  static NAME = "pbksb_MachineDownTimeHistory";
  machine?: Machine | null;
  start_downtime?: any | null;
  end_datetime?: any | null;
  remark?: string | null;
}
export type MachineDownTimeHistoryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "machineDownTimeHistory-browseView";
export type MachineDownTimeHistoryView<
  V extends MachineDownTimeHistoryViewName
> = V extends "_base"
  ? Pick<
      MachineDownTimeHistory,
      "id" | "start_downtime" | "end_datetime" | "remark"
    >
  : V extends "_local"
  ? Pick<
      MachineDownTimeHistory,
      "id" | "start_downtime" | "end_datetime" | "remark"
    >
  : V extends "machineDownTimeHistory-browseView"
  ? Pick<
      MachineDownTimeHistory,
      "id" | "machine" | "start_downtime" | "end_datetime"
    >
  : never;
