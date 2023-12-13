import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { AccountStatusEnum, NewRequestEnum } from "../enums/enums";
export class AccountHistory extends StandardEntity {
  static NAME = "pbksb_AccountHistory";
  customer?: Customer | null;
  account_status?: AccountStatusEnum | null;
  new_request?: NewRequestEnum | null;
  reason?: string | null;
}
export type AccountHistoryViewName = "_base" | "_local" | "_minimal";
export type AccountHistoryView<
  V extends AccountHistoryViewName
> = V extends "_base"
  ? Pick<AccountHistory, "id" | "account_status" | "new_request" | "reason">
  : V extends "_local"
  ? Pick<AccountHistory, "id" | "account_status" | "new_request" | "reason">
  : never;
