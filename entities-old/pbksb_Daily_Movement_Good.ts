import { StandardEntity } from "./base/sys$StandardEntity";
import { Daily_Movement } from "./pbksb_Daily_Movement";
export class Daily_Movement_Good extends StandardEntity {
  static NAME = "pbksb_Daily_Movement_Good";
  daily_movement?: Daily_Movement | null;
  system_date_time?: any | null;
  description?: string | null;
  quantity?: any | null;
  uom?: string | null;
  value?: any | null;
  goodsOut?: boolean | null;
  exit_time?: any | null;
  exit_date?: any | null;
  totalValue?: any | null;
}
export type Daily_Movement_GoodViewName = "_base" | "_local" | "_minimal";
export type Daily_Movement_GoodView<
  V extends Daily_Movement_GoodViewName
> = V extends "_base"
  ? Pick<
      Daily_Movement_Good,
      | "id"
      | "description"
      | "system_date_time"
      | "quantity"
      | "uom"
      | "value"
      | "goodsOut"
      | "exit_time"
      | "exit_date"
      | "totalValue"
    >
  : V extends "_local"
  ? Pick<
      Daily_Movement_Good,
      | "id"
      | "system_date_time"
      | "description"
      | "quantity"
      | "uom"
      | "value"
      | "goodsOut"
      | "exit_time"
      | "exit_date"
      | "totalValue"
    >
  : V extends "_minimal"
  ? Pick<Daily_Movement_Good, "id" | "description">
  : never;
