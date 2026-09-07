import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { useTheme } from '@/hooks/use-theme';

type AvatarStackProps = {
  members: { initials: string; gradient: number }[];
  size?: number;
};

export function AvatarStack({ members, size = 48 }: AvatarStackProps) {
  const theme = useTheme();
  const shown = members.slice(0, 3);
  const overlap = size * 0.4;
  return (
    <View style={{ width: size + overlap * (shown.length - 1), height: size }}>
      {shown.map((m, i) => (
        <View
          key={i}
          style={[
            styles.item,
            {
              left: i * overlap,
              zIndex: shown.length - i,
              borderColor: theme.background,
            },
          ]}>
          <Avatar initials={m.initials} gradient={m.gradient} size={size} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    position: 'absolute',
    top: 0,
    borderWidth: 2,
    borderRadius: 999,
  },
});
