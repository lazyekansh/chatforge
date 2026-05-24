'use client';

import { motion } from 'framer-motion';
import { 
  Layers, Zap, Smartphone, Download, 
  Palette, Clock, Undo2, Keyboard,
  Wand2, FileVideo, GripVertical, Shield
} from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: '8+ Platform Themes',
    description: 'Pixel-perfect replicas of WhatsApp, iMessage, Instagram DM, Telegram, Discord, Snapchat, Messenger & Twitter/X.',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: Layers,
    title: 'Rich Message Types',
    description: 'Text, images, voice notes, reactions, replies, deleted messages, stickers, polls, and more.',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Zap,
    title: 'Live Preview',
    description: 'See your changes instantly in a hyper-realistic phone mockup as you edit every detail.',
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    icon: GripVertical,
    title: 'Drag & Drop Editor',
    description: 'Reorder messages, manage contacts, and structure conversations with intuitive drag-and-drop.',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    icon: Palette,
    title: 'Full Customization',
    description: 'Battery level, signal bars, carrier name, timestamps, wallpapers, read receipts — control everything.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: Undo2,
    title: 'Undo / Redo',
    description: 'Full history stack with keyboard shortcuts. Never lose your work with auto-save.',
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    icon: Wand2,
    title: 'AI Generation',
    description: 'Generate realistic conversations with AI. Choose personality styles and texting patterns.',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    icon: FileVideo,
    title: 'Video Export',
    description: 'Export cinematic videos with typing animations, scroll effects, and TikTok/Reels formats.',
    gradient: 'from-red-500 to-pink-600',
  },
  {
    icon: Download,
    title: 'Screenshot Export',
    description: 'High-quality PNG/JPG export with optional device frames, watermark controls, and resolution options.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Clock,
    title: 'Dynamic Timestamps',
    description: 'Per-message timestamp control with realistic time progression and date separators.',
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Shortcuts',
    description: 'Power-user shortcuts for adding messages, undo/redo, saving, deleting, and navigating.',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    icon: Shield,
    title: 'Cloud Sync',
    description: 'Save projects to the cloud. Access your conversations from any device, anytime.',
    gradient: 'from-violet-500 to-indigo-600',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="features" className="py-32 relative">
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
            <Zap className="w-3.5 h-3.5" />
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Everything You Need to{' '}
            <span className="gradient-text">Forge Perfection</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            A complete toolkit for creating the most realistic fake chat conversations ever made. No compromises.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--border-hover)] transition-all duration-300 hover:bg-[var(--bg-elevated)]"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent-subtle)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
