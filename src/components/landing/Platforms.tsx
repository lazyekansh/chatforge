'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const platforms = [
  {
    name: 'WhatsApp',
    icon: '💬',
    color: '#25D366',
    bgColor: 'rgba(37, 211, 102, 0.1)',
    borderColor: 'rgba(37, 211, 102, 0.2)',
    description: 'Green bubbles, double blue ticks, forwarded labels',
  },
  {
    name: 'iMessage',
    icon: '🍎',
    color: '#007AFF',
    bgColor: 'rgba(0, 122, 255, 0.1)',
    borderColor: 'rgba(0, 122, 255, 0.2)',
    description: 'Blue bubbles, Delivered/Read status, tapback reactions',
  },
  {
    name: 'Instagram DM',
    icon: '📸',
    color: '#E1306C',
    bgColor: 'rgba(225, 48, 108, 0.1)',
    borderColor: 'rgba(225, 48, 108, 0.2)',
    description: 'Heart reactions, vanish mode, story replies',
  },
  {
    name: 'Telegram',
    icon: '✈️',
    color: '#0088CC',
    bgColor: 'rgba(0, 136, 204, 0.1)',
    borderColor: 'rgba(0, 136, 204, 0.2)',
    description: 'Edit indicator, reply threads, custom themes',
  },
  {
    name: 'Discord',
    icon: '🎮',
    color: '#5865F2',
    bgColor: 'rgba(88, 101, 242, 0.1)',
    borderColor: 'rgba(88, 101, 242, 0.2)',
    description: 'Markdown support, embeds, emoji reactions',
  },
  {
    name: 'Snapchat',
    icon: '👻',
    color: '#FFFC00',
    bgColor: 'rgba(255, 252, 0, 0.06)',
    borderColor: 'rgba(255, 252, 0, 0.15)',
    description: 'Saved indicator, streaks, Bitmoji avatars',
  },
  {
    name: 'Messenger',
    icon: '💬',
    color: '#0084FF',
    bgColor: 'rgba(0, 132, 255, 0.1)',
    borderColor: 'rgba(0, 132, 255, 0.2)',
    description: 'Thumbs up, reactions, gradient themes',
  },
  {
    name: 'X / Twitter DM',
    icon: '𝕏',
    color: '#1D9BF0',
    bgColor: 'rgba(29, 155, 240, 0.1)',
    borderColor: 'rgba(29, 155, 240, 0.2)',
    description: 'Blue check verification, reactions, media',
  },
];

export default function Platforms() {
  return (
    <section id="platforms" className="py-32 relative">
      {/* Background accent */}
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
            <ExternalLink className="w-3.5 h-3.5" />
            Platforms
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Every Platform,{' '}
            <span className="gradient-text">Pixel Perfect</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Authentic replicas of the world&apos;s most popular messaging apps. 
            Every detail obsessively crafted for maximum realism.
          </p>
        </motion.div>

        {/* Platform Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer"
              style={{
                background: platform.bgColor,
                borderColor: platform.borderColor,
              }}
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{platform.icon}</div>

              {/* Name */}
              <h3 className="text-lg font-semibold mb-2" style={{ color: platform.color }}>
                {platform.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {platform.description}
              </p>

              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `0 0 30px ${platform.bgColor}`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
