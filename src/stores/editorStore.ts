import { create } from 'zustand';
import { Message, Contact, Platform, PhoneSettings, MessageStatus } from '@/lib/types';
import { generateId } from '@/lib/utils';

interface HistoryEntry {
  messages: Message[];
  contacts: Contact[];
}

interface EditorStore {
  // Project
  projectId: string;
  projectName: string;

  // Platform
  platform: Platform;
  setPlatform: (platform: Platform) => void;

  // Contacts
  contacts: Contact[];
  activeContactId: string;
  setActiveContact: (id: string) => void;
  addContact: (contact: Partial<Contact>) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;

  // Messages
  messages: Message[];
  selectedMessageId: string | null;
  selectMessage: (id: string | null) => void;
  addMessage: (msg: Partial<Message>) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  reorderMessages: (fromIndex: number, toIndex: number) => void;
  duplicateMessage: (id: string) => void;

  // Phone Settings
  phoneSettings: PhoneSettings;
  updatePhoneSettings: (updates: Partial<PhoneSettings>) => void;

  // UI State
  isTyping: boolean;
  showKeyboard: boolean;
  setIsTyping: (v: boolean) => void;
  setShowKeyboard: (v: boolean) => void;

  // History (Undo/Redo)
  history: HistoryEntry[];
  historyIndex: number;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Project Management
  setProjectName: (name: string) => void;
  loadProject: (data: {
    projectId: string;
    projectName: string;
    platform: Platform;
    contacts: Contact[];
    messages: Message[];
    phoneSettings: PhoneSettings;
  }) => void;
  resetEditor: () => void;
}

const DEFAULT_CONTACTS: Contact[] = [
  {
    id: 'user',
    name: 'You',
    avatar: '',
    isOnline: true,
    about: 'Hey there! I am using ChatForge',
  },
  {
    id: 'contact-1',
    name: 'Alex Johnson',
    avatar: '',
    isOnline: true,
    lastSeen: 'online',
    about: 'Available',
  },
];

const DEFAULT_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    type: 'text',
    content: 'Hey! How are you doing? 😊',
    senderId: 'contact-1',
    timestamp: '10:30 AM',
    status: 'read',
    reactions: [],
  },
  {
    id: 'msg-2',
    type: 'text',
    content: "I'm great! Just finished that project we talked about 🎉",
    senderId: 'user',
    timestamp: '10:31 AM',
    status: 'read',
    reactions: [],
  },
  {
    id: 'msg-3',
    type: 'text',
    content: "That's awesome! Can you send me the details?",
    senderId: 'contact-1',
    timestamp: '10:32 AM',
    status: 'read',
    reactions: [],
  },
  {
    id: 'msg-4',
    type: 'text',
    content: "Sure thing! Let me grab the link real quick",
    senderId: 'user',
    timestamp: '10:33 AM',
    status: 'delivered',
    reactions: [],
  },
  {
    id: 'msg-5',
    type: 'text',
    content: "Take your time! No rush 😄",
    senderId: 'contact-1',
    timestamp: '10:33 AM',
    status: 'read',
    reactions: [{ emoji: '❤️', userId: 'user' }],
  },
];

const DEFAULT_PHONE_SETTINGS: PhoneSettings = {
  batteryLevel: 85,
  signalBars: 4,
  carrier: 'Carrier',
  time: '10:33',
  isWifi: true,
  isDarkMode: true,
  wallpaper: 'default',
  isNotchPhone: true,
};

const pushHistory = (state: EditorStore): Partial<EditorStore> => {
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push({
    messages: JSON.parse(JSON.stringify(state.messages)),
    contacts: JSON.parse(JSON.stringify(state.contacts)),
  });
  // Keep max 50 history entries
  if (newHistory.length > 50) newHistory.shift();
  return {
    history: newHistory,
    historyIndex: newHistory.length - 1,
  };
};

