import { StandardEntity } from "./sys$StandardEntity";
import { UserGroup } from "./bproc_UserGroup";
import { Role } from "./sec$Role";
export class UserGroupRole extends StandardEntity {
  static NAME = "bproc_UserGroupRole";
  userGroup?: UserGroup | null;
  roleName?: string | null;
  role?: Role | null;
  sysTenantId?: string | null;
}
export type UserGroupRoleViewName = "_base" | "_local" | "_minimal";
export type UserGroupRoleView<
  V extends UserGroupRoleViewName
> = V extends "_base"
  ? Pick<UserGroupRole, "id" | "roleName" | "sysTenantId">
  : V extends "_local"
  ? Pick<UserGroupRole, "id" | "roleName" | "sysTenantId">
  : never;
