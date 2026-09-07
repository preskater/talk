import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Avatar } from '@/components/avatar';
import { AvatarStack } from '@/components/avatar-stack';
import { Icon } from '@/components/icon';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getUser } from '@/data/users';
import type { Call } from '@/data/types';

type CallListItemProps = {
  call: Call;
  onPress: () => void;
  onCallBack: () => void;
};

export const CallListItem = memo(function CallListItem({ call, onPress, onCallBack }: CallListItemProps) {
  const theme = useTheme();
  const isGroup = call.memberIds.length > 2;
  const members = call.memberIds.filter((id) => id !== 'me').map((id) => getUser(id));
  const missed = call.status === 'missed';

  const directionIcon = call.direction === 'incoming' ? 'arrow.down.left' : 'arrow.up.right';
  const typeIcon = call.type === 'video' ? 'video' : 'phone';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, { backgroundColor: pressed ? theme.surfaceMuted : theme.surface }]}>
      {isGroup ? (
        <AvatarStack members={members.map((m) => ({ initials: m.initials, gradient: m.gradient }))} size={44} />
      ) : (
        <Avatar initials={members[0]?.initials ?? '?'} gradient={members[0]?.gradient ?? 0} size={44} />
      )}
      <View style={styles.body}>
        <AppText variant="bodyBold" color={missed ? theme.danger : theme.textPrimary} numberOfLines={1}>
          {call.name}
        </AppText>
        <View style={styles.meta}>
          <Icon name={directionIcon} size={13} color={missed ? theme.danger : theme.textTertiary} />
          <AppText variant="caption" color={missed ? theme.danger : theme.textTertiary}>
            {missed ? 'Missed' : call.duration}
          </AppText>
          <AppText variant="caption" color={theme.textTertiary}>
            · {call.timestamp}
          </AppText>
        </View>
      </View>
      <Pressable onPress={onCallBack} hitSlop={8} style={styles.callBtn}>
        <Icon name={typeIcon} size={20} color={theme.primary} />
      </Pressable>
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
  body: {
    flex: 1,
    gap: Spacing.half,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  callBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
