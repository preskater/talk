import type { Space } from './types';

export const spaces: Space[] = [
  { id: 's1', name: 'Swift & SwiftUI', description: 'Everything about building native iOS apps with Swift and SwiftUI.', category: 'Technology', memberCount: 18400, tags: ['iOS', 'Swift', 'SwiftUI'], gradient: 0, joined: true, featured: true, announcement: 'WWDC recap thread is live!', recentActivity: 'Maya posted a new tutorial' },
  { id: 's2', name: 'Design Systems', description: 'Tokens, components, and the craft of consistent interfaces.', category: 'Design', memberCount: 9200, tags: ['UI', 'Tokens', 'Figma'], gradient: 1, joined: false, featured: true, announcement: 'Monthly critique this Friday', recentActivity: '12 new members joined' },
  { id: 's3', name: 'Indie Game Dev', description: 'Solo and small-team game development, from prototype to release.', category: 'Games', memberCount: 15600, tags: ['Unity', 'Godot', 'Pixel Art'], gradient: 2, joined: true, featured: false, announcement: 'Game jam signups open', recentActivity: 'Diego shared a playtest build' },
  { id: 's4', name: 'City Explorers', description: 'Hidden gems, food spots, and walks around your city.', category: 'Local', memberCount: 4300, tags: ['Food', 'Walks', 'Events'], gradient: 3, joined: false, featured: false, announcement: 'Weekend market meetup', recentActivity: 'New photo walk announced' },
  { id: 's5', name: 'Study Together', description: 'Accountability partners and focused study sessions.', category: 'Study', memberCount: 7800, tags: ['Pomodoro', 'Notes', 'Exams'], gradient: 4, joined: false, featured: true, announcement: 'Exam season study groups', recentActivity: 'Elena shared her notes' },
  { id: 's6', name: 'Garage & Motors', description: 'Classic cars, restorations, and weekend wrenching.', category: 'Automotive', memberCount: 6100, tags: ['Restoration', 'EV', 'Track'], gradient: 5, joined: false, featured: false, announcement: 'Spring meetup announced', recentActivity: 'Felix posted a build log' },
  { id: 's7', name: 'Type & Lettering', description: 'Typography, calligraphy, and the art of letters.', category: 'Design', memberCount: 5200, tags: ['Type', 'Calligraphy'], gradient: 6, joined: true, featured: false, announcement: 'New typeface showcase', recentActivity: 'Hana shared a lettering piece' },
  { id: 's8', name: 'AI Builders', description: 'Shipping products on top of modern AI models.', category: 'Technology', memberCount: 22100, tags: ['LLM', 'Agents', 'RAG'], gradient: 7, joined: false, featured: true, announcement: 'Demo day next month', recentActivity: 'Kenji posted benchmark results' },
];

export const spaceCategories = ['Technology', 'Design', 'Games', 'Local', 'Study', 'Automotive'] as const;

export function getSpace(id: string): Space | undefined {
  return spaces.find((s) => s.id === id);
}
