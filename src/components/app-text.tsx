import { Text, type TextProps, type TextStyle } from 'react-native';

import { Typography, type TypographyKey } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AppTextProps = TextProps & {
  variant?: TypographyKey;
  color?: string;
  align?: TextStyle['textAlign'];
};

export function AppText({ variant = 'body', color, align, style, ...rest }: AppTextProps) {
  const theme = useTheme();
  const type = Typography[variant];
  return (
    <Text
      style={[
        { color: color ?? theme.textPrimary, fontSize: type.fontSize, lineHeight: type.lineHeight, fontWeight: type.fontWeight },
        align ? { textAlign: align } : null,
        style,
      ]}
      {...rest}
    />
  );
}
