import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { AppText } from '@/components/app-text';
import { CallListItem } from '@/components/call-list-item';
import { EmptyState } from '@/components/empty-state';
import { FilterChips } from '@/components/filter-chips';
import { IconButton } from '@/components/icon-button';
import { Icon } from '@/components/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { calls } from '@/data/calls';

type Filter = 'All' | 'Missed';
const filters: Filter[] = ['All', 'Missed'];

export default function CallsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('All');
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const filtered = useMemo(
    () => calls.filter((c) => (filter === 'Missed' ? c.status === 'missed' : true)),
    [filter],
  );

  const copyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const shareLink = () => {
    setShared(true);
    setTimeout(() => setShared(false), 1500);
  };

  return (
    <AppScreen>
      <AppHeader
        title="Calls"
        large
        right={
          <>
            <IconButton name="link" onPress={copyLink} accessibilityLabel="Create call link" />
            <IconButton name="phone.badge.plus" onPress={() => router.push('/new-chat')} accessibilityLabel="Start new call" filled />
          </>
        }
      />

      <View style={[styles.linkCard, { backgroundColor: theme.surface }]}>
        <View style={[styles.linkIcon, { backgroundColor: theme.primaryMuted }]}>
          <Icon name="link" size={20} color={theme.primary} />
        </View>
        <View style={styles.linkBody}>
          <AppText variant="bodyBold">Pulse call link</AppText>
          <AppText variant="caption" color={theme.textSecondary}>
            pulse.app/call/alexmorgan
          </AppText>
        </View>
        <Pressable onPress={copyLink} style={({ pressed }) => [styles.linkAction, pressed && styles.pressed]}>
          <AppText variant="footnote" color={theme.primary}>
            {copied ? 'Copied!' : 'Copy'}
          </AppText>
        </Pressable>
        <Pressable onPress={shareLink} style={({ pressed }) => [styles.linkAction, pressed && styles.pressed]}>
          <AppText variant="footnote" color={theme.primary}>
            {shared ? 'Shared!' : 'Share'}
          </AppText>
        </Pressable>
      </View>

      <FilterChips options={filters} value={filter} onChange={setFilter} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CallListItem
            call={item}
            onPress={() => router.push(`/chat/${item.conversationId}`)}
            onCallBack={() => {}}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState icon="phone" title="No missed calls" description="You're all caught up." />
        }
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginHorizontal: Spacing.four,
    marginTop: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.lg,
  },
  linkIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkBody: {
    flex: 1,
  },
  linkAction: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  listContent: {
    paddingBottom: 96,
  },
  pressed: {
    opacity: 0.6,
  },
});
