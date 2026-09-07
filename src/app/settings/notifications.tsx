import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { SectionHeader } from '@/components/section-header';
import { ToggleRow } from '@/components/toggle-row';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function NotificationsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [messages, setMessages] = useState(true);
  const [groups, setGroups] = useState(true);
  const [calls, setCalls] = useState(true);
  const [previews, setPreviews] = useState(true);
  const [sounds, setSounds] = useState(true);

  return (
    <AppScreen>
      <AppHeader title="Notifications" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Alerts" />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <ToggleRow label="Messages" value={messages} onValueChange={setMessages} />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <ToggleRow label="Group messages" value={groups} onValueChange={setGroups} />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <ToggleRow label="Calls" value={calls} onValueChange={setCalls} />
        </View>

        <SectionHeader title="Display" />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <ToggleRow
            label="Message previews"
            description="Show message content in notifications"
            value={previews}
            onValueChange={setPreviews}
          />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <ToggleRow label="Sounds" value={sounds} onValueChange={setSounds} />
        </View>
      </ScrollView>
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
    overflow: 'hidden',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: Spacing.four,
  },
});
