import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { AppText } from '@/components/app-text';
import { AttachmentActionSheet, type AttachmentAction } from '@/components/attachment-action-sheet';
import { Avatar } from '@/components/avatar';
import { AvatarStack } from '@/components/avatar-stack';
import { DateSeparator } from '@/components/date-separator';
import { IconButton } from '@/components/icon-button';
import { MessageBubble } from '@/components/message-bubble';
import { MessageComposer } from '@/components/message-composer';
import { PresenceDot } from '@/components/presence-dot';
import { TypingIndicator } from '@/components/typing-indicator';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useStore } from '@/store/store';
import { getConversation } from '@/data/conversations';
import { getUser } from '@/data/users';
import type { Message } from '@/data/types';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { messages, addMessage, updateConversation, markRead } = useStore();
  const [attachmentVisible, setAttachmentVisible] = useState(false);
  const listRef = useRef<FlatList<Message>>(null);

  const conversation = getConversation(id);
  const thread = useMemo(
    () => messages.filter((m) => m.conversationId === id),
    [messages, id],
  );

  if (!conversation) {
    return (
      <AppScreen>
        <AppHeader title="Chat" onBack={() => router.back()} />
        <AppText variant="body" color={theme.textSecondary} align="center" style={styles.missing}>
          Conversation not found.
        </AppText>
      </AppScreen>
    );
  }

  const isGroup = conversation.type === 'group';
  const members = conversation.memberIds.filter((mid) => mid !== 'me').map((mid) => getUser(mid));
  const firstMember = members[0];

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: `local-${Date.now()}`,
      conversationId: id,
      senderId: 'me',
      kind: 'text',
      text,
      timestamp: 'Now',
      delivery: 'sent',
    };
    addMessage(newMessage);
    updateConversation(id, { lastMessageId: newMessage.id, lastActivity: 'Now' });
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const handleAttachment = (action: AttachmentAction) => {
    const kindMap: Record<AttachmentAction, Message['kind']> = {
      camera: 'image',
      photos: 'image',
      file: 'file',
      location: 'text',
      contact: 'text',
      poll: 'poll',
    };
    const textMap: Record<AttachmentAction, string> = {
      camera: '📷 Photo',
      photos: '📷 Photo',
      file: '📎 File',
      location: '📍 Location shared',
      contact: '👤 Contact shared',
      poll: '📊 New poll',
    };
    const newMessage: Message = {
      id: `local-${Date.now()}`,
      conversationId: id,
      senderId: 'me',
      kind: kindMap[action],
      text: textMap[action],
      timestamp: 'Now',
      delivery: 'sent',
      imageAspect: action === 'camera' || action === 'photos' ? 4 / 3 : undefined,
      fileName: action === 'file' ? 'document.pdf' : undefined,
      fileSize: action === 'file' ? '1.2 MB' : undefined,
      pollQuestion: action === 'poll' ? 'New poll' : undefined,
      pollOptions: action === 'poll' ? [{ id: 'a', label: 'Option 1', votes: 0 }, { id: 'b', label: 'Option 2', votes: 0 }] : undefined,
    };
    addMessage(newMessage);
    updateConversation(id, { lastMessageId: newMessage.id, lastActivity: 'Now' });
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const openDetails = () => {
    markRead(id);
    if (isGroup) router.push(`/group/${id}`);
    else router.push(`/contact/${firstMember?.id}`);
  };

  const subtitle = isGroup
    ? `${members.length} members`
    : firstMember?.presence === 'online'
      ? 'online'
      : firstMember?.lastSeen ?? 'offline';

  return (
    <AppScreen edges={['top', 'left', 'right']}>
      <AppHeader
        title={conversation.name}
        subtitle={subtitle}
        onBack={() => router.back()}
        left={
          <Pressable onPress={openDetails} hitSlop={8}>
            {isGroup ? (
              <AvatarStack members={members.map((m) => ({ initials: m.initials, gradient: m.gradient }))} size={36} />
            ) : (
              <View>
                <Avatar initials={firstMember?.initials ?? '?'} gradient={firstMember?.gradient ?? 0} size={36} verified={conversation.verified} />
                <View style={styles.presence}>
                  <PresenceDot presence={firstMember?.presence ?? 'offline'} size={10} />
                </View>
              </View>
            )}
          </Pressable>
        }
        right={
          <>
            <IconButton name="phone" onPress={() => {}} accessibilityLabel="Audio call" />
            <IconButton name="video" onPress={() => {}} accessibilityLabel="Video call" />
            <IconButton name="ellipsis" onPress={() => {}} accessibilityLabel="More" />
          </>
        }
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <FlatList
          ref={listRef}
          data={thread}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const isMine = item.senderId === 'me';
            const prev = thread[index - 1];
            const showDate = index === 0 || prev?.timestamp !== item.timestamp;
            const showSender = isGroup && !isMine && (index === 0 || thread[index - 1]?.senderId !== item.senderId);
            const senderName = item.senderId === 'me' ? undefined : getUser(item.senderId).name;
            return (
              <View>
                {showDate ? <DateSeparator label={item.timestamp} /> : null}
                <MessageBubble message={item} isMine={isMine} showSender={showSender} senderName={senderName} />
              </View>
            );
          }}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={conversation.typing ? <TypingIndicator /> : null}
        />

        <MessageComposer onSend={handleSend} onAttachment={() => setAttachmentVisible(true)} />
      </KeyboardAvoidingView>

      <AttachmentActionSheet
        visible={attachmentVisible}
        onClose={() => setAttachmentVisible(false)}
        onSelect={handleAttachment}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  presence: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  missing: {
    marginTop: Spacing.six,
  },
});
