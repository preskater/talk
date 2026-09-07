import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, Pressable } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { SectionHeader } from '@/components/section-header';
import { AvatarGradients, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getSpace } from '@/data/spaces';

export default function SpaceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const space = getSpace(id);
  const [joined, setJoined] = useState(space?.joined ?? false);

  if (!space) {
    return (
      <AppScreen>
        <AppHeader title="Space" onBack={() => router.back()} />
      </AppScreen>
    );
  }

  const colors = AvatarGradients[space.gradient % AvatarGradients.length];

  return (
    <AppScreen>
      <AppHeader title="Space" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.cover, { backgroundColor: colors[0], experimental_backgroundImage: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }]}>
          <AppText variant="title1" color="#FFFFFF">
            {space.name}
          </AppText>
          <AppText variant="footnote" color="#FFFFFF" style={styles.coverMeta}>
            {space.category} · {space.memberCount.toLocaleString()} members
          </AppText>
        </View>

        <View style={styles.body}>
          <AppText variant="body" color={theme.textSecondary}>
            {space.description}
          </AppText>

          <View style={styles.tags}>
            {space.tags.map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: theme.surfaceMuted }]}>
                <AppText variant="caption" color={theme.textSecondary}>
                  {tag}
                </AppText>
              </View>
            ))}
          </View>

          <Pressable
            onPress={() => setJoined((v) => !v)}
            style={[styles.joinBtn, { backgroundColor: joined ? theme.surfaceMuted : theme.primary }]}>
            <AppText variant="callout" color={joined ? theme.textPrimary : theme.onPrimary}>
              {joined ? 'Joined' : 'Join space'}
            </AppText>
          </Pressable>
        </View>

        <SectionHeader title="Announcement" />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <View style={styles.cardRow}>
            <Icon name="megaphone" size={18} color={theme.primary} />
            <AppText variant="body" style={styles.cardText}>
              {space.announcement}
            </AppText>
          </View>
        </View>

        <SectionHeader title="Recent activity" />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <View style={styles.cardRow}>
            <Icon name="clock" size={18} color={theme.textSecondary} />
            <AppText variant="body" color={theme.textSecondary} style={styles.cardText}>
              {space.recentActivity}
            </AppText>
          </View>
        </View>

        <SectionHeader title="Linked chats" />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <View style={styles.cardRow}>
            <Icon name="bubble.left.and.bubble.right" size={18} color={theme.primary} />
            <AppText variant="body" style={styles.cardText}>
              General discussion
            </AppText>
            <Icon name="chevron.right" size={16} color={theme.textTertiary} />
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
  cover: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
  },
  coverMeta: {
    opacity: 0.9,
  },
  body: {
    padding: Spacing.four,
    gap: Spacing.three,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  tag: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radius.sm,
  },
  joinBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.two,
    borderRadius: Radius.pill,
  },
  card: {
    marginHorizontal: Spacing.four,
    padding: Spacing.three,
    borderRadius: Radius.lg,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  cardText: {
    flex: 1,
  },
});
