import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthJobMHE } from "./pbksb_BerthJobMHE";
export class BerthJobMHE_SessionTime extends StandardEntity {
  static NAME = "pbksb_BerthJobMHE_SessionTime";
  job_MHE?: BerthJobMHE | null;
}
export type BerthJobMHE_SessionTimeViewName = "_base" | "_local" | "_minimal";
export type BerthJobMHE_SessionTimeView<
  V extends BerthJobMHE_SessionTimeViewName
> = never;
