import { StandardEntity } from "./base/sys$StandardEntity";
export class EmailConfig extends StandardEntity {
  static NAME = "pbksb_EmailConfig";
  code?: string | null;
  pic?: string | null;
  email?: string | null;
}
export type EmailConfigViewName = "_base" | "_local" | "_minimal";
export type EmailConfigView<V extends EmailConfigViewName> = V extends "_base"
  ? Pick<EmailConfig, "id" | "code" | "pic" | "email">
  : V extends "_local"
  ? Pick<EmailConfig, "id" | "code" | "pic" | "email">
  : never;
