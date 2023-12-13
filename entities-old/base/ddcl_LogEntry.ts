import { StandardEntity } from "./sys$StandardEntity";
import { LogLevel } from "./ddcl_LogLevel";
import { LogEntryCategory } from "./ddcl_LogEntryCategory";
export class LogEntry extends StandardEntity {
  static NAME = "ddcl_LogEntry";
  message?: string | null;
  detailedMessage?: string | null;
  loggable?: any | null;
  level?: LogLevel | null;
  category?: LogEntryCategory | null;
}
export type LogEntryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "logEntry-view";
export type LogEntryView<V extends LogEntryViewName> = V extends "_base"
  ? Pick<LogEntry, "id" | "message" | "detailedMessage" | "loggable">
  : V extends "_local"
  ? Pick<LogEntry, "id" | "message" | "detailedMessage" | "loggable">
  : V extends "_minimal"
  ? Pick<LogEntry, "id" | "message">
  : V extends "logEntry-view"
  ? Pick<
      LogEntry,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "message"
      | "detailedMessage"
      | "loggable"
      | "level"
      | "category"
    >
  : never;
