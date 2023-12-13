import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { MarineStatus, GeneralWorkItem } from "../enums/enums";
export class BerthGeneralWorks extends StandardEntity {
  static NAME = "pbksb_BerthGeneralWorks";
  berth_form?: BerthForm | null;
  status?: MarineStatus | null;
  item?: GeneralWorkItem | null;
  remarks?: string | null;
  indicator?: boolean | null;
}
export type BerthGeneralWorksViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthGeneralWorks-view";
export type BerthGeneralWorksView<
  V extends BerthGeneralWorksViewName
> = V extends "_base"
  ? Pick<BerthGeneralWorks, "id" | "status" | "item" | "remarks" | "indicator">
  : V extends "_local"
  ? Pick<BerthGeneralWorks, "id" | "status" | "item" | "remarks" | "indicator">
  : V extends "berthGeneralWorks-view"
  ? Pick<
      BerthGeneralWorks,
      "id" | "status" | "item" | "remarks" | "indicator" | "berth_form"
    >
  : never;
