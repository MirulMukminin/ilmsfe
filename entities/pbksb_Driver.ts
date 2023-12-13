import { StandardEntity } from "./base/sys$StandardEntity";
export class Driver extends StandardEntity {
  static NAME = "pbksb_Driver";
  name?: string | null;
  company?: string | null;
  icNumber?: string | null;
}
export type DriverViewName = "_base" | "_local" | "_minimal" | "driver-view";
export type DriverView<V extends DriverViewName> = V extends "_base"
  ? Pick<Driver, "id" | "name" | "company" | "icNumber">
  : V extends "_local"
  ? Pick<Driver, "id" | "name" | "company" | "icNumber">
  : V extends "_minimal"
  ? Pick<Driver, "id" | "name">
  : V extends "driver-view"
  ? Pick<Driver, "id" | "name" | "company" | "icNumber">
  : never;
