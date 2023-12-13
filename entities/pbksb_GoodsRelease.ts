import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { Agent } from "./pbksb_Agent";
import { StatusGRNEnum } from "../enums/enums";
import { User } from "./base/sec$User";
import { InventoryItemOut } from "./pbksb_InventoryItemOut";
import { ReleaseDocument } from "./pbksb_ReleaseDocument";
export class GoodsRelease extends StandardEntity {
  static NAME = "pbksb_GoodsRelease";
  releaseNo?: any | null;
  customer?: Customer | null;
  agent?: Agent | null;
  requestorName?: string | null;
  requestorIC?: string | null;
  requestorPhone?: string | null;
  releaseDate?: any | null;
  outDate?: any | null;
  status?: StatusGRNEnum | null;
  mheRequestId?: string | null;
  endorseBy?: User | null;
  endorseDate?: any | null;
  canceledBy?: User | null;
  canceledDate?: any | null;
  lineItem?: InventoryItemOut[] | null;
  lineItemSaved?: boolean | null;
  document?: ReleaseDocument[] | null;
}
export type GoodsReleaseViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "goodsRelease-browse-view"
  | "goodsRelease-update-view"
  | "goodsRelease-view-rest";
export type GoodsReleaseView<V extends GoodsReleaseViewName> = V extends "_base"
  ? Pick<
      GoodsRelease,
      | "id"
      | "releaseNo"
      | "requestorName"
      | "requestorIC"
      | "requestorPhone"
      | "releaseDate"
      | "outDate"
      | "status"
      | "mheRequestId"
      | "endorseDate"
      | "canceledDate"
      | "lineItemSaved"
    >
  : V extends "_local"
  ? Pick<
      GoodsRelease,
      | "id"
      | "releaseNo"
      | "requestorName"
      | "requestorIC"
      | "requestorPhone"
      | "releaseDate"
      | "outDate"
      | "status"
      | "mheRequestId"
      | "endorseDate"
      | "canceledDate"
      | "lineItemSaved"
    >
  : V extends "goodsRelease-browse-view"
  ? Pick<
      GoodsRelease,
      | "id"
      | "releaseNo"
      | "requestorName"
      | "requestorIC"
      | "requestorPhone"
      | "releaseDate"
      | "outDate"
      | "status"
      | "mheRequestId"
      | "endorseDate"
      | "canceledDate"
      | "lineItemSaved"
      | "customer"
      | "agent"
    >
  : V extends "goodsRelease-update-view"
  ? Pick<
      GoodsRelease,
      | "id"
      | "releaseNo"
      | "requestorName"
      | "requestorIC"
      | "requestorPhone"
      | "releaseDate"
      | "outDate"
      | "status"
      | "mheRequestId"
      | "endorseDate"
      | "canceledDate"
      | "lineItemSaved"
      | "customer"
      | "agent"
      | "lineItem"
      | "document"
    >
  : V extends "goodsRelease-view-rest"
  ? Pick<
      GoodsRelease,
      | "id"
      | "releaseNo"
      | "requestorName"
      | "requestorIC"
      | "requestorPhone"
      | "releaseDate"
      | "outDate"
      | "status"
      | "mheRequestId"
      | "endorseDate"
      | "canceledDate"
      | "lineItemSaved"
      | "customer"
      | "agent"
      | "endorseBy"
      | "canceledBy"
      | "lineItem"
    >
  : never;
