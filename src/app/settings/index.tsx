import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { Icon } from '@/components/icon';
import { SectionHeader } from '@/components/section-header';
import { SettingRow } from '@/components/setting-row';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { accountSettings } from '@/data/settings';

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <AppScreen>
      <AppHeader title="Settings" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        {accountSettings.map((section) => (
          <View key={section.title}>
            <SectionHeader title={section.title} />
            <View style={[styles.sectionCard, { backgroundColor: theme.surface }]}>
              {section.items.map((item, i) => (
                <View key={item.id}>
                  <SettingRow
                    icon={item.icon as Parameters<typeof Icon>[0]['name']}
                    label={item.label}
                    value={item.value}
                    destructive={item.destructive}
                    onPress={item.href ? () => router.push(item.href as never) : undefined}
                  />
                  {i < section.items.length - 1 ? (
                    <View style={[styles.divider, { backgroundColor: theme.border }]} />
                  ) : null}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: Spacing.six,
  },
  sectionCard: {
    marginHorizontal: Spacing.four,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 62,
  },
});
