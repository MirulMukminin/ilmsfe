import { StandardEntity } from "./base/sys$StandardEntity";
import { AgentStatus } from "../enums/enums";
import { Customer } from "./pbksb_Customer";
import { User } from "./base/sec$User";
export class Agent extends StandardEntity {
  static NAME = "pbksb_Agent";
  agent_ID?: string | null;
  registration_date?: any | null;
  name?: string | null;
  email?: string | null;
  contact_Number?: string | null;
  status?: AgentStatus | null;
  customer?: Customer | null;
  username?: User | null;
}
export type AgentViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "agent-customer-list-view"
  | "agent-view"
  | "agent-view_Customer";
export type AgentView<V extends AgentViewName> = V extends "_base"
  ? Pick<
      Agent,
      | "id"
      | "name"
      | "agent_ID"
      | "registration_date"
      | "email"
      | "contact_Number"
      | "status"
    >
  : V extends "_local"
  ? Pick<
      Agent,
      | "id"
      | "agent_ID"
      | "registration_date"
      | "name"
      | "email"
      | "contact_Number"
      | "status"
    >
  : V extends "_minimal"
  ? Pick<Agent, "id" | "name">
  : V extends "agent-customer-list-view"
  ? Pick<
      Agent,
      | "id"
      | "agent_ID"
      | "registration_date"
      | "name"
      | "email"
      | "contact_Number"
      | "status"
      | "customer"
      | "username"
    >
  : V extends "agent-view"
  ? Pick<
      Agent,
      | "id"
      | "agent_ID"
      | "registration_date"
      | "name"
      | "email"
      | "contact_Number"
      | "status"
      | "customer"
      | "username"
    >
  : V extends "agent-view_Customer"
  ? Pick<
      Agent,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "agent_ID"
      | "registration_date"
      | "name"
      | "email"
      | "contact_Number"
      | "status"
      | "customer"
      | "username"
    >
  : never;
