import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthJobMHE_SessionTime } from "./pbksb_BerthJobMHE_SessionTime";
export class BerthJobMHE extends StandardEntity {
  static NAME = "pbksb_BerthJobMHE";
  session_time_job?: BerthJobMHE_SessionTime | null;
}
export type BerthJobMHEViewName = "_base" | "_local" | "_minimal";
export type BerthJobMHEView<V extends BerthJobMHEViewName> = never;
