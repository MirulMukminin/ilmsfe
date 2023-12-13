import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
export class CustomerWasteCode extends StandardEntity {
  static NAME = "pbksb_CustomerWasteCode";
  wasteCode?: string | null;
  twg?: boolean | null;
  customer?: Customer | null;
}
export type CustomerWasteCodeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "customerWasteCode-view"
  | "customerWasteCodeList-view";
export type CustomerWasteCodeView<
  V extends CustomerWasteCodeViewName
> = V extends "_base"
  ? Pick<CustomerWasteCode, "id" | "wasteCode" | "twg">
  : V extends "_local"
  ? Pick<CustomerWasteCode, "id" | "wasteCode" | "twg">
  : V extends "customerWasteCode-view"
  ? Pick<CustomerWasteCode, "id" | "wasteCode" | "twg" | "customer">
  : V extends "customerWasteCodeList-view"
  ? Pick<CustomerWasteCode, "id" | "wasteCode">
  : never;
