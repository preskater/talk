import { StyleSheet, Switch, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ToggleRowProps = {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function ToggleRow({ label, description, value, onValueChange }: ToggleRowProps) {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      <View style={styles.body}>
        <AppText variant="body">{label}</AppText>
        {description ? (
          <AppText variant="caption" color={theme.textSecondary}>
            {description}
          </AppText>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ true: theme.primary, false: theme.surfaceMuted }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    minHeight: 52,
  },
  body: {
    flex: 1,
  },
});
