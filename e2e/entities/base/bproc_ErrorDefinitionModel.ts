import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class ErrorDefinitionModel extends BaseUuidEntity {
  static NAME = "bproc_ErrorDefinitionModel";
  businessId?: string | null;
  name?: string | null;
  errorCode?: string | null;
}
export type ErrorDefinitionModelViewName = "_base" | "_local" | "_minimal";
export type ErrorDefinitionModelView<
  V extends ErrorDefinitionModelViewName
> = V extends "_base"
  ? Pick<ErrorDefinitionModel, "id" | "name" | "businessId">
  : V extends "_minimal"
  ? Pick<ErrorDefinitionModel, "id" | "name" | "businessId">
  : never;
