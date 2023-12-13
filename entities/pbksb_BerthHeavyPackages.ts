import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { HeavyPackages } from "../enums/enums";
export class BerthHeavyPackages extends StandardEntity {
  static NAME = "pbksb_BerthHeavyPackages";
  berth_form?: BerthForm | null;
  admin_remarks?: string | null;
  sort_ind?: number | null;
  total_price?: any | null;
  heavy_packages?: HeavyPackages | null;
  quantity_in?: any | null;
  quantity_out?: any | null;
  total?: any | null;
  price?: any | null;
  calTotal?: any | null;
}
export type BerthHeavyPackagesViewName = "_base" | "_local" | "_minimal";
export type BerthHeavyPackagesView<
  V extends BerthHeavyPackagesViewName
> = V extends "_base"
  ? Pick<
      BerthHeavyPackages,
      | "id"
      | "admin_remarks"
      | "sort_ind"
      | "total_price"
      | "heavy_packages"
      | "quantity_in"
      | "quantity_out"
      | "total"
      | "price"
      | "calTotal"
    >
  : V extends "_local"
  ? Pick<
      BerthHeavyPackages,
      | "id"
      | "admin_remarks"
      | "sort_ind"
      | "total_price"
      | "heavy_packages"
      | "quantity_in"
      | "quantity_out"
      | "total"
      | "price"
      | "calTotal"
    >
  : never;
