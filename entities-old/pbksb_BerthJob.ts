import { StandardEntity } from "./base/sys$StandardEntity";
export class BerthJob extends StandardEntity {
  static NAME = "pbksb_BerthJob";
}
export type BerthJobViewName = "_base" | "_local" | "_minimal";
export type BerthJobView<V extends BerthJobViewName> = never;
