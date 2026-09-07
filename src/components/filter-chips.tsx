import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type FilterChipsProps<T extends string> = {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

export function FilterChips<T extends string>({ options, value, onChange }: FilterChipsProps<T>) {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      {options.map((opt) => {
        const selected = opt === value;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={({ pressed }) => [
              styles.chip,
              { backgroundColor: selected ? theme.primary : theme.surfaceMuted },
              pressed && styles.pressed,
            ]}>
            <AppText
              variant="footnote"
              color={selected ? theme.onPrimary : theme.textSecondary}
              style={styles.label}>
              {opt}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
  },
  chip: {
    minHeight: 32,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
  },
});
