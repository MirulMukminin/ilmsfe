import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthMHERequest } from "./pbksb_BerthMHERequest";
import { MachineryPositionHandling } from "./pbksb_MachineryPositionHandling";
import { WorkProgramType, MarineStatus } from "../enums/enums";
import { Site } from "./pbksb_Site";
import { Employee } from "./pbksb_Employee";
export class BerthMHERequestManpower extends StandardEntity {
  static NAME = "pbksb_BerthMHERequestManpower";
  mhe_request?: BerthMHERequest | null;
  job_ticket?: string | null;
  usage?: any | null;
  item?: MachineryPositionHandling | null;
  program?: WorkProgramType | null;
  quantity?: number | null;
  time?: any | null;
  estimated_hour?: number | null;
  location?: Site | null;
  specific_crew?: Employee | null;
  status?: MarineStatus | null;
}
export type BerthMHERequestManpowerViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthMHERequestManpowerAPI-view";
export type BerthMHERequestManpowerView<
  V extends BerthMHERequestManpowerViewName
> = V extends "_base"
  ? Pick<
      BerthMHERequestManpower,
      | "id"
      | "job_ticket"
      | "usage"
      | "program"
      | "quantity"
      | "time"
      | "estimated_hour"
      | "status"
    >
  : V extends "_local"
  ? Pick<
      BerthMHERequestManpower,
      | "id"
      | "job_ticket"
      | "usage"
      | "program"
      | "quantity"
      | "time"
      | "estimated_hour"
      | "status"
    >
  : V extends "berthMHERequestManpowerAPI-view"
  ? Pick<
      BerthMHERequestManpower,
      | "id"
      | "job_ticket"
      | "usage"
      | "program"
      | "quantity"
      | "time"
      | "estimated_hour"
      | "status"
      | "item"
      | "location"
      | "specific_crew"
    >
  : never;
