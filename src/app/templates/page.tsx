'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search, Filter, LayoutGrid, Sparkles,
  ArrowRight, Download, Heart, MessageSquare
} from 'lucide-react';

type Category = 'all' | 'funny' | 'romantic' | 'business' | 'meme' | 'cinematic' | 'drama' | 'wholesome' | 'horror';

const categories: { id: Category; label: string; emoji: string }[] = [
  { id: 'all', label: 'All', emoji: '✨' },
  { id: 'funny', label: 'Funny', emoji: '😂' },
  { id: 'romantic', label: 'Romantic', emoji: '💕' },
  { id: 'business', label: 'Business', emoji: '💼' },
  { id: 'meme', label: 'Meme', emoji: '💀' },
  { id: 'cinematic', label: 'Cinematic', emoji: '🎬' },
  { id: 'drama', label: 'Drama', emoji: '😱' },
  { id: 'wholesome', label: 'Wholesome', emoji: '🥰' },
  { id: 'horror', label: 'Horror', emoji: '👻' },
];

const templates = [
  {
    id: '1',
    name: 'The Breakup',
    description: 'A dramatic conversation ending a relationship',
    platform: 'imessage',
    platformIcon: '🍎',
    category: 'drama',
    downloads: 12500,
    author: 'ChatForge Team',
    isFeatured: true,
    gradient: 'from-blue-600 to-cyan-600',
    messages: [
      { sender: 'them', text: 'We need to talk...' },
      { sender: 'me', text: 'About what?' },
      { sender: 'them', text: "I don't think this is working anymore" },
      { sender: 'me', text: "Wait, what do you mean?" },
    ],
  },
  {
    id: '2',
    name: 'Caught Lying',
    description: 'When the screenshots tell a different story',
    platform: 'whatsapp',
    platformIcon: '💬',
    category: 'funny',
    downloads: 28000,
    author: 'MemeKing',
    isFeatured: true,
    gradient: 'from-green-600 to-emerald-600',
    messages: [
      { sender: 'me', text: "I'm at the library studying 📚" },
      { sender: 'them', text: 'Then why did Jessica just post you at the club? 😐' },
      { sender: 'me', text: '...' },
    ],
  },
  {
    id: '3',
    name: 'Job Offer',
    description: 'The dream offer from your dream company',
    platform: 'telegram',
    platformIcon: '✈️',
    category: 'business',
    downloads: 8900,
    author: 'TechBro',
    isFeatured: false,
    gradient: 'from-sky-600 to-blue-600',
    messages: [
      { sender: 'them', text: 'Hi! We reviewed your application 🎉' },
      { sender: 'them', text: 'We\'d like to offer you the position!' },
      { sender: 'them', text: 'Starting salary: $250k + equity 📈' },
      { sender: 'me', text: 'I\'m literally crying rn 🥹' },
    ],
  },
  {
    id: '4',
    name: 'Late Night Vibes',
    description: 'A sweet late-night conversation',
    platform: 'imessage',
    platformIcon: '🍎',
    category: 'romantic',
    downloads: 18200,
    author: 'LoveStories',
    isFeatured: true,
    gradient: 'from-violet-600 to-purple-600',
    messages: [
      { sender: 'me', text: 'you still awake? 🌙' },
      { sender: 'them', text: 'yeah, can\'t sleep' },
      { sender: 'me', text: 'i keep thinking about you' },
      { sender: 'them', text: '🥺❤️' },
    ],
  },
  {
    id: '5',
    name: 'Gaming Rage',
    description: 'When your teammate throws the game',
    platform: 'discord',
    platformIcon: '🎮',
    category: 'meme',
    downloads: 34500,
    author: 'GamerMemes',
    isFeatured: true,
    gradient: 'from-indigo-600 to-purple-600',
    messages: [
      { sender: 'them', text: 'bro you literally walked into the storm 💀' },
      { sender: 'me', text: 'MY CONTROLLER DIED' },
      { sender: 'them', text: 'you play on keyboard 🤣🤣' },
      { sender: 'me', text: 'blocked.' },
    ],
  },
  {
    id: '6',
    name: 'Mom Check-In',
    description: 'The classic mom text pattern',
    platform: 'whatsapp',
    platformIcon: '💬',
    category: 'wholesome',
    downloads: 22800,
    author: 'WholesomeMemes',
    isFeatured: false,
    gradient: 'from-pink-600 to-rose-600',
    messages: [
      { sender: 'them', text: 'Have you eaten? 🍽️' },
      { sender: 'me', text: 'Yes mom 😅' },
      { sender: 'them', text: 'What did you eat?' },
      { sender: 'them', text: 'Send photo' },
      { sender: 'them', text: 'Hello??' },
    ],
  },
  {
    id: '7',
    name: 'Horror Chat',
    description: 'A creepy conversation that escalates',
    platform: 'imessage',
    platformIcon: '🍎',
    category: 'horror',
    downloads: 15600,
    author: 'DarkStories',
    isFeatured: false,
    gradient: 'from-red-900 to-red-600',
    messages: [
      { sender: 'them', text: 'are you home alone?' },
      { sender: 'me', text: 'yeah why?' },
      { sender: 'them', text: 'then who\'s standing behind you?' },
    ],
  },
  {
    id: '8',
    name: 'Movie Script',
    description: 'A cinematic chat sequence',
    platform: 'instagram',
    platformIcon: '📸',
    category: 'cinematic',
    downloads: 9400,
    author: 'FilmMakers',
    isFeatured: false,
    gradient: 'from-amber-600 to-orange-600',
    messages: [
      { sender: 'them', text: 'I found something in the basement' },
      { sender: 'me', text: 'What is it?' },
      { sender: 'them', text: '[Photo]' },
      { sender: 'me', text: 'DO NOT OPEN THAT' },
    ],
  },
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = templates.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                Chat<span className="accent-text">Forge</span>
              </span>
            </Link>
            <div className="h-5 w-px bg-[var(--border)]" />
            <h1 className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" />
              Templates
            </h1>
          </div>

          <div className="flex gap-2">
            <Link href="/dashboard" className="btn-ghost text-sm">Dashboard</Link>
            <Link href="/editor" className="btn-primary text-sm">
              <Sparkles className="w-4 h-4" />
              Editor
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-hover)]'
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured */}
        {activeCategory === 'all' && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-light)]" />
              Featured Templates
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.filter(t => t.isFeatured).map((t, i) => (
                <TemplateCard key={t.id} template={t} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* All */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {activeCategory === 'all' ? 'All Templates' : categories.find(c => c.id === activeCategory)?.label}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((t, i) => (
              <TemplateCard key={t.id} template={t} index={i} />
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <MessageSquare className="w-12 h-12 text-[var(--text-tertiary)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="text-sm text-[var(--text-secondary)]">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TemplateCard({ template, index }: { template: typeof templates[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden hover:border-[var(--border-hover)] transition-all cursor-pointer"
    >
      {/* Preview */}
      <div className="p-4 bg-black/40">
        <div className="space-y-1.5">
          {template.messages.slice(0, 3).map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-3 py-1.5 rounded-2xl text-[11px] max-w-[80%] ${
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
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-sm font-semibold">{template.name}</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">{template.description}</p>
          </div>
          <span className="text-lg shrink-0">{template.platformIcon}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {(template.downloads / 1000).toFixed(1)}k
            </span>
            <span>{template.author}</span>
          </div>
          <Link href="/editor" className="flex items-center gap-1 text-xs text-[var(--accent-light)] opacity-0 group-hover:opacity-100 transition-opacity">
            Use <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
