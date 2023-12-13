import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class ErrorRefModel extends BaseUuidEntity {
  static NAME = "bproc_ErrorRefModel";
  errorRef?: string | null;
}
export type ErrorRefModelViewName = "_base" | "_local" | "_minimal";
export type ErrorRefModelView<V extends ErrorRefModelViewName> = never;
