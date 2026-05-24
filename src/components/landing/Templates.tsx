'use client';

import { motion } from 'framer-motion';
import { LayoutGrid, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const templatePreviews = [
  {
    name: 'The Breakup Text',
    category: 'Drama',
    platform: 'iMessage',
    platformIcon: '🍎',
    gradient: 'from-blue-600 to-cyan-600',
    messages: [
      { sender: 'them', text: 'We need to talk...' },
      { sender: 'me', text: 'About what?' },
      { sender: 'them', text: "It's not working anymore" },
    ],
  },
  {
    name: 'Caught Red-Handed',
    category: 'Funny',
    platform: 'WhatsApp',
    platformIcon: '💬',
    gradient: 'from-green-600 to-emerald-600',
    messages: [
      { sender: 'me', text: "I'm working late tonight 😅" },
      { sender: 'them', text: 'Really? Because I just saw you at the mall 💀' },
      { sender: 'me', text: '...' },
    ],
  },
  {
    name: 'Job Offer Flex',
    category: 'Business',
    platform: 'Telegram',
    platformIcon: '✈️',
    gradient: 'from-sky-600 to-blue-600',
    messages: [
      { sender: 'them', text: 'We loved your interview! 🎉' },
      { sender: 'them', text: 'Starting salary: $250k + equity' },
      { sender: 'me', text: '🥹🥹🥹' },
    ],
  },
  {
    name: 'Bestie Energy',
    category: 'Wholesome',
    platform: 'Instagram DM',
    platformIcon: '📸',
    gradient: 'from-pink-600 to-rose-600',
    messages: [
      { sender: 'them', text: 'YOU LOOK INCREDIBLE 😍' },
      { sender: 'me', text: 'STOPPP 🥰🥰' },
      { sender: 'them', text: 'I literally cannot' },
    ],
  },
  {
    name: 'Gaming Rage',
    category: 'Meme',
    platform: 'Discord',
    platformIcon: '🎮',
    gradient: 'from-indigo-600 to-purple-600',
    messages: [
      { sender: 'them', text: 'bro u just died to a bot 💀' },
      { sender: 'me', text: 'my controller disconnected' },
      { sender: 'them', text: 'sure bro sure 😂😂' },
    ],
  },
  {
    name: 'Late Night Confession',
    category: 'Romantic',
    platform: 'iMessage',
    platformIcon: '🍎',
    gradient: 'from-violet-600 to-purple-600',
    messages: [
      { sender: 'me', text: 'can i tell you something?' },
      { sender: 'them', text: 'of course, anything' },
      { sender: 'me', text: 'i think about you all the time' },
    ],
  },
];

export default function Templates() {
  return (
    <section id="templates" className="py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-[var(--accent-light)] mb-6 uppercase tracking-widest font-medium">
            <LayoutGrid className="w-3.5 h-3.5" />
            Templates
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Start with{' '}
            <span className="gradient-text">Ready-Made Templates</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Browse our curated collection of conversation templates. Customize everything, or start from scratch.
          </p>
        </motion.div>

        {/* Template Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {templatePreviews.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden hover:border-[var(--border-hover)] transition-all duration-300 cursor-pointer"
            >
              {/* Chat Preview */}
              <div className={`p-5 bg-gradient-to-br ${template.gradient} bg-opacity-10`} style={{ background: `linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.95))` }}>
                <div className="space-y-2">
                  {template.messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`px-3 py-1.5 rounded-2xl text-xs max-w-[80%] ${
                        msg.sender === 'me'
                          ? `bg-gradient-to-r ${template.gradient} text-white`
                          : 'bg-white/10 text-white/80'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold">{template.name}</h3>
                  <span className="text-lg">{template.platformIcon}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-secondary)]">{template.category} · {template.platform}</span>
                  <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/templates" className="btn-secondary">
            <LayoutGrid className="w-4 h-4" />
            Browse All Templates
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
