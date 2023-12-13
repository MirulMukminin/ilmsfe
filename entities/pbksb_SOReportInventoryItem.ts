import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { Division } from "./pbksb_Division";
import { ItemType, ScheduledWasteUomEnum } from "../enums/enums";
import { User } from "./base/sec$User";
import { InboundSoReport } from "./pbksb_InboundSoReport";
import { OutboundSoReport } from "./pbksb_OutboundSoReport";
export class SOReportInventoryItem extends StandardEntity {
  static NAME = "pbksb_SOReportInventoryItem";
  customer?: Customer | null;
  division?: Division | null;
  itemCode?: string | null;
  itemType?: ItemType | null;
  itemDesc?: string | null;
  quantity?: number | null;
  itemId?: string | null;
  packageWeight?: any | null;
  palletId?: string | null;
  palletWeight?: any | null;
  batchId?: string | null;
  transactionDate?: any | null;
  userId?: User | null;
  refDocNo?: string | null;
  location?: string | null;
  footPrint?: string | null;
  remarks?: string | null;
  inboundSoReport?: InboundSoReport | null;
  outboundSoReport?: OutboundSoReport | null;
  uom?: ScheduledWasteUomEnum | null;
  quantityNearExpiryDate?: number | null;
  nearExpiryIndicator?: boolean | null;
  expiryDate?: any | null;
}
export type SOReportInventoryItemViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "sOReportInventoryItem-view";
export type SOReportInventoryItemView<
  V extends SOReportInventoryItemViewName
> = V extends "_base"
  ? Pick<
      SOReportInventoryItem,
      | "id"
      | "itemCode"
      | "itemType"
      | "itemDesc"
      | "quantity"
      | "itemId"
      | "packageWeight"
      | "palletId"
      | "palletWeight"
      | "batchId"
      | "transactionDate"
      | "refDocNo"
      | "location"
      | "footPrint"
      | "remarks"
      | "uom"
      | "expiryDate"
    >
  : V extends "_local"
  ? Pick<
      SOReportInventoryItem,
      | "id"
      | "itemCode"
      | "itemType"
      | "itemDesc"
      | "quantity"
      | "itemId"
      | "packageWeight"
      | "palletId"
      | "palletWeight"
      | "batchId"
      | "transactionDate"
      | "refDocNo"
      | "location"
      | "footPrint"
      | "remarks"
      | "uom"
      | "expiryDate"
    >
  : V extends "sOReportInventoryItem-view"
  ? Pick<
      SOReportInventoryItem,
      | "id"
      | "itemCode"
      | "itemType"
      | "itemDesc"
      | "quantity"
      | "itemId"
      | "packageWeight"
      | "palletId"
      | "palletWeight"
      | "batchId"
      | "transactionDate"
      | "refDocNo"
      | "location"
      | "footPrint"
      | "remarks"
      | "uom"
      | "expiryDate"
      | "customer"
    >
  : never;
