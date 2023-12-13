import { StandardEntity } from "./base/sys$StandardEntity";
export class OperatorStatus extends StandardEntity {
  static NAME = "pbksb_OperatorStatus";
  value?: string | null;
  description?: string | null;
}
export type OperatorStatusViewName = "_base" | "_local" | "_minimal";
export type OperatorStatusView<
  V extends OperatorStatusViewName
> = V extends "_base"
  ? Pick<OperatorStatus, "id" | "description" | "value">
  : V extends "_local"
  ? Pick<OperatorStatus, "id" | "value" | "description">
  : V extends "_minimal"
  ? Pick<OperatorStatus, "id" | "description">
  : never;
