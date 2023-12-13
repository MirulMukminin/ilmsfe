import { StandardEntity } from "./base/sys$StandardEntity";
export class TestDateTime extends StandardEntity {
  static NAME = "pbksb_TestDateTime";
  test_date?: any | null;
  test_time?: any | null;
  test_date_time?: any | null;
  test_local_date?: any | null;
  test_local_time?: any | null;
  test_local_date_time?: any | null;
}
export type TestDateTimeViewName = "_base" | "_local" | "_minimal";
export type TestDateTimeView<V extends TestDateTimeViewName> = V extends "_base"
  ? Pick<
      TestDateTime,
      | "id"
      | "test_date"
      | "test_time"
      | "test_date_time"
      | "test_local_date"
      | "test_local_time"
      | "test_local_date_time"
    >
  : V extends "_local"
  ? Pick<
      TestDateTime,
      | "id"
      | "test_date"
      | "test_time"
      | "test_date_time"
      | "test_local_date"
      | "test_local_time"
      | "test_local_date_time"
    >
  : never;
