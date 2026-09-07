import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View, Pressable } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { AppText } from '@/components/app-text';
import { SearchField } from '@/components/search-field';
import { SectionHeader } from '@/components/section-header';
import { SpaceCard } from '@/components/space-card';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { spaceCategories, spaces } from '@/data/spaces';
import type { SpaceCategory } from '@/data/types';

export default function SpacesScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SpaceCategory | 'All'>('All');
  const [joined, setJoined] = useState<Record<string, boolean>>(
    Object.fromEntries(spaces.map((s) => [s.id, s.joined])),
  );

  const featured = spaces.filter((s) => s.featured);
  const yourSpaces = spaces.filter((s) => joined[s.id]);

  const filtered = useMemo(() => {
    return spaces.filter((s) => {
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase()) || s.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || s.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const toggleJoin = (id: string) => setJoined((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <AppScreen>
      <AppHeader title="Spaces" large />

      <View style={styles.search}>
        <SearchField value={query} onChangeText={setQuery} placeholder="Search spaces" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Featured" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredRow}>
          {featured.map((s) => (
            <SpaceCard
              key={s.id}
              space={s}
              onPress={() => router.push(`/space/${s.id}`)}
              onToggleJoin={() => toggleJoin(s.id)}
            />
          ))}
        </ScrollView>

        <SectionHeader title="Categories" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
          {(['All', ...spaceCategories] as const).map((c) => {
            const selected = c === category;
            return (
              <Pressable
                key={c}
                onPress={() => setCategory(c)}
                style={[styles.categoryChip, { backgroundColor: selected ? theme.primary : theme.surfaceMuted }]}>
                <AppText variant="footnote" color={selected ? theme.onPrimary : theme.textSecondary}>
                  {c}
                </AppText>
              </Pressable>
            );
          })}
        </ScrollView>

        {yourSpaces.length > 0 ? (
          <>
            <SectionHeader title="Your spaces" />
            <View style={styles.grid}>
              {yourSpaces.map((s) => (
                <SpaceCard
                  key={s.id}
                  space={s}
                  fullWidth
                  onPress={() => router.push(`/space/${s.id}`)}
                  onToggleJoin={() => toggleJoin(s.id)}
                />
              ))}
            </View>
          </>
        ) : null}

        <SectionHeader title="Discover" />
        <View style={styles.grid}>
          {filtered.map((s) => (
            <SpaceCard
              key={s.id}
              space={s}
              fullWidth
              onPress={() => router.push(`/space/${s.id}`)}
              onToggleJoin={() => toggleJoin(s.id)}
            />
          ))}
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  search: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  content: {
    paddingBottom: 96,
  },
  featuredRow: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  categoriesRow: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
  },
  categoryChip: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: 999,
  },
  grid: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
});
