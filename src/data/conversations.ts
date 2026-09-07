import type { Conversation } from './types';

export const conversations: Conversation[] = [
  { id: 'c1', type: 'direct', name: 'Maya Chen', memberIds: ['me', 'u1'], lastMessageId: 'm1', unread: 2, pinned: true, muted: false, archived: false, verified: true, typing: false, lastActivity: '10:24 AM' },
  { id: 'c2', type: 'group', name: 'Design Guild', memberIds: ['me', 'u1', 'u3', 'u9'], lastMessageId: 'm2', unread: 5, pinned: true, muted: false, archived: false, verified: false, typing: true, lastActivity: '9:58 AM' },
  { id: 'c3', type: 'direct', name: 'Jonas Weber', memberIds: ['me', 'u2'], lastMessageId: 'm3', unread: 0, pinned: false, muted: true, archived: false, verified: false, typing: false, lastActivity: 'Yesterday' },
  { id: 'c4', type: 'direct', name: 'Priya Nair', memberIds: ['me', 'u3'], lastMessageId: 'm4', unread: 1, pinned: false, muted: false, archived: false, verified: true, typing: false, lastActivity: 'Yesterday' },
  { id: 'c5', type: 'group', name: 'Weekend Hikers', memberIds: ['me', 'u4', 'u5', 'u12'], lastMessageId: 'm5', unread: 0, pinned: false, muted: false, archived: false, verified: false, typing: false, lastActivity: 'Mon' },
  { id: 'c6', type: 'direct', name: 'Diego Ramos', memberIds: ['me', 'u4'], lastMessageId: 'm6', unread: 0, pinned: false, muted: false, archived: true, verified: false, typing: false, lastActivity: 'Mon' },
  { id: 'c7', type: 'direct', name: 'Sofia Rossi', memberIds: ['me', 'u5'], lastMessageId: 'm7', unread: 0, pinned: false, muted: false, archived: false, verified: false, typing: false, lastActivity: 'Sun' },
  { id: 'c8', type: 'group', name: 'Book Club', memberIds: ['me', 'u7', 'u11', 'u13'], lastMessageId: 'm8', unread: 3, pinned: false, muted: true, archived: false, verified: false, typing: false, lastActivity: 'Sun' },
  { id: 'c9', type: 'direct', name: 'Kenji Tanaka', memberIds: ['me', 'u6'], lastMessageId: 'm9', unread: 0, pinned: false, muted: false, archived: false, verified: true, typing: false, lastActivity: 'Sat' },
  { id: 'c10', type: 'direct', name: 'Amara Okafor', memberIds: ['me', 'u7'], lastMessageId: 'm10', unread: 0, pinned: false, muted: false, archived: false, verified: false, typing: false, lastActivity: 'Sat' },
  { id: 'c11', type: 'group', name: 'Launch Team', memberIds: ['me', 'u8', 'u10', 'u13'], lastMessageId: 'm11', unread: 8, pinned: true, muted: false, archived: false, verified: false, typing: true, lastActivity: 'Fri' },
  { id: 'c12', type: 'direct', name: 'Liam O\'Connor', memberIds: ['me', 'u8'], lastMessageId: 'm12', unread: 0, pinned: false, muted: false, archived: false, verified: true, typing: false, lastActivity: 'Fri' },
  { id: 'c13', type: 'direct', name: 'Hana Kim', memberIds: ['me', 'u9'], lastMessageId: 'm13', unread: 0, pinned: false, muted: false, archived: false, verified: false, typing: false, lastActivity: 'Thu' },
  { id: 'c14', type: 'direct', name: 'Mateo Silva', memberIds: ['me', 'u10'], lastMessageId: 'm14', unread: 1, pinned: false, muted: false, archived: false, verified: true, typing: false, lastActivity: 'Thu' },
  { id: 'c15', type: 'group', name: 'Family', memberIds: ['me', 'u14', 'u15'], lastMessageId: 'm15', unread: 0, pinned: false, muted: false, archived: false, verified: false, typing: false, lastActivity: 'Wed' },
  { id: 'c16', type: 'direct', name: 'Elena Petrova', memberIds: ['me', 'u11'], lastMessageId: 'm16', unread: 0, pinned: false, muted: false, archived: false, verified: false, typing: false, lastActivity: 'Wed' },
  { id: 'c17', type: 'direct', name: 'Noah Williams', memberIds: ['me', 'u12'], lastMessageId: 'm17', unread: 0, pinned: false, muted: false, archived: true, verified: false, typing: false, lastActivity: 'Tue' },
];

export function getConversation(id: string): Conversation | undefined {
  return conversations.find((c) => c.id === id);
}
