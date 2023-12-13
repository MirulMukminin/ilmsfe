import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { MarineStatus, WorkProgram } from "../enums/enums";
export class BerthWorkProgram extends StandardEntity {
  static NAME = "pbksb_BerthWorkProgram";
  berth_form?: BerthForm | null;
  status?: MarineStatus | null;
  work_program?: WorkProgram | null;
  request?: boolean | null;
  remarks?: string | null;
  sort_ind?: number | null;
}
export type BerthWorkProgramViewName = "_base" | "_local" | "_minimal";
export type BerthWorkProgramView<
  V extends BerthWorkProgramViewName
> = V extends "_base"
  ? Pick<
      BerthWorkProgram,
      "id" | "work_program" | "status" | "request" | "remarks" | "sort_ind"
    >
  : V extends "_local"
  ? Pick<
      BerthWorkProgram,
      "id" | "status" | "work_program" | "request" | "remarks" | "sort_ind"
    >
  : V extends "_minimal"
  ? Pick<BerthWorkProgram, "id" | "work_program">
  : never;
