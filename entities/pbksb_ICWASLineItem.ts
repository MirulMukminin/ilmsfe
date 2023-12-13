import { StandardEntity } from "./base/sys$StandardEntity";
import { InventoryICW } from "./pbksb_InventoryICW";
import { ChemicalType } from "./pbksb_ChemicalType";
import { Customer } from "./pbksb_Customer";
import { ICWServiceTypeEnum, ICWCollectReturn } from "../enums/enums";
import { ChemicalUOM } from "./pbksb_ChemicalUOM";
import { User } from "./base/sec$User";
import { ICWAS } from "./pbksb_ICWAS";
export class ICWASLineItem extends StandardEntity {
  static NAME = "pbksb_ICWASLineItem";
  item?: InventoryICW | null;
  chemicalType?: ChemicalType | null;
  chemicalToAct?: string | null;
  customer?: Customer | null;
  serviceType?: ICWServiceTypeEnum | null;
  inputUOM?: ChemicalUOM | null;
  inputQty?: number | null;
  outputUOM?: ChemicalUOM | null;
  outputQty?: number | null;
  containerSupply?: string | null;
  remarks?: string | null;
  collectReturn?: ICWCollectReturn | null;
  transferToOffshore?: boolean | null;
  contentsQty?: any | null;
  contentsQtyUnit?: string | null;
  isCompleted?: boolean | null;
  user?: User | null;
  iCWAS?: ICWAS | null;
}
export type ICWASLineItemViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "iCWASLineItem-upate";
export type ICWASLineItemView<
  V extends ICWASLineItemViewName
> = V extends "_base"
  ? Pick<
      ICWASLineItem,
      | "id"
      | "chemicalToAct"
      | "serviceType"
      | "inputQty"
      | "outputQty"
      | "containerSupply"
      | "remarks"
      | "collectReturn"
      | "transferToOffshore"
      | "contentsQty"
      | "contentsQtyUnit"
      | "isCompleted"
    >
  : V extends "_local"
  ? Pick<
      ICWASLineItem,
      | "id"
      | "chemicalToAct"
      | "serviceType"
      | "inputQty"
      | "outputQty"
      | "containerSupply"
      | "remarks"
      | "collectReturn"
      | "transferToOffshore"
      | "contentsQty"
      | "contentsQtyUnit"
      | "isCompleted"
    >
  : V extends "iCWASLineItem-upate"
  ? Pick<
      ICWASLineItem,
      | "id"
      | "chemicalToAct"
      | "serviceType"
      | "inputQty"
      | "outputQty"
      | "containerSupply"
      | "remarks"
      | "collectReturn"
      | "transferToOffshore"
      | "contentsQty"
      | "contentsQtyUnit"
      | "isCompleted"
      | "item"
      | "customer"
      | "inputUOM"
      | "outputUOM"
      | "user"
      | "iCWAS"
    >
  : never;
