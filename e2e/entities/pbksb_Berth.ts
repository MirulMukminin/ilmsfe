import { StandardEntity } from "./base/sys$StandardEntity";
export class Berth extends StandardEntity {
  static NAME = "pbksb_Berth";
}
export type BerthViewName = "_base" | "_local" | "_minimal";
export type BerthView<V extends BerthViewName> = never;