export const useEditorStore = create<EditorStore>((set, get) => ({
  // Project
  projectId: generateId(),
  projectName: 'Untitled Project',

  // Platform
  platform: 'whatsapp',
  setPlatform: (platform) => set({ platform }),

  // Contacts
  contacts: DEFAULT_CONTACTS,
  activeContactId: 'contact-1',
  setActiveContact: (id) => set({ activeContactId: id }),
  addContact: (contact) =>
    set((state) => ({
      contacts: [
        ...state.contacts,
        {
          id: generateId(),
          name: contact.name || 'New Contact',
          avatar: contact.avatar || '',
          isOnline: contact.isOnline ?? false,
          lastSeen: contact.lastSeen,
          about: contact.about || '',
          ...contact,
        } as Contact,
      ],
      ...pushHistory(state),
    })),
  updateContact: (id, updates) =>
    set((state) => ({
      contacts: state.contacts.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c.id !== id),
      ...pushHistory(state),
    })),

  // Messages
  messages: DEFAULT_MESSAGES,
  selectedMessageId: null,
  selectMessage: (id) => set({ selectedMessageId: id }),
  addMessage: (msg) =>
    set((state) => {
      const newMsg: Message = {
        id: generateId(),
        type: msg.type || 'text',
        content: msg.content || '',
        senderId: msg.senderId || 'user',
        timestamp: msg.timestamp || new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        status: (msg.status as MessageStatus) || 'sent',
        reactions: msg.reactions || [],
        replyToId: msg.replyToId,
        imageUrl: msg.imageUrl,
        voiceDuration: msg.voiceDuration,
        isForwarded: msg.isForwarded,
        isStarred: msg.isStarred,
        stickerUrl: msg.stickerUrl,
      };
      return {
        messages: [...state.messages, newMsg],
        selectedMessageId: newMsg.id,
        ...pushHistory(state),
      };
    }),
  updateMessage: (id, updates) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
      ...pushHistory(state),
    })),
  deleteMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((m) => m.id !== id),
      selectedMessageId: state.selectedMessageId === id ? null : state.selectedMessageId,
      ...pushHistory(state),
    })),
  reorderMessages: (fromIndex, toIndex) =>
    set((state) => {
      const msgs = [...state.messages];
      const [moved] = msgs.splice(fromIndex, 1);
      msgs.splice(toIndex, 0, moved);
      return { messages: msgs, ...pushHistory(state) };
    }),
  duplicateMessage: (id) =>
    set((state) => {
      const msg = state.messages.find((m) => m.id === id);
      if (!msg) return state;
      const newMsg = { ...msg, id: generateId() };
      const index = state.messages.findIndex((m) => m.id === id);
      const msgs = [...state.messages];
      msgs.splice(index + 1, 0, newMsg);
      return { messages: msgs, ...pushHistory(state) };
    }),

  // Phone Settings
  phoneSettings: DEFAULT_PHONE_SETTINGS,
  updatePhoneSettings: (updates) =>
    set((state) => ({
      phoneSettings: { ...state.phoneSettings, ...updates },
    })),

  // UI
  isTyping: false,
  showKeyboard: false,
  setIsTyping: (v) => set({ isTyping: v }),
  setShowKeyboard: (v) => set({ showKeyboard: v }),

  // History
  history: [
    {
      messages: JSON.parse(JSON.stringify(DEFAULT_MESSAGES)),
      contacts: JSON.parse(JSON.stringify(DEFAULT_CONTACTS)),
    },
  ],
  historyIndex: 0,
  undo: () =>
    set((state) => {
      if (state.historyIndex <= 0) return state;
      const newIndex = state.historyIndex - 1;
      const entry = state.history[newIndex];
      return {
        messages: JSON.parse(JSON.stringify(entry.messages)),
        contacts: JSON.parse(JSON.stringify(entry.contacts)),
        historyIndex: newIndex,
      };
    }),
  redo: () =>
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIndex = state.historyIndex + 1;
      const entry = state.history[newIndex];
      return {
        messages: JSON.parse(JSON.stringify(entry.messages)),
        contacts: JSON.parse(JSON.stringify(entry.contacts)),
        historyIndex: newIndex,
      };
    }),
  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  // Project
  setProjectName: (name) => set({ projectName: name }),
  loadProject: (data) =>
    set({
      ...data,
      history: [
        {
          messages: JSON.parse(JSON.stringify(data.messages)),
          contacts: JSON.parse(JSON.stringify(data.contacts)),
        },
      ],
      historyIndex: 0,
      selectedMessageId: null,
    }),
  resetEditor: () =>
    set({
      projectId: generateId(),
      projectName: 'Untitled Project',
      platform: 'whatsapp',
      contacts: DEFAULT_CONTACTS,
      activeContactId: 'contact-1',
      messages: DEFAULT_MESSAGES,
      selectedMessageId: null,
      phoneSettings: DEFAULT_PHONE_SETTINGS,
      isTyping: false,
      showKeyboard: false,
      history: [
        {
          messages: JSON.parse(JSON.stringify(DEFAULT_MESSAGES)),
          contacts: JSON.parse(JSON.stringify(DEFAULT_CONTACTS)),
        },
      ],
      historyIndex: 0,
    }),
}));
