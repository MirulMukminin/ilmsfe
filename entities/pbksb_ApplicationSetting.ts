import { StandardEntity } from "./base/sys$StandardEntity";
import { ModuleCode } from "../enums/enums";
export class ApplicationSetting extends StandardEntity {
  static NAME = "pbksb_ApplicationSetting";
  moduleCode?: ModuleCode | null;
  categoryType?: string | null;
  settingValue?: string | null;
  min?: number | null;
  max?: number | null;
}
export type ApplicationSettingViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "applicationSetting-view";
export type ApplicationSettingView<
  V extends ApplicationSettingViewName
> = V extends "_base"
  ? Pick<
      ApplicationSetting,
      "id" | "moduleCode" | "categoryType" | "settingValue" | "min" | "max"
    >
  : V extends "_local"
  ? Pick<
      ApplicationSetting,
      "id" | "moduleCode" | "categoryType" | "settingValue" | "min" | "max"
    >
  : V extends "applicationSetting-view"
  ? Pick<
      ApplicationSetting,
      "id" | "moduleCode" | "categoryType" | "settingValue" | "min" | "max"
    >
  : never;
