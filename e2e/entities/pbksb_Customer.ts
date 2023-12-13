import { StandardEntity } from "./base/sys$StandardEntity";
import {
  MachineryPreferences,
  CustomerPriceGroupEnum,
  Block_Status,
  Credit_Status
} from "../enums/enums";
import { CustomerUser } from "./pbksb_CustomerUser";
import { CustomerOnBehalf } from "./pbksb_CustomerOnBehalf";
export class Customer extends StandardEntity {
  static NAME = "pbksb_Customer";
  name?: string | null;
  full_name?: string | null;
  reason?: string | null;
  machinerypreferences?: MachineryPreferences | null;
  phone?: string | null;
  code?: string | null;
  customeruser?: CustomerUser[] | null;
  customer_price_group?: CustomerPriceGroupEnum | null;
  customerID?: string | null;
  ifs_customer_id?: string | null;
  customer_behalf?: CustomerOnBehalf[] | null;
  block_status?: Block_Status | null;
  credit_status?: Credit_Status | null;
  address?: string | null;
  postcode?: string | null;
  location?: string | null;
  email_notification?: string | null;
  special_request_crew?: boolean | null;
}
export type CustomerViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "customer-view"
  | "customer-view-buyer";
export type CustomerView<V extends CustomerViewName> = V extends "_base"
  ? Pick<
      Customer,
      | "id"
      | "name"
      | "full_name"
      | "reason"
      | "machinerypreferences"
      | "phone"
      | "code"
      | "customer_price_group"
      | "customerID"
      | "ifs_customer_id"
      | "block_status"
      | "credit_status"
      | "address"
      | "postcode"
      | "location"
      | "email_notification"
      | "special_request_crew"
    >
  : V extends "_local"
  ? Pick<
      Customer,
      | "id"
      | "name"
      | "full_name"
      | "reason"
      | "machinerypreferences"
      | "phone"
      | "code"
      | "customer_price_group"
      | "customerID"
      | "ifs_customer_id"
      | "block_status"
      | "credit_status"
      | "address"
      | "postcode"
      | "location"
      | "email_notification"
      | "special_request_crew"
    >
  : V extends "_minimal"
  ? Pick<Customer, "id" | "name">
  : V extends "customer-view"
  ? Pick<
      Customer,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "name"
      | "full_name"
      | "reason"
      | "machinerypreferences"
      | "phone"
      | "code"
      | "customer_price_group"
      | "customerID"
      | "ifs_customer_id"
      | "block_status"
      | "credit_status"
      | "address"
      | "postcode"
      | "location"
      | "email_notification"
      | "special_request_crew"
      | "customeruser"
      | "customer_behalf"
    >
  : V extends "customer-view-buyer"
  ? Pick<
      Customer,
      | "id"
      | "name"
      | "full_name"
      | "reason"
      | "machinerypreferences"
      | "phone"
      | "code"
      | "customer_price_group"
      | "customerID"
      | "ifs_customer_id"
      | "block_status"
      | "credit_status"
      | "address"
      | "postcode"
      | "location"
      | "email_notification"
      | "special_request_crew"
    >
  : never;
