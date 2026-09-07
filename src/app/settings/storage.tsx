import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { AppText } from '@/components/app-text';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { SectionHeader } from '@/components/section-header';
import { ToggleRow } from '@/components/toggle-row';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const storageItems = [
  { label: 'Photos & videos', size: '1.2 GB', pct: 0.6 },
  { label: 'Documents', size: '340 MB', pct: 0.17 },
  { label: 'Voice messages', size: '180 MB', pct: 0.09 },
  { label: 'Other', size: '280 MB', pct: 0.14 },
];

export default function StorageScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [autoDownload, setAutoDownload] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(true);
  const [confirmClear, setConfirmClear] = useState(false);
  const [cleared, setCleared] = useState(false);

  const clearCache = () => {
    setConfirmClear(false);
    setCleared(true);
    setTimeout(() => setCleared(false), 2000);
  };

  return (
    <AppScreen>
      <AppHeader title="Storage & data" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Storage usage" />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <AppText variant="title2" style={styles.total}>
            2.0 GB
          </AppText>
          <AppText variant="caption" color={theme.textSecondary}>
            Total storage used
          </AppText>
          <View style={[styles.barTrack, { backgroundColor: theme.surfaceMuted }]}>
            {storageItems.map((item) => (
              <View
                key={item.label}
                style={[styles.barSegment, { width: `${item.pct * 100}%`, backgroundColor: theme.primary, opacity: 0.4 + item.pct }]}
              />
            ))}
          </View>
          {storageItems.map((item) => (
            <View key={item.label} style={styles.storageRow}>
              <View style={[styles.dot, { backgroundColor: theme.primary }]} />
              <AppText variant="footnote" color={theme.textSecondary} style={styles.storageLabel}>
                {item.label}
              </AppText>
              <AppText variant="footnote" color={theme.textSecondary}>
                {item.size}
              </AppText>
            </View>
          ))}
        </View>

        <SectionHeader title="Media download" />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <ToggleRow
            label="Auto-download media"
            description="Download photos and videos automatically"
            value={autoDownload}
            onValueChange={setAutoDownload}
          />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <ToggleRow
            label="Wi-Fi only"
            description="Only download media on Wi-Fi"
            value={wifiOnly}
            onValueChange={setWifiOnly}
          />
        </View>

        <SectionHeader title="Cache" />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <View style={styles.cacheRow}>
            <AppText variant="body" style={styles.cacheLabel}>
              Clear cache
            </AppText>
            <AppText variant="body" color={cleared ? theme.success : theme.primary} onPress={() => setConfirmClear(true)}>
              {cleared ? 'Cleared!' : 'Clear'}
            </AppText>
          </View>
        </View>
      </ScrollView>

      <ConfirmDialog
        visible={confirmClear}
        title="Clear cache?"
        message="This will remove temporary files. Your messages and media will not be deleted."
        confirmLabel="Clear"
        destructive
        onConfirm={clearCache}
        onCancel={() => setConfirmClear(false)}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: Spacing.six,
  },
  card: {
    marginHorizontal: Spacing.four,
    borderRadius: Radius.lg,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  total: {
    marginBottom: Spacing.half,
  },
  barTrack: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: Spacing.three,
  },
  barSegment: {
    height: 10,
  },
  storageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  storageLabel: {
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: Spacing.four,
  },
  cacheRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  cacheLabel: {
    flex: 1,
  },
});
