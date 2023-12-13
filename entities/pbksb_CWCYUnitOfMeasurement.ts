import { StandardEntity } from "./base/sys$StandardEntity";
export class CWCYUnitOfMeasurement extends StandardEntity {
  static NAME = "pbksb_CWCYUnitOfMeasurement";
  name?: string | null;
}
export type CWCYUnitOfMeasurementViewName = "_base" | "_local" | "_minimal";
export type CWCYUnitOfMeasurementView<
  V extends CWCYUnitOfMeasurementViewName
> = V extends "_base"
  ? Pick<CWCYUnitOfMeasurement, "id" | "name">
  : V extends "_local"
  ? Pick<CWCYUnitOfMeasurement, "id" | "name">
  : V extends "_minimal"
  ? Pick<CWCYUnitOfMeasurement, "id" | "name">
  : never;
