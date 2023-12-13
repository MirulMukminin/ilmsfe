import { StandardEntity } from "./base/sys$StandardEntity";
export class CustomerPriceGroup extends StandardEntity {
  static NAME = "pbksb_CustomerPriceGroup";
  code?: string | null;
  value?: string | null;
  description?: string | null;
}
export type CustomerPriceGroupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "customerPriceGroup-view";
export type CustomerPriceGroupView<
  V extends CustomerPriceGroupViewName
> = V extends "_base"
  ? Pick<CustomerPriceGroup, "id" | "code" | "description" | "value">
  : V extends "_local"
  ? Pick<CustomerPriceGroup, "id" | "code" | "value" | "description">
  : V extends "_minimal"
  ? Pick<CustomerPriceGroup, "id" | "code" | "description">
  : V extends "customerPriceGroup-view"
  ? Pick<
      CustomerPriceGroup,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "code"
      | "value"
      | "description"
    >
  : never;
