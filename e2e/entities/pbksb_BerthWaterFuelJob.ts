import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
export class BerthWaterFuelJob extends StandardEntity {
  static NAME = "pbksb_BerthWaterFuelJob";
  berth_form?: BerthForm | null;
  log_number?: string | null;
  remarks?: string | null;
  completion_date?: any | null;
  bod_number?: string | null;
  berth_fuelwater?: BerthWaterFuelJob | null;
}
export type BerthWaterFuelJobViewName = "_base" | "_local" | "_minimal";
export type BerthWaterFuelJobView<
  V extends BerthWaterFuelJobViewName
> = V extends "_base"
  ? Pick<
      BerthWaterFuelJob,
      "id" | "log_number" | "remarks" | "completion_date" | "bod_number"
    >
  : V extends "_local"
  ? Pick<
      BerthWaterFuelJob,
      "id" | "log_number" | "remarks" | "completion_date" | "bod_number"
    >
  : never;
