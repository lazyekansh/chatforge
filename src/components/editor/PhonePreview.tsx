'use client';

import { useEditorStore } from '@/stores/editorStore';
import { getPlatformConfig } from '@/lib/platforms';
import { Check, CheckCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function PhonePreview() {
  const { messages, contacts, activeContactId, platform, phoneSettings, isTyping } = useEditorStore();
  const config = getPlatformConfig(platform);
  const activeContact = contacts.find(c => c.id === activeContactId);

  if (!config || !activeContact) return null;

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-white/40" />;
      case 'sent':
        return <Check className="w-3 h-3 text-white/40" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-white/40" />;
      case 'read':
        return <CheckCheck className="w-3 h-3" style={{ color: config.colors.accent }} />;
      default:
        return null;
    }
  };

  // Stable waveform heights so they don't re-render randomly
  const waveHeights = useMemo(() => Array.from({ length: 28 }, () => Math.random() * 14 + 3), []);

  return (
    <div className="flex items-center justify-center p-8">
      <div className="phone-frame">
        <div id="phone-preview-capture" className="phone-screen" style={{ background: config.colors.background }}>
          {/* Dynamic Island */}
          <div className="phone-dynamic-island" />

          {/* Status Bar */}
          <div
            className="flex items-center justify-between px-6 pt-[14px] pb-1 text-[11px] font-semibold"
            style={{ color: config.colors.headerText, background: config.colors.statusBar }}
          >
            <span>{phoneSettings.time || '9:41'}</span>
            <div className="flex items-center gap-1.5">
              {/* Signal */}
              <div className="flex items-end gap-[1px]">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="rounded-[0.5px]"
                    style={{
                      width: '3px',
                      height: `${i * 2.5 + 2}px`,
                      background: i <= phoneSettings.signalBars
                        ? config.colors.headerText
                        : `${config.colors.headerText}33`,
                    }}
                  />
                ))}
              </div>
              {/* WiFi or Carrier */}
              {phoneSettings.isWifi ? (
                <svg className="w-3.5 h-3" viewBox="0 0 15 12" fill={config.colors.headerText}>
                  <path d="M7.5 3.6C9.1 3.6 10.5 4.2 11.6 5.2L13 3.8C11.5 2.4 9.6 1.5 7.5 1.5C5.4 1.5 3.5 2.4 2 3.8L3.4 5.2C4.5 4.2 5.9 3.6 7.5 3.6Z" />
                  <path d="M7.5 7.2C8.3 7.2 9 7.5 9.5 8L7.5 10L5.5 8C6 7.5 6.7 7.2 7.5 7.2Z" />
                </svg>
              ) : (
                <span className="text-[9px]" style={{ color: config.colors.headerText }}>{phoneSettings.carrier}</span>
              )}
              {/* Battery */}
              <div className="flex items-center gap-0.5">
                <div
                  className="w-[22px] h-[10px] border rounded-[2px] relative flex items-center p-[1.5px]"
                  style={{ borderColor: config.colors.headerText }}
                >
                  <div
                    className="h-full rounded-[1px]"
                    style={{
                      width: `${phoneSettings.batteryLevel}%`,
                      background: phoneSettings.batteryLevel > 20 ? '#34C759' : '#FF3B30',
                    }}
                  />
                </div>
                <div
                  className="w-[1.5px] h-[4px] rounded-r-[1px]"
                  style={{ background: config.colors.headerText }}
                />
              </div>
            </div>
          </div>

          {/* Chat Header */}
          <div
            className="flex items-center gap-3 px-3 py-2.5"
            style={{ background: config.colors.header }}
          >
            <div className="text-lg" style={{ color: config.colors.headerText }}>‹</div>
            <div className="relative">
              <div
                className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-xs font-bold text-white"
              >
                {activeContact.avatar || activeContact.name.charAt(0).toUpperCase()}
              </div>
              {config.features.onlineStatus && activeContact.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--online)] border-2" style={{ borderColor: config.colors.header }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold truncate" style={{ color: config.colors.headerText, fontFamily: config.fonts.primary }}>
                {activeContact.name}
              </div>
              {config.features.onlineStatus && (
                <div className="text-[11px]" style={{ color: config.colors.timestamp }}>
                  {activeContact.isOnline ? 'online' : activeContact.lastSeen || 'last seen recently'}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3" style={{ color: `${config.colors.headerText}99` }}>
              <span className="text-base">📹</span>
              <span className="text-base">📞</span>
              <span className="text-base">⋮</span>
            </div>
          </div>

          {/* Messages */}
          <div
            className={`flex-1 overflow-y-auto px-3 py-3 space-y-1 wallpaper-${platform}`}
            style={{ height: 'calc(100% - 138px)' }}
          >
            {/* Encryption notice (WhatsApp) */}
            {platform === 'whatsapp' && (
              <div className="text-center mb-3">
                <div className="inline-block px-3 py-1.5 rounded-lg text-[10px] leading-tight max-w-[85%]" style={{ background: `${config.colors.receivedBubble}90`, color: config.colors.timestamp }}>
                  🔒 Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
                </div>
              </div>
            )}

            {/* iMessage date */}
            {platform === 'imessage' && (
              <div className="text-center mb-3">
                <span className="text-[11px]" style={{ color: config.colors.timestamp }}>Today</span>
              </div>
            )}

            {messages.map((msg, index) => {
              const isSent = msg.senderId === 'user';
              const isSystem = msg.type === 'system';
              const isDeleted = msg.type === 'deleted';

              if (isSystem) {
                return (
                  <div key={msg.id} className="text-center my-2">
                    <span className="text-[11px] px-3 py-1 rounded-lg" style={{ color: config.colors.timestamp, background: `${config.colors.receivedBubble}60` }}>
                      {msg.content}
                    </span>
                  </div>
                );
              }

              // Discord-style (no bubbles)
              if (platform === 'discord') {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="flex gap-3 py-0.5 px-2 rounded hover:bg-white/[0.02] group"
                  >
                    {/* Show avatar only for first message or different sender */}
                    <div className="w-8 shrink-0">
                      {(index === 0 || messages[index - 1]?.senderId !== msg.senderId) && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-[10px] font-bold text-white mt-0.5">
                          {isSent ? 'Y' : activeContact.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      {(index === 0 || messages[index - 1]?.senderId !== msg.senderId) && (
                        <div className="flex items-baseline gap-2">
                          <span className="text-[13px] font-semibold" style={{ color: isSent ? '#57F287' : '#EB459E' }}>
                            {isSent ? 'You' : activeContact.name}
                          </span>
                          <span className="text-[10px]" style={{ color: config.colors.timestamp }}>{msg.timestamp}</span>
                        </div>
                      )}
                      <p className="text-[13px] leading-relaxed" style={{ color: isDeleted ? config.colors.timestamp : config.colors.receivedText, fontStyle: isDeleted ? 'italic' : 'normal', fontFamily: config.fonts.message }}>
                        {isDeleted ? 'This message was deleted' : msg.content}
                      </p>
                      {/* Reactions */}
                      {msg.reactions.length > 0 && (
                        <div className="flex gap-1 mt-0.5">
                          {msg.reactions.map((r, i) => (
                            <span key={i} className="text-xs px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10">
                              {r.emoji}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              }

              // Standard bubble layout (WhatsApp, iMessage, etc.)
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.9, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.02, duration: 0.3 }}
                  className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="relative"
                    style={{
                      maxWidth: config.bubbleStyle.maxWidth,
                      borderRadius: isSent ? config.bubbleStyle.sentRadius : config.bubbleStyle.receivedRadius,
                      background: isDeleted
                        ? 'transparent'
                        : isSent
                        ? config.colors.sentBubble
                        : config.colors.receivedBubble,
                      padding: config.bubbleStyle.padding,
                      border: isDeleted ? `1px dashed ${config.colors.timestamp}40` : 'none',
                    }}
                  >
                    {/* Forwarded Label */}
                    {msg.isForwarded && config.features.forwarding && (
                      <div className="text-[10px] italic mb-0.5 flex items-center gap-1" style={{ color: config.colors.timestamp }}>
                        ↗ Forwarded
                      </div>
                    )}

                    {/* Reply */}
                    {msg.type === 'reply' && msg.replyToId && (
                      <div
                        className="text-[11px] px-2 py-1 rounded mb-1 border-l-2"
                        style={{
                          background: `${config.colors.accent}15`,
                          borderColor: config.colors.accent,
                          color: config.colors.timestamp,
                        }}
                      >
                        {messages.find(m => m.id === msg.replyToId)?.content?.slice(0, 60) || 'Original message'}
                      </div>
                    )}

                    {/* Image */}
                    {msg.type === 'image' && msg.imageUrl && (
                      <div className="mb-1 rounded-lg overflow-hidden bg-black/20 w-48 h-32 flex items-center justify-center text-2xl">
                        🖼️
                      </div>
                    )}

                    {/* Voice Note */}
                    {msg.type === 'voice' && (
                      <div className="flex items-center gap-2 min-w-[180px]">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: platform === 'whatsapp' ? (isSent ? '#b3d9d2' : '#8696A0') : config.colors.accent }}>
                          <svg width="10" height="12" viewBox="0 0 10 12" fill="white"><path d="M1 1v10l8-5z"/></svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex gap-[1.5px] items-center h-5">
                            {waveHeights.map((h, i) => (
                              <div key={i} className="rounded-full" style={{ width: '2.5px', height: `${h}px`, background: isSent ? 'rgba(255,255,255,0.5)' : (config.colors.timestamp), opacity: i < 14 ? 1 : 0.4 }} />
                            ))}
                          </div>
                          <div className="flex items-center justify-between mt-0.5">
                            <span className="text-[10px]" style={{ color: isSent ? 'rgba(255,255,255,0.5)' : config.colors.timestamp }}>
                              {msg.voiceDuration ? `0:${String(msg.voiceDuration).padStart(2, '0')}` : '0:15'}
                            </span>
                            {platform === 'whatsapp' && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isSent ? 'rgba(255,255,255,0.4)' : '#8696A0'} strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Text Content */}
                    {(msg.type === 'text' || msg.type === 'reply' || msg.type === 'forwarded') && (
                      <span
                        className="text-[13.5px] leading-snug"
                        style={{
                          color: isDeleted
                            ? config.colors.timestamp
                            : isSent
                            ? config.colors.sentText
                            : config.colors.receivedText,
                          fontStyle: isDeleted ? 'italic' : 'normal',
                          fontFamily: config.fonts.message,
                        }}
                      >
                        {isDeleted ? '🚫 This message was deleted' : msg.content}
                      </span>
                    )}

                    {/* Deleted */}
                    {isDeleted && (
                      <span className="text-[13px] italic" style={{ color: config.colors.timestamp, fontFamily: config.fonts.message }}>
                        🚫 This message was deleted
                      </span>
                    )}

                    {/* Timestamp + Status */}
                    {msg.type !== 'voice' && (
                      <span className="text-[10px] ml-2 float-right mt-1.5 flex items-center gap-1" style={{ color: `${isSent ? config.colors.sentText : config.colors.receivedText}66` }}>
                        {msg.timestamp}
                        {isSent && config.features.readReceipts && renderStatusIcon(msg.status)}
                      </span>
                    )}

                    {/* Reactions */}
                    {msg.reactions.length > 0 && (
                      <div className="absolute -bottom-3 left-2 flex gap-0.5">
                        {msg.reactions.map((r, i) => (
                          <span
                            key={i}
                            className="text-xs px-1.5 py-0.5 rounded-full shadow-sm"
                            style={{ background: config.colors.receivedBubble, border: `1px solid ${config.colors.background}` }}
                          >
                            {r.emoji}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-start"
              >
                <div
                  className="flex gap-1 px-3 py-2.5"
                  style={{
                    borderRadius: config.bubbleStyle.receivedRadius,
                    background: config.colors.receivedBubble,
                  }}
                >
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-[6px] h-[6px] rounded-full"
                      style={{ background: config.colors.timestamp }}
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Extra spacing for reactions */}
            {messages.some(m => m.reactions.length > 0) && <div className="h-3" />}
          </div>

          {/* Input Bar */}
          {platform === 'whatsapp' && (
            <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1.5 flex items-end gap-1" style={{ background: '#1F2C34' }}>
              <div className="flex-1 flex items-center gap-2 rounded-[22px] px-3 py-2" style={{ background: '#2A3942' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                <span className="flex-1 text-[14px] text-[#8696A0]">Message</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth="1.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              </div>
              <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center" style={{ background: '#00A884' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" fill="none" stroke="white" strokeWidth="2"/></svg>
              </div>
            </div>
          )}
          {platform === 'imessage' && (
            <div className="absolute bottom-0 left-0 right-0 px-2 py-2 flex items-center gap-2" style={{ background: '#1C1C1E' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
              <div className="flex-1 rounded-full px-4 py-[7px] text-[14px] border" style={{ borderColor: '#3A3A3C', color: '#8E8E93' }}>iMessage</div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
            </div>
          )}
          {platform === 'instagram' && (
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 flex items-center gap-3" style={{ background: '#000' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              <div className="flex-1 rounded-full px-4 py-[7px] text-[14px] border" style={{ borderColor: '#363636', color: '#8E8E93' }}>Message...</div>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
            </div>
          )}
          {platform === 'telegram' && (
            <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 flex items-center gap-2" style={{ background: '#17212B' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6C7883" strokeWidth="1.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              <div className="flex-1 rounded-lg px-3 py-2 text-[14px]" style={{ background: '#242F3D', color: '#6C7883' }}>Message</div>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6C7883" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center" style={{ background: '#5CA0D3' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" fill="none" stroke="white" strokeWidth="2"/></svg>
              </div>
            </div>
          )}
          {platform === 'discord' && (
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center gap-2" style={{ background: '#383A40' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B5BAC1" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              <div className="flex-1 rounded-lg px-3 py-2 text-[14px]" style={{ background: '#404249', color: '#6D6F78' }}>Message #{'{'}channel{'}'}</div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B5BAC1" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            </div>
          )}
          {!['whatsapp','imessage','instagram','telegram','discord'].includes(platform) && (
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center gap-2" style={{ background: config.colors.inputBar }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={config.colors.timestamp} strokeWidth="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              <div className="flex-1 rounded-full px-4 py-[7px] text-[14px]" style={{ background: config.colors.receivedBubble, color: config.colors.timestamp }}>Message...</div>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={config.colors.timestamp} strokeWidth="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
