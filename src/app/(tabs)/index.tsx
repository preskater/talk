import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { AppText } from '@/components/app-text';
import { ChatListItem } from '@/components/chat-list-item';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { EmptyState } from '@/components/empty-state';
import { FilterChips } from '@/components/filter-chips';
import { IconButton } from '@/components/icon-button';
import { Icon } from '@/components/icon';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useStore } from '@/store/store';
import type { Conversation } from '@/data/types';

type Filter = 'All' | 'Unread' | 'Groups' | 'Pinned';
const filters: Filter[] = ['All', 'Unread', 'Groups', 'Pinned'];

type Action = 'pin' | 'read' | 'mute' | 'archive' | 'delete';

export default function InboxScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { conversations, updateConversation } = useStore();
  const [filter, setFilter] = useState<Filter>('All');
  const [refreshing, setRefreshing] = useState(false);
  const [actionTarget, setActionTarget] = useState<Conversation | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Conversation | null>(null);

  const archived = conversations.filter((c) => c.archived);

  const filtered = useMemo(() => {
    return conversations.filter((c) => {
      if (c.archived) return false;
      switch (filter) {
        case 'Unread':
          return c.unread > 0;
        case 'Groups':
          return c.type === 'group';
        case 'Pinned':
          return c.pinned;
        default:
          return true;
      }
    });
  }, [conversations, filter]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const applyAction = (action: Action) => {
    if (!actionTarget) return;
    const id = actionTarget.id;
    switch (action) {
      case 'pin':
        updateConversation(id, { pinned: !actionTarget.pinned });
        break;
      case 'read':
        updateConversation(id, { unread: actionTarget.unread > 0 ? 0 : 1 });
        break;
      case 'mute':
        updateConversation(id, { muted: !actionTarget.muted });
        break;
      case 'archive':
        updateConversation(id, { archived: true });
        break;
      case 'delete':
        setConfirmDelete(actionTarget);
        break;
    }
    setActionTarget(null);
  };

  const openChat = (c: Conversation) => {
    updateConversation(c.id, { unread: 0 });
    router.push(`/chat/${c.id}`);
  };

  return (
    <AppScreen>
      <AppHeader
        title="Inbox"
        large
        right={
          <>
            <IconButton name="magnifyingglass" onPress={() => router.push('/search')} accessibilityLabel="Search" />
            <IconButton name="square.and.pencil" onPress={() => router.push('/new-chat')} accessibilityLabel="New chat" filled />
          </>
        }
      />

      <FilterChips options={filters} value={filter} onChange={setFilter} />

      {archived.length > 0 ? (
        <Pressable style={({ pressed }) => [styles.archivedRow, pressed && styles.pressed]}>
          <Icon name="archivebox" size={18} color={theme.textSecondary} />
          <AppText variant="footnote" color={theme.textSecondary} style={styles.archivedLabel}>
            Archived
          </AppText>
          <AppText variant="caption" color={theme.textTertiary}>
            {archived.length}
          </AppText>
        </Pressable>
      ) : null}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            conversation={item}
            onPress={() => openChat(item)}
            onLongPress={() => setActionTarget(item)}
          />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            icon="tray"
            title="No conversations"
            description="Try a different filter or start a new chat."
            actionLabel="New chat"
            onAction={() => router.push('/new-chat')}
          />
        }
      />

      <Pressable
        onPress={() => router.push('/new-chat')}
        style={({ pressed }) => [styles.fab, { backgroundColor: theme.primary }, pressed && styles.pressed]}>
        <Icon name="square.and.pencil" size={24} color={theme.onPrimary} />
      </Pressable>

      <ActionSheet
        conversation={actionTarget}
        onClose={() => setActionTarget(null)}
        onAction={applyAction}
      />
      <ConfirmDialog
        visible={!!confirmDelete}
        title="Delete conversation?"
        message={`This will remove "${confirmDelete?.name}" from your inbox.`}
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          if (confirmDelete) updateConversation(confirmDelete.id, { archived: true });
          setConfirmDelete(null);
        }}
        onCancel={() => setConfirmDelete(null)}
      />
    </AppScreen>
  );
}

function ActionSheet({
  conversation,
  onClose,
  onAction,
}: {
  conversation: Conversation | null;
  onClose: () => void;
  onAction: (action: Action) => void;
}) {
  const theme = useTheme();
  if (!conversation) return null;
  const items: { key: Action; label: string; icon: Parameters<typeof Icon>[0]['name'] }[] = [
    { key: 'pin', label: conversation.pinned ? 'Unpin' : 'Pin', icon: 'pin' },
    { key: 'read', label: conversation.unread > 0 ? 'Mark as read' : 'Mark as unread', icon: 'envelope' },
    { key: 'mute', label: conversation.muted ? 'Unmute' : 'Mute', icon: 'bell.slash' },
    { key: 'archive', label: 'Archive', icon: 'archivebox' },
    { key: 'delete', label: 'Delete', icon: 'trash' },
  ];
  return (
    <View style={styles.actionSheetBackdrop}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      <View style={[styles.actionSheet, { backgroundColor: theme.surfaceElevated }]}>
        <AppText variant="bodyBold" style={styles.actionTitle}>
          {conversation.name}
        </AppText>
        {items.map((item) => (
          <Pressable
            key={item.key}
            onPress={() => onAction(item.key)}
            style={({ pressed }) => [styles.actionRow, pressed && styles.pressed]}>
            <Icon name={item.icon} size={20} color={item.key === 'delete' ? theme.danger : theme.textPrimary} />
            <AppText variant="body" color={item.key === 'delete' ? theme.danger : theme.textPrimary}>
              {item.label}
            </AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 96,
  },
  archivedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
  },
  archivedLabel: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: Spacing.four,
    bottom: Spacing.six,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  actionSheetBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  actionSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Spacing.four,
    gap: Spacing.one,
  },
  actionTitle: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: 12,
  },
});
