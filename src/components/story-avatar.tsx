import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Avatar } from '@/components/avatar';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Update } from '@/data/types';
import { getUser } from '@/data/users';

type StoryAvatarProps = {
  update: Update;
  size?: number;
  onPress?: () => void;
};

export function StoryAvatar({ update, size = 64, onPress }: StoryAvatarProps) {
  const theme = useTheme();
  const author = getUser(update.authorId);
  const ringColor = update.viewed ? theme.textTertiary : theme.primary;
  const ringSize = size + 10;
  return (
    <Pressable style={styles.wrap} onPress={onPress}>
      <View
        style={[
          styles.ring,
          { width: ringSize, height: ringSize, borderRadius: ringSize / 2, borderColor: ringColor },
        ]}>
        <Avatar initials={author.initials} gradient={author.gradient} size={size} />
      </View>
      <AppText variant="caption" color={theme.textSecondary} numberOfLines={1} style={styles.name}>
        {author.name.split(' ')[0]}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: Spacing.one,
    width: 76,
  },
  ring: {
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    textAlign: 'center',
  },
});
