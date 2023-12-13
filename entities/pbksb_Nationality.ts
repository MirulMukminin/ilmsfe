import { StandardEntity } from "./base/sys$StandardEntity";
export class Nationality extends StandardEntity {
  static NAME = "pbksb_Nationality";
  countryCode?: string | null;
  countryName?: string | null;
}
export type NationalityViewName = "_base" | "_local" | "_minimal";
export type NationalityView<V extends NationalityViewName> = V extends "_base"
  ? Pick<Nationality, "id" | "countryCode" | "countryName">
  : V extends "_local"
  ? Pick<Nationality, "id" | "countryCode" | "countryName">
  : never;
