import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { MachineryType } from "./pbksb_MachineryType";
import { Site } from "./pbksb_Site";
import { User } from "./base/sec$User";
export class Contract extends StandardEntity {
  static NAME = "pbksb_Contract";
  contract_number?: string | null;
  company?: Customer | null;
  date_start?: any | null;
  date_end?: any | null;
  item?: MachineryType | null;
  quantity?: number | null;
  location?: Site | null;
  specific_crew?: User | null;
  modified_by?: string | null;
  modified_date?: any | null;
  lumpSumValue?: any | null;
}
export type ContractViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "contract-view";
export type ContractView<V extends ContractViewName> = V extends "_base"
  ? Pick<
      Contract,
      | "id"
      | "contract_number"
      | "company"
      | "item"
      | "date_start"
      | "date_end"
      | "quantity"
      | "modified_by"
      | "modified_date"
      | "lumpSumValue"
    >
  : V extends "_local"
  ? Pick<
      Contract,
      | "id"
      | "contract_number"
      | "date_start"
      | "date_end"
      | "quantity"
      | "modified_by"
      | "modified_date"
      | "lumpSumValue"
    >
  : V extends "_minimal"
  ? Pick<Contract, "id" | "contract_number" | "company" | "item">
  : V extends "contract-view"
  ? Pick<
      Contract,
      | "id"
      | "contract_number"
      | "date_start"
      | "date_end"
      | "quantity"
      | "modified_by"
      | "modified_date"
      | "lumpSumValue"
      | "company"
      | "item"
      | "location"
      | "specific_crew"
    >
  : never;
