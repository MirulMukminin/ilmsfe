import { StandardEntity } from "./base/sys$StandardEntity";
import { ChemicalType } from "./pbksb_ChemicalType";
import { Division } from "./pbksb_Division";
import { Site } from "./pbksb_Site";
import { Customer } from "./pbksb_Customer";
import { RequestStorageLineItem } from "./pbksb_RequestStorageLineItem";
import { ChemicalUOM } from "./pbksb_ChemicalUOM";
import { ICWAvailabilityEnum } from "../enums/enums";
import { RequestStorage } from "./pbksb_RequestStorage";
import { InventoryICWItemOut } from "./pbksb_InventoryICWItemOut";
export class InventoryICW extends StandardEntity {
  static NAME = "pbksb_InventoryICW";
  company?: string | null;
  chemicalType?: ChemicalType | null;
  divison?: Division | null;
  site?: Site | null;
  customer?: Customer | null;
  relatedRequestItem?: RequestStorageLineItem | null;
  itemId?: string | null;
  itemCode?: string | null;
  itemType?: string | null;
  itemDescription?: string | null;
  inQty?: number | null;
  qty?: number | null;
  uom?: ChemicalUOM | null;
  contentsQty?: any | null;
  contentsQtyUnit?: string | null;
  availability?: ICWAvailabilityEnum | null;
  docketNo?: any | null;
  storageRequest?: RequestStorage | null;
  packageWeight?: any | null;
  palletId?: string | null;
  palletWeight?: any | null;
  batchId?: string | null;
  footPrint?: number | null;
  transationDate?: any | null;
  isLocked?: boolean | null;
  expiryDate?: any | null;
  remarks?: string | null;
  inventoryLocation?: Site | null;
  itemOut?: InventoryICWItemOut[] | null;
}
export type InventoryICWViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "inventoryICW-selector"
  | "inventoryICW-update"
  | "inventoryICW-view"
  | "inventoryICW-view-rest"
  | "inventoryICWForInvoice-view";
export type InventoryICWView<V extends InventoryICWViewName> = V extends "_base"
  ? Pick<
      InventoryICW,
      | "id"
      | "itemDescription"
      | "company"
      | "itemId"
      | "itemCode"
      | "itemType"
      | "inQty"
      | "qty"
      | "contentsQty"
      | "contentsQtyUnit"
      | "availability"
      | "docketNo"
      | "packageWeight"
      | "palletId"
      | "palletWeight"
      | "batchId"
      | "footPrint"
      | "transationDate"
      | "isLocked"
      | "expiryDate"
      | "remarks"
    >
  : V extends "_local"
  ? Pick<
      InventoryICW,
      | "id"
      | "company"
      | "itemId"
      | "itemCode"
      | "itemType"
      | "itemDescription"
      | "inQty"
      | "qty"
      | "contentsQty"
      | "contentsQtyUnit"
      | "availability"
      | "docketNo"
      | "packageWeight"
      | "palletId"
      | "palletWeight"
      | "batchId"
      | "footPrint"
      | "transationDate"
      | "isLocked"
      | "expiryDate"
      | "remarks"
    >
  : V extends "_minimal"
  ? Pick<InventoryICW, "id" | "itemDescription">
  : V extends "inventoryICW-selector"
  ? Pick<
      InventoryICW,
      | "id"
      | "createTs"
      | "itemCode"
      | "itemType"
      | "itemDescription"
      | "qty"
      | "batchId"
      | "footPrint"
      | "docketNo"
      | "uom"
      | "customer"
      | "isLocked"
      | "itemId"
      | "chemicalType"
    >
  : V extends "inventoryICW-update"
  ? Pick<
      InventoryICW,
      | "id"
      | "itemId"
      | "itemCode"
      | "itemType"
      | "itemDescription"
      | "qty"
      | "uom"
      | "docketNo"
      | "packageWeight"
      | "palletId"
      | "palletWeight"
      | "batchId"
      | "footPrint"
      | "transationDate"
      | "isLocked"
      | "expiryDate"
      | "inventoryLocation"
      | "customer"
      | "itemOut"
    >
  : V extends "inventoryICW-view"
  ? Pick<
      InventoryICW,
      | "id"
      | "company"
      | "itemId"
      | "itemCode"
      | "itemType"
      | "itemDescription"
      | "inQty"
      | "qty"
      | "contentsQty"
      | "contentsQtyUnit"
      | "availability"
      | "docketNo"
      | "packageWeight"
      | "palletId"
      | "palletWeight"
      | "batchId"
      | "footPrint"
      | "transationDate"
      | "isLocked"
      | "expiryDate"
      | "remarks"
      | "divison"
      | "site"
      | "customer"
      | "uom"
      | "inventoryLocation"
      | "storageRequest"
      | "chemicalType"
    >
  : V extends "inventoryICW-view-rest"
  ? Pick<
      InventoryICW,
      | "id"
      | "company"
      | "itemId"
      | "itemCode"
      | "itemType"
      | "itemDescription"
      | "inQty"
      | "qty"
      | "contentsQty"
      | "contentsQtyUnit"
      | "availability"
      | "docketNo"
      | "packageWeight"
      | "palletId"
      | "palletWeight"
      | "batchId"
      | "footPrint"
      | "transationDate"
      | "isLocked"
      | "expiryDate"
      | "remarks"
      | "divison"
      | "site"
      | "customer"
      | "relatedRequestItem"
      | "uom"
      | "storageRequest"
      | "itemOut"
      | "chemicalType"
    >
  : V extends "inventoryICWForInvoice-view"
  ? Pick<
      InventoryICW,
      | "id"
      | "company"
      | "itemId"
      | "itemCode"
      | "itemType"
      | "itemDescription"
      | "inQty"
      | "qty"
      | "contentsQty"
      | "contentsQtyUnit"
      | "availability"
      | "docketNo"
      | "packageWeight"
      | "palletId"
      | "palletWeight"
      | "batchId"
      | "footPrint"
      | "transationDate"
      | "isLocked"
      | "expiryDate"
      | "remarks"
      | "uom"
      | "itemOut"
      | "chemicalType"
      | "customer"
    >
  : never;
