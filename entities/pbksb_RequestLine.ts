import { StandardEntity } from "./base/sys$StandardEntity";
import {
  RequestCFSType,
  RequestCFSStatus,
  CfsContainerType
} from "../enums/enums";
import { ContainerCFS } from "./pbksb_ContainerCFS";
import { RequestCFS } from "./pbksb_RequestCFS";
export class RequestLine extends StandardEntity {
  static NAME = "pbksb_RequestLine";
  requestType?: RequestCFSType | null;
  storageBillingStatus?: RequestCFSStatus | null;
  lastBilled?: any | null;
  container?: ContainerCFS | null;
  containerNumber?: string | null;
  containerType?: CfsContainerType | null;
  repairRequest?: string | null;
  cablingOnVessel?: boolean | null;
  fourCoreDNV?: boolean | null;
  repair?: boolean | null;
  lotNumber?: string | null;
  storageStartDate?: any | null;
  storageEndDate?: any | null;
  plugOnDate?: any | null;
  plugOffDate?: any | null;
  plugOn?: boolean | null;
  plugOff?: boolean | null;
  remarks?: string | null;
  location?: string | null;
  temperatureReading?: number | null;
  temperatureStart?: number | null;
  temperature?: number | null;
  requestCFS?: RequestCFS | null;
  requestTicketNumber?: string | null;
  housekeepingRequired?: boolean | null;
  cleaningRequired?: boolean | null;
  stuffingRequired?: boolean | null;
  outsideInsideBonded?: string | null;
  containerReturn?: boolean | null;
  time?: any | null;
  status?: RequestCFSStatus | null;
  completedDateTime?: any | null;
}
export type RequestLineViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "requestHousekeepingCleaningStuffingLine-view"
  | "requestLine-view"
  | "requestLoadingCablingLine-view"
  | "requestPlugOnOffLine-view"
  | "requestRepairLine-view"
  | "requestStorageLine-view";
