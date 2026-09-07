import { useLocalSearchParams, useRouter } from 'expo-router';
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
import { getUser } from '@/data/users';

export default function ContactScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const user = getUser(id);

  return (
    <AppScreen>
      <AppHeader title="Contact" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <Avatar initials={user.initials} gradient={user.gradient} size={88} verified={user.verified} />
          <AppText variant="title2">{user.name}</AppText>
          <AppText variant="footnote" color={theme.textSecondary}>
            {user.handle}
          </AppText>
          <AppText variant="body" color={theme.textSecondary} align="center">
            {user.bio}
          </AppText>
          <View style={styles.actions}>
            <IconButton name="phone" onPress={() => {}} accessibilityLabel="Call" filled />
            <IconButton name="video" onPress={() => {}} accessibilityLabel="Video call" filled />
            <IconButton name="bubble.left" onPress={() => {}} accessibilityLabel="Message" filled />
          </View>
        </View>

        <SectionHeader title="Shared media" />
        <View style={[styles.mediaGrid, { backgroundColor: theme.surface }]}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={[styles.mediaTile, { backgroundColor: theme.surfaceMuted }]}>
              <Icon name="photo" size={24} color={theme.textTertiary} />
            </View>
          ))}
        </View>

        <SectionHeader title="Actions" />
        <View style={[styles.sectionCard, { backgroundColor: theme.surface }]}>
          <SettingRow icon="bell.slash" label="Mute notifications" />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <SettingRow icon="magnifyingglass" label="Search in conversation" />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <SettingRow icon="lock.shield" label="Encryption" value="End-to-end" />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <SettingRow icon="nosign" label="Block" destructive />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <SettingRow icon="exclamationmark.triangle" label="Report" destructive />
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
    alignItems: 'center',
    gap: Spacing.two,
    marginHorizontal: Spacing.four,
    marginTop: Spacing.two,
    padding: Spacing.five,
    borderRadius: Radius.xl,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.four,
    marginTop: Spacing.two,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
    marginHorizontal: Spacing.four,
    padding: Spacing.one,
    borderRadius: Radius.lg,
  },
  mediaTile: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
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
