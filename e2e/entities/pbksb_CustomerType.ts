import { StandardEntity } from "./base/sys$StandardEntity";
export class CustomerType extends StandardEntity {
  static NAME = "pbksb_CustomerType";
  type?: string | null;
}
export type CustomerTypeViewName = "_base" | "_local" | "_minimal";
export type CustomerTypeView<V extends CustomerTypeViewName> = V extends "_base"
  ? Pick<CustomerType, "id" | "type">
  : V extends "_local"
  ? Pick<CustomerType, "id" | "type">
  : never;
