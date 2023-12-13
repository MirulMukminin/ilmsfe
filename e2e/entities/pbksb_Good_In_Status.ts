import { BaseIntegerIdEntity } from "./base/sys$BaseIntegerIdEntity";
export class Good_In_Status extends BaseIntegerIdEntity {
  static NAME = "pbksb_Good_In_Status";
  uuid?: any | null;
}
export type Good_In_StatusViewName = "_base" | "_local" | "_minimal";
export type Good_In_StatusView<V extends Good_In_StatusViewName> = never;
