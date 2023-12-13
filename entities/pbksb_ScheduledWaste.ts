import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { CustomerUser } from "./pbksb_CustomerUser";
import { ScheduledWasteType, ScheduledWasteEnum } from "../enums/enums";
import { Site } from "./pbksb_Site";
import { Job_MHE } from "./pbksb_Job_MHE";
import { InboundWasteDetails } from "./pbksb_InboundWasteDetails";
import { OutboundWasteDetails } from "./pbksb_OutboundWasteDetails";
import { ScheduledWasteStorage } from "./pbksb_ScheduledWasteStorage";
import { InboundSoFileUpload } from "./pbksb_InboundSoFileUpload";
import { OutboundContractor } from "./pbksb_OutboundContractor";
export class ScheduledWaste extends StandardEntity {
  static NAME = "pbksb_ScheduledWaste";
  customer?: Customer | null;
  driverIc?: string | null;
  requestedBy?: CustomerUser | null;
  requestOnBehalf?: Customer | null;
  type?: ScheduledWasteType | null;
  jobNo?: string | null;
  status?: ScheduledWasteEnum | null;
  collection?: boolean | null;
  jobDescription?: string | null;
  poNumber?: string | null;
  bookingDate?: any | null;
  remark?: string | null;
  oddSize?: boolean | null;
  oddSizeRemark?: string | null;
  referenceNo?: string | null;
  additionalService?: boolean | null;
  totalPackaging?: number | null;
  totalPalette?: number | null;
  receiveRepName?: string | null;
  receiveRepDsgtn?: string | null;
  approveRepName?: string | null;
  approveRepDsgtn?: string | null;
  totalWeight?: any | null;
  location?: Site | null;
  driverName?: string | null;
  vehicleNo?: string | null;
  mheJobNo?: Job_MHE | null;
  formNo?: string | null;
  inboundWasteList?: InboundWasteDetails[] | null;
  dateOfService?: any | null;
  outboundWasteList?: OutboundWasteDetails[] | null;
  collectionDesc?: string | null;
  returnSkid?: boolean | null;
  repackingFrom?: boolean | null;
  newPackMaterial?: boolean | null;
  packingPalletStrapping?: boolean | null;
  drumCrushing?: boolean | null;
  oddSizeDesc?: string | null;
  additionalServiceDesc?: string | null;
  scheduledWasteStorageList?: ScheduledWasteStorage[] | null;
  startAdditionalServices?: boolean | null;
  offsiteStorage?: boolean | null;
  offsiteStorageQuantity?: number | null;
  inboundFileUploadList?: InboundSoFileUpload[] | null;
  outboundContractorList?: OutboundContractor[] | null;
}
export type ScheduledWasteViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "scheduledWaste-list-view"
  | "scheduledWaste-outbound-view"
  | "scheduledWaste-view";
export type ScheduledWasteView<
  V extends ScheduledWasteViewName
