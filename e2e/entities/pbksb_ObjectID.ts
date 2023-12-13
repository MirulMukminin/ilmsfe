import { StandardEntity } from "./base/sys$StandardEntity";
import { ServiceType, RateCode } from "../enums/enums";
export class ObjectID extends StandardEntity {
  static NAME = "pbksb_ObjectID";
  serviceType?: ServiceType | null;
  serviceCode?: string | null;
  rate?: RateCode | null;
  objectID?: string | null;
  objectIDDescription?: string | null;
  amendby_Date?: string | null;
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
    >
  : V extends "objectID-view"
  ? Pick<
      ObjectID,
      | "id"
      | "serviceType"
      | "serviceCode"
      | "rate"
      | "objectID"
      | "objectIDDescription"
      | "amendby_Date"
    >
  : never;
