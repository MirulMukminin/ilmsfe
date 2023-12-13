import { StandardEntity } from "./base/sys$StandardEntity";
import { InventoryICW } from "./pbksb_InventoryICW";
import { Customer } from "./pbksb_Customer";
import { ChemicalUOM } from "./pbksb_ChemicalUOM";
import { Site } from "./pbksb_Site";
import { Bay } from "./pbksb_Bay";
import { ChemicalType } from "./pbksb_ChemicalType";
import { User } from "./base/sec$User";
import { RequestStorage } from "./pbksb_RequestStorage";
import { RequestTransfer } from "./pbksb_RequestTransfer";
export class InventoryICWItemOut extends StandardEntity {
  static NAME = "pbksb_InventoryICWItemOut";
  inOrOutRequest?: string | null;
  quantity?: number | null;
  handlingCharged?: boolean | null;
  item?: InventoryICW | null;
  customer?: Customer | null;
  uom?: ChemicalUOM | null;
  expiryDate?: any | null;
  inDate?: any | null;
  inQty?: number | null;
  serviceDate?: any | null;
  balanceQuantity?: number | null;
  inventoryLocation?: Site | null;
  bayNo?: Bay | null;
  docketNo?: string | null;
  outDate?: any | null;
  chemicalType?: ChemicalType | null;
  outQty?: number | null;
  user?: User | null;
  batchNo?: string | null;
  ccu?: boolean | null;
  remarks?: string | null;
  isCompleted?: boolean | null;
  requestStorage?: RequestStorage | null;
  requestTransfer?: RequestTransfer | null;
}
export type InventoryICWItemOutViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "inventoryICWItemOut-rest-view";
export type InventoryICWItemOutView<
  V extends InventoryICWItemOutViewName
> = V extends "_base"
  ? Pick<
      InventoryICWItemOut,
      | "id"
      | "item"
      | "outDate"
      | "inOrOutRequest"
      | "quantity"
      | "handlingCharged"
      | "expiryDate"
      | "inDate"
      | "inQty"
      | "serviceDate"
      | "balanceQuantity"
      | "docketNo"
      | "outQty"
      | "batchNo"
      | "ccu"
      | "remarks"
      | "isCompleted"
    >
  : V extends "_local"
  ? Pick<
      InventoryICWItemOut,
      | "id"
      | "inOrOutRequest"
      | "quantity"
      | "handlingCharged"
      | "expiryDate"
      | "inDate"
      | "inQty"
      | "serviceDate"
      | "balanceQuantity"
      | "docketNo"
      | "outDate"
      | "outQty"
      | "batchNo"
      | "ccu"
      | "remarks"
      | "isCompleted"
    >
  : V extends "_minimal"
  ? Pick<InventoryICWItemOut, "id" | "item" | "outDate">
  : V extends "inventoryICWItemOut-rest-view"
  ? Pick<
      InventoryICWItemOut,
      | "id"
      | "item"
      | "bayNo"
      | "inventoryLocation"
      | "isCompleted"
      | "batchNo"
      | "customer"
      | "outDate"
      | "outQty"
      | "ccu"
      | "remarks"
      | "inOrOutRequest"
      | "inDate"
      | "inQty"
      | "handlingCharged"
      | "chemicalType"
      | "expiryDate"
      | "balanceQuantity"
      | "requestStorage"
      | "requestTransfer"
      | "serviceDate"
    >
  : never;
