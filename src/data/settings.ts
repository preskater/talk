export type SettingSection = {
  title: string;
  items: SettingItem[];
};

export type SettingItem = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  value?: string;
  destructive?: boolean;
};

export const accountSettings: SettingSection[] = [
  {
    title: 'Account',
    items: [
      { id: 'edit-profile', label: 'Edit profile', icon: 'person.crop.circle', href: '/profile' },
      { id: 'handle', label: 'Handle', icon: 'at', value: '@alexmorgan' },
      { id: 'qr', label: 'Profile code', icon: 'qrcode' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'privacy', label: 'Privacy & security', icon: 'lock.shield', href: '/settings/privacy' },
      { id: 'notifications', label: 'Notifications', icon: 'bell.badge', href: '/settings/notifications' },
      { id: 'appearance', label: 'Appearance', icon: 'circle.lefthalf.filled', href: '/settings/appearance' },
      { id: 'chats', label: 'Chats', icon: 'bubble.left.and.bubble.right' },
      { id: 'storage', label: 'Storage & data', icon: 'internaldrive', href: '/settings/storage' },
      { id: 'devices', label: 'Linked devices', icon: 'laptopcomputer.and.iphone' },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: 'help', label: 'Help & feedback', icon: 'questionmark.circle' },
      { id: 'about', label: 'About Pulse', icon: 'info.circle', value: 'v1.0.0' },
    ],
  },
];
