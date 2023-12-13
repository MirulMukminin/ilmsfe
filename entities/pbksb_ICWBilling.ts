import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { ICWBillingTypeEnum, ICWBillingStatusEnum } from "../enums/enums";
import { Job } from "./pbksb_Job";
export class ICWBilling extends StandardEntity {
  static NAME = "pbksb_ICWBilling";
  billNo?: any | null;
  customer?: Customer | null;
  type?: ICWBillingTypeEnum | null;
  job?: Job | null;
  startDate?: any | null;
  storageStartDate?: any | null;
  storageEndDate?: any | null;
  status?: ICWBillingStatusEnum | null;
  perLine?: string | null;
}
export type ICWBillingViewName = "_base" | "_local" | "_minimal";
export type ICWBillingView<V extends ICWBillingViewName> = V extends "_base"
  ? Pick<
      ICWBilling,
      | "id"
      | "billNo"
      | "type"
      | "startDate"
      | "storageStartDate"
      | "storageEndDate"
      | "status"
      | "perLine"
    >
  : V extends "_local"
  ? Pick<
      ICWBilling,
      | "id"
      | "billNo"
      | "type"
      | "startDate"
      | "storageStartDate"
      | "storageEndDate"
      | "status"
      | "perLine"
    >
  : never;
