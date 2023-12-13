import { StandardEntity } from "./base/sys$StandardEntity";
import { ScheduledWaste } from "./pbksb_ScheduledWaste";
import { WasteCode } from "./pbksb_WasteCode";
export class ScheduleWasteLabelling extends StandardEntity {
  static NAME = "pbksb_ScheduleWasteLabelling";
  nameOfWaste?: string | null;
  scheduledWaste?: ScheduledWaste | null;
  wastesCode?: WasteCode | null;
  dateGenerated?: any | null;
  wasteGenerator?: string | null;
}
export type ScheduleWasteLabellingViewName = "_base" | "_local" | "_minimal";
export type ScheduleWasteLabellingView<
  V extends ScheduleWasteLabellingViewName
> = V extends "_base"
  ? Pick<
      ScheduleWasteLabelling,
      "id" | "nameOfWaste" | "dateGenerated" | "wasteGenerator"
    >
  : V extends "_local"
  ? Pick<
      ScheduleWasteLabelling,
      "id" | "nameOfWaste" | "dateGenerated" | "wasteGenerator"
    >
  : never;
