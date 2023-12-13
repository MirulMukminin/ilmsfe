import { StandardEntity } from "./sys$StandardEntity";
import { User } from "./sec$User";
import { UserGroupRole } from "./bproc_UserGroupRole";
export class UserGroup extends StandardEntity {
  static NAME = "bproc_UserGroup";
  name?: string | null;
  code?: string | null;
  description?: string | null;
  users?: User[] | null;
  userGroupRoles?: UserGroupRole[] | null;
  type?: any | null;
  sysTenantId?: string | null;
}
export type UserGroupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "userGroup-edit";
export type UserGroupView<V extends UserGroupViewName> = V extends "_base"
  ? Pick<
      UserGroup,
      "id" | "name" | "code" | "description" | "type" | "sysTenantId"
    >
  : V extends "_local"
  ? Pick<
      UserGroup,
      "id" | "name" | "code" | "description" | "type" | "sysTenantId"
    >
  : V extends "_minimal"
  ? Pick<UserGroup, "id" | "name">
  : V extends "userGroup-edit"
  ? Pick<
      UserGroup,
      | "id"
      | "name"
      | "code"
      | "description"
      | "type"
      | "sysTenantId"
      | "users"
      | "userGroupRoles"
    >
  : never;
