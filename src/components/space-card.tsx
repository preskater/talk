import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { AvatarGradients, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Space } from '@/data/types';

type SpaceCardProps = {
  space: Space;
  onPress: () => void;
  onToggleJoin: () => void;
  fullWidth?: boolean;
};

export function SpaceCard({ space, onPress, onToggleJoin, fullWidth }: SpaceCardProps) {
  const theme = useTheme();
  const colors = AvatarGradients[space.gradient % AvatarGradients.length];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        fullWidth && styles.cardFull,
        { backgroundColor: theme.surface },
        pressed && styles.pressed,
      ]}>
      <View
        style={[
          styles.cover,
          { backgroundColor: colors[0], experimental_backgroundImage: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` },
        ]}>
        <AppText variant="title3" color="#FFFFFF">
          {space.name.charAt(0)}
        </AppText>
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <AppText variant="bodyBold" numberOfLines={1} style={styles.title}>
            {space.name}
          </AppText>
          <AppText variant="caption" color={theme.textTertiary}>
            {space.memberCount.toLocaleString()} members
          </AppText>
        </View>
        <AppText variant="footnote" color={theme.textSecondary} numberOfLines={2}>
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
          onPress={onToggleJoin}
          style={({ pressed }) => [
            styles.joinBtn,
            { backgroundColor: space.joined ? theme.surfaceMuted : theme.primary },
            pressed && styles.pressed,
          ]}>
          <AppText variant="footnote" color={space.joined ? theme.textPrimary : theme.onPrimary} style={styles.joinLabel}>
            {space.joined ? 'Joined' : 'Join'}
          </AppText>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    width: 260,
  },
  cardFull: {
    width: '100%',
  },
  cover: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  title: {
    flex: 1,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  tag: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.sm,
  },
  joinBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.one,
    borderRadius: Radius.pill,
    marginTop: Spacing.one,
  },
  joinLabel: {
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});
