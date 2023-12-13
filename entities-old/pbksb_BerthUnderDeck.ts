import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { MarineStatus, UnderdeckItem } from "../enums/enums";
export class BerthUnderDeck extends StandardEntity {
  static NAME = "pbksb_BerthUnderDeck";
  berth_form?: BerthForm | null;
  status?: MarineStatus | null;
  material_requisition?: string | null;
  item?: UnderdeckItem | null;
  date_time?: any | null;
  tonnes?: number | null;
  barrel?: number | null;
  indicator?: boolean | null;
}
export type BerthUnderDeckViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthUnderDeck-view"
  | "berthUnderDeck_Summary-view";
export type BerthUnderDeckView<
  V extends BerthUnderDeckViewName
> = V extends "_base"
  ? Pick<
      BerthUnderDeck,
      | "id"
      | "status"
      | "material_requisition"
      | "item"
      | "date_time"
      | "tonnes"
      | "barrel"
      | "indicator"
    >
  : V extends "_local"
  ? Pick<
      BerthUnderDeck,
      | "id"
      | "status"
      | "material_requisition"
      | "item"
      | "date_time"
      | "tonnes"
      | "barrel"
      | "indicator"
    >
  : V extends "berthUnderDeck-view"
  ? Pick<
      BerthUnderDeck,
      | "id"
      | "status"
      | "material_requisition"
      | "item"
      | "date_time"
      | "tonnes"
      | "barrel"
      | "indicator"
    >
  : V extends "berthUnderDeck_Summary-view"
  ? Pick<
      BerthUnderDeck,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "status"
      | "material_requisition"
      | "item"
      | "date_time"
      | "tonnes"
      | "barrel"
      | "indicator"
    >
  : never;
