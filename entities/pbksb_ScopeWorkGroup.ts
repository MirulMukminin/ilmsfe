import { StandardEntity } from "./base/sys$StandardEntity";
import { ScopeWork, Groupscopework } from "../enums/enums";
export class ScopeWorkGroup extends StandardEntity {
  static NAME = "pbksb_ScopeWorkGroup";
  scopeofwork?: ScopeWork | null;
  group?: Groupscopework | null;
}
export type ScopeWorkGroupViewName = "_base" | "_local" | "_minimal";
export type ScopeWorkGroupView<
  V extends ScopeWorkGroupViewName
> = V extends "_base"
  ? Pick<ScopeWorkGroup, "id" | "scopeofwork" | "group">
  : V extends "_local"
  ? Pick<ScopeWorkGroup, "id" | "scopeofwork" | "group">
  : never;
