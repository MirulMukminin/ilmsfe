import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { ExecutionListenerModel } from "./bproc_ExecutionListenerModel";
export class TerminateEndEventModel extends BaseUuidEntity {
  static NAME = "bproc_TerminateEndEventModel";
  businessId?: string | null;
  name?: string | null;
  executionListeners?: ExecutionListenerModel | null;
  terminateAll?: boolean | null;
  documentation?: string | null;
}
export type TerminateEndEventModelViewName = "_base" | "_local" | "_minimal";
export type TerminateEndEventModelView<
  V extends TerminateEndEventModelViewName
> = V extends "_base"
  ? Pick<TerminateEndEventModel, "id" | "name" | "businessId">
  : V extends "_minimal"
  ? Pick<TerminateEndEventModel, "id" | "name" | "businessId">
  : never;
