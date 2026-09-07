import { Pressable, StyleSheet } from 'react-native';

import { Icon, type IconName } from '@/components/icon';
import { MinTouchTarget, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type IconButtonProps = {
  name: IconName;
  onPress?: () => void;
  size?: number;
  color?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
  filled?: boolean;
};

export function IconButton({
  name,
  onPress,
  size = 22,
  color,
  accessibilityLabel,
  disabled,
  filled,
}: IconButtonProps) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        filled && { backgroundColor: theme.primaryMuted },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <Icon name={name} size={size} color={color ?? (filled ? theme.primary : theme.textPrimary)} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: MinTouchTarget,
    height: MinTouchTarget,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  disabled: {
    opacity: 0.4,
  },
});
