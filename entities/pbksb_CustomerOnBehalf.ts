import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
export class CustomerOnBehalf extends StandardEntity {
  static NAME = "pbksb_CustomerOnBehalf";
  customer?: Customer | null;
  customer_behalf?: Customer | null;
}
export type CustomerOnBehalfViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "customerOnBehalf-browseView"
  | "customerOnBehalf-view";
export type CustomerOnBehalfView<
  V extends CustomerOnBehalfViewName
> = V extends "customerOnBehalf-browseView"
  ? Pick<CustomerOnBehalf, "id" | "customer" | "customer_behalf">
  : V extends "customerOnBehalf-view"
  ? Pick<CustomerOnBehalf, "id" | "customer_behalf">
  : never;
