import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Avatar } from '@/components/avatar';
import { AvatarStack } from '@/components/avatar-stack';
import { Badge } from '@/components/badge';
import { DeliveryIndicator } from '@/components/delivery-indicator';
import { Icon } from '@/components/icon';
import { PresenceDot } from '@/components/presence-dot';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { messagePreview } from '@/lib/message-preview';
import { getMessagesForConversation } from '@/data/messages';
import { getUser } from '@/data/users';
import type { Conversation } from '@/data/types';

type ChatListItemProps = {
  conversation: Conversation;
  onPress: () => void;
  onLongPress: () => void;
};

export const ChatListItem = memo(function ChatListItem({
  conversation,
  onPress,
  onLongPress,
}: ChatListItemProps) {
  const theme = useTheme();
  const messages = getMessagesForConversation(conversation.id);
  const lastMessage = messages[messages.length - 1];
  const isGroup = conversation.type === 'group';
  const members = conversation.memberIds.filter((id) => id !== 'me').map((id) => getUser(id));
  const firstMember = members[0];
  const preview = messagePreview(lastMessage, isGroup ? firstMember?.name : undefined);
  const outgoing = lastMessage?.senderId === 'me';

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: pressed ? theme.surfaceMuted : theme.surface },
      ]}>
      <View style={styles.avatarWrap}>
        {isGroup ? (
          <AvatarStack members={members.map((m) => ({ initials: m.initials, gradient: m.gradient }))} />
        ) : (
          <View>
            <Avatar
              initials={firstMember?.initials ?? '?'}
              gradient={firstMember?.gradient ?? 0}
              verified={conversation.verified}
            />
            <View style={styles.presence}>
              <PresenceDot presence={firstMember?.presence ?? 'offline'} />
            </View>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <View style={styles.topLine}>
          <AppText variant="bodyBold" numberOfLines={1} style={styles.name}>
            {conversation.name}
          </AppText>
          <AppText variant="caption" color={conversation.unread > 0 ? theme.primary : theme.textTertiary}>
            {conversation.lastActivity}
          </AppText>
        </View>
        <View style={styles.bottomLine}>
          <View style={styles.previewWrap}>
            {outgoing ? <DeliveryIndicator state={lastMessage?.delivery ?? 'sent'} /> : null}
            <AppText
              variant="footnote"
              color={conversation.unread > 0 ? theme.textPrimary : theme.textSecondary}
              numberOfLines={1}
              style={styles.preview}>
              {conversation.typing ? (
                <AppText variant="footnote" color={theme.primary}>
                  typing…
                </AppText>
              ) : (
                preview
              )}
            </AppText>
          </View>
          <View style={styles.trailing}>
            {conversation.muted ? <Icon name="bell.slash" size={14} color={theme.textTertiary} /> : null}
            {conversation.pinned ? <Icon name="pin" size={14} color={theme.textTertiary} /> : null}
            {conversation.unread > 0 ? <Badge count={conversation.unread} /> : null}
          </View>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  avatarWrap: {
    position: 'relative',
  },
  presence: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  body: {
    flex: 1,
    gap: Spacing.one,
  },
  topLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  name: {
    flex: 1,
  },
  bottomLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  previewWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  preview: {
    flex: 1,
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
});
