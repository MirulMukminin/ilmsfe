import { StandardEntity } from "./base/sys$StandardEntity";
export class RequestServiceType extends StandardEntity {
  static NAME = "pbksb_RequestServiceType";
  code?: any | null;
  description?: string | null;
}
export type RequestServiceTypeViewName = "_base" | "_local" | "_minimal";
export type RequestServiceTypeView<
  V extends RequestServiceTypeViewName
> = V extends "_base"
  ? Pick<RequestServiceType, "id" | "description" | "code">
  : V extends "_local"
  ? Pick<RequestServiceType, "id" | "code" | "description">
  : V extends "_minimal"
  ? Pick<RequestServiceType, "id" | "description">
  : never;
