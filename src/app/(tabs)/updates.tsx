import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { AppText } from '@/components/app-text';
import { Avatar } from '@/components/avatar';
import { Icon } from '@/components/icon';
import { SectionHeader } from '@/components/section-header';
import { StoryAvatar } from '@/components/story-avatar';
import { Radius, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { channels, updates } from '@/data/updates';
import { getUser, me } from '@/data/users';
import type { Channel } from '@/data/types';

export default function UpdatesScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [following, setFollowing] = useState<Record<string, boolean>>(
    Object.fromEntries(channels.map((c) => [c.id, c.following])),
  );
  const [composerVisible, setComposerVisible] = useState(false);

  const toggleFollow = (id: string) => setFollowing((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <AppScreen>
      <AppHeader title="Updates" large />

      <ScrollView contentContainerStyle={styles.content}>
        <Pressable
          onPress={() => setComposerVisible(true)}
          style={({ pressed }) => [styles.myUpdate, { backgroundColor: theme.surface }, pressed && styles.pressed]}>
          <View style={styles.myAvatar}>
            <Avatar initials={me.initials} gradient={me.gradient} size={56} />
            <View style={[styles.addBadge, { backgroundColor: theme.primary }]}>
              <Icon name="plus" size={14} color={theme.onPrimary} />
            </View>
          </View>
          <View style={styles.myUpdateBody}>
            <AppText variant="bodyBold">My update</AppText>
            <AppText variant="caption" color={theme.textSecondary}>
              Share a moment with your contacts
            </AppText>
          </View>
        </Pressable>

        <SectionHeader title="Recent updates" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesRow}>
          {updates.map((u) => (
            <StoryAvatar key={u.id} update={u} />
          ))}
        </ScrollView>

        <SectionHeader title="Moments" />
        <View style={styles.feed}>
          {updates.map((u) => {
            const author = getUser(u.authorId);
            return (
              <Pressable
                key={u.id}
                style={({ pressed }) => [styles.feedCard, { backgroundColor: theme.surface }, pressed && styles.pressed]}>
                <View style={styles.feedHeader}>
                  <Avatar initials={author.initials} gradient={author.gradient} size={40} />
                  <View style={styles.feedHeaderText}>
                    <AppText variant="bodyBold">{author.name}</AppText>
                    <AppText variant="caption" color={theme.textTertiary}>
                      {u.timestamp}
                    </AppText>
                  </View>
                  {!u.viewed ? <View style={[styles.unreadDot, { backgroundColor: theme.primary }]} /> : null}
                </View>
                <View style={[styles.feedMedia, { backgroundColor: theme.surfaceMuted }]}>
                  <Icon
                    name={u.kind === 'video' ? 'play.rectangle' : u.kind === 'photo' ? 'photo' : 'text.quote'}
                    size={32}
                    color={theme.textTertiary}
                  />
                </View>
                {u.text ? (
                  <AppText variant="body" color={theme.textSecondary}>
                    {u.text}
                  </AppText>
                ) : null}
              </Pressable>
            );
          })}
        </View>

        <SectionHeader title="Channels" />
        <View style={styles.channels}>
          {channels.map((c) => (
            <ChannelCard key={c.id} channel={c} following={following[c.id]} onToggle={() => toggleFollow(c.id)} />
          ))}
        </View>

        <Pressable
          onPress={() => router.push('/settings/privacy')}
          style={({ pressed }) => [styles.privacyCard, { backgroundColor: theme.primaryMuted }, pressed && styles.pressed]}>
          <Icon name="lock.shield" size={20} color={theme.primary} />
          <View style={styles.privacyBody}>
            <AppText variant="footnote" color={theme.primary}>
              Your updates are private
            </AppText>
            <AppText variant="caption" color={theme.textSecondary}>
              Only your contacts can see your moments. Manage privacy settings.
            </AppText>
          </View>
          <Icon name="chevron.right" size={16} color={theme.primary} />
        </Pressable>
      </ScrollView>

      <StatusComposer visible={composerVisible} onClose={() => setComposerVisible(false)} />
    </AppScreen>
  );
}

function ChannelCard({
  channel,
  following,
  onToggle,
}: {
  channel: Channel;
  following: boolean;
  onToggle: () => void;
}) {
  const theme = useTheme();
  return (
    <View style={[styles.channelCard, { backgroundColor: theme.surface }]}>
      <Avatar initials={channel.name.charAt(0)} gradient={channel.gradient} size={44} verified={channel.verified} />
      <View style={styles.channelBody}>
        <AppText variant="bodyBold" numberOfLines={1}>
          {channel.name}
        </AppText>
        <AppText variant="caption" color={theme.textSecondary} numberOfLines={1}>
          {channel.followers.toLocaleString()} followers
        </AppText>
      </View>
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => [
          styles.followBtn,
          { backgroundColor: following ? theme.surfaceMuted : theme.primary },
          pressed && styles.pressed,
        ]}>
        <AppText variant="footnote" color={following ? theme.textPrimary : theme.onPrimary} style={styles.followLabel}>
          {following ? 'Following' : 'Follow'}
        </AppText>
      </Pressable>
    </View>
  );
}

function StatusComposer({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.composerBackdrop}>
        <View style={[styles.composer, { backgroundColor: theme.surface, paddingBottom: insets.bottom + Spacing.four }]}>
          <View style={styles.composerHeader}>
            <AppText variant="title3">New update</AppText>
            <Pressable onPress={onClose} hitSlop={8}>
              <Icon name="xmark" size={22} color={theme.textPrimary} />
            </Pressable>
          </View>
          <View style={[styles.composerMedia, { backgroundColor: theme.surfaceMuted }]}>
            <Icon name="photo" size={40} color={theme.textTertiary} />
            <AppText variant="caption" color={theme.textTertiary}>
              Add a photo or video
            </AppText>
          </View>
          <TextInput
            style={[styles.composerInput, { color: theme.textPrimary }]}
            placeholder="Write something…"
            placeholderTextColor={theme.textTertiary}
            value={text}
            onChangeText={setText}
            multiline
          />
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [styles.composerPost, { backgroundColor: theme.primary }, pressed && styles.pressed]}>
            <AppText variant="callout" color={theme.onPrimary}>
              Post update
            </AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 96,
  },
  myUpdate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginHorizontal: Spacing.four,
    marginTop: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.lg,
  },
  myAvatar: {
    position: 'relative',
  },
  addBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  myUpdateBody: {
    flex: 1,
  },
  storiesRow: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  feed: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  feedCard: {
    borderRadius: Radius.lg,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  feedHeaderText: {
    flex: 1,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  feedMedia: {
    height: 160,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  channels: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
  },
  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.lg,
  },
  channelBody: {
    flex: 1,
  },
  followBtn: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.one,
    borderRadius: Radius.pill,
  },
  followLabel: {
    fontWeight: '700',
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginHorizontal: Spacing.four,
    marginTop: Spacing.four,
    padding: Spacing.three,
    borderRadius: Radius.lg,
  },
  privacyBody: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  composerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  composer: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  composerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  composerMedia: {
    height: 180,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  composerInput: {
    fontSize: Typography.body.fontSize,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  composerPost: {
    minHeight: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
