import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { SectionHeader } from '@/components/section-header';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme, useThemePreference, type ThemePreference } from '@/hooks/use-theme';

const themeOptions: { key: ThemePreference; label: string; icon: Parameters<typeof Icon>[0]['name'] }[] = [
  { key: 'system', label: 'System', icon: 'circle.lefthalf.filled' },
  { key: 'light', label: 'Light', icon: 'sun.max' },
  { key: 'dark', label: 'Dark', icon: 'moon' },
];

const densityOptions = ['Comfortable', 'Compact', 'Cozy'] as const;

export default function AppearanceScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { preference, setPreference } = useThemePreference();
  const [density, setDensity] = useState<(typeof densityOptions)[number]>('Comfortable');
  const [fontSize, setFontSize] = useState(15);

  return (
    <AppScreen>
      <AppHeader title="Appearance" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Theme" />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          {themeOptions.map((opt, i) => {
            const selected = preference === opt.key;
            return (
              <View key={opt.key}>
                <Pressable
                  onPress={() => setPreference(opt.key)}
                  style={({ pressed }) => [styles.optionRow, pressed && styles.pressed]}>
                  <Icon name={opt.icon} size={20} color={selected ? theme.primary : theme.textSecondary} />
                  <AppText variant="body" color={selected ? theme.primary : theme.textPrimary} style={styles.optionLabel}>
                    {opt.label}
                  </AppText>
                  {selected ? <Icon name="checkmark" size={18} color={theme.primary} /> : null}
                </Pressable>
                {i < themeOptions.length - 1 ? <View style={[styles.divider, { backgroundColor: theme.border }]} /> : null}
              </View>
            );
          })}
        </View>

        <SectionHeader title="Chat density" />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          {densityOptions.map((opt, i) => {
            const selected = density === opt;
            return (
              <View key={opt}>
                <Pressable
                  onPress={() => setDensity(opt)}
                  style={({ pressed }) => [styles.optionRow, pressed && styles.pressed]}>
                  <AppText variant="body" color={selected ? theme.primary : theme.textPrimary} style={styles.optionLabel}>
                    {opt}
                  </AppText>
                  {selected ? <Icon name="checkmark" size={18} color={theme.primary} /> : null}
                </Pressable>
                {i < densityOptions.length - 1 ? <View style={[styles.divider, { backgroundColor: theme.border }]} /> : null}
              </View>
            );
          })}
        </View>

        <SectionHeader title="Font size" />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <View style={styles.fontPreview}>
            <AppText variant="body" style={{ fontSize }}>
              Preview text
            </AppText>
            <AppText variant="caption" color={theme.textSecondary}>
              {fontSize}pt
            </AppText>
          </View>
          <View style={styles.fontControls}>
            <Pressable
              onPress={() => setFontSize((s) => Math.max(13, s - 1))}
              style={({ pressed }) => [styles.fontBtn, { backgroundColor: theme.surfaceMuted }, pressed && styles.pressed]}>
              <AppText variant="title3">−</AppText>
            </Pressable>
            <Pressable
              onPress={() => setFontSize((s) => Math.min(19, s + 1))}
              style={({ pressed }) => [styles.fontBtn, { backgroundColor: theme.surfaceMuted }, pressed && styles.pressed]}>
              <AppText variant="title3">+</AppText>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: Spacing.six,
  },
  card: {
    marginHorizontal: Spacing.four,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    minHeight: 52,
  },
  optionLabel: {
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: Spacing.four,
  },
  fontPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  fontControls: {
    flexDirection: 'row',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
  },
  fontBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
