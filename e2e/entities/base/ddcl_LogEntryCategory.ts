import { StandardEntity } from "./sys$StandardEntity";
export class LogEntryCategory extends StandardEntity {
  static NAME = "ddcl_LogEntryCategory";
  name?: string | null;
  code?: string | null;
}
export type LogEntryCategoryViewName = "_base" | "_local" | "_minimal";
export type LogEntryCategoryView<
  V extends LogEntryCategoryViewName
> = V extends "_base"
  ? Pick<LogEntryCategory, "id" | "name" | "code">
  : V extends "_local"
  ? Pick<LogEntryCategory, "id" | "name" | "code">
  : V extends "_minimal"
  ? Pick<LogEntryCategory, "id" | "name">
  : never;
