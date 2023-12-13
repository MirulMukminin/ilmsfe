import { StandardEntity } from "./base/sys$StandardEntity";
import {
  ICWServiceTypeEnum,
  ICWRequestTypeEnum,
  StorageDurationEnum,
  ICWTypeOfChargeEnum
} from "../enums/enums";
import { ChemicalUOM } from "./pbksb_ChemicalUOM";
export class ICWRate extends StandardEntity {
  static NAME = "pbksb_ICWRate";
  ifsCode?: string | null;
  serviceType?: ICWServiceTypeEnum | null;
  requestType?: ICWRequestTypeEnum | null;
  uom?: ChemicalUOM | null;
  rentalPeriod?: StorageDurationEnum | null;
  typeOfCharge?: ICWTypeOfChargeEnum | null;
  rate?: any | null;
  startDate?: any | null;
  invalid?: boolean | null;
}
export type ICWRateViewName = "_base" | "_local" | "_minimal" | "iCWRate-view";
export type ICWRateView<V extends ICWRateViewName> = V extends "_base"
  ? Pick<
      ICWRate,
      | "id"
      | "ifsCode"
      | "serviceType"
      | "requestType"
      | "rentalPeriod"
      | "typeOfCharge"
      | "rate"
      | "startDate"
      | "invalid"
    >
  : V extends "_local"
  ? Pick<
      ICWRate,
      | "id"
      | "ifsCode"
      | "serviceType"
      | "requestType"
      | "rentalPeriod"
      | "typeOfCharge"
      | "rate"
      | "startDate"
      | "invalid"
    >
  : V extends "iCWRate-view"
  ? Pick<
      ICWRate,
      | "id"
      | "ifsCode"
      | "serviceType"
      | "requestType"
      | "rentalPeriod"
      | "typeOfCharge"
      | "rate"
      | "startDate"
      | "invalid"
      | "uom"
      | "createdBy"
      | "createTs"
      | "updateTs"
      | "updatedBy"
    >
  : never;
