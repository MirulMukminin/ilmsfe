import { StandardEntity } from "./base/sys$StandardEntity";
import { Requestform } from "./pbksb_Requestform";
import { Job_MHE } from "./pbksb_Job_MHE";
import { CustomerUser } from "./pbksb_CustomerUser";
export class MheEndorserMap extends StandardEntity {
  static NAME = "pbksb_MheEndorserMap";
  mheRequestId?: Requestform | null;
  job_MHE?: Job_MHE | null;
  customerUser?: CustomerUser | null;
  date?: any | null;
}
export type MheEndorserMapViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "mheEndorserMap-view";
export type MheEndorserMapView<
  V extends MheEndorserMapViewName
> = V extends "_base"
  ? Pick<MheEndorserMap, "id" | "date">
  : V extends "_local"
  ? Pick<MheEndorserMap, "id" | "date">
  : V extends "mheEndorserMap-view"
  ? Pick<
      MheEndorserMap,
      "id" | "customerUser" | "job_MHE" | "mheRequestId" | "date"
    >
  : never;
