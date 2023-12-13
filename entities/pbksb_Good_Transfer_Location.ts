import { StandardEntity } from "./base/sys$StandardEntity";
import { Transfer_Location } from "./pbksb_Transfer_location";
import { Good } from "./pbksb_Good";
import { Site } from "./pbksb_Site";
export class Good_Transfer_Location extends StandardEntity {
  static NAME = "pbksb_Good_Transfer_Location";
  transfer_location?: Transfer_Location | null;
  good?: Good | null;
  previous_quantity?: any | null;
  quantity?: any | null;
  previous_location?: Site | null;
  location?: Site | null;
}
export type Good_Transfer_LocationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "good_Transfer_Location-view"
  | "good_Transfer_Location-view-newLocation"
  | "good_Transfer_Location-view-previous"
  | "good_Transfer_Location_calculation-view";
export type Good_Transfer_LocationView<
  V extends Good_Transfer_LocationViewName
> = V extends "_base"
  ? Pick<Good_Transfer_Location, "id" | "previous_quantity" | "quantity">
  : V extends "_local"
  ? Pick<Good_Transfer_Location, "id" | "previous_quantity" | "quantity">
  : V extends "good_Transfer_Location-view"
  ? Pick<
      Good_Transfer_Location,
      "id" | "previous_quantity" | "quantity" | "transfer_location" | "good"
    >
  : V extends "good_Transfer_Location-view-newLocation"
  ? Pick<
      Good_Transfer_Location,
      | "id"
      | "previous_quantity"
      | "quantity"
      | "transfer_location"
      | "good"
      | "location"
      | "previous_location"
    >
  : V extends "good_Transfer_Location-view-previous"
  ? Pick<
      Good_Transfer_Location,
      | "id"
      | "previous_quantity"
      | "quantity"
      | "transfer_location"
      | "good"
      | "previous_location"
      | "location"
    >
  : V extends "good_Transfer_Location_calculation-view"
  ? Pick<
      Good_Transfer_Location,
      | "id"
      | "previous_quantity"
      | "quantity"
      | "transfer_location"
      | "good"
      | "location"
    >
  : never;
