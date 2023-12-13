import { StandardEntity } from "./base/sys$StandardEntity";
import { ChemicalType } from "./pbksb_ChemicalType";
export class ChemicalUOM extends StandardEntity {
  static NAME = "pbksb_ChemicalUOM";
  name?: string | null;
  chemicalType?: ChemicalType | null;
}
export type ChemicalUOMViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "chemicalUOM-view";
export type ChemicalUOMView<V extends ChemicalUOMViewName> = V extends "_base"
  ? Pick<ChemicalUOM, "id" | "name">
  : V extends "_local"
  ? Pick<ChemicalUOM, "id" | "name">
  : V extends "_minimal"
  ? Pick<ChemicalUOM, "id" | "name">
  : V extends "chemicalUOM-view"
  ? Pick<ChemicalUOM, "id" | "name">
  : never;
