import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { Icon, type IconName } from '@/components/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AttachmentAction = 'camera' | 'photos' | 'file' | 'location' | 'contact' | 'poll';

type AttachmentActionSheetProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (action: AttachmentAction) => void;
};

const actions: { key: AttachmentAction; label: string; icon: IconName; color: string }[] = [
  { key: 'camera', label: 'Camera', icon: 'camera', color: '#6366F1' },
  { key: 'photos', label: 'Photos', icon: 'photo.on.rectangle', color: '#0EA5E9' },
  { key: 'file', label: 'File', icon: 'doc', color: '#F59E0B' },
  { key: 'location', label: 'Location', icon: 'location', color: '#10B981' },
  { key: 'contact', label: 'Contact', icon: 'person.crop.circle', color: '#EC4899' },
  { key: 'poll', label: 'Poll', icon: 'chart.bar', color: '#8B5CF6' },
];

export function AttachmentActionSheet({ visible, onClose, onSelect }: AttachmentActionSheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[styles.sheet, { backgroundColor: theme.surface, paddingBottom: insets.bottom + Spacing.four }]}
          onPress={(e) => e.stopPropagation()}>
          <View style={[styles.handle, { backgroundColor: theme.textTertiary }]} />
          <View style={styles.grid}>
            {actions.map((a) => (
              <Pressable
                key={a.key}
                style={({ pressed }) => [styles.action, pressed && styles.pressed]}
                onPress={() => {
                  onClose();
                  onSelect(a.key);
                }}>
                <View style={[styles.actionIcon, { backgroundColor: a.color + '1A' }]}>
                  <Icon name={a.icon} size={24} color={a.color} />
                </View>
                <AppText variant="caption" color={theme.textSecondary}>
                  {a.label}
                </AppText>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingTop: Spacing.two,
    paddingHorizontal: Spacing.four,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: Spacing.four,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.four,
    paddingBottom: Spacing.four,
  },
  action: {
    width: '28%',
    alignItems: 'center',
    gap: Spacing.two,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});
