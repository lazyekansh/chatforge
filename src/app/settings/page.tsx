'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles, Settings as SettingsIcon, Palette, 
  Download, Film, Bell, User, Moon, Sun,
  Monitor, ChevronRight
} from 'lucide-react';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [defaultPlatform, setDefaultPlatform] = useState('whatsapp');
  const [exportQuality, setExportQuality] = useState('2x');
  const [showWatermark, setShowWatermark] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState('normal');
  const [autoSave, setAutoSave] = useState(true);

  const platformOptions = [
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { id: 'imessage', label: 'iMessage', icon: '🍎' },
    { id: 'instagram', label: 'Instagram DM', icon: '📸' },
    { id: 'telegram', label: 'Telegram', icon: '✈️' },
    { id: 'discord', label: 'Discord', icon: '🎮' },
    { id: 'snapchat', label: 'Snapchat', icon: '👻' },
    { id: 'messenger', label: 'Messenger', icon: '💬' },
    { id: 'twitter', label: 'X / Twitter', icon: '𝕏' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                Chat<span className="gradient-text">Forge</span>
              </span>
            </Link>
            <div className="h-5 w-px bg-[var(--border)]" />
            <h1 className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2">
              <SettingsIcon className="w-4 h-4" />
              Settings
            </h1>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard" className="btn-ghost text-sm">Dashboard</Link>
            <Link href="/editor" className="btn-primary text-sm">Editor</Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Palette className="w-4 h-4 text-[var(--accent-light)]" />
              Appearance
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Theme */}
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)] mb-3 block">Theme</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'dark' as const, label: 'Dark', icon: Moon },
                  { id: 'light' as const, label: 'Light', icon: Sun },
                  { id: 'system' as const, label: 'System', icon: Monitor },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
                      theme === t.id
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-hover)]'
                    }`}
                  >
                    <t.icon className="w-4 h-4" />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Default Platform */}
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)] mb-3 block">Default Platform</label>
              <div className="grid grid-cols-4 gap-2">
                {platformOptions.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setDefaultPlatform(p.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      defaultPlatform === p.id
                        ? 'bg-[var(--accent-subtle)] text-[var(--accent-light)] border border-[var(--border-accent)]'
                        : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)]'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span className="truncate">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Animation Speed */}
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)] mb-3 block">Animation Speed</label>
              <div className="grid grid-cols-3 gap-3">
                {['slow', 'normal', 'fast'].map(speed => (
                  <button
                    key={speed}
                    onClick={() => setAnimationSpeed(speed)}
                    className={`py-2.5 rounded-xl text-xs font-medium capitalize transition-all ${
                      animationSpeed === speed
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)]'
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Export Defaults */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Download className="w-4 h-4 text-[var(--accent-light)]" />
              Export Defaults
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Quality */}
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)] mb-3 block">Screenshot Resolution</label>
              <div className="grid grid-cols-3 gap-3">
                {['1x', '2x', '3x'].map(q => (
                  <button
                    key={q}
                    onClick={() => setExportQuality(q)}
                    className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                      exportQuality === q
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)]'
                    }`}
                  >
                    {q} {q === '1x' ? '(SD)' : q === '2x' ? '(HD)' : '(Ultra)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Watermark */}
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium">Show Watermark</p>
                <p className="text-xs text-[var(--text-tertiary)]">Add ChatForge watermark to exports</p>
              </div>
              <button
                onClick={() => setShowWatermark(!showWatermark)}
                className={`w-11 h-6 rounded-full transition-colors relative ${showWatermark ? 'bg-[var(--accent)]' : 'bg-[var(--bg-elevated)] border border-[var(--border)]'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${showWatermark ? 'translate-x-[22px]' : 'translate-x-1'}`} />
              </button>
            </div>

            {/* Auto-save */}
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium">Auto-save</p>
                <p className="text-xs text-[var(--text-tertiary)]">Automatically save projects every 30 seconds</p>
              </div>
              <button
                onClick={() => setAutoSave(!autoSave)}
                className={`w-11 h-6 rounded-full transition-colors relative ${autoSave ? 'bg-[var(--accent)]' : 'bg-[var(--bg-elevated)] border border-[var(--border)]'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${autoSave ? 'translate-x-[22px]' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-[var(--accent-light)]" />
              Account
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold text-white">
                U
              </div>
              <div>
                <p className="text-sm font-semibold">Free Plan</p>
                <p className="text-xs text-[var(--text-secondary)]">3 projects · Local storage only</p>
              </div>
            </div>
            <Link href="/pricing" className="btn-primary w-full justify-center text-sm">
              <Sparkles className="w-4 h-4" />
              Upgrade to Pro
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
