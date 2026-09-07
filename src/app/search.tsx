import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { AppText } from '@/components/app-text';
import { Avatar } from '@/components/avatar';
import { EmptyState } from '@/components/empty-state';
import { SearchField } from '@/components/search-field';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { conversations } from '@/data/conversations';
import { users } from '@/data/users';

export default function SearchScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.toLowerCase();
    const matchedUsers = q ? users.filter((u) => u.id !== 'me' && u.name.toLowerCase().includes(q)) : [];
    const matchedChats = q ? conversations.filter((c) => c.name.toLowerCase().includes(q)) : [];
    return { users: matchedUsers, chats: matchedChats };
  }, [query]);

  const hasResults = results.users.length > 0 || results.chats.length > 0;

  return (
    <AppScreen>
      <AppHeader title="Search" onBack={() => router.back()} />
      <View style={styles.search}>
        <SearchField value={query} onChangeText={setQuery} placeholder="Search people and chats" autoFocus />
      </View>

      {!hasResults ? (
        <EmptyState
          icon="magnifyingglass"
          title="Search Pulse"
          description="Find contacts and conversations."
        />
      ) : (
        <FlatList
          data={[...results.users, ...results.chats]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isUser = 'handle' in item;
            return (
              <Pressable
                onPress={() => router.back()}
                style={({ pressed }) => [styles.row, { backgroundColor: pressed ? theme.surfaceMuted : theme.surface }]}>
                {isUser ? (
                  <Avatar initials={item.initials} gradient={item.gradient} size={44} verified={item.verified} />
                ) : (
                  <Avatar initials={item.name.charAt(0)} gradient={0} size={44} />
                )}
                <View style={styles.body}>
                  <AppText variant="bodyBold">{item.name}</AppText>
                  <AppText variant="caption" color={theme.textSecondary}>
                    {isUser ? item.handle : item.type === 'group' ? 'Group' : 'Chat'}
                  </AppText>
                </View>
              </Pressable>
            );
          }}
          contentContainerStyle={styles.listContent}
        />
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  search: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  body: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.six,
  },
});
