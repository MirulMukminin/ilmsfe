import { StandardEntity } from "./base/sys$StandardEntity";
import { InventoryICW } from "./pbksb_InventoryICW";
import { ICWServiceTypeEnum, ICWCollectReturn } from "../enums/enums";
import { ChemicalUOM } from "./pbksb_ChemicalUOM";
import { AdditionalService } from "./pbksb_AdditionalService";
export class AdditionServiceLineItem extends StandardEntity {
  static NAME = "pbksb_AdditionServiceLineItem";
  item?: InventoryICW | null;
  serviceType?: ICWServiceTypeEnum | null;
  inputUOM?: ChemicalUOM | null;
  inputQty?: number | null;
  outputUOM?: ChemicalUOM | null;
  outputQty?: number | null;
  containerSupply?: string | null;
  remarks?: string | null;
  collectReturn?: ICWCollectReturn | null;
  additionalService?: AdditionalService | null;
}
export type AdditionServiceLineItemViewName = "_base" | "_local" | "_minimal";
export type AdditionServiceLineItemView<
  V extends AdditionServiceLineItemViewName
> = V extends "_base"
  ? Pick<
      AdditionServiceLineItem,
      | "id"
      | "item"
      | "inputQty"
      | "inputUOM"
      | "outputQty"
      | "outputUOM"
      | "serviceType"
      | "containerSupply"
      | "remarks"
      | "collectReturn"
    >
  : V extends "_local"
  ? Pick<
      AdditionServiceLineItem,
      | "id"
      | "serviceType"
      | "inputQty"
      | "outputQty"
      | "containerSupply"
      | "remarks"
      | "collectReturn"
    >
  : V extends "_minimal"
  ? Pick<
      AdditionServiceLineItem,
      "id" | "item" | "inputQty" | "inputUOM" | "outputQty" | "outputUOM"
    >
  : never;
