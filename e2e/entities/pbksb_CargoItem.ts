import { StandardEntity } from "./base/sys$StandardEntity";
import { Trip } from "./pbksb_Trip";
export class CargoItem extends StandardEntity {
  static NAME = "pbksb_CargoItem";
  description?: string | null;
  unit?: number | null;
  trip?: Trip | null;
}
export type CargoItemViewName = "_base" | "_local" | "_minimal";
export type CargoItemView<V extends CargoItemViewName> = V extends "_base"
  ? Pick<CargoItem, "id" | "description" | "unit">
  : V extends "_local"
  ? Pick<CargoItem, "id" | "description" | "unit">
  : V extends "_minimal"
  ? Pick<CargoItem, "id" | "description">
  : never;
