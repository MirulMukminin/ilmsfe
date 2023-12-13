import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { RequestStorageStatusEnum } from "../enums/enums";
import { User } from "./base/sec$User";
import { AdditionServiceLineItem } from "./pbksb_AdditionServiceLineItem";
export class AdditionalService extends StandardEntity {
  static NAME = "pbksb_AdditionalService";
  docketNo?: any | null;
  customer?: Customer | null;
  requestDate?: any | null;
  status?: RequestStorageStatusEnum | null;
  lineItemSaved?: boolean | null;
  endorsedBy?: User | null;
  lineItem?: AdditionServiceLineItem[] | null;
}
export type AdditionalServiceViewName = "_base" | "_local" | "_minimal";
export type AdditionalServiceView<
  V extends AdditionalServiceViewName
> = V extends "_base"
  ? Pick<
      AdditionalService,
      | "id"
      | "docketNo"
      | "requestDate"
      | "status"
      | "lineItemSaved"
      | "endorsedDate"
    >
  : V extends "_local"
  ? Pick<
      AdditionalService,
      | "id"
      | "docketNo"
      | "requestDate"
      | "status"
      | "lineItemSaved"
      | "endorsedDate"
    >
  : V extends "_minimal"
  ? Pick<AdditionalService, "id" | "docketNo">
  : never;
