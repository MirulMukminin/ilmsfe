import { StandardEntity } from "./base/sys$StandardEntity";
import { Goods_IN } from "./pbksb_Goods_IN";
import {
  Good_Type,
  Category_Type,
  Transaction_Form_Type,
  Good_Category
} from "../enums/enums";
import { Site } from "./pbksb_Site";
import { Customer } from "./pbksb_Customer";
import { Good_Out_Issue } from "./pbksb_Issue_Out_Good";
import { Good_Out_Temp } from "./pbksb_Good_Out_Temp";
import { Good_Out_Return } from "./pbksb_Good_Out_Return";
import { Good_Transfer_Location } from "./pbksb_Good_Transfer_Location";
import { Good_Transfer_Ownership } from "./pbksb_Good_Transfer_Ownership";
import { Parts_Issue } from "./pbksb_Parts_Issue";
export class Good extends StandardEntity {
  static NAME = "pbksb_Good";
  good_in?: Goods_IN | null;
  good_type?: Good_Type | null;
  customs_code?: string | null;
  category_type?: Category_Type | null;
  description?: string | null;
  quantity?: any | null;
  current_quantity?: any | null;
  value?: any | null;
  uom?: string | null;
  location?: Site | null;
  transaction_form_type?: Transaction_Form_Type | null;
  status?: string | null;
  adjustment_quantity?: any | null;
  quantity_before_adjust?: any | null;
  adjustBy?: string | null;
  adjustDateTime?: any | null;
  adjust_approve_by?: string | null;
  adjust_approveDateTime?: any | null;
  parent_id?: string | null;
  transaction_form_id?: string | null;
  customer?: Customer | null;
  category?: Good_Category | null;
  issue_out?: Good_Out_Issue[] | null;
  temp_out?: Good_Out_Temp[] | null;
  return_good?: Good_Out_Return[] | null;
  transfer_location?: Good_Transfer_Location[] | null;
  transfer_ownership?: Good_Transfer_Ownership[] | null;
  build_part_issue?: Parts_Issue[] | null;
  totalValue?: any | null;
  totalValueGoodIn?: any | null;
}
export type GoodViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "good-view"
  | "good-view-CUBA_Temporary"
  | "good-view-Inventory-Adjustment"
  | "good-view_CUBA"
  | "good-view_CUBA_Browser"
  | "good-view_agent_out_return_View"
  | "good-view_kastam"
  | "goodin_agent-browseView"
  | "goodin_agent-editView";
