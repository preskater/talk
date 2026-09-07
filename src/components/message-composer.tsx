import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/icon';
import { MinTouchTarget, Radius, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type MessageComposerProps = {
  onSend: (text: string) => void;
  onAttachment: () => void;
};

export function MessageComposer({ onSend, onAttachment }: MessageComposerProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const hasText = text.trim().length > 0;

  const handleSend = () => {
    if (!hasText) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, Spacing.two) }]}>
      <View style={[styles.bar, { backgroundColor: theme.surface }]}>
        <Pressable onPress={onAttachment} hitSlop={8} style={styles.iconBtn}>
          <Icon name="plus" size={24} color={theme.textSecondary} />
        </Pressable>
        <View style={[styles.inputWrap, { backgroundColor: theme.surfaceMuted }]}>
          <TextInput
            style={[styles.input, { color: theme.textPrimary }]}
            placeholder="Message"
            placeholderTextColor={theme.textTertiary}
            value={text}
            onChangeText={setText}
            multiline
          />
        </View>
        {hasText ? (
          <Pressable onPress={handleSend} hitSlop={8} style={[styles.sendBtn, { backgroundColor: theme.primary }]}>
            <Icon name="arrow.up" size={20} color={theme.onPrimary} />
          </Pressable>
        ) : (
          <Pressable onPress={onAttachment} hitSlop={8} style={styles.iconBtn}>
            <Icon name="mic" size={24} color={theme.textSecondary} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.two,
    padding: Spacing.two,
    borderRadius: Radius.xl,
  },
  iconBtn: {
    width: MinTouchTarget,
    height: MinTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrap: {
    flex: 1,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.three,
    minHeight: MinTouchTarget,
    justifyContent: 'center',
  },
  input: {
    fontSize: Typography.body.fontSize,
    maxHeight: 120,
    paddingVertical: Spacing.two,
  },
  sendBtn: {
    width: MinTouchTarget,
    height: MinTouchTarget,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
