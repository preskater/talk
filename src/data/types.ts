export type UserId = string;
export type ConversationId = string;
export type MessageId = string;
export type CallId = string;
export type UpdateId = string;
export type SpaceId = string;

export type Presence = 'online' | 'offline' | 'away';

export type User = {
  id: UserId;
  name: string;
  handle: string;
  bio: string;
  initials: string;
  gradient: number;
  presence: Presence;
  verified: boolean;
  lastSeen?: string;
};

export type ConversationType = 'direct' | 'group';

export type Conversation = {
  id: ConversationId;
  type: ConversationType;
  name: string;
  memberIds: UserId[];
  lastMessageId?: MessageId;
  unread: number;
  pinned: boolean;
  muted: boolean;
  archived: boolean;
  verified: boolean;
  typing?: boolean;
  lastActivity: string;
};

export type MessageKind =
  | 'text'
  | 'emoji'
  | 'image'
  | 'voice'
  | 'file'
  | 'link'
  | 'poll'
  | 'event'
  | 'system';

export type DeliveryState = 'sent' | 'delivered' | 'read';

export type Reaction = {
  emoji: string;
  userIds: UserId[];
};

export type PollOption = {
  id: string;
  label: string;
  votes: number;
};

export type Message = {
  id: MessageId;
  conversationId: ConversationId;
  senderId: UserId | 'me' | 'system';
  kind: MessageKind;
  text?: string;
  timestamp: string;
  delivery?: DeliveryState;
  reactions?: Reaction[];
  replyTo?: { senderName: string; preview: string };
  imageAspect?: number;
  fileName?: string;
  fileSize?: string;
  linkUrl?: string;
  linkTitle?: string;
  linkDescription?: string;
  voiceDuration?: number;
  pollQuestion?: string;
  pollOptions?: PollOption[];
  eventTitle?: string;
  eventTime?: string;
};

export type CallType = 'audio' | 'video';
export type CallDirection = 'incoming' | 'outgoing';
export type CallStatus = 'completed' | 'missed';

export type Call = {
  id: CallId;
  conversationId: ConversationId;
  name: string;
  memberIds: UserId[];
  type: CallType;
  direction: CallDirection;
  status: CallStatus;
  timestamp: string;
  duration?: string;
};

export type UpdateKind = 'photo' | 'text' | 'video';

export type Update = {
  id: UpdateId;
  authorId: UserId;
  kind: UpdateKind;
  text?: string;
  timestamp: string;
  viewed: boolean;
  gradient: number;
};

export type Channel = {
  id: string;
  name: string;
  handle: string;
  description: string;
  followers: number;
  gradient: number;
  following: boolean;
  verified: boolean;
};

export type SpaceCategory = 'Technology' | 'Design' | 'Games' | 'Local' | 'Study' | 'Automotive';

export type Space = {
  id: SpaceId;
  name: string;
  description: string;
  category: SpaceCategory;
  memberCount: number;
  tags: string[];
  gradient: number;
  joined: boolean;
  featured: boolean;
  announcement: string;
  recentActivity: string;
};
