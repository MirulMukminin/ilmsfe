import { StandardEntity } from "./base/sys$StandardEntity";
import { CWCYGoodsStorageRequest } from "./pbksb_CWCYGoodsStorageRequest";
export class CommonWarehouseWeeklyTonnageRecord extends StandardEntity {
  static NAME = "pbksb_CommonWarehouseWeeklyTonnageRecord";
  goodsStorage?: CWCYGoodsStorageRequest | null;
  lastBilledDate?: any | null;
  tonnage?: any | null;
}
export type CommonWarehouseWeeklyTonnageRecordViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "commonWarehouseWeeklyTonnageRecord-view";
export type CommonWarehouseWeeklyTonnageRecordView<
  V extends CommonWarehouseWeeklyTonnageRecordViewName
> = V extends "_base"
  ? Pick<
      CommonWarehouseWeeklyTonnageRecord,
      "id" | "lastBilledDate" | "tonnage"
    >
  : V extends "_local"
  ? Pick<
      CommonWarehouseWeeklyTonnageRecord,
      "id" | "lastBilledDate" | "tonnage"
    >
  : V extends "commonWarehouseWeeklyTonnageRecord-view"
  ? Pick<
      CommonWarehouseWeeklyTonnageRecord,
      "id" | "lastBilledDate" | "tonnage" | "goodsStorage"
    >
  : never;
