'use client';

import { motion } from 'framer-motion';

const platforms = [
  { name: 'WhatsApp', icon: '💬', color: '#25D366', desc: 'Green bubbles, blue ticks, forwarded labels' },
  { name: 'iMessage', icon: '🍎', color: '#007AFF', desc: 'Blue bubbles, Delivered/Read, tapback reactions' },
  { name: 'Instagram DM', icon: '📸', color: '#E1306C', desc: 'Heart reactions, vanish mode, story replies' },
  { name: 'Telegram', icon: '✈️', color: '#0088CC', desc: 'Edit indicator, reply threads, custom themes' },
  { name: 'Discord', icon: '🎮', color: '#5865F2', desc: 'Markdown support, embeds, emoji reactions' },
  { name: 'Snapchat', icon: '👻', color: '#FFFC00', desc: 'Saved indicator, streaks, Bitmoji avatars' },
  { name: 'Messenger', icon: '💬', color: '#0084FF', desc: 'Thumbs up, reactions, gradient themes' },
  { name: 'X / Twitter', icon: '𝕏', color: '#1D9BF0', desc: 'Blue check, reactions, media sharing' },
];

export default function Platforms() {
  return (
    <section id="platforms" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-4">Platforms</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Every platform, pixel perfect
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Authentic replicas of 8 messaging apps. Every detail crafted for realism.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--border-hover)] transition-colors"
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: p.color }}>{p.name}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
