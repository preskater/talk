import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { AppText } from '@/components/app-text';
import { Avatar } from '@/components/avatar';
import { Icon } from '@/components/icon';
import { Radius, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { users } from '@/data/users';

export default function NewGroupScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <AppScreen>
      <AppHeader title="New group" onBack={() => router.back()} />
      <View style={styles.nameWrap}>
        <TextInput
          style={[styles.nameInput, { color: theme.textPrimary, backgroundColor: theme.surfaceMuted }]}
          placeholder="Group name"
          placeholderTextColor={theme.textTertiary}
          value={name}
          onChangeText={setName}
        />
      </View>
      <AppText variant="footnote" color={theme.textSecondary} style={styles.hint}>
        {selected.size} selected
      </AppText>
      <FlatList
        data={users.filter((u) => u.id !== 'me')}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selected.has(item.id);
          return (
            <Pressable
              onPress={() => toggle(item.id)}
              style={({ pressed }) => [styles.row, { backgroundColor: pressed ? theme.surfaceMuted : theme.surface }]}>
              <Avatar initials={item.initials} gradient={item.gradient} size={44} verified={item.verified} />
              <AppText variant="body" style={styles.rowName}>
                {item.name}
              </AppText>
              <View style={[styles.check, { backgroundColor: isSelected ? theme.primary : 'transparent', borderColor: isSelected ? theme.primary : theme.border }]}>
                {isSelected ? <Icon name="checkmark" size={14} color={theme.onPrimary} /> : null}
              </View>
            </Pressable>
          );
        }}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <Pressable
          onPress={() => router.back()}
          disabled={selected.size === 0}
          style={({ pressed }) => [
            styles.createBtn,
            { backgroundColor: selected.size === 0 ? theme.surfaceMuted : theme.primary },
            pressed && styles.pressed,
          ]}>
          <AppText variant="callout" color={selected.size === 0 ? theme.textTertiary : theme.onPrimary}>
            Create group
          </AppText>
        </Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  nameWrap: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  nameInput: {
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    fontSize: Typography.body.fontSize,
  },
  hint: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  rowName: {
    flex: 1,
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: Spacing.six,
  },
  footer: {
    padding: Spacing.four,
  },
  createBtn: {
    minHeight: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
