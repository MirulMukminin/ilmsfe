import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class Parameter extends BaseUuidEntity {
  static NAME = "dashboard$Parameter";
  name?: string | null;
  alias?: string | null;
}
export type ParameterViewName = "_base" | "_local" | "_minimal";
export type ParameterView<V extends ParameterViewName> = V extends "_base"
  ? Pick<Parameter, "id" | "name">
  : V extends "_minimal"
  ? Pick<Parameter, "id" | "name">
  : never;
