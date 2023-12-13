import { StandardEntity } from "./base/sys$StandardEntity";
import { Job_PSB } from "./pbksb_Job_PSB";
import { Goods_OUT } from "./pbksb_Goods_OUT";
import { Transaction_PSB_Type } from "../enums/enums";
export class Goods_transaction extends StandardEntity {
  static NAME = "pbksb_Goods_transaction";
  job_psb?: Job_PSB | null;
  invoice_no?: string | null;
  quantity_availabe?: number | null;
  value?: any | null;
  description?: string | null;
  goods_out?: Goods_OUT[] | null;
  transcation_type?: Transaction_PSB_Type | null;
}
export type Goods_transactionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "goods_transaction-view";
export type Goods_transactionView<
  V extends Goods_transactionViewName
> = V extends "_base"
  ? Pick<
      Goods_transaction,
      | "id"
      | "description"
      | "invoice_no"
      | "quantity_availabe"
      | "value"
      | "transcation_type"
    >
  : V extends "_local"
  ? Pick<
      Goods_transaction,
      | "id"
      | "invoice_no"
      | "quantity_availabe"
      | "value"
      | "description"
      | "transcation_type"
    >
  : V extends "_minimal"
  ? Pick<Goods_transaction, "id" | "description">
  : V extends "goods_transaction-view"
  ? Pick<
      Goods_transaction,
      | "id"
      | "invoice_no"
      | "quantity_availabe"
      | "value"
      | "description"
      | "transcation_type"
      | "job_psb"
    >
  : never;
