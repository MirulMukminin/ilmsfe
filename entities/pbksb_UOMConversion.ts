import { StandardEntity } from "./base/sys$StandardEntity";
export class UOMConversion extends StandardEntity {
  static NAME = "pbksb_UOMConversion";
  unitFrom?: string | null;
  unitTo?: string | null;
  unitCount?: number | null;
}
export type UOMConversionViewName = "_base" | "_local" | "_minimal";
export type UOMConversionView<
  V extends UOMConversionViewName
> = V extends "_base"
  ? Pick<UOMConversion, "id" | "unitFrom" | "unitTo" | "unitCount">
  : V extends "_local"
  ? Pick<UOMConversion, "id" | "unitFrom" | "unitTo" | "unitCount">
  : never;
