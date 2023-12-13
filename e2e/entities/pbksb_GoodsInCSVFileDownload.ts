import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
export class GoodsInCSVFileDownload extends StandardEntity {
  static NAME = "pbksb_GoodsInCSVFileDownload";
  csvFileFormat?: FileDescriptor | null;
}
export type GoodsInCSVFileDownloadViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "goodsInCSVFileDownload-view";
export type GoodsInCSVFileDownloadView<
  V extends GoodsInCSVFileDownloadViewName
> = V extends "goodsInCSVFileDownload-view"
  ? Pick<GoodsInCSVFileDownload, "id" | "csvFileFormat">
  : never;
