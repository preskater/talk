import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppScreen } from '@/components/app-screen';
import { SectionHeader } from '@/components/section-header';
import { ToggleRow } from '@/components/toggle-row';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function PrivacyScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [typingIndicator, setTypingIndicator] = useState(true);
  const [screenLock, setScreenLock] = useState(false);

  return (
    <AppScreen>
      <AppHeader title="Privacy & security" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Profile" />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <ToggleRow
            label="Profile visibility"
            description="Allow others to see your profile"
            value={profileVisibility}
            onValueChange={setProfileVisibility}
          />
        </View>

        <SectionHeader title="Messaging" />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <ToggleRow
            label="Read receipts"
            description="Show when you've read messages"
            value={readReceipts}
            onValueChange={setReadReceipts}
          />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <ToggleRow
            label="Typing indicator"
            description="Show when you're typing"
            value={typingIndicator}
            onValueChange={setTypingIndicator}
          />
        </View>

        <SectionHeader title="Security" />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <ToggleRow
            label="Screen lock"
            description="Require authentication to open Pulse"
            value={screenLock}
            onValueChange={setScreenLock}
          />
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
