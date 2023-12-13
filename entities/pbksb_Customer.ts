import { StandardEntity } from "./base/sys$StandardEntity";
import { OrganisationParticulars } from "./pbksb_OrganisationParticulars";
import { Bankers } from "./pbksb_Bankers";
import {
  MachineryPreferences,
  CustomerPriceGroupEnum,
  Block_Status,
  Credit_Status,
  CustomerStatusEnum,
  AccountStatusEnum,
  NewRequestEnum
} from "../enums/enums";
import { CustomerUser } from "./pbksb_CustomerUser";
import { CustomerPriceGroup } from "./pbksb_CustomerPriceGroup";
import { CustomerOnBehalf } from "./pbksb_CustomerOnBehalf";
export class Customer extends StandardEntity {
  static NAME = "pbksb_Customer";
  name?: string | null;
  contactPerson?: string | null;
  contactPersonDesignation?: string | null;
  contactPersonEmail?: string | null;
  businessAddress?: string | null;
  businessPhone?: string | null;
  businessContactPerson?: string | null;
  businessContactPersonDesignation?: string | null;
  businessContactPersonEmail?: string | null;
  organisationParticulars?: OrganisationParticulars | null;
  bankers?: Bankers[] | null;
  endorserNumberRequired?: number | null;
  full_name?: string | null;
  reason?: string | null;
  machinerypreferences?: MachineryPreferences | null;
  phone?: string | null;
  code?: string | null;
  customeruser?: CustomerUser[] | null;
  customer_price_group?: CustomerPriceGroupEnum | null;
  customerPriceGroupEntity?: CustomerPriceGroup | null;
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
  customer_status?: CustomerStatusEnum | null;
  account_status?: AccountStatusEnum | null;
  new_request?: NewRequestEnum | null;
  credit_observe?: boolean | null;
  internal?: boolean | null;
  agent?: boolean | null;
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
      | "contactPerson"
      | "contactPersonDesignation"
      | "contactPersonEmail"
      | "businessAddress"
      | "businessPhone"
      | "businessContactPerson"
      | "businessContactPersonDesignation"
      | "businessContactPersonEmail"
      | "endorserNumberRequired"
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
      | "customer_status"
      | "account_status"
      | "new_request"
      | "credit_observe"
      | "internal"
      | "agent"
    >
  : V extends "_local"
  ? Pick<
      Customer,
      | "id"
      | "name"
      | "contactPerson"
      | "contactPersonDesignation"
      | "contactPersonEmail"
      | "businessAddress"
      | "businessPhone"
      | "businessContactPerson"
      | "businessContactPersonDesignation"
      | "businessContactPersonEmail"
      | "endorserNumberRequired"
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
      | "customer_status"
      | "account_status"
      | "new_request"
      | "credit_observe"
      | "internal"
      | "agent"
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
      | "contactPerson"
      | "contactPersonDesignation"
      | "contactPersonEmail"
      | "businessAddress"
      | "businessPhone"
      | "businessContactPerson"
      | "businessContactPersonDesignation"
      | "businessContactPersonEmail"
      | "endorserNumberRequired"
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
      | "customer_status"
      | "account_status"
      | "new_request"
      | "credit_observe"
      | "internal"
      | "agent"
      | "customeruser"
      | "customer_behalf"
      | "customerPriceGroupEntity"
    >
  : V extends "customer-view-buyer"
  ? Pick<
      Customer,
      | "id"
      | "name"
      | "contactPerson"
      | "contactPersonDesignation"
      | "contactPersonEmail"
      | "businessAddress"
      | "businessPhone"
      | "businessContactPerson"
      | "businessContactPersonDesignation"
      | "businessContactPersonEmail"
      | "endorserNumberRequired"
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
      | "customer_status"
      | "account_status"
      | "new_request"
      | "credit_observe"
      | "internal"
      | "agent"
      | "customerPriceGroupEntity"
    >
  : never;
