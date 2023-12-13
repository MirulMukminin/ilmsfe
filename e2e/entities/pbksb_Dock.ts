import { StandardEntity } from "./base/sys$StandardEntity";
export class Dock extends StandardEntity {
  static NAME = "pbksb_Dock";
  name?: string | null;
}
export type DockViewName = "_base" | "_local" | "_minimal";
export type DockView<V extends DockViewName> = V extends "_base"
  ? Pick<Dock, "id" | "name">
  : V extends "_local"
  ? Pick<Dock, "id" | "name">
  : never;
