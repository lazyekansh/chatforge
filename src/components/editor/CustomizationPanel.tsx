'use client';

import { useEditorStore } from '@/stores/editorStore';
import { platformList, getPlatformConfig } from '@/lib/platforms';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Palette, Smartphone, User, MessageSquare,
  Clock, Battery, Wifi, Signal, Type, Sparkles, Forward,
  ToggleLeft, ToggleRight, CheckCheck, Check,
  ChevronDown, Image as ImageIcon, Smile, Hash
} from 'lucide-react';
import { useState } from 'react';
import { MessageStatus } from '@/lib/types';

type Tab = 'platform' | 'message' | 'phone' | 'contact';

export default function CustomizationPanel() {
  const {
    platform, setPlatform,
    messages, selectedMessageId, updateMessage,
    contacts, activeContactId, updateContact,
    phoneSettings, updatePhoneSettings,
    isTyping, setIsTyping,
  } = useEditorStore();

  const [activeTab, setActiveTab] = useState<Tab>('platform');
  const config = getPlatformConfig(platform);
  const selectedMessage = messages.find(m => m.id === selectedMessageId);
  const activeContact = contacts.find(c => c.id === activeContactId);

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'platform', label: 'Platform', icon: Smartphone },
    { id: 'message', label: 'Message', icon: MessageSquare },
    { id: 'phone', label: 'Phone', icon: Settings },
    { id: 'contact', label: 'Contact', icon: User },
  ];

  return (
    <div className="w-80 h-full border-l border-[var(--border)] bg-[var(--bg-secondary)] flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-[var(--border)]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-[var(--accent-light)]'
                : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-[var(--accent)] rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <AnimatePresence mode="wait">
          {/* Platform Tab */}
          {activeTab === 'platform' && (
            <motion.div
              key="platform"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-5"
            >
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-3 block">
                  Select Platform
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {platformList.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        platform === p.id
                          ? 'bg-[var(--accent-subtle)] text-[var(--accent-light)] border border-[var(--border-accent)] shadow-sm'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-hover)]'
                      }`}
                    >
                      <span className="text-base">{p.icon}</span>
                      <span className="truncate">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform Info */}
              {config && (
                <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                  <h4 className="text-xs font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--accent-light)]" />
                    Platform Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    {Object.entries(config.features).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${value ? 'bg-[var(--success)]' : 'bg-[var(--text-tertiary)]'}`} />
                        <span className="text-[var(--text-secondary)] capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Typing Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span className="text-xs font-medium">Show Typing</span>
                </div>
                <button
                  onClick={() => setIsTyping(!isTyping)}
                  className="text-[var(--accent)]"
                >
                  {isTyping ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6 text-[var(--text-tertiary)]" />}
                </button>
              </div>
            </motion.div>
          )}

          {/* Message Tab */}
          {activeTab === 'message' && (
            <motion.div
              key="message"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              {selectedMessage ? (
                <>
                  <div className="px-3 py-2 rounded-lg bg-[var(--accent-subtle)] border border-[var(--border-accent)] text-xs text-[var(--accent-light)]">
                    Editing message #{messages.findIndex(m => m.id === selectedMessage.id) + 1}
                  </div>

                  {/* Content */}
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Content</label>
                    <textarea
                      value={selectedMessage.content}
                      onChange={(e) => updateMessage(selectedMessage.id, { content: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-sm text-[var(--text-primary)] resize-none focus:outline-none focus:border-[var(--accent)] transition-colors"
                      rows={3}
                      placeholder="Message content..."
                    />
                  </div>

                  {/* Sender */}
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Sender</label>
                    <div className="flex gap-1.5">
                      {contacts.filter(c => c.id !== 'system').map(c => (
                        <button
                          key={c.id}
                          onClick={() => updateMessage(selectedMessage.id, { senderId: c.id })}
                          className={`flex-1 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                            selectedMessage.senderId === c.id
                              ? 'bg-[var(--accent)] text-white'
                              : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-hover)]'
                          }`}
                        >
                          {c.id === 'user' ? 'You' : c.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      Timestamp
                    </label>
                    <input
                      type="text"
                      value={selectedMessage.timestamp}
                      onChange={(e) => updateMessage(selectedMessage.id, { timestamp: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                      placeholder="10:30 AM"
                    />
                  </div>

                  {/* Status */}
                  {selectedMessage.senderId === 'user' && (
                    <div>
                      <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block flex items-center gap-1.5">
                        <CheckCheck className="w-3 h-3" />
                        Delivery Status
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {(['sending', 'sent', 'delivered', 'read'] as MessageStatus[]).map(status => (
                          <button
                            key={status}
                            onClick={() => updateMessage(selectedMessage.id, { status })}
                            className={`px-2 py-1.5 rounded-lg text-[10px] font-medium capitalize transition-all ${
                              selectedMessage.status === status
                                ? 'bg-[var(--accent)] text-white'
                                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)]'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message Type */}
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Type</label>
                    <select
                      value={selectedMessage.type}
                      onChange={(e) => updateMessage(selectedMessage.id, { type: e.target.value as 'text' })}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    >
                      <option value="text">Text</option>
                      <option value="image">Image</option>
                      <option value="voice">Voice Note</option>
                      <option value="reply">Reply</option>
                      <option value="forwarded">Forwarded</option>
                      <option value="deleted">Deleted</option>
                      <option value="system">System</option>
                    </select>
                  </div>

                  {/* Reactions */}
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block flex items-center gap-1.5">
                      <Smile className="w-3 h-3" />
                      Reactions
                    </label>
                    <div className="flex gap-1.5 flex-wrap">
                      {['❤️', '😂', '😮', '😢', '🙏', '👍', '👎', '🔥'].map(emoji => {
                        const hasReaction = selectedMessage.reactions.some(r => r.emoji === emoji);
                        return (
                          <button
                            key={emoji}
                            onClick={() => {
                              const newReactions = hasReaction
                                ? selectedMessage.reactions.filter(r => r.emoji !== emoji)
                                : [...selectedMessage.reactions, { emoji, userId: 'user' }];
                              updateMessage(selectedMessage.id, { reactions: newReactions });
                            }}
                            className={`text-lg w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                              hasReaction
                                ? 'bg-[var(--accent-subtle)] border border-[var(--border-accent)] scale-110'
                                : 'bg-[var(--bg-elevated)] border border-[var(--border)] hover:scale-110'
                            }`}
                          >
                            {emoji}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Forwarded toggle */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                    <span className="text-xs font-medium flex items-center gap-1.5">
                      <Forward className="w-3 h-3" /> Forwarded
                    </span>
                    <button
                      onClick={() => updateMessage(selectedMessage.id, { isForwarded: !selectedMessage.isForwarded })}
                    >
                      {selectedMessage.isForwarded
                        ? <ToggleRight className="w-6 h-6 text-[var(--accent)]" />
                        : <ToggleLeft className="w-6 h-6 text-[var(--text-tertiary)]" />}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="w-10 h-10 text-[var(--text-tertiary)] mb-3" />
                  <p className="text-sm text-[var(--text-secondary)]">Select a message</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1">Click a message in the sidebar to edit it</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Phone Tab */}
          {activeTab === 'phone' && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              {/* Time */}
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  Status Bar Time
                </label>
                <input
                  type="text"
                  value={phoneSettings.time}
                  onChange={(e) => updatePhoneSettings({ time: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  placeholder="9:41"
                />
              </div>

              {/* Battery */}
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block flex items-center gap-1.5">
                  <Battery className="w-3 h-3" />
                  Battery Level: {phoneSettings.batteryLevel}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={phoneSettings.batteryLevel}
                  onChange={(e) => updatePhoneSettings({ batteryLevel: parseInt(e.target.value) })}
                  className="w-full accent-[var(--accent)]"
                />
              </div>

              {/* Signal */}
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block flex items-center gap-1.5">
                  <Signal className="w-3 h-3" />
                  Signal Bars: {phoneSettings.signalBars}
                </label>
                <input
                  type="range"
                  min={0}
                  max={4}
                  value={phoneSettings.signalBars}
                  onChange={(e) => updatePhoneSettings({ signalBars: parseInt(e.target.value) })}
                  className="w-full accent-[var(--accent)]"
                />
              </div>

              {/* Carrier */}
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">
                  Carrier Name
                </label>
                <input
                  type="text"
                  value={phoneSettings.carrier}
                  onChange={(e) => updatePhoneSettings({ carrier: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  placeholder="Carrier"
                />
              </div>

              {/* WiFi Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                <span className="text-xs font-medium flex items-center gap-1.5">
                  <Wifi className="w-3 h-3" /> WiFi
                </span>
                <button onClick={() => updatePhoneSettings({ isWifi: !phoneSettings.isWifi })}>
                  {phoneSettings.isWifi
                    ? <ToggleRight className="w-6 h-6 text-[var(--accent)]" />
                    : <ToggleLeft className="w-6 h-6 text-[var(--text-tertiary)]" />}
                </button>
              </div>
            </motion.div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && activeContact && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              {/* Avatar */}
              <div className="flex flex-col items-center py-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-2xl font-bold text-white mb-3">
                  {activeContact.name.charAt(0)}
                </div>
                <p className="text-sm font-semibold">{activeContact.name}</p>
              </div>

              {/* Name */}
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Display Name</label>
                <input
                  type="text"
                  value={activeContact.name}
                  onChange={(e) => updateContact(activeContact.id, { name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              {/* About / Status */}
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">About / Status</label>
                <input
                  type="text"
                  value={activeContact.about || ''}
                  onChange={(e) => updateContact(activeContact.id, { about: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  placeholder="Hey there!"
                />
              </div>

              {/* Online Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                <span className="text-xs font-medium flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[var(--online)]" /> Online Status
                </span>
                <button onClick={() => updateContact(activeContact.id, { isOnline: !activeContact.isOnline })}>
                  {activeContact.isOnline
                    ? <ToggleRight className="w-6 h-6 text-[var(--accent)]" />
                    : <ToggleLeft className="w-6 h-6 text-[var(--text-tertiary)]" />}
                </button>
              </div>

              {/* Last Seen */}
              {!activeContact.isOnline && (
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Last Seen</label>
                  <input
                    type="text"
                    value={activeContact.lastSeen || ''}
                    onChange={(e) => updateContact(activeContact.id, { lastSeen: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    placeholder="last seen today at 2:30 PM"
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
