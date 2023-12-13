import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { ExecutionListenerModel } from "./bproc_ExecutionListenerModel";
import { ErrorRefModel } from "./bproc_ErrorRefModel";
export class ErrorEventModel extends BaseUuidEntity {
  static NAME = "bproc_ErrorEventModel";
  businessId?: string | null;
  name?: string | null;
  executionListeners?: ExecutionListenerModel | null;
  documentation?: string | null;
  errorRefModel?: ErrorRefModel | null;
}
export type ErrorEventModelViewName = "_base" | "_local" | "_minimal";
export type ErrorEventModelView<
  V extends ErrorEventModelViewName
> = V extends "_base"
  ? Pick<ErrorEventModel, "id" | "name" | "businessId">
  : V extends "_minimal"
  ? Pick<ErrorEventModel, "id" | "name" | "businessId">
  : never;
