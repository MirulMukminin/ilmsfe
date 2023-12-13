import { StandardEntity } from "./base/sys$StandardEntity";
import { Build_Parts_Form } from "./pbksb_Build_Parts_Form";
import { Site } from "./pbksb_Site";
export class Parts_New extends StandardEntity {
  static NAME = "pbksb_Parts_New";
  form?: Build_Parts_Form | null;
  item?: string | null;
  quantity?: any | null;
  location?: Site | null;
  value?: any | null;
  uom?: string | null;
  customs_code?: string | null;
}
export type Parts_NewViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "parts_New-view"
  | "parts_New_calculation-view";
export type Parts_NewView<V extends Parts_NewViewName> = V extends "_base"
  ? Pick<
      Parts_New,
      "id" | "item" | "quantity" | "value" | "uom" | "customs_code"
    >
  : V extends "_local"
  ? Pick<
      Parts_New,
      "id" | "item" | "quantity" | "value" | "uom" | "customs_code"
    >
  : V extends "parts_New-view"
  ? Pick<
      Parts_New,
      | "id"
      | "item"
      | "quantity"
      | "value"
      | "uom"
      | "customs_code"
      | "form"
      | "location"
    >
  : V extends "parts_New_calculation-view"
  ? Pick<
      Parts_New,
      | "id"
      | "item"
      | "quantity"
      | "value"
      | "uom"
      | "customs_code"
      | "form"
      | "location"
    >
  : never;
