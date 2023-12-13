import { StandardEntity } from "./base/sys$StandardEntity";
export class Supplier extends StandardEntity {
  static NAME = "pbksb_Supplier";
  code?: string | null;
  name?: string | null;
}
export type SupplierViewName = "_base" | "_local" | "_minimal";
export type SupplierView<V extends SupplierViewName> = V extends "_base"
  ? Pick<Supplier, "id" | "name" | "code">
  : V extends "_local"
  ? Pick<Supplier, "id" | "code" | "name">
  : V extends "_minimal"
  ? Pick<Supplier, "id" | "name">
  : never;
