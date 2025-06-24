import * as Icons from "@/assets/icons";
import { colors } from "@/shared/theme/colors";
import { Colors } from "@/shared/theme/types/color-types";
export type IconNameType = keyof typeof Icons;

interface IconProps {
  name: IconNameType;
  size?: number;
  color?: Colors | string;
  strokeWidth?: number;
}

export function Icon({
  name,
  size = 22,
  color = "gray1",
  strokeWidth = 2,
}: IconProps) {
  const SelectedIcon = Icons[name];

  if (!SelectedIcon) {
    return null;
  }

  const fillColors = color in colors ? colors[color as Colors] : color;

  const isStrokeIcon = ["Mark"].includes(name);

  return (
    <SelectedIcon
      fill={isStrokeIcon ? "none" : fillColors}
      stroke={isStrokeIcon ? fillColors : "none"}
      height={size}
      width={size}
      strokeWidth={strokeWidth}
    />
  );
}
