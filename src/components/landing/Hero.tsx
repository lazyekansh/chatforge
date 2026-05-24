'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

const chatMessages = [
  { id: 1, sender: 'them', text: 'Hey! Are you coming tonight? 🎉', time: '9:41 PM', delay: 0 },
  { id: 2, sender: 'me', text: "Wouldn't miss it for the world! 🔥", time: '9:41 PM', delay: 0.3 },
  { id: 3, sender: 'them', text: 'Perfect!! Bring that playlist 🎵', time: '9:42 PM', delay: 0.6 },
  { id: 4, sender: 'me', text: 'Already curated 😎✨', time: '9:42 PM', delay: 0.9 },
  { id: 5, sender: 'them', text: "You're the best! See you at 8", time: '9:43 PM', delay: 1.2 },
];

const floatingBubbles = [
  { text: '😂😂😂', x: -280, y: 100, delay: 0.5, rotation: -12 },
  { text: 'omg no way!', x: 260, y: 60, delay: 1.2, rotation: 8 },
  { text: 'sent a photo 📸', x: -200, y: 320, delay: 2.0, rotation: -6 },
  { text: '❤️', x: 320, y: 280, delay: 1.8, rotation: 15 },
  { text: 'typing...', x: -340, y: 200, delay: 0.8, rotation: -3 },
  { text: 'lol 💀', x: 280, y: 400, delay: 2.5, rotation: 10 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)] opacity-[0.04] rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500 opacity-[0.04] rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left — Copy */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-[var(--text-secondary)] mb-8"
          >
            <Sparkles className="w-4 h-4 text-[var(--accent-light)]" />
            <span>The #1 Fake Chat Studio</span>
            <ArrowRight className="w-3 h-3" />
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            Craft{' '}
            <span className="gradient-text">Hyper-Real</span>
            <br />
            Chat Conversations
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            Create pixel-perfect fake chats for storytelling, memes, UI mockups, and cinematic social media content. 
            Support for <span className="text-[var(--text-primary)] font-medium">8+ platforms</span> with stunning realism.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/editor" className="btn-primary text-base px-8 py-3.5 justify-center">
              <Sparkles className="w-5 h-5" />
              Start Creating — Free
            </Link>
            <a href="#features" className="btn-secondary text-base px-8 py-3.5 justify-center">
              <Play className="w-4 h-4" />
              Watch Demo
            </a>
          </div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-6 mt-10 justify-center lg:justify-start"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[var(--bg-primary)] flex items-center justify-center text-xs font-bold"
                  style={{
                    background: `hsl(${i * 60 + 200}, 70%, ${35 + i * 5}%)`,
                  }}
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-yellow-400">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <span className="text-[var(--text-secondary)]">Loved by 50k+ creators</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          className="relative flex justify-center items-center"
        >
          {/* Floating Bubbles */}
          {floatingBubbles.map((bubble, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.6, scale: 1, y: [0, -8, 0] }}
              transition={{
                delay: bubble.delay + 0.5,
                duration: 0.5,
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: bubble.delay },
              }}
              className="absolute hidden lg:block"
              style={{
                left: `calc(50% + ${bubble.x}px)`,
                top: `calc(50% + ${bubble.y - 200}px)`,
                transform: `rotate(${bubble.rotation}deg)`,
              }}
            >
              <div className="glass px-4 py-2 rounded-2xl text-sm text-[var(--text-secondary)] whitespace-nowrap">
                {bubble.text}
              </div>
            </motion.div>
          ))}

          {/* Phone */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="phone-frame"
          >
            <div className="phone-screen bg-[#0B141A]">
              {/* Dynamic Island */}
              <div className="phone-dynamic-island" />

              {/* Status Bar */}
              <div className="flex items-center justify-between px-6 pt-[14px] pb-1 text-[11px] text-white font-medium">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-3" viewBox="0 0 18 12" fill="white">
                    <path d="M1 4.2C1 3.54 1.54 3 2.2 3H3.8C4.46 3 5 3.54 5 4.2V10.8C5 11.46 4.46 12 3.8 12H2.2C1.54 12 1 11.46 1 10.8V4.2Z" />
                    <path d="M6 3.2C6 2.54 6.54 2 7.2 2H8.8C9.46 2 10 2.54 10 3.2V10.8C10 11.46 9.46 12 8.8 12H7.2C6.54 12 6 11.46 6 10.8V3.2Z" />
                    <path d="M11 1.2C11 0.54 11.54 0 12.2 0H13.8C14.46 0 15 0.54 15 1.2V10.8C15 11.46 14.46 12 13.8 12H12.2C11.54 12 11 11.46 11 10.8V1.2Z" />
                  </svg>
                  <svg className="w-3.5 h-3" viewBox="0 0 15 12" fill="white">
                    <path d="M7.5 3.6C9.1 3.6 10.5 4.2 11.6 5.2L13 3.8C11.5 2.4 9.6 1.5 7.5 1.5C5.4 1.5 3.5 2.4 2 3.8L3.4 5.2C4.5 4.2 5.9 3.6 7.5 3.6Z" />
                    <path d="M7.5 7.2C8.3 7.2 9 7.5 9.5 8L7.5 10L5.5 8C6 7.5 6.7 7.2 7.5 7.2Z" />
                  </svg>
                  <div className="flex items-center">
                    <div className="w-6 h-3 border border-white rounded-sm relative">
                      <div className="absolute inset-[1px] right-[3px] bg-green-400 rounded-[1px]" style={{ width: '70%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Header */}
              <div className="flex items-center gap-3 px-3 py-2 bg-[#1F2C34]">
                <div className="text-white text-lg">‹</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-xs font-bold text-white">
                  S
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white">Sarah ✨</div>
                  <div className="text-[11px] text-[#8696A0]">online</div>
                </div>
                <div className="flex items-center gap-4 text-[#8696A0]">
                  <span className="text-lg">📹</span>
                  <span className="text-lg">📞</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 px-3 py-2 space-y-1 overflow-hidden" style={{ height: 'calc(100% - 140px)' }}>
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: msg.delay + 0.8, duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-2.5 py-1.5 text-[13px] text-white leading-snug ${
                        msg.sender === 'me'
                          ? 'bg-[#005C4B] rounded-[7.5px_7.5px_0_7.5px]'
                          : 'bg-[#202C33] rounded-[7.5px_7.5px_7.5px_0]'
                      }`}
                    >
                      <span>{msg.text}</span>
                      <span className="text-[10px] text-white/40 ml-2 float-right mt-1.5">
                        {msg.time}
                        {msg.sender === 'me' && (
                          <span className="ml-1 text-[#53BDEB]">✓✓</span>
                        )}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#202C33] rounded-[7.5px_7.5px_7.5px_0] px-3 py-2.5 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-[#8696A0] rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Input Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#1F2C34] px-2 py-2 flex items-center gap-2">
                <span className="text-xl">😊</span>
                <div className="flex-1 bg-[#2A3942] rounded-full px-4 py-2 text-[13px] text-[#8696A0]">
                  Type a message
                </div>
                <span className="text-xl">🎤</span>
              </div>
            </div>
          </motion.div>

          {/* Glow behind phone */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-80 h-80 bg-[var(--accent)] opacity-[0.08] rounded-full blur-[80px]" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-[var(--border)] flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-light)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
