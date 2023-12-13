import { StandardEntity } from "./base/sys$StandardEntity";
import { Good_In_Statu, Form_Type } from "../enums/enums";
export class Daily_Movement extends StandardEntity {
  static NAME = "pbksb_Daily_Movement";
  reference_no?: string | null;
  status?: Good_In_Statu | null;
  form_type?: Form_Type | null;
  registration_no?: string | null;
  move_date?: any | null;
  contractor?: string | null;
  agent_name?: string | null;
  location?: string | null;
}
export type Daily_MovementViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "daily_Movement-view"
  | "daily_Movement-view_AgentBrowse";
export type Daily_MovementView<
  V extends Daily_MovementViewName
> = V extends "_base"
  ? Pick<
      Daily_Movement,
      | "id"
      | "reference_no"
      | "status"
      | "form_type"
      | "registration_no"
      | "move_date"
      | "contractor"
      | "agent_name"
      | "location"
    >
  : V extends "_local"
  ? Pick<
      Daily_Movement,
      | "id"
      | "reference_no"
      | "status"
      | "form_type"
      | "registration_no"
      | "move_date"
      | "contractor"
      | "agent_name"
      | "location"
    >
  : V extends "daily_Movement-view"
  ? Pick<
      Daily_Movement,
      | "id"
      | "reference_no"
      | "status"
      | "form_type"
      | "registration_no"
      | "move_date"
      | "contractor"
      | "agent_name"
      | "location"
    >
  : V extends "daily_Movement-view_AgentBrowse"
  ? Pick<
      Daily_Movement,
      | "id"
      | "reference_no"
      | "status"
      | "form_type"
      | "registration_no"
      | "move_date"
      | "contractor"
      | "agent_name"
      | "location"
    >
  : never;
