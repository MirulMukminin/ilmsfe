import { StandardEntity } from "./base/sys$StandardEntity";
export class Type extends StandardEntity {
  static NAME = "pbksb_Type";
  desription?: string | null;
}
export type TypeViewName = "_base" | "_local" | "_minimal";
export type TypeView<V extends TypeViewName> = V extends "_base"
  ? Pick<Type, "id" | "desription">
  : V extends "_local"
  ? Pick<Type, "id" | "desription">
  : never;
