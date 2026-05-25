'use client';

import { motion } from 'framer-motion';
import {
  Layers, Zap, Smartphone, Download,
  Palette, Undo2, Wand2, FileVideo,
  GripVertical, Keyboard, Clock, Shield
} from 'lucide-react';

const features = [
  { icon: Smartphone, title: '8 Platform Themes', description: 'WhatsApp, iMessage, Instagram, Telegram, Discord, Snapchat, Messenger & X.' },
  { icon: Layers, title: 'Rich Message Types', description: 'Text, images, voice notes, reactions, replies, deleted messages, and more.' },
  { icon: Zap, title: 'Live Preview', description: 'Instant preview in a realistic phone mockup as you edit.' },
  { icon: GripVertical, title: 'Drag & Drop', description: 'Reorder messages and manage conversations intuitively.' },
  { icon: Palette, title: 'Full Customization', description: 'Battery, signal, carrier, timestamps, wallpapers — control everything.' },
  { icon: Undo2, title: 'Undo / Redo', description: 'Full history with keyboard shortcuts and auto-save.' },
  { icon: Wand2, title: 'AI Generation', description: 'Generate realistic conversations with AI personality styles.' },
  { icon: FileVideo, title: 'Video Export', description: 'Cinematic videos with typing animations and scroll effects.' },
  { icon: Download, title: 'Screenshot Export', description: 'High-quality PNG/JPG with device frames and resolution options.' },
  { icon: Clock, title: 'Dynamic Timestamps', description: 'Per-message time control with realistic progression.' },
  { icon: Keyboard, title: 'Keyboard Shortcuts', description: 'Power-user shortcuts for fast editing and navigation.' },
  { icon: Shield, title: 'Cloud Sync', description: 'Save projects to the cloud. Access from any device.' },
];

export default function Features() {
  return (
    <section id="features" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-4">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you need
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            A complete toolkit for creating realistic fake conversations. No compromises.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--border-hover)] transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center mb-3">
                <f.icon className="w-4.5 h-4.5 text-[var(--accent)]" />
              </div>
              <h3 className="text-sm font-semibold mb-1.5">{f.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
