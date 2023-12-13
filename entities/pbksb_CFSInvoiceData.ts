import { StandardEntity } from "./base/sys$StandardEntity";
export class CFSInvoiceData extends StandardEntity {
  static NAME = "pbksb_CFSInvoiceData";
}
export type CFSInvoiceDataViewName = "_base" | "_local" | "_minimal";
export type CFSInvoiceDataView<V extends CFSInvoiceDataViewName> = never;