export type GoodView<V extends GoodViewName> = V extends "_base"
  ? Pick<
      Good,
      | "id"
      | "description"
      | "good_type"
      | "customs_code"
      | "category_type"
      | "quantity"
      | "current_quantity"
      | "value"
      | "uom"
      | "transaction_form_type"
      | "status"
      | "adjustment_quantity"
      | "quantity_before_adjust"
      | "adjustBy"
      | "adjustDateTime"
      | "adjust_approve_by"
      | "adjust_approveDateTime"
      | "parent_id"
      | "transaction_form_id"
      | "category"
      | "totalValue"
      | "totalValueGoodIn"
    >
  : V extends "_local"
  ? Pick<
      Good,
      | "id"
      | "good_type"
      | "customs_code"
      | "category_type"
      | "description"
      | "quantity"
      | "current_quantity"
      | "value"
      | "uom"
      | "transaction_form_type"
      | "status"
      | "adjustment_quantity"
      | "quantity_before_adjust"
      | "adjustBy"
      | "adjustDateTime"
      | "adjust_approve_by"
      | "adjust_approveDateTime"
      | "parent_id"
      | "transaction_form_id"
      | "category"
      | "totalValue"
      | "totalValueGoodIn"
    >
  : V extends "_minimal"
  ? Pick<Good, "id" | "description">
  : V extends "good-view"
  ? Pick<
      Good,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "good_type"
      | "customs_code"
      | "category_type"
      | "description"
      | "quantity"
      | "current_quantity"
      | "value"
      | "uom"
      | "transaction_form_type"
      | "status"
      | "adjustment_quantity"
      | "quantity_before_adjust"
      | "adjustBy"
      | "adjustDateTime"
      | "adjust_approve_by"
      | "adjust_approveDateTime"
      | "parent_id"
      | "transaction_form_id"
      | "category"
      | "totalValue"
      | "totalValueGoodIn"
      | "good_in"
      | "location"
    >
  : V extends "good-view-CUBA_Temporary"
  ? Pick<
      Good,
      | "id"
      | "good_type"
      | "customs_code"
      | "category_type"
      | "description"
      | "quantity"
      | "current_quantity"
      | "value"
      | "uom"
      | "transaction_form_type"
      | "status"
      | "adjustment_quantity"
      | "quantity_before_adjust"
      | "adjustBy"
      | "adjustDateTime"
      | "adjust_approve_by"
      | "adjust_approveDateTime"
      | "parent_id"
      | "transaction_form_id"
      | "category"
      | "totalValue"
      | "totalValueGoodIn"
      | "good_in"
      | "location"
      | "customer"
    >
  : V extends "good-view-Inventory-Adjustment"
  ? Pick<
      Good,
      | "id"
      | "good_type"
      | "customs_code"
      | "category_type"
      | "description"
      | "quantity"
      | "current_quantity"
      | "value"
      | "uom"
      | "transaction_form_type"
      | "status"
      | "adjustment_quantity"
      | "quantity_before_adjust"
      | "adjustBy"
      | "adjustDateTime"
      | "adjust_approve_by"
      | "adjust_approveDateTime"
      | "parent_id"
      | "transaction_form_id"
      | "category"
      | "totalValue"
      | "totalValueGoodIn"
      | "good_in"
      | "location"
    >
  : V extends "good-view_CUBA"
  ? Pick<
      Good,
      | "id"
      | "good_type"
      | "customs_code"
      | "category_type"
      | "description"
      | "quantity"
      | "current_quantity"
      | "value"
      | "uom"
      | "transaction_form_type"
      | "status"
      | "adjustment_quantity"
      | "quantity_before_adjust"
      | "adjustBy"
      | "adjustDateTime"
      | "adjust_approve_by"
      | "adjust_approveDateTime"
      | "parent_id"
      | "transaction_form_id"
      | "category"
      | "totalValue"
      | "totalValueGoodIn"
      | "good_in"
    >
  : V extends "good-view_CUBA_Browser"
  ? Pick<
      Good,
      | "id"
      | "good_type"
      | "customs_code"
      | "category_type"
      | "description"
      | "quantity"
      | "current_quantity"
      | "value"
      | "uom"
      | "transaction_form_type"
      | "status"
      | "adjustment_quantity"
      | "quantity_before_adjust"
      | "adjustBy"
      | "adjustDateTime"
      | "adjust_approve_by"
      | "adjust_approveDateTime"
      | "parent_id"
      | "transaction_form_id"
      | "category"
      | "totalValue"
      | "totalValueGoodIn"
      | "good_in"
      | "location"
      | "customer"
    >
  : V extends "good-view_agent_out_return_View"
  ? Pick<
      Good,
      | "id"
      | "good_type"
      | "customs_code"
      | "category_type"
      | "description"
      | "quantity"
      | "current_quantity"
      | "value"
      | "uom"
      | "transaction_form_type"
      | "status"
      | "adjustment_quantity"
      | "quantity_before_adjust"
      | "adjustBy"
      | "adjustDateTime"
      | "adjust_approve_by"
      | "adjust_approveDateTime"
      | "parent_id"
      | "transaction_form_id"
      | "category"
      | "totalValue"
      | "totalValueGoodIn"
      | "good_in"
      | "location"
    >
  : V extends "good-view_kastam"
  ? Pick<
      Good,
      | "id"
      | "good_type"
      | "customs_code"
      | "category_type"
      | "description"
      | "quantity"
      | "current_quantity"
      | "value"
      | "uom"
      | "transaction_form_type"
      | "status"
      | "adjustment_quantity"
      | "quantity_before_adjust"
      | "adjustBy"
      | "adjustDateTime"
      | "adjust_approve_by"
      | "adjust_approveDateTime"
      | "parent_id"
      | "transaction_form_id"
      | "category"
      | "totalValue"
      | "totalValueGoodIn"
      | "good_in"
    >
  : V extends "goodin_agent-browseView"
  ? Pick<Good, "id" | "good_in">
  : V extends "goodin_agent-editView"
  ? Pick<
      Good,
      | "id"
      | "good_in"
      | "good_type"
      | "description"
      | "quantity"
      | "value"
      | "uom"
      | "totalValue"
      | "category_type"
      | "location"
      | "customs_code"
      | "customer"
      | "transaction_form_type"
      | "status"
      | "adjustment_quantity"
      | "adjustBy"
      | "adjustDateTime"
      | "parent_id"
      | "transaction_form_id"
      | "current_quantity"
      | "category"
    >
  : never;
