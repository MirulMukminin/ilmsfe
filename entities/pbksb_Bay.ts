import { StandardEntity } from "./base/sys$StandardEntity";
export class Bay extends StandardEntity {
  static NAME = "pbksb_Bay";
  code?: string | null;
  description?: string | null;
}
export type BayViewName = "_base" | "_local" | "_minimal";
export type BayView<V extends BayViewName> = V extends "_base"
  ? Pick<Bay, "id" | "description" | "code">
  : V extends "_local"
  ? Pick<Bay, "id" | "code" | "description">
  : V extends "_minimal"
  ? Pick<Bay, "id" | "description">
  : never;
