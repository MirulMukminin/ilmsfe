import { StandardEntity } from "./base/sys$StandardEntity";
import { Transfer_Ownership } from "./pbksb_Transfer_ownership";
import { Good } from "./pbksb_Good";
import { Site } from "./pbksb_Site";
export class Good_Transfer_Ownership extends StandardEntity {
  static NAME = "pbksb_Good_Transfer_Ownership";
  transfer_ownership?: Transfer_Ownership | null;
  good?: Good | null;
  invoiceNo?: string | null;
  quantity?: any | null;
  location?: Site | null;
}
export type Good_Transfer_OwnershipViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "good_Transfer_Ownership-view"
  | "good_Transfer_Ownership_calculation-view";
export type Good_Transfer_OwnershipView<
  V extends Good_Transfer_OwnershipViewName
> = V extends "_base"
  ? Pick<Good_Transfer_Ownership, "id" | "invoiceNo" | "quantity">
  : V extends "_local"
  ? Pick<Good_Transfer_Ownership, "id" | "invoiceNo" | "quantity">
  : V extends "good_Transfer_Ownership-view"
  ? Pick<
      Good_Transfer_Ownership,
      | "id"
      | "invoiceNo"
      | "quantity"
      | "transfer_ownership"
      | "good"
      | "location"
    >
  : V extends "good_Transfer_Ownership_calculation-view"
  ? Pick<
      Good_Transfer_Ownership,
      | "id"
      | "invoiceNo"
      | "quantity"
      | "transfer_ownership"
      | "good"
      | "location"
    >
  : never;