> = V extends "_base"
  ? Pick<
      ScheduledWaste,
      | "id"
      | "driverIc"
      | "type"
      | "jobNo"
      | "status"
      | "collection"
      | "jobDescription"
      | "poNumber"
      | "bookingDate"
      | "remark"
      | "oddSize"
      | "oddSizeRemark"
      | "referenceNo"
      | "additionalService"
      | "totalPackaging"
      | "totalPalette"
      | "receiveRepName"
      | "receiveRepDsgtn"
      | "approveRepName"
      | "approveRepDsgtn"
      | "totalWeight"
      | "driverName"
      | "vehicleNo"
      | "formNo"
      | "dateOfService"
      | "returnSkid"
      | "repackingFrom"
      | "newPackMaterial"
      | "packingPalletStrapping"
      | "drumCrushing"
      | "startAdditionalServices"
      | "offsiteStorage"
      | "offsiteStorageQuantity"
    >
  : V extends "_local"
  ? Pick<
      ScheduledWaste,
      | "id"
      | "driverIc"
      | "type"
      | "jobNo"
      | "status"
      | "collection"
      | "jobDescription"
      | "poNumber"
      | "bookingDate"
      | "remark"
      | "oddSize"
      | "oddSizeRemark"
      | "referenceNo"
      | "additionalService"
      | "totalPackaging"
      | "totalPalette"
      | "receiveRepName"
      | "receiveRepDsgtn"
      | "approveRepName"
      | "approveRepDsgtn"
      | "totalWeight"
      | "driverName"
      | "vehicleNo"
      | "formNo"
      | "dateOfService"
      | "returnSkid"
      | "repackingFrom"
      | "newPackMaterial"
      | "packingPalletStrapping"
      | "drumCrushing"
      | "startAdditionalServices"
      | "offsiteStorage"
      | "offsiteStorageQuantity"
    >
  : V extends "scheduledWaste-list-view"
  ? Pick<
      ScheduledWaste,
      | "id"
      | "driverIc"
      | "type"
      | "jobNo"
      | "status"
      | "collection"
      | "jobDescription"
      | "poNumber"
      | "bookingDate"
      | "remark"
      | "oddSize"
      | "oddSizeRemark"
      | "referenceNo"
      | "additionalService"
      | "totalPackaging"
      | "totalPalette"
      | "receiveRepName"
      | "receiveRepDsgtn"
      | "approveRepName"
      | "approveRepDsgtn"
      | "totalWeight"
      | "driverName"
      | "vehicleNo"
      | "formNo"
      | "dateOfService"
      | "returnSkid"
      | "repackingFrom"
      | "newPackMaterial"
      | "packingPalletStrapping"
      | "drumCrushing"
      | "startAdditionalServices"
      | "offsiteStorage"
      | "offsiteStorageQuantity"
      | "customer"
    >
  : V extends "scheduledWaste-outbound-view"
  ? Pick<
      ScheduledWaste,
      | "id"
      | "driverIc"
      | "type"
      | "jobNo"
      | "status"
      | "collection"
      | "jobDescription"
      | "poNumber"
      | "bookingDate"
      | "remark"
      | "oddSize"
      | "oddSizeRemark"
      | "referenceNo"
      | "additionalService"
      | "totalPackaging"
      | "totalPalette"
      | "receiveRepName"
      | "receiveRepDsgtn"
      | "approveRepName"
      | "approveRepDsgtn"
      | "totalWeight"
      | "driverName"
      | "vehicleNo"
      | "formNo"
      | "dateOfService"
      | "returnSkid"
      | "repackingFrom"
      | "newPackMaterial"
      | "packingPalletStrapping"
      | "drumCrushing"
      | "startAdditionalServices"
      | "offsiteStorage"
      | "offsiteStorageQuantity"
      | "customer"
      | "requestedBy"
      | "requestOnBehalf"
      | "outboundWasteList"
    >
  : V extends "scheduledWaste-view"
  ? Pick<
      ScheduledWaste,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "driverIc"
      | "type"
      | "jobNo"
      | "status"
      | "collection"
      | "jobDescription"
      | "poNumber"
      | "bookingDate"
      | "remark"
      | "oddSize"
      | "oddSizeRemark"
      | "referenceNo"
      | "additionalService"
      | "totalPackaging"
      | "totalPalette"
      | "receiveRepName"
      | "receiveRepDsgtn"
      | "approveRepName"
      | "approveRepDsgtn"
      | "totalWeight"
      | "driverName"
      | "vehicleNo"
      | "formNo"
      | "dateOfService"
      | "returnSkid"
      | "repackingFrom"
      | "newPackMaterial"
      | "packingPalletStrapping"
      | "drumCrushing"
      | "startAdditionalServices"
      | "offsiteStorage"
      | "offsiteStorageQuantity"
      | "mheJobNo"
      | "customer"
      | "requestedBy"
      | "requestOnBehalf"
      | "inboundWasteList"
      | "inboundFileUploadList"
      | "outboundContractorList"
    >
  : never;
