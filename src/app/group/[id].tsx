import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { AppText } from '@/components/app-text';
import { Avatar } from '@/components/avatar';
import { AvatarStack } from '@/components/avatar-stack';
import { SectionHeader } from '@/components/section-header';
import { SettingRow } from '@/components/setting-row';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getConversation } from '@/data/conversations';
import { getUser } from '@/data/users';

export default function GroupScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const conversation = getConversation(id);

  if (!conversation) {
    return (
      <AppScreen>
        <AppHeader title="Group" onBack={() => router.back()} />
      </AppScreen>
    );
  }

  const members = conversation.memberIds.filter((mid) => mid !== 'me').map((mid) => getUser(mid));

  return (
    <AppScreen>
      <AppHeader title="Group info" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <AvatarStack members={members.map((m) => ({ initials: m.initials, gradient: m.gradient }))} size={64} />
          <AppText variant="title2">{conversation.name}</AppText>
          <AppText variant="footnote" color={theme.textSecondary}>
            {members.length} members
          </AppText>
        </View>

        <SectionHeader title="Members" />
        <View style={[styles.sectionCard, { backgroundColor: theme.surface }]}>
          {members.map((m, i) => (
            <View key={m.id}>
              <View style={styles.memberRow}>
                <Avatar initials={m.initials} gradient={m.gradient} size={40} verified={m.verified} />
                <AppText variant="body" style={styles.memberName}>
                  {m.name}
                </AppText>
                <AppText variant="caption" color={theme.textTertiary}>
                  {m.presence === 'online' ? 'online' : m.lastSeen ?? 'offline'}
                </AppText>
              </View>
              {i < members.length - 1 ? <View style={[styles.divider, { backgroundColor: theme.border }]} /> : null}
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
          <SettingRow icon="rectangle.portrait.and.arrow.right" label="Leave group" destructive />
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
  sectionCard: {
    marginHorizontal: Spacing.four,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
  },
  memberName: {
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 62,
  },
});
