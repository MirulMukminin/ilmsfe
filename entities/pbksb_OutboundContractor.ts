import { StandardEntity } from "./base/sys$StandardEntity";
import { ScheduledWaste } from "./pbksb_ScheduledWaste";
export class OutboundContractor extends StandardEntity {
  static NAME = "pbksb_OutboundContractor";
  scheduledWaste?: ScheduledWaste | null;
  wasteCode?: string | null;
  receiverCompany?: string | null;
  driverName?: string | null;
  driverICNo?: string | null;
  vehicleNo?: string | null;
}
export type OutboundContractorViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "outboundContractor-view";
export type OutboundContractorView<
  V extends OutboundContractorViewName
> = V extends "_base"
  ? Pick<
      OutboundContractor,
      | "id"
      | "wasteCode"
      | "receiverCompany"
      | "driverName"
      | "driverICNo"
      | "vehicleNo"
    >
  : V extends "_local"
  ? Pick<
      OutboundContractor,
      | "id"
      | "wasteCode"
      | "receiverCompany"
      | "driverName"
      | "driverICNo"
      | "vehicleNo"
    >
  : V extends "outboundContractor-view"
  ? Pick<
      OutboundContractor,
      | "id"
      | "wasteCode"
      | "receiverCompany"
      | "driverName"
      | "driverICNo"
      | "vehicleNo"
      | "scheduledWaste"
    >
  : never;
