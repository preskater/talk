import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import type { Presence } from '@/data/types';
import type { ThemeColor } from '@/constants/theme';

type PresenceDotProps = {
  presence: Presence;
  size?: number;
};

const colorMap: Record<Presence, ThemeColor> = {
  online: 'success',
  away: 'warning',
  offline: 'textTertiary',
};

export function PresenceDot({ presence, size = 12 }: PresenceDotProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.dot,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme[colorMap[presence]],
          borderColor: theme.surface,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    borderWidth: 2,
  },
});
