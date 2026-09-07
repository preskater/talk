import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon, type IconName } from '@/components/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SettingRowProps = {
  icon?: IconName;
  label: string;
  value?: string;
  onPress?: () => void;
  destructive?: boolean;
  trailing?: React.ReactNode;
};

export function SettingRow({ icon, label, value, onPress, destructive, trailing }: SettingRowProps) {
  const theme = useTheme();
  const labelColor = destructive ? theme.danger : theme.textPrimary;
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      {icon ? (
        <View style={[styles.iconWrap, { backgroundColor: destructive ? theme.danger + '1A' : theme.primaryMuted }]}>
          <Icon name={icon} size={18} color={destructive ? theme.danger : theme.primary} />
        </View>
      ) : null}
      <AppText variant="body" color={labelColor} style={styles.label}>
        {label}
      </AppText>
      {value ? (
        <AppText variant="body" color={theme.textTertiary}>
          {value}
        </AppText>
      ) : null}
      {trailing}
      {onPress ? <Icon name="chevron.right" size={16} color={theme.textTertiary} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 52,
    paddingHorizontal: Spacing.four,
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
  },
  pressed: {
    opacity: 0.6,
  },
});
