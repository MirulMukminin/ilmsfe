import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class ExtensionPropertyModel extends BaseUuidEntity {
  static NAME = "bproc_ExtensionPropertyModel";
  name?: string | null;
  value?: string | null;
}
export type ExtensionPropertyModelViewName = "_base" | "_local" | "_minimal";
export type ExtensionPropertyModelView<
  V extends ExtensionPropertyModelViewName
> = never;
