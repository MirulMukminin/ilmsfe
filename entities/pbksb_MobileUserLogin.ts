import { StandardEntity } from "./base/sys$StandardEntity";
import { User } from "./base/sec$User";
export class MobileUserLogin extends StandardEntity {
  static NAME = "pbksb_MobileUserLogin";
  user?: User | null;
  osVersion?: string | null;
  osType?: string | null;
  deviceId?: string | null;
  appVersion?: string | null;
  active?: boolean | null;
  lastLoginDate?: any | null;
  notificationId?: string | null;
  lastLogoutDate?: any | null;
}
export type MobileUserLoginViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "mobileUserLogin-view";
export type MobileUserLoginView<
  V extends MobileUserLoginViewName
> = V extends "_base"
  ? Pick<
      MobileUserLogin,
      | "id"
      | "osVersion"
      | "osType"
      | "deviceId"
      | "appVersion"
      | "active"
      | "lastLoginDate"
      | "notificationId"
      | "lastLogoutDate"
    >
  : V extends "_local"
  ? Pick<
      MobileUserLogin,
      | "id"
      | "osVersion"
      | "osType"
      | "deviceId"
      | "appVersion"
      | "active"
      | "lastLoginDate"
      | "notificationId"
      | "lastLogoutDate"
    >
  : V extends "mobileUserLogin-view"
  ? Pick<
      MobileUserLogin,
      | "id"
      | "osVersion"
      | "osType"
      | "deviceId"
      | "appVersion"
      | "active"
      | "lastLoginDate"
      | "notificationId"
      | "lastLogoutDate"
      | "user"
    >
  : never;
