import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Icon } from '@/components/icon';
import { MinTouchTarget, Radius, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SearchFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
};

export function SearchField({ value, onChangeText, placeholder = 'Search', autoFocus }: SearchFieldProps) {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.surfaceMuted }]}>
      <Icon name="magnifyingglass" size={18} color={theme.textTertiary} />
      <TextInput
        style={[styles.input, { color: theme.textPrimary }]}
        placeholder={placeholder}
        placeholderTextColor={theme.textTertiary}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        autoCorrect={false}
      />
      {value.length > 0 ? (
        <Pressable onPress={() => onChangeText('')} hitSlop={8}>
          <Icon name="xmark.circle.fill" size={18} color={theme.textTertiary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.md,
    minHeight: MinTouchTarget,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.two,
    fontSize: Typography.body.fontSize,
  },
});