export type RequestLineView<V extends RequestLineViewName> = V extends "_base"
  ? Pick<
      RequestLine,
      | "id"
      | "container"
      | "requestType"
      | "storageBillingStatus"
      | "lastBilled"
      | "containerNumber"
      | "containerType"
      | "repairRequest"
      | "cablingOnVessel"
      | "fourCoreDNV"
      | "repair"
      | "lotNumber"
      | "storageStartDate"
      | "storageEndDate"
      | "plugOnDate"
      | "plugOffDate"
      | "plugOn"
      | "plugOff"
      | "remarks"
      | "location"
      | "temperatureReading"
      | "temperatureStart"
      | "temperature"
      | "requestTicketNumber"
      | "housekeepingRequired"
      | "cleaningRequired"
      | "stuffingRequired"
      | "outsideInsideBonded"
      | "containerReturn"
      | "time"
      | "status"
      | "completedDateTime"
    >
  : V extends "_local"
  ? Pick<
      RequestLine,
      | "id"
      | "requestType"
      | "storageBillingStatus"
      | "lastBilled"
      | "containerNumber"
      | "containerType"
      | "repairRequest"
      | "cablingOnVessel"
      | "fourCoreDNV"
      | "repair"
      | "lotNumber"
      | "storageStartDate"
      | "storageEndDate"
      | "plugOnDate"
      | "plugOffDate"
      | "plugOn"
      | "plugOff"
      | "remarks"
      | "location"
      | "temperatureReading"
      | "temperatureStart"
      | "temperature"
      | "requestTicketNumber"
      | "housekeepingRequired"
      | "cleaningRequired"
      | "stuffingRequired"
      | "outsideInsideBonded"
      | "containerReturn"
      | "time"
      | "status"
      | "completedDateTime"
    >
  : V extends "_minimal"
  ? Pick<RequestLine, "id" | "container">
  : V extends "requestHousekeepingCleaningStuffingLine-view"
  ? Pick<
      RequestLine,
      | "id"
      | "requestType"
      | "storageBillingStatus"
      | "lastBilled"
      | "containerNumber"
      | "containerType"
      | "repairRequest"
      | "cablingOnVessel"
      | "fourCoreDNV"
      | "repair"
      | "lotNumber"
      | "storageStartDate"
      | "storageEndDate"
      | "plugOnDate"
      | "plugOffDate"
      | "plugOn"
      | "plugOff"
      | "remarks"
      | "location"
      | "temperatureReading"
      | "temperatureStart"
      | "temperature"
      | "requestTicketNumber"
      | "housekeepingRequired"
      | "cleaningRequired"
      | "stuffingRequired"
      | "outsideInsideBonded"
      | "containerReturn"
      | "time"
      | "status"
      | "completedDateTime"
      | "container"
    >
  : V extends "requestLine-view"
  ? Pick<
      RequestLine,
      | "id"
      | "requestType"
      | "storageBillingStatus"
      | "lastBilled"
      | "containerNumber"
      | "containerType"
      | "repairRequest"
      | "cablingOnVessel"
      | "fourCoreDNV"
      | "repair"
      | "lotNumber"
      | "storageStartDate"
      | "storageEndDate"
      | "plugOnDate"
      | "plugOffDate"
      | "plugOn"
      | "plugOff"
      | "remarks"
      | "location"
      | "temperatureReading"
      | "temperatureStart"
      | "temperature"
      | "requestTicketNumber"
      | "housekeepingRequired"
      | "cleaningRequired"
      | "stuffingRequired"
      | "outsideInsideBonded"
      | "containerReturn"
      | "time"
      | "status"
      | "completedDateTime"
      | "container"
      | "requestCFS"
    >
  : V extends "requestLoadingCablingLine-view"
  ? Pick<
      RequestLine,
      | "id"
      | "requestType"
      | "storageBillingStatus"
      | "lastBilled"
      | "containerNumber"
      | "containerType"
      | "repairRequest"
      | "cablingOnVessel"
      | "fourCoreDNV"
      | "repair"
      | "lotNumber"
      | "storageStartDate"
      | "storageEndDate"
      | "plugOnDate"
      | "plugOffDate"
      | "plugOn"
      | "plugOff"
      | "remarks"
      | "location"
      | "temperatureReading"
      | "temperatureStart"
      | "temperature"
      | "requestTicketNumber"
      | "housekeepingRequired"
      | "cleaningRequired"
      | "stuffingRequired"
      | "outsideInsideBonded"
      | "containerReturn"
      | "time"
      | "status"
      | "completedDateTime"
      | "container"
    >
  : V extends "requestPlugOnOffLine-view"
  ? Pick<
      RequestLine,
      | "id"
      | "requestType"
      | "storageBillingStatus"
      | "lastBilled"
      | "containerNumber"
      | "containerType"
      | "repairRequest"
      | "cablingOnVessel"
      | "fourCoreDNV"
      | "repair"
      | "lotNumber"
      | "storageStartDate"
      | "storageEndDate"
      | "plugOnDate"
      | "plugOffDate"
      | "plugOn"
      | "plugOff"
      | "remarks"
      | "location"
      | "temperatureReading"
      | "temperatureStart"
      | "temperature"
      | "requestTicketNumber"
      | "housekeepingRequired"
      | "cleaningRequired"
      | "stuffingRequired"
      | "outsideInsideBonded"
      | "containerReturn"
      | "time"
      | "status"
      | "completedDateTime"
      | "container"
    >
  : V extends "requestRepairLine-view"
  ? Pick<
      RequestLine,
      | "id"
      | "requestType"
      | "storageBillingStatus"
      | "lastBilled"
      | "containerNumber"
      | "containerType"
      | "repairRequest"
      | "cablingOnVessel"
      | "fourCoreDNV"
      | "repair"
      | "lotNumber"
      | "storageStartDate"
      | "storageEndDate"
      | "plugOnDate"
      | "plugOffDate"
      | "plugOn"
      | "plugOff"
      | "remarks"
      | "location"
      | "temperatureReading"
      | "temperatureStart"
      | "temperature"
      | "requestTicketNumber"
      | "housekeepingRequired"
      | "cleaningRequired"
      | "stuffingRequired"
      | "outsideInsideBonded"
      | "containerReturn"
      | "time"
      | "status"
      | "completedDateTime"
      | "container"
    >
  : V extends "requestStorageLine-view"
  ? Pick<
      RequestLine,
      | "id"
      | "requestType"
      | "storageBillingStatus"
      | "lastBilled"
      | "containerNumber"
      | "containerType"
      | "repairRequest"
      | "cablingOnVessel"
      | "fourCoreDNV"
      | "repair"
      | "lotNumber"
      | "storageStartDate"
      | "storageEndDate"
      | "plugOnDate"
      | "plugOffDate"
      | "plugOn"
      | "plugOff"
      | "remarks"
      | "location"
      | "temperatureReading"
      | "temperatureStart"
      | "temperature"
      | "requestTicketNumber"
      | "housekeepingRequired"
      | "cleaningRequired"
      | "stuffingRequired"
      | "outsideInsideBonded"
      | "containerReturn"
      | "time"
      | "status"
      | "completedDateTime"
      | "container"
    >
  : never;
