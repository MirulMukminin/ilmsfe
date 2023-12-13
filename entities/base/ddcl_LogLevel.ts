import { StandardEntity } from "./sys$StandardEntity";
export class LogLevel extends StandardEntity {
  static NAME = "ddcl_LogLevel";
  name?: string | null;
  code?: string | null;
}
export type LogLevelViewName = "_base" | "_local" | "_minimal";
export type LogLevelView<V extends LogLevelViewName> = V extends "_base"
  ? Pick<LogLevel, "id" | "name" | "code">
  : V extends "_local"
  ? Pick<LogLevel, "id" | "name" | "code">
  : V extends "_minimal"
  ? Pick<LogLevel, "id" | "name">
  : never;
