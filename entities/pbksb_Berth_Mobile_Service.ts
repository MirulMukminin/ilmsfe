import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthMobile } from "./pbksb_BerthMobile";
export class BerthMobileService extends StandardEntity {
  static NAME = "pbksb_Berth_Mobile_Service";
  berth_mobile?: BerthMobile | null;
  quantity?: string | null;
  name?: string | null;
  service_code?: string | null;
}
export type BerthMobileServiceViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthMobileService-view";
export type BerthMobileServiceView<
  V extends BerthMobileServiceViewName
> = V extends "_base"
  ? Pick<BerthMobileService, "id" | "name" | "quantity" | "service_code">
  : V extends "_local"
  ? Pick<BerthMobileService, "id" | "quantity" | "name" | "service_code">
  : V extends "_minimal"
  ? Pick<BerthMobileService, "id" | "name">
  : V extends "berthMobileService-view"
  ? Pick<BerthMobileService, "id" | "quantity" | "name" | "service_code">
  : never;
