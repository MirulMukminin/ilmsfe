import { StandardEntity } from "./base/sys$StandardEntity";
import { ServiceType, RateCode } from "../enums/enums";
import { PriceSchedule } from "./pbksb_PriceSchedule";
export class ObjectID extends StandardEntity {
  static NAME = "pbksb_ObjectID";
  serviceType?: ServiceType | null;
  serviceCode?: string | null;
  rate?: RateCode | null;
  objectID?: string | null;
  objectIDDescription?: string | null;
  amendby_Date?: string | null;
  priceSchedule?: PriceSchedule | null;
  taxcodedescription?: string | null;
  taxcode?: string | null;
  glaccount?: string | null;
}
export type ObjectIDViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "objectID-view";
export type ObjectIDView<V extends ObjectIDViewName> = V extends "_base"
  ? Pick<
      ObjectID,
      | "id"
      | "serviceType"
      | "serviceCode"
      | "rate"
      | "objectID"
      | "objectIDDescription"
      | "amendby_Date"
      | "taxcodedescription"
      | "taxcode"
      | "glaccount"
    >
  : V extends "_local"
  ? Pick<
      ObjectID,
      | "id"
      | "serviceType"
      | "serviceCode"
      | "rate"
      | "objectID"
      | "objectIDDescription"
      | "amendby_Date"
      | "taxcodedescription"
      | "taxcode"
      | "glaccount"
    >
  : V extends "objectID-view"
  ? Pick<
      ObjectID,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "serviceType"
      | "serviceCode"
      | "rate"
      | "objectID"
      | "objectIDDescription"
      | "amendby_Date"
      | "taxcodedescription"
      | "taxcode"
      | "glaccount"
      | "priceSchedule"
    >
  : never;
