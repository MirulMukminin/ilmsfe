import { StandardEntity } from "./base/sys$StandardEntity";
import { User } from "./base/sec$User";
import { CustomerUserType } from "../enums/enums";
import { Customer } from "./pbksb_Customer";
export class CustomerUser extends StandardEntity {
  static NAME = "pbksb_CustomerUser";
  fullname?: string | null;
  username?: User | null;
  customer_user_type?: CustomerUserType | null;
  customer?: Customer | null;
}
export type CustomerUserViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "customerSpecificUser-view"
  | "customerUser-InternalMovement_view"
  | "customerUser-email-view"
  | "customerUser-view"
  | "customerUser-view-Details"
  | "customerUser-view-JustOnly";
export type CustomerUserView<V extends CustomerUserViewName> = V extends "_base"
  ? Pick<CustomerUser, "id" | "fullname" | "customer_user_type">
  : V extends "_local"
  ? Pick<CustomerUser, "id" | "fullname" | "customer_user_type">
  : V extends "_minimal"
  ? Pick<CustomerUser, "id" | "fullname">
  : V extends "customerSpecificUser-view"
  ? Pick<
      CustomerUser,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "fullname"
      | "customer_user_type"
      | "username"
      | "customer"
    >
  : V extends "customerUser-InternalMovement_view"
  ? Pick<
      CustomerUser,
      "id" | "fullname" | "customer_user_type" | "username" | "customer"
    >
  : V extends "customerUser-email-view"
  ? Pick<
      CustomerUser,
      "id" | "fullname" | "customer_user_type" | "username" | "customer"
    >
  : V extends "customerUser-view"
  ? Pick<
      CustomerUser,
      "id" | "fullname" | "customer_user_type" | "username" | "customer"
    >
  : V extends "customerUser-view-Details"
  ? Pick<
      CustomerUser,
      "id" | "fullname" | "customer_user_type" | "username" | "customer"
    >
  : V extends "customerUser-view-JustOnly"
  ? Pick<
      CustomerUser,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "fullname"
      | "username"
      | "customer"
    >
  : never;
