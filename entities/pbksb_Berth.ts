import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthTerminal } from "../enums/enums";
export class Berth extends StandardEntity {
  static NAME = "pbksb_Berth";
  code?: string | null;
  berth_name?: string | null;
  terminal?: BerthTerminal | null;
  length?: number | null;
}
export type BerthViewName = "_base" | "_local" | "_minimal";
export type BerthView<V extends BerthViewName> = V extends "_base"
  ? Pick<Berth, "id" | "code" | "berth_name" | "terminal" | "length">
  : V extends "_local"
  ? Pick<Berth, "id" | "code" | "berth_name" | "terminal" | "length">
  : V extends "_minimal"
  ? Pick<Berth, "id" | "code">
  : never;
