import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
export class Order extends StandardEntity {
  static NAME = "pbksb_Order";
  number?: string | null;
  date?: any | null;
  description?: string | null;
  customer?: Customer | null;
}
export type OrderViewName = "_base" | "_local" | "_minimal";
export type OrderView<V extends OrderViewName> = V extends "_base"
  ? Pick<Order, "id" | "description" | "number" | "date">
  : V extends "_local"
  ? Pick<Order, "id" | "number" | "date" | "description">
  : V extends "_minimal"
  ? Pick<Order, "id" | "description">
  : never;
