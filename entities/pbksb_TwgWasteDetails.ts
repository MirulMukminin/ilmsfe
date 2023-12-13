import { StandardEntity } from "./base/sys$StandardEntity";
import { WasteCode } from "./pbksb_WasteCode";
import { Twg } from "./pbksb_Twg";
export class TwgWasteDetails extends StandardEntity {
  static NAME = "pbksb_TwgWasteDetails";
  wasteCode?: WasteCode | null;
  quantity?: any | null;
  twg?: Twg | null;
}
export type TwgWasteDetailsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "twgWasteDetails-view";
export type TwgWasteDetailsView<
  V extends TwgWasteDetailsViewName
> = V extends "_base"
  ? Pick<TwgWasteDetails, "id" | "quantity">
  : V extends "_local"
  ? Pick<TwgWasteDetails, "id" | "quantity">
  : V extends "twgWasteDetails-view"
  ? Pick<TwgWasteDetails, "id" | "quantity" | "wasteCode">
  : never;
