import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { GridCellLayout } from "./dashboard$GridCellLayout";
export class GridArea extends BaseUuidEntity {
  static NAME = "dashboard$GridArea";
  component?: GridCellLayout | null;
  row?: number | null;
  col?: number | null;
  col2?: number | null;
  row2?: number | null;
}
export type GridAreaViewName = "_base" | "_local" | "_minimal";
export type GridAreaView<V extends GridAreaViewName> = never;
