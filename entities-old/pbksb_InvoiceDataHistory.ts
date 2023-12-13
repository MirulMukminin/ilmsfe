import { StandardEntity } from "./base/sys$StandardEntity";
import { PriceBreakDown } from "./pbksb_PriceBreakDown";
import { JobStatus, HistoryStatus } from "../enums/enums";
import { User } from "./base/sec$User";
export class InvoiceDataHistory extends StandardEntity {
  static NAME = "pbksb_InvoiceDataHistory";
  pricebreakdown?: PriceBreakDown | null;
  status?: JobStatus | null;
  update_user?: User | null;
  historystatus?: HistoryStatus | null;
}
export type InvoiceDataHistoryViewName = "_base" | "_local" | "_minimal";
export type InvoiceDataHistoryView<
  V extends InvoiceDataHistoryViewName
> = V extends "_base"
  ? Pick<InvoiceDataHistory, "id" | "status" | "historystatus">
  : V extends "_local"
  ? Pick<InvoiceDataHistory, "id" | "status" | "historystatus">
  : never;
