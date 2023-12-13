import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
export class Bankers extends StandardEntity {
  static NAME = "pbksb_Bankers";
  name?: string | null;
  address?: string | null;
  customer?: Customer | null;
}
export type BankersViewName = "_base" | "_local" | "_minimal" | "bankers-view";
export type BankersView<V extends BankersViewName> = V extends "_base"
  ? Pick<Bankers, "id" | "name" | "address">
  : V extends "_local"
  ? Pick<Bankers, "id" | "name" | "address">
  : V extends "_minimal"
  ? Pick<Bankers, "id" | "name">
  : V extends "bankers-view"
  ? Pick<Bankers, "id" | "name" | "address">
  : never;
