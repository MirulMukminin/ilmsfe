import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthMHERequest } from "./pbksb_BerthMHERequest";
import { MarineStatus, WorkProgramType } from "../enums/enums";
import { MachineryType } from "./pbksb_MachineryType";
import { Site } from "./pbksb_Site";
export class BerthMHERequestEquipment extends StandardEntity {
  static NAME = "pbksb_BerthMHERequestEquipment";
  mhe_request?: BerthMHERequest | null;
  job_ticket?: string | null;
  status?: MarineStatus | null;
  usage?: any | null;
  item?: MachineryType | null;
  program?: WorkProgramType | null;
  quantity?: number | null;
  time?: any | null;
  estimated_hour?: number | null;
  location?: Site | null;
}
export type BerthMHERequestEquipmentViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthMHERequestEquipment-view"
  | "berthMHERequestEquipmentAPI-view";
export type BerthMHERequestEquipmentView<
  V extends BerthMHERequestEquipmentViewName
> = V extends "_base"
  ? Pick<
      BerthMHERequestEquipment,
      | "id"
      | "job_ticket"
      | "status"
      | "usage"
      | "program"
      | "quantity"
      | "time"
      | "estimated_hour"
    >
  : V extends "_local"
  ? Pick<
      BerthMHERequestEquipment,
      | "id"
      | "job_ticket"
      | "status"
      | "usage"
      | "program"
      | "quantity"
      | "time"
      | "estimated_hour"
    >
  : V extends "berthMHERequestEquipment-view"
  ? Pick<
      BerthMHERequestEquipment,
      | "id"
      | "job_ticket"
      | "status"
      | "usage"
      | "program"
      | "quantity"
      | "time"
      | "estimated_hour"
      | "location"
    >
  : V extends "berthMHERequestEquipmentAPI-view"
  ? Pick<
      BerthMHERequestEquipment,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "job_ticket"
      | "status"
      | "usage"
      | "program"
      | "quantity"
      | "time"
      | "estimated_hour"
      | "location"
      | "item"
    >
  : never;
