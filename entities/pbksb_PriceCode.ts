import { StandardEntity } from "./base/sys$StandardEntity";
export class PriceCode extends StandardEntity {
  static NAME = "pbksb_PriceCode";
  code?: string | null;
  remarks?: string | null;
}
export type PriceCodeViewName = "_base" | "_local" | "_minimal";
export type PriceCodeView<V extends PriceCodeViewName> = V extends "_base"
  ? Pick<PriceCode, "id" | "code" | "remarks">
  : V extends "_local"
  ? Pick<PriceCode, "id" | "code" | "remarks">
  : V extends "_minimal"
  ? Pick<PriceCode, "id" | "code" | "remarks">
  : never;
