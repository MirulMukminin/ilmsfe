import { StandardEntity } from "./base/sys$StandardEntity";
import { Job_MHE } from "./pbksb_Job_MHE";
import { JobMHE_SessionTime } from "./pbksb_JobMHE_SessionTime";
import { External_Item } from "./pbksb_External_Item";
import { Quotation_Customer } from "./pbksb_Quotation_Customer";
import { MachineOperatorEnum } from "../enums/enums";
export class ExternalItemTransactions extends StandardEntity {
  static NAME = "pbksb_ExternalItemTransactions";
  job_MHE?: Job_MHE | null;
  session_time?: JobMHE_SessionTime | null;
  external_Item?: External_Item | null;
  quotation_customer?: Quotation_Customer | null;
  category?: MachineOperatorEnum | null;
}
export type ExternalItemTransactionsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "externalItemTransactions-browseView"
  | "externalItemTransactions-view"
  | "externalItemTransactions-view_RequestForm";
export type ExternalItemTransactionsView<
  V extends ExternalItemTransactionsViewName
> = V extends "_base"
  ? Pick<ExternalItemTransactions, "id" | "category">
  : V extends "_local"
  ? Pick<ExternalItemTransactions, "id" | "category">
  : V extends "externalItemTransactions-browseView"
  ? Pick<
      ExternalItemTransactions,
      | "id"
      | "job_MHE"
      | "session_time"
      | "external_Item"
      | "category"
      | "quotation_customer"
    >
  : V extends "externalItemTransactions-view"
  ? Pick<
      ExternalItemTransactions,
      | "id"
      | "category"
      | "job_MHE"
      | "session_time"
      | "external_Item"
      | "quotation_customer"
    >
  : V extends "externalItemTransactions-view_RequestForm"
  ? Pick<
      ExternalItemTransactions,
      | "id"
      | "category"
      | "job_MHE"
      | "session_time"
      | "external_Item"
      | "quotation_customer"
    >
  : never;
