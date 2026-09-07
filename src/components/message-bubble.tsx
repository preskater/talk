import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Message } from '@/data/types';

type MessageBubbleProps = {
  message: Message;
  isMine: boolean;
  showSender?: boolean;
  senderName?: string;
};

export function MessageBubble({ message, isMine, showSender, senderName }: MessageBubbleProps) {
  const theme = useTheme();
  const bubbleColor = isMine ? theme.bubbleOutgoing : theme.bubbleIncoming;
  const textColor = isMine ? theme.bubbleOutgoingText : theme.textPrimary;

  return (
    <View style={[styles.wrap, isMine ? styles.mine : styles.theirs]}>
      {showSender && senderName ? (
        <AppText variant="caption" color={theme.primary} style={styles.sender}>
          {senderName}
        </AppText>
      ) : null}
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: bubbleColor,
            borderTopLeftRadius: isMine ? Radius.lg : Radius.sm,
            borderTopRightRadius: isMine ? Radius.sm : Radius.lg,
          },
        ]}>
        <BubbleContent message={message} textColor={textColor} isMine={isMine} />
      </View>
    </View>
  );
}

function BubbleContent({
  message,
  textColor,
  isMine,
}: {
  message: Message;
  textColor: string;
  isMine: boolean;
}) {
  const theme = useTheme();
  switch (message.kind) {
    case 'image':
      return (
        <View style={[styles.image, { aspectRatio: message.imageAspect ?? 4 / 3 }]}>
          <Icon name="photo" size={28} color={isMine ? theme.bubbleOutgoingText : theme.textTertiary} />
          {message.text ? (
            <AppText variant="footnote" color={textColor} style={styles.imageCaption}>
              {message.text}
            </AppText>
          ) : null}
        </View>
      );
    case 'voice':
      return <VoiceBubble message={message} textColor={textColor} isMine={isMine} />;
    case 'file':
      return (
        <View style={styles.fileRow}>
          <Icon name="doc" size={22} color={textColor} />
          <View style={styles.fileInfo}>
            <AppText variant="footnote" color={textColor} numberOfLines={1}>
              {message.fileName}
            </AppText>
            <AppText variant="caption" color={isMine ? theme.bubbleOutgoingText : theme.textTertiary}>
              {message.fileSize}
            </AppText>
          </View>
        </View>
      );
    case 'link':
      return (
        <View style={styles.linkCard}>
          <AppText variant="footnote" color={textColor} numberOfLines={1} style={styles.linkTitle}>
            {message.linkTitle}
          </AppText>
          <AppText variant="caption" color={isMine ? theme.bubbleOutgoingText : theme.textTertiary} numberOfLines={2}>
            {message.linkDescription}
          </AppText>
          <AppText variant="caption" color={isMine ? theme.bubbleOutgoingText : theme.textTertiary} numberOfLines={1}>
            {message.linkUrl}
          </AppText>
        </View>
      );
    case 'poll':
      return <PollBubble message={message} textColor={textColor} isMine={isMine} />;
    case 'event':
      return (
        <View style={styles.eventCard}>
          <Icon name="calendar" size={20} color={textColor} />
          <View>
            <AppText variant="footnote" color={textColor}>
              {message.eventTitle}
            </AppText>
            <AppText variant="caption" color={isMine ? theme.bubbleOutgoingText : theme.textTertiary}>
              {message.eventTime}
            </AppText>
          </View>
        </View>
      );
    case 'emoji':
      return (
        <AppText variant="largeTitle" color={textColor} style={styles.emoji}>
          {message.text}
        </AppText>
      );
    case 'text':
    case 'system':
    default:
      return (
        <AppText variant="body" color={textColor}>
          {message.text}
        </AppText>
      );
  }
}

function VoiceBubble({
  message,
  textColor,
  isMine,
}: {
  message: Message;
  textColor: string;
  isMine: boolean;
}) {
  const theme = useTheme();
  const bars = [4, 8, 12, 16, 10, 18, 14, 6, 12, 8, 16, 10, 6, 12, 8, 14, 10, 6, 12, 8];
  return (
    <View style={styles.voiceRow}>
      <Icon name="play.fill" size={20} color={textColor} />
      <View style={styles.waveform}>
        {bars.map((h, i) => (
          <View
            key={i}
            style={{
              width: 2,
              height: h,
              borderRadius: 1,
              backgroundColor: isMine ? theme.bubbleOutgoingText : theme.textTertiary,
            }}
          />
        ))}
      </View>
      <AppText variant="caption" color={isMine ? theme.bubbleOutgoingText : theme.textTertiary}>
        0:{String(message.voiceDuration ?? 0).padStart(2, '0')}
      </AppText>
    </View>
  );
}

function PollBubble({
  message,
  textColor,
  isMine,
}: {
  message: Message;
  textColor: string;
  isMine: boolean;
}) {
  const theme = useTheme();
  const options = message.pollOptions ?? [];
  const total = options.reduce((sum, o) => sum + o.votes, 0) || 1;
  return (
    <View style={styles.poll}>
      <AppText variant="footnote" color={textColor} style={styles.pollQuestion}>
        {message.pollQuestion}
      </AppText>
      {options.map((opt) => {
        const pct = Math.round((opt.votes / total) * 100);
        return (
          <View key={opt.id} style={styles.pollOption}>
            <View style={styles.pollOptionTop}>
              <AppText variant="caption" color={textColor}>
                {opt.label}
              </AppText>
              <AppText variant="caption" color={isMine ? theme.bubbleOutgoingText : theme.textTertiary}>
                {pct}%
              </AppText>
            </View>
            <View style={[styles.pollTrack, { backgroundColor: isMine ? 'rgba(255,255,255,0.25)' : theme.surfaceMuted }]}>
              <View style={[styles.pollFill, { width: `${pct}%`, backgroundColor: isMine ? theme.bubbleOutgoingText : theme.primary }]} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    maxWidth: '78%',
    marginVertical: Spacing.one,
  },
  mine: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  theirs: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.lg,
  },
  sender: {
    marginBottom: Spacing.half,
    marginLeft: Spacing.one,
  },
  image: {
    width: 220,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  imageCaption: {
    position: 'absolute',
    bottom: Spacing.two,
    left: Spacing.two,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minWidth: 180,
  },
  fileInfo: {
    flex: 1,
  },
  linkCard: {
    gap: Spacing.half,
    maxWidth: 240,
  },
  linkTitle: {
    fontWeight: '700',
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minWidth: 180,
  },
  emoji: {
    fontSize: 40,
    lineHeight: 48,
  },
  voiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minWidth: 180,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
  poll: {
    gap: Spacing.two,
    minWidth: 200,
  },
  pollQuestion: {
    fontWeight: '700',
  },
  pollOption: {
    gap: Spacing.half,
  },
  pollOptionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pollTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  pollFill: {
    height: 6,
    borderRadius: 3,
  },
});
