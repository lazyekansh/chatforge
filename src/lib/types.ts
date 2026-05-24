export type Platform = 
  | 'whatsapp' 
  | 'imessage' 
  | 'instagram' 
  | 'telegram' 
  | 'discord' 
  | 'snapchat' 
  | 'messenger' 
  | 'twitter';

export type MessageType = 
  | 'text' 
  | 'image' 
  | 'voice' 
  | 'deleted' 
  | 'system' 
  | 'reply' 
  | 'forwarded'
  | 'sticker'
  | 'location'
  | 'contact'
  | 'poll';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

export interface Reaction {
  emoji: string;
  userId: string;
}

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  senderId: string;
  timestamp: string;
  status: MessageStatus;
  replyToId?: string;
  reactions: Reaction[];
  imageUrl?: string;
  voiceDuration?: number;
  isForwarded?: boolean;
  isStarred?: boolean;
  stickerUrl?: string;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
  isVerified?: boolean;
  phone?: string;
  about?: string;
}

export interface PhoneSettings {
  batteryLevel: number;
  signalBars: number;
  carrier: string;
  time: string;
  isWifi: boolean;
  isDarkMode: boolean;
  wallpaper: string;
  isNotchPhone: boolean;
}

export interface Project {
  id: string;
  name: string;
  platform: Platform;
  messages: Message[];
  contacts: Contact[];
  phoneSettings: PhoneSettings;
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
}

export interface PlatformConfig {
  id: Platform;
  name: string;
  icon: string;
  colors: {
    sentBubble: string;
    receivedBubble: string;
    sentText: string;
    receivedText: string;
    background: string;
    header: string;
    headerText: string;
    inputBar: string;
    accent: string;
    timestamp: string;
    statusBar: string;
  };
  features: {
    readReceipts: boolean;
    typing: boolean;
    reactions: boolean;
    replies: boolean;
    forwarding: boolean;
    voiceNotes: boolean;
    onlineStatus: boolean;
    lastSeen: boolean;
    editMessage: boolean;
    deleteMessage: boolean;
  };
  fonts: {
    primary: string;
    message: string;
  };
  bubbleStyle: {
    borderRadius: string;
    sentRadius: string;
    receivedRadius: string;
    maxWidth: string;
    padding: string;
    hasTail: boolean;
  };
}

export interface Template {
  id: string;
  name: string;
  description: string;
  platform: Platform;
  category: TemplateCategory;
  messages: Message[];
  contacts: Contact[];
  phoneSettings: PhoneSettings;
  thumbnail: string;
  downloads: number;
  author: string;
  isFeatured: boolean;
}

export type TemplateCategory = 
  | 'funny' 
  | 'romantic' 
  | 'business' 
  | 'meme' 
  | 'cinematic' 
  | 'drama' 
  | 'wholesome'
  | 'horror';

export interface EditorState {
  // Project
  projectId: string;
  projectName: string;
  
  // Platform
  platform: Platform;
  
  // Contacts
  contacts: Contact[];
  activeContactId: string;
  
  // Messages
  messages: Message[];
  selectedMessageId: string | null;
  
  // Phone
  phoneSettings: PhoneSettings;
  
  // UI
  isTyping: boolean;
  showKeyboard: boolean;
}
