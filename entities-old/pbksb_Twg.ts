import { StandardEntity } from "./base/sys$StandardEntity";
import { Customer } from "./pbksb_Customer";
import { CustomerUser } from "./pbksb_CustomerUser";
import { TwgEnum } from "../enums/enums";
import { TwgWasteDetails } from "./pbksb_TwgWasteDetails";
import { TwgFileUpload } from "./pbksb_TwgFileUpload";
import { TwgApprovedFileUpload } from "./pbksb_TwgApprovedFileUpload";
export class Twg extends StandardEntity {
  static NAME = "pbksb_Twg";
  customer?: Customer | null;
  requestBy?: CustomerUser | null;
  formNo?: string | null;
  status?: TwgEnum | null;
  factoryAddress?: string | null;
  phoneNo?: string | null;
  faxNo?: string | null;
  appointedCompany?: string | null;
  appCompanyAddress?: string | null;
  licenseNo?: string | null;
  remarks?: string | null;
  twgWasteList?: TwgWasteDetails[] | null;
  uploadedFile?: TwgFileUpload[] | null;
  submittedDate?: any | null;
  approvedFile?: TwgApprovedFileUpload[] | null;
}
export type TwgViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "twg-view"
  | "twgList-view";
export type TwgView<V extends TwgViewName> = V extends "_base"
  ? Pick<
      Twg,
      | "id"
      | "formNo"
      | "status"
      | "factoryAddress"
      | "phoneNo"
      | "faxNo"
      | "appointedCompany"
      | "appCompanyAddress"
      | "licenseNo"
      | "remarks"
      | "submittedDate"
    >
  : V extends "_local"
  ? Pick<
      Twg,
      | "id"
      | "formNo"
      | "status"
      | "factoryAddress"
      | "phoneNo"
      | "faxNo"
      | "appointedCompany"
      | "appCompanyAddress"
      | "licenseNo"
      | "remarks"
      | "submittedDate"
    >
  : V extends "twg-view"
  ? Pick<
      Twg,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "formNo"
      | "status"
      | "factoryAddress"
      | "phoneNo"
      | "faxNo"
      | "appointedCompany"
      | "appCompanyAddress"
      | "licenseNo"
      | "remarks"
      | "submittedDate"
      | "customer"
      | "requestBy"
      | "twgWasteList"
      | "uploadedFile"
      | "approvedFile"
    >
  : V extends "twgList-view"
  ? Pick<
      Twg,
      | "id"
      | "formNo"
      | "status"
      | "factoryAddress"
      | "phoneNo"
      | "faxNo"
      | "appointedCompany"
      | "appCompanyAddress"
      | "licenseNo"
      | "remarks"
      | "submittedDate"
      | "requestBy"
    >
  : never;
