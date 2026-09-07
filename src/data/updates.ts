import type { Channel, Update } from './types';

export const updates: Update[] = [
  { id: 'up1', authorId: 'u1', kind: 'photo', text: 'Studio day ☀️', timestamp: '2h ago', viewed: false, gradient: 1 },
  { id: 'up2', authorId: 'u3', kind: 'photo', text: 'Golden hour', timestamp: '4h ago', viewed: false, gradient: 3 },
  { id: 'up3', authorId: 'u6', kind: 'text', text: 'New paper out today!', timestamp: '6h ago', viewed: true, gradient: 6 },
  { id: 'up4', authorId: 'u9', kind: 'video', text: 'Sketch timelapse', timestamp: '8h ago', viewed: false, gradient: 1 },
  { id: 'up5', authorId: 'u13', kind: 'photo', text: 'Launch week 🚀', timestamp: 'Yesterday', viewed: true, gradient: 5 },
  { id: 'up6', authorId: 'u4', kind: 'text', text: 'New build is live!', timestamp: 'Yesterday', viewed: true, gradient: 4 },
  { id: 'up7', authorId: 'u8', kind: 'photo', text: 'Coffee + code', timestamp: '2d ago', viewed: true, gradient: 0 },
  { id: 'up8', authorId: 'u15', kind: 'video', text: 'Kitchen experiments', timestamp: '2d ago', viewed: true, gradient: 7 },
];

export const channels: Channel[] = [
  { id: 'ch1', name: 'Pulse Design', handle: '@pulsedesign', description: 'Weekly design tips and trends', followers: 12800, gradient: 0, following: false, verified: true },
  { id: 'ch2', name: 'Dev Digest', handle: '@devdigest', description: 'Engineering news, daily', followers: 45200, gradient: 1, following: true, verified: true },
  { id: 'ch3', name: 'Mindful Mornings', handle: '@mindfulmornings', description: 'Calm starts to your day', followers: 8900, gradient: 2, following: false, verified: false },
  { id: 'ch4', name: 'Photo Lab', handle: '@photolab', description: 'Photography tutorials', followers: 21300, gradient: 3, following: false, verified: true },
  { id: 'ch5', name: 'Startup Stories', handle: '@startupstories', description: 'Founder journeys', followers: 33400, gradient: 4, following: true, verified: true },
];
