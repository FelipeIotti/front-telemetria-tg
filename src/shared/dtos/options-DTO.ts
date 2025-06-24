import { IconNameType } from "@/components/icon";
import { Colors } from "../theme/types/color-types";

export interface OptionsDTO {
  label: string;
  value: string;
  iconName?: IconNameType;
  iconColor?: Colors;
}
