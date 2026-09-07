import type { Message } from './types';

export const messages: Message[] = [
  // c1 — Maya Chen
  { id: 'm1', conversationId: 'c1', senderId: 'u1', kind: 'text', text: 'Just sent over the final mockups — take a look when you can!', timestamp: '10:24 AM', delivery: 'read', reactions: [{ emoji: '👍', userIds: ['me'] }] },
  { id: 'm1a', conversationId: 'c1', senderId: 'me', kind: 'text', text: 'These look great. The spacing on the list rows is much better.', timestamp: '10:20 AM', delivery: 'read' },
  { id: 'm1b', conversationId: 'c1', senderId: 'u1', kind: 'image', text: 'Home screen v3', timestamp: '10:18 AM', imageAspect: 4 / 3, delivery: 'read' },
  { id: 'm1c', conversationId: 'c1', senderId: 'me', kind: 'link', linkUrl: 'https://example.com/design-system', linkTitle: 'Pulse Design System', linkDescription: 'Tokens, components, and guidelines for the Pulse app.', timestamp: '10:12 AM', delivery: 'read' },

  // c2 — Design Guild
  { id: 'm2', conversationId: 'c2', senderId: 'u9', kind: 'text', text: 'Anyone free for a quick critique session this afternoon?', timestamp: '9:58 AM', delivery: 'read' },
  { id: 'm2a', conversationId: 'c2', senderId: 'u3', kind: 'poll', pollQuestion: 'When should we hold the critique?', pollOptions: [{ id: 'p1', label: '2:00 PM', votes: 3 }, { id: 'p2', label: '4:00 PM', votes: 1 }, { id: 'p3', label: 'Tomorrow', votes: 0 }], timestamp: '9:50 AM' },
  { id: 'm2b', conversationId: 'c2', senderId: 'u1', kind: 'voice', voiceDuration: 42, timestamp: '9:44 AM' },
  { id: 'm2c', conversationId: 'c2', senderId: 'me', kind: 'text', text: 'I can do 2pm.', timestamp: '9:40 AM', delivery: 'read' },

  // c3 — Jonas Weber
  { id: 'm3', conversationId: 'c3', senderId: 'me', kind: 'text', text: 'Deploy is green, thanks for the review.', timestamp: 'Yesterday', delivery: 'delivered' },
  { id: 'm3a', conversationId: 'c3', senderId: 'u2', kind: 'file', fileName: 'migration-plan.pdf', fileSize: '2.4 MB', timestamp: 'Yesterday' },

  // c4 — Priya Nair
  { id: 'm4', conversationId: 'c4', senderId: 'u3', kind: 'image', text: 'Golden hour shots', timestamp: 'Yesterday', imageAspect: 3 / 4, delivery: 'read' },
  { id: 'm4a', conversationId: 'c4', senderId: 'u3', kind: 'text', text: 'From the shoot last weekend ✨', timestamp: 'Yesterday', delivery: 'read' },

  // c5 — Weekend Hikers
  { id: 'm5', conversationId: 'c5', senderId: 'u4', kind: 'event', eventTitle: 'Trail hike — Eagle Ridge', eventTime: 'Sat, 7:00 AM', timestamp: 'Mon' },
  { id: 'm5a', conversationId: 'c5', senderId: 'u12', kind: 'text', text: 'I\'ll bring the snacks!', timestamp: 'Mon' },

  // c6 — Diego Ramos (archived)
  { id: 'm6', conversationId: 'c6', senderId: 'u4', kind: 'text', text: 'Playtest build is ready when you are.', timestamp: 'Mon' },

  // c7 — Sofia Rossi
  { id: 'm7', conversationId: 'c7', senderId: 'u5', kind: 'text', text: 'The floor plans are finalized.', timestamp: 'Sun' },

  // c8 — Book Club
  { id: 'm8', conversationId: 'c8', senderId: 'u7', kind: 'text', text: 'This month\'s pick: "The Midnight Library"', timestamp: 'Sun' },
  { id: 'm8a', conversationId: 'c8', senderId: 'u11', kind: 'text', text: 'Already halfway through, loving it.', timestamp: 'Sun' },

  // c9 — Kenji Tanaka
  { id: 'm9', conversationId: 'c9', senderId: 'me', kind: 'text', text: 'The model accuracy improved by 4%.', timestamp: 'Sat', delivery: 'read' },

  // c10 — Amara Okafor
  { id: 'm10', conversationId: 'c10', senderId: 'u7', kind: 'text', text: 'Draft is with the editor now.', timestamp: 'Sat' },

  // c11 — Launch Team
  { id: 'm11', conversationId: 'c11', senderId: 'u10', kind: 'text', text: 'Final checklist before launch day 🚀', timestamp: 'Fri' },
  { id: 'm11a', conversationId: 'c11', senderId: 'u8', kind: 'file', fileName: 'launch-checklist.xlsx', fileSize: '180 KB', timestamp: 'Fri' },
  { id: 'm11b', conversationId: 'c11', senderId: 'u13', kind: 'text', text: 'Marketing assets are approved.', timestamp: 'Fri' },

  // c12 — Liam O'Connor
  { id: 'm12', conversationId: 'c12', senderId: 'u8', kind: 'text', text: 'Pushed the fix for the crash on iOS 18.', timestamp: 'Fri' },

  // c13 — Hana Kim
  { id: 'm13', conversationId: 'c13', senderId: 'u9', kind: 'image', text: 'New illustration set', timestamp: 'Thu', imageAspect: 1 },

  // c14 — Mateo Silva
  { id: 'm14', conversationId: 'c14', senderId: 'u10', kind: 'text', text: 'Investor call went well!', timestamp: 'Thu' },

  // c15 — Family
  { id: 'm15', conversationId: 'c15', senderId: 'u14', kind: 'text', text: 'Dinner at 7 on Sunday?', timestamp: 'Wed' },
  { id: 'm15a', conversationId: 'c15', senderId: 'me', kind: 'emoji', text: '❤️', timestamp: 'Wed', delivery: 'read' },

  // c16 — Elena Petrova
  { id: 'm16', conversationId: 'c16', senderId: 'u11', kind: 'text', text: 'Paper accepted for the conference!', timestamp: 'Wed' },

  // c17 — Noah Williams (archived)
  { id: 'm17', conversationId: 'c17', senderId: 'u12', kind: 'text', text: 'New track demo is up.', timestamp: 'Tue' },
];

export function getMessagesForConversation(conversationId: string): Message[] {
  return messages
    .filter((m) => m.conversationId === conversationId)
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}
