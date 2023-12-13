import { StandardEntity } from "./base/sys$StandardEntity";
import { Goods_transaction } from "./pbksb_Goods_transaction";
import { Customer } from "./pbksb_Customer";
export class Transfer_transcation extends StandardEntity {
  static NAME = "pbksb_Transfer_transcation";
  goods_transcation?: Goods_transaction | null;
  customer?: Customer | null;
  item_sold?: string | null;
  form_type?: string | null;
  quality?: number | null;
  selling_price?: any | null;
  sale?: any | null;
}
export type Transfer_transcationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "transfer_transcation-view";
export type Transfer_transcationView<
  V extends Transfer_transcationViewName
> = V extends "_base"
  ? Pick<
      Transfer_transcation,
      "id" | "item_sold" | "form_type" | "quality" | "selling_price" | "sale"
    >
  : V extends "_local"
  ? Pick<
      Transfer_transcation,
      "id" | "item_sold" | "form_type" | "quality" | "selling_price" | "sale"
    >
  : V extends "transfer_transcation-view"
  ? Pick<
      Transfer_transcation,
      | "id"
      | "item_sold"
      | "form_type"
      | "quality"
      | "selling_price"
      | "sale"
      | "goods_transcation"
      | "customer"
    >
  : never;
