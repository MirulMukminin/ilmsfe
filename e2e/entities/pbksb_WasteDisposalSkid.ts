import { StandardEntity } from "./base/sys$StandardEntity";
import { WasteDisposal } from "./pbksb_WasteDisposal";
export class WasteDisposalSkid extends StandardEntity {
  static NAME = "pbksb_WasteDisposalSkid";
  skidId?: string | null;
  wasteDisposal?: WasteDisposal | null;
  checked?: boolean | null;
  oddSize?: boolean | null;
  advancedCleaning?: boolean | null;
  remarks?: string | null;
  skidReturned?: boolean | null;
  returnDate?: any | null;
  customerRep?: string | null;
  normalSize?: boolean | null;
  normalCleaning?: boolean | null;
}
export type WasteDisposalSkidViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "wasteDisposalSkid-view";
export type WasteDisposalSkidView<
  V extends WasteDisposalSkidViewName
> = V extends "_base"
  ? Pick<
      WasteDisposalSkid,
      | "id"
      | "skidId"
      | "checked"
      | "oddSize"
      | "advancedCleaning"
      | "remarks"
      | "skidReturned"
      | "returnDate"
      | "customerRep"
    >
  : V extends "_local"
  ? Pick<
      WasteDisposalSkid,
      | "id"
      | "skidId"
      | "checked"
      | "oddSize"
      | "advancedCleaning"
      | "remarks"
      | "skidReturned"
      | "returnDate"
      | "customerRep"
    >
  : V extends "wasteDisposalSkid-view"
  ? Pick<
      WasteDisposalSkid,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "skidId"
      | "checked"
      | "oddSize"
      | "advancedCleaning"
      | "remarks"
      | "skidReturned"
      | "returnDate"
      | "customerRep"
      | "wasteDisposal"
    >
  : never;
