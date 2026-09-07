import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { useTheme } from '@/hooks/use-theme';

type BadgeProps = {
  count: number;
  size?: number;
};

export function Badge({ count, size = 20 }: BadgeProps) {
  const theme = useTheme();
  if (count <= 0) return null;
  const label = count > 99 ? '99+' : String(count);
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: theme.primary,
          minWidth: size,
          height: size,
          borderRadius: size / 2,
          paddingHorizontal: size * 0.28,
        },
      ]}>
      <AppText variant="caption" color={theme.onPrimary} style={{ fontSize: size * 0.55, lineHeight: size * 0.6, fontWeight: '700' }}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
