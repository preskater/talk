import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { conversations as seedConversations } from '@/data/conversations';
import { messages as seedMessages } from '@/data/messages';
import type { Conversation, Message } from '@/data/types';

type StoreContextValue = {
  conversations: Conversation[];
  messages: Message[];
  updateConversation: (id: string, patch: Partial<Conversation>) => void;
  addMessage: (message: Message) => void;
  markRead: (id: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(seedConversations);
  const [messages, setMessages] = useState<Message[]>(seedMessages);

  const value = useMemo<StoreContextValue>(
    () => ({
      conversations,
      messages,
      updateConversation: (id, patch) =>
        setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c))),
      addMessage: (message) => setMessages((prev) => [...prev, message]),
      markRead: (id) =>
        setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))),
    }),
    [conversations, messages],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
}
