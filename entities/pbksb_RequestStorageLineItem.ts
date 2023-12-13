import { StandardEntity } from "./base/sys$StandardEntity";
import { ChemicalType } from "./pbksb_ChemicalType";
import { ChemicalUOM } from "./pbksb_ChemicalUOM";
import { Site } from "./pbksb_Site";
import { Bay } from "./pbksb_Bay";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { RequestStorage } from "./pbksb_RequestStorage";
export class RequestStorageLineItem extends StandardEntity {
  static NAME = "pbksb_RequestStorageLineItem";
  chemicalId?: ChemicalType | null;
  description?: string | null;
  expiryDate?: any | null;
  uom?: ChemicalUOM | null;
  qty?: number | null;
  rejectedQty?: number | null;
  remarks?: string | null;
  inventoryLocation?: Site | null;
  bayLocation?: Bay | null;
  batchNo?: string | null;
  file?: FileDescriptor | null;
  fileId?: string | null;
  fileName?: string | null;
  csds?: boolean | null;
  labelDate?: any | null;
  requestStorage?: RequestStorage | null;
}
export type RequestStorageLineItemViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "requestStorageLineItem-view";
export type RequestStorageLineItemView<
  V extends RequestStorageLineItemViewName
> = V extends "_base"
  ? Pick<
      RequestStorageLineItem,
      | "id"
      | "description"
      | "expiryDate"
      | "qty"
      | "rejectedQty"
      | "remarks"
      | "batchNo"
      | "fileId"
      | "fileName"
      | "csds"
      | "labelDate"
    >
  : V extends "_local"
  ? Pick<
      RequestStorageLineItem,
      | "id"
      | "description"
      | "expiryDate"
      | "qty"
      | "rejectedQty"
      | "remarks"
      | "batchNo"
      | "fileId"
      | "fileName"
      | "csds"
      | "labelDate"
    >
  : V extends "_minimal"
  ? Pick<RequestStorageLineItem, "id" | "description">
  : V extends "requestStorageLineItem-view"
  ? Pick<
      RequestStorageLineItem,
      | "id"
      | "description"
      | "expiryDate"
      | "qty"
      | "rejectedQty"
      | "remarks"
      | "batchNo"
      | "fileId"
      | "fileName"
      | "csds"
      | "labelDate"
      | "chemicalId"
      | "uom"
      | "inventoryLocation"
      | "bayLocation"
      | "file"
    >
  : never;
