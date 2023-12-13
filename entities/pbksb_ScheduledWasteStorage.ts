import { StandardEntity } from "./base/sys$StandardEntity";
import {
  ScheduledWasteStorageType,
  ScheduledWasteStorageItems
} from "../enums/enums";
import { ScheduledWaste } from "./pbksb_ScheduledWaste";
export class ScheduledWasteStorage extends StandardEntity {
  static NAME = "pbksb_ScheduledWasteStorage";
  storageType?: ScheduledWasteStorageType | null;
  storageItem?: ScheduledWasteStorageItems | null;
  storageValue?: number | null;
  scheduledWaste?: ScheduledWaste | null;
}
export type ScheduledWasteStorageViewName = "_base" | "_local" | "_minimal";
export type ScheduledWasteStorageView<
  V extends ScheduledWasteStorageViewName
> = V extends "_base"
  ? Pick<
      ScheduledWasteStorage,
      "id" | "storageType" | "storageItem" | "storageValue"
    >
  : V extends "_local"
  ? Pick<
      ScheduledWasteStorage,
      "id" | "storageType" | "storageItem" | "storageValue"
    >
  : never;
