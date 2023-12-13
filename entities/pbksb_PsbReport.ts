import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { Customer } from "./pbksb_Customer";
import { DocumentTypeEnum, DocumentStatus } from "../enums/enums";
export class PsbReport extends StandardEntity {
  static NAME = "pbksb_PsbReport";
  file?: FileDescriptor | null;
  fromDate?: any | null;
  toDate?: any | null;
  customer?: Customer | null;
  fileName?: string | null;
  documentType?: DocumentTypeEnum | null;
  documentStatus?: DocumentStatus | null;
  lastPrintDate?: any | null;
}
export type PsbReportViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "psbReport-view";
export type PsbReportView<V extends PsbReportViewName> = V extends "_base"
  ? Pick<
      PsbReport,
      | "id"
      | "fromDate"
      | "toDate"
      | "fileName"
      | "documentType"
      | "documentStatus"
      | "lastPrintDate"
    >
  : V extends "_local"
  ? Pick<
      PsbReport,
      | "id"
      | "fromDate"
      | "toDate"
      | "fileName"
      | "documentType"
      | "documentStatus"
      | "lastPrintDate"
    >
  : V extends "psbReport-view"
  ? Pick<
      PsbReport,
      | "id"
      | "fromDate"
      | "toDate"
      | "fileName"
      | "documentType"
      | "documentStatus"
      | "lastPrintDate"
      | "file"
      | "customer"
    >
  : never;
