import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function DateSeparator({ label }: { label: string }) {
  const theme = useTheme();
  return (
    <View style={styles.wrap}>
      <View style={[styles.pill, { backgroundColor: theme.surfaceMuted }]}>
        <AppText variant="caption" color={theme.textSecondary}>
          {label}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    marginVertical: Spacing.three,
  },
  pill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 999,
  },
});
