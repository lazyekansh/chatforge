'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const chatMessages = [
  { id: 1, sender: 'them', text: 'Hey! Are you coming tonight? 🎉', time: '9:41 PM', delay: 0 },
  { id: 2, sender: 'me', text: "Wouldn't miss it for the world! 🔥", time: '9:41 PM', delay: 0.3 },
  { id: 3, sender: 'them', text: 'Perfect!! Bring that playlist 🎵', time: '9:42 PM', delay: 0.6 },
  { id: 4, sender: 'me', text: 'Already curated 😎✨', time: '9:42 PM', delay: 0.9 },
  { id: 5, sender: 'them', text: "You're the best! See you at 8", time: '9:43 PM', delay: 1.2 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] text-xs text-[var(--text-secondary)] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            The #1 Fake Chat Studio
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-[4.2rem] font-bold tracking-tight leading-[1.08] mb-6">
            Craft Hyper-Real
            <br />
            <span className="accent-text">Chat Conversations</span>
          </h1>

          <p className="text-lg text-[var(--text-secondary)] max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
            Pixel-perfect fake chats for storytelling, memes, mockups, and social media.
            8 platforms. Instant export.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link href="/editor" className="btn-primary text-base px-8 py-3.5 justify-center">
              Start Creating — Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#features" className="btn-secondary text-base px-8 py-3.5 justify-center">
              See Features
            </a>
          </div>

          <div className="flex items-center gap-4 mt-10 justify-center lg:justify-start text-sm text-[var(--text-secondary)]">
            <div className="flex items-center gap-1 text-yellow-400">
              {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
            </div>
            <span>Loved by 50k+ creators</span>
          </div>
        </motion.div>

        {/* Right — Phone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="phone-frame">
            <div className="phone-screen bg-[#0B141A]">
              <div className="phone-dynamic-island" />

              {/* Status Bar */}
              <div className="flex items-center justify-between px-6 pt-[14px] pb-1 text-[11px] text-white font-medium">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-end gap-[1px]">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="rounded-[0.5px] bg-white" style={{ width: '3px', height: `${i*2.5+2}px` }} />
                    ))}
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-3 border border-white rounded-sm relative">
                      <div className="absolute inset-[1px] right-[3px] bg-green-400 rounded-[1px]" style={{ width: '70%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Header */}
              <div className="flex items-center gap-3 px-3 py-2 bg-[#1F2C34]">
                <div className="text-white text-lg">‹</div>
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-xs font-bold text-white">S</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Sarah ✨</div>
                  <div className="text-[11px] text-[#8696A0]">online</div>
                </div>
              </div>

              {/* Messages */}
              <div className="px-3 py-2 space-y-1" style={{ height: 'calc(100% - 140px)' }}>
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: msg.delay + 0.5, duration: 0.3 }}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] px-2.5 py-1.5 text-[13px] text-white leading-snug ${
                      msg.sender === 'me'
                        ? 'bg-[#005C4B] rounded-[7.5px_7.5px_0_7.5px]'
                        : 'bg-[#202C33] rounded-[7.5px_7.5px_7.5px_0]'
                    }`}>
                      <span>{msg.text}</span>
                      <span className="text-[10px] text-white/40 ml-2 float-right mt-1.5">
                        {msg.time}
                        {msg.sender === 'me' && <span className="ml-1 text-[#53BDEB]">✓✓</span>}
                      </span>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#202C33] rounded-[7.5px_7.5px_7.5px_0] px-3 py-2.5 flex gap-1">
                    {[0,1,2].map(i => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-[#8696A0] rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Input */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#1F2C34] px-2 py-2 flex items-center gap-2">
                <span className="text-xl">😊</span>
                <div className="flex-1 bg-[#2A3942] rounded-full px-4 py-2 text-[13px] text-[#8696A0]">Type a message</div>
                <span className="text-xl">🎤</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
