import { StandardEntity } from "./base/sys$StandardEntity";
export class Location extends StandardEntity {
  static NAME = "pbksb_Location";
  name?: string | null;
  status?: string | null;
}
export type LocationViewName = "_base" | "_local" | "_minimal";
export type LocationView<V extends LocationViewName> = V extends "_base"
  ? Pick<Location, "id" | "name" | "status">
  : V extends "_local"
  ? Pick<Location, "id" | "name" | "status">
  : V extends "_minimal"
  ? Pick<Location, "id" | "name">
  : never;
