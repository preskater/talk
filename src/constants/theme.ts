import '@/global.css';

import { Platform } from 'react-native';

export type ColorScheme = 'light' | 'dark';

export const Palette = {
  light: {
    background: '#F5F5F7',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceMuted: '#F0F0F3',
    border: '#E4E4E9',
    primary: '#4F46E5',
    primaryMuted: '#EEF0FF',
    onPrimary: '#FFFFFF',
    textPrimary: '#111114',
    textSecondary: '#5F6068',
    textTertiary: '#9A9BA3',
    success: '#16A34A',
    warning: '#D97706',
    danger: '#DC2626',
    bubbleIncoming: '#FFFFFF',
    bubbleOutgoing: '#4F46E5',
    bubbleOutgoingText: '#FFFFFF',
    overlay: 'rgba(0,0,0,0.4)',
  },
  dark: {
    background: '#0B0B0F',
    surface: '#16161C',
    surfaceElevated: '#1E1E26',
    surfaceMuted: '#23232C',
    border: '#2A2A34',
    primary: '#7C74F0',
    primaryMuted: '#26243F',
    onPrimary: '#FFFFFF',
    textPrimary: '#F4F4F6',
    textSecondary: '#B0B1BA',
    textTertiary: '#6E6F78',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    bubbleIncoming: '#1E1E26',
    bubbleOutgoing: '#4F46E5',
    bubbleOutgoingText: '#FFFFFF',
    overlay: 'rgba(0,0,0,0.6)',
  },
} as const;

export type ThemeColor = keyof (typeof Palette)['light'];
export type ThemeColors = Record<ThemeColor, string>;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
  seven: 32,
  eight: 40,
  nine: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

export const Typography = {
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' as const },
  footnote: { fontSize: 13, lineHeight: 18, fontWeight: '500' as const },
  body: { fontSize: 15, lineHeight: 21, fontWeight: '500' as const },
  bodyBold: { fontSize: 15, lineHeight: 21, fontWeight: '700' as const },
  callout: { fontSize: 16, lineHeight: 22, fontWeight: '600' as const },
  title3: { fontSize: 20, lineHeight: 26, fontWeight: '700' as const },
  title2: { fontSize: 24, lineHeight: 30, fontWeight: '700' as const },
  title1: { fontSize: 28, lineHeight: 34, fontWeight: '700' as const },
  largeTitle: { fontSize: 34, lineHeight: 41, fontWeight: '700' as const },
} as const;

export type TypographyKey = keyof typeof Typography;

export const Shadow = Platform.select({
  ios: {
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
    },
    elevated: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
    },
  },
  android: {
    card: { elevation: 1 },
    elevated: { elevation: 4 },
  },
  default: {
    card: {},
    elevated: {},
  },
});

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const MinTouchTarget = 44;

export const AvatarGradients = [
  ['#6366F1', '#8B5CF6'],
  ['#0EA5E9', '#6366F1'],
  ['#F59E0B', '#EF4444'],
  ['#10B981', '#0EA5E9'],
  ['#EC4899', '#8B5CF6'],
  ['#14B8A6', '#22C55E'],
  ['#F43F5E', '#F59E0B'],
  ['#8B5CF6', '#EC4899'],
] as const;
