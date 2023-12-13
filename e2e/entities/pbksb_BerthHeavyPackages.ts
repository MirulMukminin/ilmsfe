import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { HeavyPackages } from "../enums/enums";
export class BerthHeavyPackages extends StandardEntity {
  static NAME = "pbksb_BerthHeavyPackages";
  berth_form?: BerthForm | null;
  heavy_packages?: HeavyPackages | null;
  quantity_in?: any | null;
  quantity_out?: any | null;
  total?: any | null;
  sort_ind?: number | null;
}
export type BerthHeavyPackagesViewName = "_base" | "_local" | "_minimal";
export type BerthHeavyPackagesView<
  V extends BerthHeavyPackagesViewName
> = V extends "_base"
  ? Pick<
      BerthHeavyPackages,
      | "id"
      | "heavy_packages"
      | "quantity_in"
      | "quantity_out"
      | "total"
      | "sort_ind"
    >
  : V extends "_local"
  ? Pick<
      BerthHeavyPackages,
      | "id"
      | "heavy_packages"
      | "quantity_in"
      | "quantity_out"
      | "total"
      | "sort_ind"
    >
  : never;
