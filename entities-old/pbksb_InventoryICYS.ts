import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { Agent } from "./pbksb_Agent";
import { GoodsReceiving } from "./pbksb_GoodsReceiving";
import { User } from "./base/sec$User";
import { InventoryItemOut } from "./pbksb_InventoryItemOut";
export class InventoryICYS extends StandardEntity {
  static NAME = "pbksb_InventoryICYS";
  itemId?: string | null;
  itemType?: string | null;
  item_name?: string | null;
  qty?: number | null;
  customer?: Customer | null;
  agent?: Agent | null;
  inDate?: any | null;
  requestNo?: GoodsReceiving | null;
  inventoryLocation?: string | null;
  actualFootprint?: number | null;
  batchNo?: string | null;
  userAdded?: User | null;
  userUpdated?: User | null;
  allotmentNo?: string | null;
  isLocked?: boolean | null;
  itemOut?: InventoryItemOut[] | null;
}
export type InventoryICYSViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "inventoryICYS-browse-view"
  | "inventoryICYS-item-selector-view"
  | "inventoryICYS-item-view"
  | "inventoryICYS-update-view";
export type InventoryICYSView<
  V extends InventoryICYSViewName
> = V extends "_base"
  ? Pick<
      InventoryICYS,
      | "id"
      | "itemId"
      | "itemType"
      | "item_name"
      | "qty"
      | "inDate"
      | "inventoryLocation"
      | "actualFootprint"
      | "batchNo"
      | "allotmentNo"
      | "isLocked"
    >
  : V extends "_local"
  ? Pick<
      InventoryICYS,
      | "id"
      | "itemId"
      | "itemType"
      | "item_name"
      | "qty"
      | "inDate"
      | "inventoryLocation"
      | "actualFootprint"
      | "batchNo"
      | "allotmentNo"
      | "isLocked"
    >
  : V extends "inventoryICYS-browse-view"
  ? Pick<
      InventoryICYS,
      | "id"
      | "itemId"
      | "item_name"
      | "qty"
      | "customer"
      | "agent"
      | "requestNo"
      | "inDate"
      | "isLocked"
      | "inventoryLocation"
      | "actualFootprint"
      | "batchNo"
      | "allotmentNo"
    >
  : V extends "inventoryICYS-item-selector-view"
  ? Pick<InventoryICYS, "id" | "item_name">
  : V extends "inventoryICYS-item-view"
  ? Pick<
      InventoryICYS,
      | "id"
      | "itemType"
      | "itemId"
      | "qty"
      | "item_name"
      | "customer"
      | "agent"
      | "inDate"
      | "requestNo"
      | "inventoryLocation"
      | "actualFootprint"
      | "batchNo"
      | "isLocked"
      | "allotmentNo"
    >
  : V extends "inventoryICYS-update-view"
  ? Pick<
      InventoryICYS,
      | "id"
      | "itemId"
      | "itemType"
      | "item_name"
      | "qty"
      | "inDate"
      | "inventoryLocation"
      | "actualFootprint"
      | "batchNo"
      | "allotmentNo"
      | "isLocked"
      | "customer"
      | "agent"
      | "requestNo"
    >
  : never;
