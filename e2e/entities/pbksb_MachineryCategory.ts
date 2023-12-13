import { StandardEntity } from "./base/sys$StandardEntity";
import { MachineryPositionHandling } from "./pbksb_MachineryPositionHandling";
export class MachineryCategory extends StandardEntity {
  static NAME = "pbksb_MachineryCategory";
  code?: string | null;
  name?: string | null;
  position_handling?: MachineryPositionHandling | null;
}
export type MachineryCategoryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "machineryCategory-view";
export type MachineryCategoryView<
  V extends MachineryCategoryViewName
> = V extends "_base"
  ? Pick<MachineryCategory, "id" | "name" | "code">
  : V extends "_local"
  ? Pick<MachineryCategory, "id" | "code" | "name">
  : V extends "_minimal"
  ? Pick<MachineryCategory, "id" | "name">
  : V extends "machineryCategory-view"
  ? Pick<MachineryCategory, "id" | "code" | "name" | "position_handling">
  : never;
