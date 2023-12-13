import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthMHERequest } from "./pbksb_BerthMHERequest";
import { MachineryType } from "./pbksb_MachineryType";
import { WorkProgramType, MarineStatus } from "../enums/enums";
import { Site } from "./pbksb_Site";
import { Employee } from "./pbksb_Employee";
export class BerthMHERequestMachinery extends StandardEntity {
  static NAME = "pbksb_BerthMHERequestMachinery";
  mhe_request?: BerthMHERequest | null;
  item?: MachineryType | null;
  program?: WorkProgramType | null;
  quantity?: number | null;
  time?: any | null;
  estimated_hour?: number | null;
  location?: Site | null;
  specific_crew?: Employee | null;
  job_ticket?: string | null;
  usage?: any | null;
  status?: MarineStatus | null;
  console_indicator?: boolean | null;
}
export type BerthMHERequestMachineryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthMHERequestMachineryAPI-view";
export type BerthMHERequestMachineryView<
  V extends BerthMHERequestMachineryViewName
> = V extends "_base"
  ? Pick<
      BerthMHERequestMachinery,
      | "id"
      | "program"
      | "quantity"
      | "time"
      | "estimated_hour"
      | "job_ticket"
      | "usage"
      | "status"
      | "console_indicator"
    >
  : V extends "_local"
  ? Pick<
      BerthMHERequestMachinery,
      | "id"
      | "program"
      | "quantity"
      | "time"
      | "estimated_hour"
      | "job_ticket"
      | "usage"
      | "status"
      | "console_indicator"
    >
  : V extends "berthMHERequestMachineryAPI-view"
  ? Pick<
      BerthMHERequestMachinery,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "program"
      | "quantity"
      | "time"
      | "estimated_hour"
      | "job_ticket"
      | "usage"
      | "status"
      | "console_indicator"
      | "location"
      | "specific_crew"
      | "item"
    >
  : never;
