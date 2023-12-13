import { StandardEntity } from "./base/sys$StandardEntity";
export class WasteCode extends StandardEntity {
  static NAME = "pbksb_WasteCode";
  wasteCode?: string | null;
  twg?: boolean | null;
  description?: string | null;
  registeredDate?: any | null;
  registeredBy?: string | null;
}
export type WasteCodeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "wasteCode-view";
export type WasteCodeView<V extends WasteCodeViewName> = V extends "_base"
  ? Pick<
      WasteCode,
      "id" | "wasteCode" | "description" | "registeredDate" | "registeredBy"
    >
  : V extends "_local"
  ? Pick<
      WasteCode,
      "id" | "wasteCode" | "description" | "registeredDate" | "registeredBy"
    >
  : V extends "wasteCode-view"
  ? Pick<
      WasteCode,
      | "id"
      | "wasteCode"
      | "description"
      | "registeredDate"
      | "registeredBy"
      | "twg"
    >
  : never;
