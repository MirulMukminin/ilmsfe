import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { CustomerUser } from "./pbksb_CustomerUser";
import { WasteDisposalType, WasteDisposalEnum } from "../enums/enums";
import { Site } from "./pbksb_Site";
import { WasteDisposalSkid } from "./pbksb_WasteDisposalSkid";
export class WasteDisposal extends StandardEntity {
  static NAME = "pbksb_WasteDisposal";
  customer?: Customer | null;
  requestedBy?: CustomerUser | null;
  type?: WasteDisposalType | null;
  locked?: boolean | null;
  jobNo?: string | null;
  location?: Site | null;
  returnTo?: Site | null;
  status?: WasteDisposalEnum | null;
  startDate?: any | null;
  storageStart?: any | null;
  storageEnd?: any | null;
  skidList?: WasteDisposalSkid[] | null;
  cancelDate?: any | null;
  cancelledBy?: string | null;
  endorsedBy?: string | null;
  endorsedDate?: any | null;
}
export type WasteDisposalViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "wasteDisposal-view"
  | "wasteDisposal-view-json";
export type WasteDisposalView<
  V extends WasteDisposalViewName
> = V extends "_base"
  ? Pick<
      WasteDisposal,
      | "id"
      | "type"
      | "locked"
      | "jobNo"
      | "status"
      | "startDate"
      | "storageStart"
      | "storageEnd"
      | "cancelDate"
      | "cancelledBy"
      | "endorsedBy"
      | "endorsedDate"
    >
  : V extends "_local"
  ? Pick<
      WasteDisposal,
      | "id"
      | "type"
      | "locked"
      | "jobNo"
      | "status"
      | "startDate"
      | "storageStart"
      | "storageEnd"
      | "cancelDate"
      | "cancelledBy"
      | "endorsedBy"
      | "endorsedDate"
    >
  : V extends "wasteDisposal-view"
  ? Pick<
      WasteDisposal,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "type"
      | "locked"
      | "jobNo"
      | "status"
      | "startDate"
      | "storageStart"
      | "storageEnd"
      | "cancelDate"
      | "cancelledBy"
      | "endorsedBy"
      | "endorsedDate"
      | "customer"
      | "skidList"
      | "requestedBy"
      | "location"
      | "returnTo"
    >
  : V extends "wasteDisposal-view-json"
  ? Pick<
      WasteDisposal,
      | "id"
      | "type"
      | "locked"
      | "jobNo"
      | "status"
      | "startDate"
      | "storageStart"
      | "storageEnd"
      | "cancelDate"
      | "cancelledBy"
      | "endorsedBy"
      | "endorsedDate"
      | "location"
      | "returnTo"
    >
  : never;
