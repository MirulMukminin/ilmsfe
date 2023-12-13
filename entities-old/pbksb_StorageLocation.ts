import { StandardEntity } from "./base/sys$StandardEntity";
import { StorageTypeEnum } from "../enums/enums";
export class StorageLocation extends StandardEntity {
  static NAME = "pbksb_StorageLocation";
  name?: string | null;
  storageType?: StorageTypeEnum | null;
}
export type StorageLocationViewName = "_base" | "_local" | "_minimal";
export type StorageLocationView<
  V extends StorageLocationViewName
> = V extends "_base"
  ? Pick<StorageLocation, "id" | "name" | "storageType">
  : V extends "_local"
  ? Pick<StorageLocation, "id" | "name" | "storageType">
  : V extends "_minimal"
  ? Pick<StorageLocation, "id" | "name">
  : never;
