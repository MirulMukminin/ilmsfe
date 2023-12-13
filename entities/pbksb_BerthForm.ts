import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { Vessel } from "./pbksb_Vessel";
import { BerthTerminal, BerthPosition, MarineStatus } from "../enums/enums";
import { Berth } from "./pbksb_Berth";
import { BerthMHERequest } from "./pbksb_BerthMHERequest";
import { BerthFuelWater } from "./pbksb_BerthFuelWater";
import { BerthGeneralWorks } from "./pbksb_BerthGeneralWorks";
import { BerthWorkProgram } from "./pbksb_BerthWorkProgram";
import { BerthWorkProgramSummary } from "./pbksb_BerthWorkProgramSummary";
import { BerthUnderDeck } from "./pbksb_BerthUnderDeck";
import { BerthScopeWork } from "./pbksb_BerthScopeWork";
import { BerthHeavyPackages } from "./pbksb_BerthHeavyPackages";
import { BerthWorkPermit } from "./pbksb_BerthWorkPermit";
import { BerthFormDoc } from "./pbksb_BerthFormDoc";
import { BerthingInformation } from "./pbksb_BerthingInformation";
import { BerthAdditionalServices } from "./pbksb_BerthAdditionalServices";
export class BerthForm extends StandardEntity {
  static NAME = "pbksb_BerthForm";
  request_number?: string | null;
  company?: Customer | null;
  vessel?: Vessel | null;
  request_on_behalf?: Customer | null;
  po_number?: string | null;
  est_arrival?: any | null;
  est_departure?: any | null;
  act_arrival?: any | null;
  act_departure?: any | null;
  bod_date?: any | null;
  last_location?: string | null;
  next_location?: string | null;
  remarks?: string | null;
  agent?: Customer | null;
  agent_fuelwater?: Customer | null;
  bod_number?: string | null;
  log_number?: string | null;
  request_by?: string | null;
  request_date?: any | null;
  endorsed_by?: string | null;
  endorsed_date?: any | null;
  terminal?: BerthTerminal | null;
  berth_from?: Berth | null;
  berth_to?: Berth | null;
  berth_position?: BerthPosition | null;
  update_cancelled_by?: string | null;
  update_cancelled_datetime?: any | null;
  date_submit?: any | null;
  status?: MarineStatus | null;
  mhe_request?: BerthMHERequest[] | null;
  fuel_water?: BerthFuelWater[] | null;
  general_works?: BerthGeneralWorks[] | null;
  work_program?: BerthWorkProgram[] | null;
  work_program_summary?: BerthWorkProgramSummary[] | null;
  underdeck?: BerthUnderDeck[] | null;
  scope_work?: BerthScopeWork[] | null;
  heavy_package?: BerthHeavyPackages[] | null;
  work_permit?: BerthWorkPermit[] | null;
  document?: BerthFormDoc[] | null;
  berthing_information?: BerthingInformation[] | null;
  additional_service?: BerthAdditionalServices[] | null;
  comment?: string | null;
}
export type BerthFormViewName =
  | "BerthFormVessel-view"
  | "_base"
  | "_local"
  | "_minimal"
  | "berthForm-Planner"
  | "berthForm-Summary"
  | "berthForm-inner-join"
  | "berthFormAPI-view"
  | "berthFormBOD-view"
  | "berthFormEmail-view";
export type BerthFormView<
  V extends BerthFormViewName
