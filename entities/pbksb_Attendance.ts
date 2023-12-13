import { StandardEntity } from "./base/sys$StandardEntity";
import { Employee } from "./pbksb_Employee";
import { Employee_Status_Type } from "../enums/enums";
export class Attendance extends StandardEntity {
  static NAME = "pbksb_Attendance";
  employee?: Employee | null;
  clock_in?: any | null;
  clock_in_time?: any | null;
  clock_out?: any | null;
  clock_out_time?: any | null;
  device?: string | null;
  status?: Employee_Status_Type | null;
  remarks?: string | null;
}
export type AttendanceViewName = "_base" | "_local" | "_minimal";
export type AttendanceView<V extends AttendanceViewName> = V extends "_base"
  ? Pick<
      Attendance,
      | "id"
      | "clock_in"
      | "clock_in_time"
      | "clock_out"
      | "clock_out_time"
      | "device"
      | "status"
      | "remarks"
    >
  : V extends "_local"
  ? Pick<
      Attendance,
      | "id"
      | "clock_in"
      | "clock_in_time"
      | "clock_out"
      | "clock_out_time"
      | "device"
      | "status"
      | "remarks"
    >
  : never;
