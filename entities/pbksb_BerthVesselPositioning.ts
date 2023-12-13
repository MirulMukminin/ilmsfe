import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthForm } from "./pbksb_BerthForm";
export class BerthVesselPositioning extends StandardEntity {
  static NAME = "pbksb_BerthVesselPositioning";
  index?: number | null;
  berth_10?: BerthForm | null;
  berth_11?: BerthForm | null;
  berth_12?: BerthForm | null;
  berth_13?: BerthForm | null;
  berth_14?: BerthForm | null;
  berth_21?: BerthForm | null;
  berth_22?: BerthForm | null;
  berth_23?: BerthForm | null;
  berth_24?: BerthForm | null;
  berth_25?: BerthForm | null;
  berth_31?: BerthForm | null;
  berth_32?: BerthForm | null;
  berth_33?: BerthForm | null;
  berth_34?: BerthForm | null;
  berth_35?: BerthForm | null;
  berth_41?: BerthForm | null;
  berth_42?: BerthForm | null;
  berth_43?: BerthForm | null;
  berth_44?: BerthForm | null;
  berth_45?: BerthForm | null;
  berth_51?: BerthForm | null;
  berth_52?: BerthForm | null;
  berth_53?: BerthForm | null;
  berth_54?: BerthForm | null;
  berth_55?: BerthForm | null;
  berth_56?: BerthForm | null;
  berth_61?: BerthForm | null;
  berth_62?: BerthForm | null;
  berth_63?: BerthForm | null;
  berth_64?: BerthForm | null;
  berth_65?: BerthForm | null;
  berth_71?: BerthForm | null;
  berth_72?: BerthForm | null;
  berth_73?: BerthForm | null;
  berth_74?: BerthForm | null;
  berth_75?: BerthForm | null;
  berth_ww10?: BerthForm | null;
  berth_ww11?: BerthForm | null;
  berth_ww12?: BerthForm | null;
  berth_ww13?: BerthForm | null;
  berth_ww14?: BerthForm | null;
  berth_ww15?: BerthForm | null;
  berth_ww16?: BerthForm | null;
  berth_ww21?: BerthForm | null;
  berth_ww22?: BerthForm | null;
  berth_ww23?: BerthForm | null;
  berth_ww24?: BerthForm | null;
  berth_ww25?: BerthForm | null;
  berth_ww26?: BerthForm | null;
  berth_ww31?: BerthForm | null;
  berth_ww32?: BerthForm | null;
  berth_ww33?: BerthForm | null;
  berth_ww34?: BerthForm | null;
  berth_ww41?: BerthForm | null;
  berth_ww42?: BerthForm | null;
  berth_ww43?: BerthForm | null;
  berth_ww44?: BerthForm | null;
  berth_ktsb?: BerthForm | null;
  berth_ktsb1?: BerthForm | null;
  berth_ktsb2?: BerthForm | null;
  berth_ktsb3?: BerthForm | null;
  berth_ktsb4?: BerthForm | null;
  time?: any | null;
  bank_no?: number | null;
}
export type BerthVesselPositioningViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "berthVesselPositioning-view";
export type BerthVesselPositioningView<
  V extends BerthVesselPositioningViewName
> = V extends "_base"
  ? Pick<BerthVesselPositioning, "id" | "index" | "time" | "bank_no">
  : V extends "_local"
  ? Pick<BerthVesselPositioning, "id" | "index" | "time" | "bank_no">
  : V extends "berthVesselPositioning-view"
  ? Pick<
      BerthVesselPositioning,
      | "id"
      | "index"
      | "time"
      | "bank_no"
      | "berth_11"
      | "berth_12"
      | "berth_13"
      | "berth_14"
      | "berth_21"
      | "berth_22"
      | "berth_23"
      | "berth_24"
      | "berth_25"
      | "berth_31"
      | "berth_32"
      | "berth_33"
      | "berth_34"
      | "berth_35"
      | "berth_41"
      | "berth_42"
      | "berth_43"
      | "berth_44"
      | "berth_45"
      | "berth_51"
      | "berth_52"
      | "berth_53"
      | "berth_54"
      | "berth_55"
      | "berth_56"
      | "berth_61"
      | "berth_62"
      | "berth_63"
      | "berth_64"
      | "berth_65"
      | "berth_71"
      | "berth_72"
      | "berth_73"
      | "berth_74"
      | "berth_75"
      | "berth_ww10"
      | "berth_ww11"
      | "berth_ww12"
      | "berth_ww13"
      | "berth_ww14"
      | "berth_ww15"
      | "berth_ww16"
      | "berth_ww21"
      | "berth_ww22"
      | "berth_ww23"
      | "berth_ww24"
      | "berth_ww25"
      | "berth_ww26"
      | "berth_ww31"
      | "berth_ww32"
      | "berth_ww33"
      | "berth_ww34"
      | "berth_ww41"
      | "berth_ww42"
      | "berth_ww43"
      | "berth_ww44"
      | "berth_ktsb"
      | "berth_ktsb1"
      | "berth_ktsb2"
      | "berth_ktsb3"
      | "berth_ktsb4"
      | "berth_10"
    >
  : never;
