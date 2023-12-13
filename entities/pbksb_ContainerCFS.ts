import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { CfsContainerType, CFSContainerStatus } from "../enums/enums";
export class ContainerCFS extends StandardEntity {
  static NAME = "pbksb_ContainerCFS";
  containerNumber?: string | null;
  customer?: Customer | null;
  containerType?: CfsContainerType | null;
  status?: CFSContainerStatus | null;
  storageStatus?: CFSContainerStatus | null;
  plugOnStatus?: CFSContainerStatus | null;
  housekeepingStatus?: CFSContainerStatus | null;
  loadingStatus?: CFSContainerStatus | null;
  repairStatus?: CFSContainerStatus | null;
  plugOnDate?: any | null;
  plugOffDate?: any | null;
}
export type ContainerCFSViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "containerCFS-view";
export type ContainerCFSView<V extends ContainerCFSViewName> = V extends "_base"
  ? Pick<
      ContainerCFS,
      | "id"
      | "containerNumber"
      | "containerType"
      | "status"
      | "storageStatus"
      | "plugOnStatus"
      | "housekeepingStatus"
      | "loadingStatus"
      | "repairStatus"
      | "plugOnDate"
      | "plugOffDate"
    >
  : V extends "_local"
  ? Pick<
      ContainerCFS,
      | "id"
      | "containerNumber"
      | "containerType"
      | "status"
      | "storageStatus"
      | "plugOnStatus"
      | "housekeepingStatus"
      | "loadingStatus"
      | "repairStatus"
      | "plugOnDate"
      | "plugOffDate"
    >
  : V extends "_minimal"
  ? Pick<ContainerCFS, "id" | "containerNumber">
  : V extends "containerCFS-view"
  ? Pick<
      ContainerCFS,
      | "id"
      | "containerNumber"
      | "containerType"
      | "status"
      | "storageStatus"
      | "plugOnStatus"
      | "housekeepingStatus"
      | "loadingStatus"
      | "repairStatus"
      | "plugOnDate"
      | "plugOffDate"
      | "customer"
    >
  : never;
