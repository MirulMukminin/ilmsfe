import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { User } from "./base/sec$User";
export class IcwWarehouseSpaceUtilization extends StandardEntity {
  static NAME = "pbksb_IcwWarehouseSpaceUtilization";
  customer?: Customer | null;
  lotId?: string | null;
  area?: any | null;
  month?: any | null;
  approvedBy?: User | null;
  status?: string | null;
}
export type IcwWarehouseSpaceUtilizationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "icwWarehouseSpaceUtilization-view";
export type IcwWarehouseSpaceUtilizationView<
  V extends IcwWarehouseSpaceUtilizationViewName
> = V extends "_base"
  ? Pick<
      IcwWarehouseSpaceUtilization,
      "id" | "lotId" | "area" | "month" | "status"
    >
  : V extends "_local"
  ? Pick<
      IcwWarehouseSpaceUtilization,
      "id" | "lotId" | "area" | "month" | "status"
    >
  : V extends "icwWarehouseSpaceUtilization-view"
  ? Pick<
      IcwWarehouseSpaceUtilization,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "lotId"
      | "area"
      | "month"
      | "status"
      | "customer"
      | "approvedBy"
    >
  : never;
