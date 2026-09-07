import type { User } from './types';

export const me: User = {
  id: 'me',
  name: 'Alex Morgan',
  handle: '@alexmorgan',
  bio: 'Building calm, useful software.',
  initials: 'AM',
  gradient: 0,
  presence: 'online',
  verified: true,
};

export const users: User[] = [
  me,
  { id: 'u1', name: 'Maya Chen', handle: '@mayachen', bio: 'Product designer in SF', initials: 'MC', gradient: 1, presence: 'online', verified: true },
  { id: 'u2', name: 'Jonas Weber', handle: '@jonasw', bio: 'Backend engineer', initials: 'JW', gradient: 2, presence: 'offline', verified: false, lastSeen: '2h ago' },
  { id: 'u3', name: 'Priya Nair', handle: '@priyanair', bio: 'Photographer', initials: 'PN', gradient: 3, presence: 'online', verified: true },
  { id: 'u4', name: 'Diego Ramos', handle: '@diegoramos', bio: 'Indie game dev', initials: 'DR', gradient: 4, presence: 'away', verified: false },
  { id: 'u5', name: 'Sofia Rossi', handle: '@sofiarossi', bio: 'Architect', initials: 'SR', gradient: 5, presence: 'offline', verified: false, lastSeen: 'yesterday' },
  { id: 'u6', name: 'Kenji Tanaka', handle: '@kenjitanaka', bio: 'Data scientist', initials: 'KT', gradient: 6, presence: 'online', verified: true },
  { id: 'u7', name: 'Amara Okafor', handle: '@amaraokafor', bio: 'Writer & editor', initials: 'AO', gradient: 7, presence: 'offline', verified: false, lastSeen: '3d ago' },
  { id: 'u8', name: 'Liam O\'Connor', handle: '@liamoc', bio: 'iOS engineer', initials: 'LO', gradient: 0, presence: 'online', verified: true },
  { id: 'u9', name: 'Hana Kim', handle: '@hanakim', bio: 'Illustrator', initials: 'HK', gradient: 1, presence: 'away', verified: false },
  { id: 'u10', name: 'Mateo Silva', handle: '@mateosilva', bio: 'Startup founder', initials: 'MS', gradient: 2, presence: 'offline', verified: true, lastSeen: '1h ago' },
  { id: 'u11', name: 'Elena Petrova', handle: '@elenapetrova', bio: 'Researcher', initials: 'EP', gradient: 3, presence: 'online', verified: false },
  { id: 'u12', name: 'Noah Williams', handle: '@noahw', bio: 'Musician', initials: 'NW', gradient: 4, presence: 'offline', verified: false, lastSeen: '5d ago' },
  { id: 'u13', name: 'Zara Ahmed', handle: '@zaraahmed', bio: 'Product manager', initials: 'ZA', gradient: 5, presence: 'online', verified: true },
  { id: 'u14', name: 'Felix Braun', handle: '@felixbraun', bio: 'Mechanical engineer', initials: 'FB', gradient: 6, presence: 'offline', verified: false, lastSeen: '1d ago' },
  { id: 'u15', name: 'Isabella Costa', handle: '@isabellacosta', bio: 'Chef', initials: 'IC', gradient: 7, presence: 'away', verified: false },
];

export function getUser(id: string): User {
  return users.find((u) => u.id === id) ?? me;
}
