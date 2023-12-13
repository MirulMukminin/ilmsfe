import { StandardEntity } from "./base/sys$StandardEntity";
export class Vessel extends StandardEntity {
  static NAME = "pbksb_Vessel";
  name?: string | null;
  code?: string | null;
  type?: string | null;
  loa?: any | null;
  grt?: any | null;
  nrt?: any | null;
  df?: string | null;
  dwt?: any | null;
  max_draft?: any | null;
  email?: string | null;
}
export type VesselViewName = "_base" | "_local" | "_minimal";
export type VesselView<V extends VesselViewName> = V extends "_base"
  ? Pick<
      Vessel,
      | "id"
      | "name"
      | "code"
      | "type"
      | "loa"
      | "grt"
      | "nrt"
      | "df"
      | "dwt"
      | "max_draft"
      | "email"
    >
  : V extends "_local"
  ? Pick<
      Vessel,
      | "id"
      | "name"
      | "code"
      | "type"
      | "loa"
      | "grt"
      | "nrt"
      | "df"
      | "dwt"
      | "max_draft"
      | "email"
    >
  : V extends "_minimal"
  ? Pick<Vessel, "id" | "name">
  : never;
