import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      <AppText variant="footnote" color={theme.textSecondary} style={styles.title}>
        {title}
      </AppText>
      {actionLabel ? (
        <AppText variant="footnote" color={theme.primary} onPress={onAction}>
          {actionLabel}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.two,
  },
  title: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
