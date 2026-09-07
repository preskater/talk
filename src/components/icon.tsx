import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import type { ColorValue } from 'react-native';

import { toAndroidSymbol, type IconName } from '@/components/symbol-map';
import { useTheme } from '@/hooks/use-theme';

type IconProps = {
  name: IconName;
  size?: number;
  color?: ColorValue;
  weight?: SymbolViewProps['weight'];
  style?: SymbolViewProps['style'];
};

export function Icon({ name, size = 24, color, weight, style }: IconProps) {
  const theme = useTheme();
  return (
    <SymbolView
      name={{ ios: name, android: toAndroidSymbol(name), web: toAndroidSymbol(name) }}
      size={size}
      tintColor={color ?? theme.textPrimary}
      weight={weight}
      style={style}
    />
  );
}

export type { IconName };
