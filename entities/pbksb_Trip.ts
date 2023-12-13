import { StandardEntity } from "./base/sys$StandardEntity";
import { TripStatusEnum } from "../enums/enums";
import { Driver } from "./pbksb_Driver";
import { Roro } from "./pbksb_Roro";
import { CargoItem } from "./pbksb_CargoItem";
export class Trip extends StandardEntity {
  static NAME = "pbksb_Trip";
  bkkNumber?: string | null;
  status?: TripStatusEnum | null;
  timestamp?: any | null;
  vehicleCompany?: string | null;
  vehicleDriverName?: Driver | null;
  vehicleDriverICNo?: string | null;
  roro?: Roro | null;
  customerName?: string | null;
  customerRepresentativeName?: string | null;
  customerICNo?: string | null;
  customerLocation?: string | null;
  isPrinted?: boolean | null;
  cargoList?: CargoItem[] | null;
}
export type TripViewName = "_base" | "_local" | "_minimal" | "trip-view";
export type TripView<V extends TripViewName> = V extends "_base"
  ? Pick<
      Trip,
      | "id"
      | "bkkNumber"
      | "status"
      | "timestamp"
      | "vehicleCompany"
      | "vehicleDriverICNo"
      | "customerName"
      | "customerRepresentativeName"
      | "customerICNo"
      | "customerLocation"
      | "isPrinted"
    >
  : V extends "_local"
  ? Pick<
      Trip,
      | "id"
      | "bkkNumber"
      | "status"
      | "timestamp"
      | "vehicleCompany"
      | "vehicleDriverICNo"
      | "customerName"
      | "customerRepresentativeName"
      | "customerICNo"
      | "customerLocation"
      | "isPrinted"
    >
  : V extends "trip-view"
  ? Pick<
      Trip,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "bkkNumber"
      | "status"
      | "timestamp"
      | "vehicleCompany"
      | "vehicleDriverICNo"
      | "customerName"
      | "customerRepresentativeName"
      | "customerICNo"
      | "customerLocation"
      | "isPrinted"
      | "roro"
      | "cargoList"
      | "vehicleDriverName"
    >
  : never;
