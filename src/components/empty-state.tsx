import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon, type IconName } from '@/components/icon';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type EmptyStateProps = {
  icon: IconName;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.iconWrap, { backgroundColor: theme.primaryMuted }]}>
        <Icon name={icon} size={32} color={theme.primary} />
      </View>
      <AppText variant="title3" align="center">
        {title}
      </AppText>
      {description ? (
        <AppText variant="body" color={theme.textSecondary} align="center">
          {description}
        </AppText>
      ) : null}
      {actionLabel ? (
        <AppText variant="callout" color={theme.primary} onPress={onAction} style={styles.action}>
          {actionLabel}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.seven,
    gap: Spacing.three,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  action: {
    marginTop: Spacing.two,
  },
});
