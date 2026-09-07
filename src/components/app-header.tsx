import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { IconButton } from '@/components/icon-button';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
  onBack?: () => void;
  large?: boolean;
};

export function AppHeader({ title, subtitle, left, right, onBack, large }: AppHeaderProps) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {onBack ? (
          <IconButton name="chevron.left" onPress={onBack} accessibilityLabel="Back" />
        ) : left ? (
          left
        ) : null}
        <View style={styles.titleWrap}>
          <AppText variant={large ? 'title1' : 'title2'} numberOfLines={1}>
            {title}
          </AppText>
          {subtitle ? (
            <AppText variant="footnote" color={theme.textSecondary} numberOfLines={1}>
              {subtitle}
            </AppText>
          ) : null}
        </View>
        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 44,
  },
  titleWrap: {
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
});
