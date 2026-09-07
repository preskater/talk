import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { AvatarGradients } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AvatarProps = {
  initials: string;
  gradient: number;
  size?: number;
  verified?: boolean;
};

export function Avatar({ initials, gradient, size = 48, verified }: AvatarProps) {
  const theme = useTheme();
  const colors = AvatarGradients[gradient % AvatarGradients.length];
  const badgeSize = Math.max(16, size * 0.32);
  return (
    <View style={{ width: size, height: size, overflow: 'visible' }}>
      <View
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors[0],
            experimental_backgroundImage: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
          },
        ]}>
        <AppText
          variant="bodyBold"
          color="#FFFFFF"
          style={{ fontSize: size * 0.36, lineHeight: size * 0.44 }}>
          {initials}
        </AppText>
      </View>
      {verified && (
        <View
          style={[
            styles.verified,
            {
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              backgroundColor: theme.surface,
              borderColor: theme.surface,
            },
          ]}>
          <AppText
            variant="caption"
            color={theme.primary}
            style={{ fontSize: badgeSize * 0.6, lineHeight: badgeSize * 0.7 }}>
            ✓
          </AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  verified: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
});
