import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { AppText } from '@/components/app-text';
import { Avatar } from '@/components/avatar';
import { Icon } from '@/components/icon';
import { IconButton } from '@/components/icon-button';
import { SectionHeader } from '@/components/section-header';
import { SettingRow } from '@/components/setting-row';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { accountSettings } from '@/data/settings';
import { me } from '@/data/users';

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <AppScreen>
      <AppHeader
        title="Profile"
        large
        right={<IconButton name="gearshape" onPress={() => router.push('/settings')} accessibilityLabel="Settings" />}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.profileCard, { backgroundColor: theme.surface }]}>
          <Avatar initials={me.initials} gradient={me.gradient} size={88} verified={me.verified} />
          <AppText variant="title2">{me.name}</AppText>
          <AppText variant="footnote" color={theme.textSecondary}>
            {me.handle}
          </AppText>
          <AppText variant="body" color={theme.textSecondary} align="center">
            {me.bio}
          </AppText>

          <View style={[styles.qrPlaceholder, { backgroundColor: theme.surfaceMuted }]}>
            <Icon name="qrcode" size={48} color={theme.textTertiary} />
          </View>

          <View style={[styles.editBtn, { backgroundColor: theme.primaryMuted }]}>
            <Icon name="pencil" size={16} color={theme.primary} />
            <AppText variant="footnote" color={theme.primary} style={styles.editLabel}>
              Edit profile
            </AppText>
          </View>
        </View>

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
    paddingBottom: 96,
  },
  profileCard: {
    alignItems: 'center',
    gap: Spacing.two,
    marginHorizontal: Spacing.four,
    marginTop: Spacing.two,
    padding: Spacing.five,
    borderRadius: Radius.xl,
  },
  qrPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.two,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Radius.pill,
    marginTop: Spacing.two,
  },
  editLabel: {
    fontWeight: '700',
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
