import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { User } from "./base/sec$User";
import { ChemicalUOM } from "./pbksb_ChemicalUOM";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { DocumentType } from "../enums/enums";
import { InventoryICW } from "./pbksb_InventoryICW";
import { InventoryICWItemOut } from "./pbksb_InventoryICWItemOut";
export class ChemicalType extends StandardEntity {
  static NAME = "pbksb_ChemicalType";
  chemicalId?: string | null;
  customer?: Customer | null;
  ksbUserId?: User | null;
  uom?: ChemicalUOM | null;
  name?: string | null;
  file?: FileDescriptor | null;
  type?: DocumentType | null;
  csds?: boolean | null;
  inventoryICW?: InventoryICW | null;
  inventoryICWItemOut?: InventoryICWItemOut | null;
}
export type ChemicalTypeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "chemicalType-view";
export type ChemicalTypeView<V extends ChemicalTypeViewName> = V extends "_base"
  ? Pick<ChemicalType, "id" | "chemicalId" | "name" | "type" | "csds">
  : V extends "_local"
  ? Pick<ChemicalType, "id" | "chemicalId" | "name" | "type" | "csds">
  : V extends "_minimal"
  ? Pick<ChemicalType, "id" | "chemicalId">
  : V extends "chemicalType-view"
  ? Pick<
      ChemicalType,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "chemicalId"
      | "name"
      | "file"
      | "type"
      | "csds"
      | "ksbUserId"
      | "customer"
      | "uom"
    >
  : never;
