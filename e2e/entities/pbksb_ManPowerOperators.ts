import { StandardEntity } from "./base/sys$StandardEntity";
import { ManPower } from "./pbksb_ManPower";
import { Operator } from "./pbksb_Operator";
import { JobMHE_SessionTime } from "./pbksb_JobMHE_SessionTime";
import { Job_status } from "../enums/enums";
export class ManPowerOperators extends StandardEntity {
  static NAME = "pbksb_ManPowerOperators";
  manpower?: ManPower | null;
  operator?: Operator | null;
  session_time?: JobMHE_SessionTime | null;
  status?: Job_status | null;
}
export type ManPowerOperatorsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "manPowerOperators-view";
export type ManPowerOperatorsView<
  V extends ManPowerOperatorsViewName
> = V extends "_base"
  ? Pick<ManPowerOperators, "id" | "status">
  : V extends "_local"
  ? Pick<ManPowerOperators, "id" | "status">
  : V extends "manPowerOperators-view"
  ? Pick<
      ManPowerOperators,
      "id" | "status" | "manpower" | "operator" | "session_time"
    >
  : never;
