import { StandardEntity } from "./base/sys$StandardEntity";
import { BerthMHERequestConsole } from "./pbksb_BerthMHERequestConsole";
import { WorkProgramType, MachineryConsoleItem } from "../enums/enums";
import { Site } from "./pbksb_Site";
export class BerthMachineryConsole extends StandardEntity {
  static NAME = "pbksb_BerthMachineryConsole";
  request_console?: BerthMHERequestConsole | null;
  type?: WorkProgramType | null;
  item?: MachineryConsoleItem | null;
  quantity?: number | null;
  time?: any | null;
  location?: Site | null;
}
export type BerthMachineryConsoleViewName = "_base" | "_local" | "_minimal";
export type BerthMachineryConsoleView<
  V extends BerthMachineryConsoleViewName
> = V extends "_base"
  ? Pick<BerthMachineryConsole, "id" | "type" | "item" | "quantity" | "time">
  : V extends "_local"
  ? Pick<BerthMachineryConsole, "id" | "type" | "item" | "quantity" | "time">
  : never;
