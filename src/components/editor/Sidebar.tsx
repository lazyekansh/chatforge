'use client';

import { useEditorStore } from '@/stores/editorStore';
import { platformList } from '@/lib/platforms';
import { motion } from 'framer-motion';
import {
  Plus, Trash2, GripVertical, Copy, MessageSquare,
  Image, Mic, Reply, Forward, Ban, Star,
  ChevronDown, Users, FolderOpen
} from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const {
    messages, contacts, activeContactId, platform,
    addMessage, deleteMessage, selectMessage, selectedMessageId,
    duplicateMessage, setActiveContact, addContact
  } = useEditorStore();

  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const activeContact = contacts.find(c => c.id === activeContactId);
  const otherContacts = contacts.filter(c => c.id !== 'user');

  const messageTypeOptions = [
    { type: 'text', icon: MessageSquare, label: 'Text Message', senderOptions: true },
    { type: 'image', icon: Image, label: 'Image', senderOptions: true },
    { type: 'voice', icon: Mic, label: 'Voice Note', senderOptions: true },
    { type: 'reply', icon: Reply, label: 'Reply', senderOptions: true },
    { type: 'forwarded', icon: Forward, label: 'Forwarded', senderOptions: true },
    { type: 'deleted', icon: Ban, label: 'Deleted Message', senderOptions: true },
    { type: 'system', icon: Star, label: 'System Message', senderOptions: false },
  ];

  const handleAddMessage = (type: string, senderId: string = 'user') => {
    const defaults: Record<string, string> = {
      text: 'New message...',
      image: '',
      voice: '',
      reply: 'Reply message...',
      forwarded: 'Forwarded message...',
      deleted: '',
      system: 'System notification',
    };
    addMessage({
      type: type as 'text',
      content: defaults[type] || 'New message...',
      senderId: type === 'system' ? 'system' : senderId,
      replyToId: type === 'reply' && messages.length > 0 ? messages[messages.length - 1].id : undefined,
      isForwarded: type === 'forwarded',
      voiceDuration: type === 'voice' ? 15 : undefined,
    });
  };

  const handleAddContact = () => {
    if (newContactName.trim()) {
      addContact({ name: newContactName.trim() });
      setNewContactName('');
      setShowAddContact(false);
    }
  };

  return (
    <div className="w-72 h-full border-r border-[var(--border)] bg-[var(--bg-secondary)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border)]">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-[var(--accent-light)]" />
          Conversation
        </h2>
      </div>

      {/* Contacts Section */}
      <div className="p-3 border-b border-[var(--border)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
            <Users className="w-3 h-3 inline mr-1" />
            Contacts
          </span>
          <button
            onClick={() => setShowAddContact(!showAddContact)}
            className="p-1 rounded hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--accent-light)] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {showAddContact && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-2"
          >
            <div className="flex gap-1.5">
              <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddContact()}
                placeholder="Contact name..."
                className="flex-1 px-2.5 py-1.5 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)]"
                autoFocus
              />
              <button onClick={handleAddContact} className="px-2 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs">
                Add
              </button>
            </div>
          </motion.div>
        )}

        <div className="space-y-0.5">
          {otherContacts.map(contact => (
            <button
              key={contact.id}
              onClick={() => setActiveContact(contact.id)}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-all text-xs ${
                contact.id === activeContactId
                  ? 'bg-[var(--accent-subtle)] text-[var(--accent-light)] border border-[var(--border-accent)]'
                  : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                {contact.name.charAt(0)}
              </div>
              <span className="truncate font-medium">{contact.name}</span>
              {contact.isOnline && <div className="w-2 h-2 rounded-full bg-[var(--online)] ml-auto shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
              Messages ({messages.length})
            </span>
          </div>

          <div className="space-y-0.5">
            {messages.map((msg, index) => {
              const isSent = msg.senderId === 'user';
              const contact = contacts.find(c => c.id === msg.senderId);

              return (
                <motion.div
                  key={msg.id}
                  layout
                  className={`group flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer transition-all text-xs ${
                    selectedMessageId === msg.id
                      ? 'bg-[var(--accent-subtle)] border border-[var(--border-accent)]'
                      : 'hover:bg-[var(--bg-hover)]'
                  }`}
                  onClick={() => selectMessage(msg.id)}
                >
                  <GripVertical className="w-3 h-3 text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 cursor-grab shrink-0" />

                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSent ? 'bg-[var(--accent)]' : 'bg-pink-400'}`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-[10px] font-medium text-[var(--text-tertiary)]">
                        {isSent ? 'You' : contact?.name || 'Unknown'}
                      </span>
                      {msg.type !== 'text' && (
                        <span className="text-[9px] px-1 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-tertiary)]">
                          {msg.type}
                        </span>
                      )}
                    </div>
                    <p className="truncate text-[var(--text-secondary)] leading-tight">
                      {msg.type === 'deleted' ? '🚫 Deleted' : msg.type === 'voice' ? '🎤 Voice note' : msg.type === 'image' ? '🖼️ Image' : msg.content}
                    </p>
                  </div>

                  <span className="text-[9px] text-[var(--text-tertiary)] shrink-0">{msg.timestamp}</span>

                  {/* Actions */}
                  <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); duplicateMessage(msg.id); }}
                      className="p-1 rounded hover:bg-[var(--bg-elevated)] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
                      className="p-1 rounded hover:bg-red-500/10 text-[var(--text-tertiary)] hover:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Message */}
      <div className="p-3 border-t border-[var(--border)]">
        <div className="relative group">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Add Message
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Dropdown */}
          <div className="absolute bottom-full left-0 right-0 mb-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl shadow-xl overflow-hidden">
              {messageTypeOptions.map(opt => (
                <div key={opt.type}>
                  {opt.senderOptions ? (
                    <div className="flex">
                      <button
                        onClick={() => handleAddMessage(opt.type, 'user')}
                        className="flex-1 flex items-center gap-2 px-3 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors border-r border-[var(--border)]"
                      >
                        <opt.icon className="w-3.5 h-3.5" />
                        {opt.label}
                        <span className="ml-auto text-[9px] text-[var(--accent-light)]">→</span>
                      </button>
                      <button
                        onClick={() => handleAddMessage(opt.type, activeContactId)}
                        className="px-3 py-2 text-[9px] text-[var(--text-tertiary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        ←
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddMessage(opt.type)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <opt.icon className="w-3.5 h-3.5" />
                      {opt.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
