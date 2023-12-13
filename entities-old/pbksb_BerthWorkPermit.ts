import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
import { MarineStatus, WorkPermitItem } from "../enums/enums";
export class BerthWorkPermit extends StandardEntity {
  static NAME = "pbksb_BerthWorkPermit";
  berth_form?: BerthForm | null;
  status?: MarineStatus | null;
  item?: WorkPermitItem | null;
  indicator?: boolean | null;
}
export type BerthWorkPermitViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthWorkPermitAPI-view"
  | "berthWorkPermit_Summary-view";
export type BerthWorkPermitView<
  V extends BerthWorkPermitViewName
> = V extends "_base"
  ? Pick<BerthWorkPermit, "id" | "status" | "item" | "indicator">
  : V extends "_local"
  ? Pick<BerthWorkPermit, "id" | "status" | "item" | "indicator">
  : V extends "berthWorkPermitAPI-view"
  ? Pick<BerthWorkPermit, "id" | "status" | "item" | "indicator" | "berth_form">
  : V extends "berthWorkPermit_Summary-view"
  ? Pick<
      BerthWorkPermit,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "status"
      | "item"
      | "indicator"
    >
  : never;
