import type { Call } from './types';

export const calls: Call[] = [
  { id: 'cl1', conversationId: 'c1', name: 'Maya Chen', memberIds: ['me', 'u1'], type: 'video', direction: 'incoming', status: 'completed', timestamp: 'Today, 9:12 AM', duration: '18:42' },
  { id: 'cl2', conversationId: 'c2', name: 'Design Guild', memberIds: ['me', 'u1', 'u3', 'u9'], type: 'audio', direction: 'outgoing', status: 'completed', timestamp: 'Today, 8:05 AM', duration: '32:10' },
  { id: 'cl3', conversationId: 'c3', name: 'Jonas Weber', memberIds: ['me', 'u2'], type: 'audio', direction: 'incoming', status: 'missed', timestamp: 'Yesterday, 6:44 PM' },
  { id: 'cl4', conversationId: 'c4', name: 'Priya Nair', memberIds: ['me', 'u3'], type: 'video', direction: 'outgoing', status: 'completed', timestamp: 'Yesterday, 2:30 PM', duration: '05:18' },
  { id: 'cl5', conversationId: 'c9', name: 'Kenji Tanaka', memberIds: ['me', 'u6'], type: 'audio', direction: 'incoming', status: 'completed', timestamp: 'Mon, 11:20 AM', duration: '12:03' },
  { id: 'cl6', conversationId: 'c11', name: 'Launch Team', memberIds: ['me', 'u8', 'u10', 'u13'], type: 'video', direction: 'outgoing', status: 'missed', timestamp: 'Mon, 9:00 AM' },
  { id: 'cl7', conversationId: 'c12', name: 'Liam O\'Connor', memberIds: ['me', 'u8'], type: 'audio', direction: 'outgoing', status: 'completed', timestamp: 'Sun, 4:15 PM', duration: '08:55' },
  { id: 'cl8', conversationId: 'c14', name: 'Mateo Silva', memberIds: ['me', 'u10'], type: 'video', direction: 'incoming', status: 'completed', timestamp: 'Sat, 7:40 PM', duration: '22:31' },
  { id: 'cl9', conversationId: 'c15', name: 'Family', memberIds: ['me', 'u14', 'u15'], type: 'audio', direction: 'incoming', status: 'missed', timestamp: 'Sat, 1:05 PM' },
  { id: 'cl10', conversationId: 'c5', name: 'Weekend Hikers', memberIds: ['me', 'u4', 'u5', 'u12'], type: 'audio', direction: 'outgoing', status: 'completed', timestamp: 'Fri, 6:30 PM', duration: '15:47' },
];