> = V extends "BerthFormVessel-view"
  ? Pick<
      BerthForm,
      | "id"
      | "request_number"
      | "po_number"
      | "est_arrival"
      | "est_departure"
      | "act_arrival"
      | "act_departure"
      | "bod_date"
      | "last_location"
      | "next_location"
      | "remarks"
      | "bod_number"
      | "log_number"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "terminal"
      | "berth_position"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "date_submit"
      | "status"
      | "comment"
      | "request_on_behalf"
      | "vessel"
      | "berth_from"
      | "berth_to"
    >
  : V extends "_base"
  ? Pick<
      BerthForm,
      | "id"
      | "request_number"
      | "po_number"
      | "est_arrival"
      | "est_departure"
      | "act_arrival"
      | "act_departure"
      | "bod_date"
      | "last_location"
      | "next_location"
      | "remarks"
      | "bod_number"
      | "log_number"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "terminal"
      | "berth_position"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "date_submit"
      | "status"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      BerthForm,
      | "id"
      | "request_number"
      | "po_number"
      | "est_arrival"
      | "est_departure"
      | "act_arrival"
      | "act_departure"
      | "bod_date"
      | "last_location"
      | "next_location"
      | "remarks"
      | "bod_number"
      | "log_number"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "terminal"
      | "berth_position"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "date_submit"
      | "status"
      | "comment"
    >
  : V extends "berthForm-Planner"
  ? Pick<
      BerthForm,
      | "id"
      | "request_number"
      | "po_number"
      | "est_arrival"
      | "est_departure"
      | "act_arrival"
      | "act_departure"
      | "bod_date"
      | "last_location"
      | "next_location"
      | "remarks"
      | "bod_number"
      | "log_number"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "terminal"
      | "berth_position"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "date_submit"
      | "status"
      | "comment"
      | "vessel"
      | "agent"
      | "berth_from"
      | "berth_to"
      | "company"
      | "fuel_water"
    >
  : V extends "berthForm-Summary"
  ? Pick<
      BerthForm,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "request_number"
      | "po_number"
      | "est_arrival"
      | "est_departure"
      | "act_arrival"
      | "act_departure"
      | "bod_date"
      | "last_location"
      | "next_location"
      | "remarks"
      | "bod_number"
      | "log_number"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "terminal"
      | "berth_position"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "date_submit"
      | "status"
      | "comment"
      | "mhe_request"
      | "fuel_water"
      | "general_works"
      | "underdeck"
      | "work_permit"
    >
  : V extends "berthForm-inner-join"
  ? Pick<
      BerthForm,
      | "id"
      | "request_number"
      | "po_number"
      | "est_arrival"
      | "est_departure"
      | "act_arrival"
      | "act_departure"
      | "bod_date"
      | "last_location"
      | "next_location"
      | "remarks"
      | "bod_number"
      | "log_number"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "terminal"
      | "berth_position"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "date_submit"
      | "status"
      | "comment"
      | "company"
      | "vessel"
      | "request_on_behalf"
      | "agent"
      | "agent_fuelwater"
    >
  : V extends "berthFormAPI-view"
  ? Pick<
      BerthForm,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "request_number"
      | "po_number"
      | "est_arrival"
      | "est_departure"
      | "act_arrival"
      | "act_departure"
      | "bod_date"
      | "last_location"
      | "next_location"
      | "remarks"
      | "bod_number"
      | "log_number"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "terminal"
      | "berth_position"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "date_submit"
      | "status"
      | "comment"
      | "company"
      | "vessel"
      | "request_on_behalf"
      | "agent"
      | "agent_fuelwater"
      | "mhe_request"
    >
  : V extends "berthFormBOD-view"
  ? Pick<
      BerthForm,
      | "id"
      | "request_number"
      | "po_number"
      | "est_arrival"
      | "est_departure"
      | "act_arrival"
      | "act_departure"
      | "bod_date"
      | "last_location"
      | "next_location"
      | "remarks"
      | "bod_number"
      | "log_number"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "terminal"
      | "berth_position"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "date_submit"
      | "status"
      | "comment"
      | "company"
      | "vessel"
      | "request_on_behalf"
      | "agent"
      | "fuel_water"
      | "general_works"
      | "work_program"
      | "work_program_summary"
      | "scope_work"
      | "heavy_package"
      | "work_permit"
      | "document"
      | "berthing_information"
      | "additional_service"
    >
  : V extends "berthFormEmail-view"
  ? Pick<
      BerthForm,
      | "id"
      | "request_number"
      | "po_number"
      | "est_arrival"
      | "est_departure"
      | "act_arrival"
      | "act_departure"
      | "bod_date"
      | "last_location"
      | "next_location"
      | "remarks"
      | "bod_number"
      | "log_number"
      | "request_by"
      | "request_date"
      | "endorsed_by"
      | "endorsed_date"
      | "terminal"
      | "berth_position"
      | "update_cancelled_by"
      | "update_cancelled_datetime"
      | "date_submit"
      | "status"
      | "comment"
      | "company"
      | "fuel_water"
    >
  : never;
