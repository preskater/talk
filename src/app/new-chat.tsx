import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { AppText } from '@/components/app-text';
import { Avatar } from '@/components/avatar';
import { PresenceDot } from '@/components/presence-dot';
import { SearchField } from '@/components/search-field';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { users } from '@/data/users';

export default function NewChatScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const filtered = users.filter(
    (u) => u.id !== 'me' && u.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <AppScreen>
      <AppHeader title="New chat" onBack={() => router.back()} />
      <View style={styles.search}>
        <SearchField value={query} onChangeText={setQuery} placeholder="Search contacts" autoFocus />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.row, { backgroundColor: pressed ? theme.surfaceMuted : theme.surface }]}>
            <View>
              <Avatar initials={item.initials} gradient={item.gradient} size={44} verified={item.verified} />
              <View style={styles.presence}>
                <PresenceDot presence={item.presence} size={10} />
              </View>
            </View>
            <View style={styles.body}>
              <AppText variant="bodyBold">{item.name}</AppText>
              <AppText variant="caption" color={theme.textSecondary}>
                {item.handle}
              </AppText>
            </View>
          </Pressable>
        )}
        contentContainerStyle={styles.listContent}
      />
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
  presence: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  body: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.six,
  },
});
