import { StandardEntity } from "./base/sys$StandardEntity";
export class PsbConsignorInventorySummary extends StandardEntity {
  static NAME = "pbksb_PsbConsignorInventorySummary";
  consignor?: string | null;
  localQuantity?: any | null;
  totalLocalValue?: any | null;
  bondedQuantity?: any | null;
  totalBondedValue?: any | null;
  totalQuantity?: any | null;
  totalValue?: any | null;
}
export type PsbConsignorInventorySummaryViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type PsbConsignorInventorySummaryView<
  V extends PsbConsignorInventorySummaryViewName
> = V extends "_base"
  ? Pick<
      PsbConsignorInventorySummary,
      | "id"
      | "consignor"
      | "localQuantity"
      | "totalLocalValue"
      | "bondedQuantity"
      | "totalBondedValue"
      | "totalQuantity"
      | "totalValue"
    >
  : V extends "_local"
  ? Pick<
      PsbConsignorInventorySummary,
      | "id"
      | "consignor"
      | "localQuantity"
      | "totalLocalValue"
      | "bondedQuantity"
      | "totalBondedValue"
      | "totalQuantity"
      | "totalValue"
    >
  : never;
