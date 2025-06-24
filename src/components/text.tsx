import { colors } from "@/shared/theme/colors";
import { fontFamilies, fontSizes } from "@/shared/theme/font";
import { Colors } from "@/shared/theme/types/color-types";
import { Sizes } from "@/shared/theme/types/sizes-types";
import {
  Text as TextReact,
  TextProps as TextReactProps,
  TextStyle,
} from "react-native";

interface TextProps extends TextReactProps {
  children?: any;
  fontWeight?: "heading" | "body";
  fontSize?: Sizes;
  fontColor?: Colors;
  upperCase?: boolean;
  textCenter?: boolean;
  truncated?: boolean; // ✅ Novo
}

export function Text({
  children,
  fontWeight = "body",
  fontSize = "md",
  fontColor = "white",
  upperCase = false,
  textCenter = false,
  truncated = false,
  style,
  ...rest
}: TextProps) {
  const customStyle: TextStyle = {
    fontFamily: fontFamilies[fontWeight],
    fontSize: fontSizes[fontSize],
    color: colors[fontColor],
    ...(textCenter && { textAlign: "center" }),
  };

  return (
    <TextReact
      style={[style, customStyle]}
      numberOfLines={truncated ? 1 : undefined}
      ellipsizeMode={truncated ? "tail" : undefined}
      {...rest}
    >
      {upperCase ? String(children).toUpperCase() : children}
    </TextReact>
  );
}
