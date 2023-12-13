import { StandardEntity } from "./base/sys$StandardEntity";
import { Site } from "./pbksb_Site";
import { Employee } from "./pbksb_Employee";
import { Machine } from "./pbksb_Machine";
import { AttendanceDaily } from "../enums/enums";
export class DailyWorkSchedule extends StandardEntity {
  static NAME = "pbksb_DailyWorkSchedule";
  location?: Site | null;
  start_time?: any | null;
  crane_operator?: Employee | null;
  chargehand?: Employee | null;
  crane_code?: Machine | null;
  attendance_daily?: AttendanceDaily | null;
  acting_chargehand?: Employee | null;
  date_progress?: any | null;
}
export type DailyWorkScheduleViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dailyWorkSchedule-view";
export type DailyWorkScheduleView<
  V extends DailyWorkScheduleViewName
> = V extends "_base"
  ? Pick<
      DailyWorkSchedule,
      "id" | "start_time" | "attendance_daily" | "date_progress"
    >
  : V extends "_local"
  ? Pick<
      DailyWorkSchedule,
      "id" | "start_time" | "attendance_daily" | "date_progress"
    >
  : V extends "dailyWorkSchedule-view"
  ? Pick<
      DailyWorkSchedule,
      | "id"
      | "start_time"
      | "attendance_daily"
      | "date_progress"
      | "location"
      | "acting_chargehand"
      | "chargehand"
      | "crane_operator"
      | "crane_code"
    >
  : never;
