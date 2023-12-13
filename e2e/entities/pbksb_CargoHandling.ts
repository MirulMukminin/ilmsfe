import { StandardEntity } from "./base/sys$StandardEntity";
export class CargoHandling extends StandardEntity {
  static NAME = "pbksb_CargoHandling";
  employee?: string | null;
  customer?: string | null;
  gang?: string | null;
  machine?: string | null;
  status?: string | null;
  recommendations?: string | null;
  visitDate?: any | null;
}
export type CargoHandlingViewName = "_base" | "_local" | "_minimal";
export type CargoHandlingView<
  V extends CargoHandlingViewName
> = V extends "_base"
  ? Pick<
      CargoHandling,
      | "id"
      | "employee"
      | "customer"
      | "gang"
      | "machine"
      | "status"
      | "recommendations"
      | "visitDate"
    >
  : V extends "_local"
  ? Pick<
      CargoHandling,
      | "id"
      | "employee"
      | "customer"
      | "gang"
      | "machine"
      | "status"
      | "recommendations"
      | "visitDate"
    >
  : never;
