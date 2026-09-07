import type { Message } from '@/data/types';

export function messagePreview(message: Message | undefined, senderName?: string): string {
  if (!message) return '';
  const prefix = message.senderId === 'me' ? 'You: ' : senderName ? `${senderName}: ` : '';
  switch (message.kind) {
    case 'image':
      return `${prefix}📷 Photo`;
    case 'voice':
      return `${prefix}🎤 Voice message`;
    case 'file':
      return `${prefix}📎 ${message.fileName ?? 'File'}`;
    case 'link':
      return `${prefix}🔗 ${message.linkTitle ?? 'Link'}`;
    case 'poll':
      return `${prefix}📊 ${message.pollQuestion ?? 'Poll'}`;
    case 'event':
      return `${prefix}📅 ${message.eventTitle ?? 'Event'}`;
    case 'system':
      return message.text ?? '';
    case 'emoji':
    case 'text':
    default:
      return `${prefix}${message.text ?? ''}`;
  }
}
