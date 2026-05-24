'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Content Creator',
    avatar: 'SC',
    avatarGradient: 'from-pink-500 to-rose-600',
    rating: 5,
    text: 'ChatForge literally changed my content game. My fake chat TikToks went from 10k views to 2M+ views. The realism is insane.',
  },
  {
    name: 'Marcus Thompson',
    role: 'UI/UX Designer',
    avatar: 'MT',
    avatarGradient: 'from-blue-500 to-indigo-600',
    rating: 5,
    text: 'I use ChatForge for all my app mockups now. Clients can\'t tell the difference from real screenshots. Absolute game changer.',
  },
  {
    name: 'Priya Sharma',
    role: 'Film Director',
    avatar: 'PS',
    avatarGradient: 'from-purple-500 to-violet-600',
    rating: 5,
    text: 'The cinematic export feature is chef\'s kiss. I create phone screen inserts for my short films in minutes instead of hours.',
  },
  {
    name: 'Jake Williams',
    role: 'Meme Creator',
    avatar: 'JW',
    avatarGradient: 'from-yellow-500 to-orange-600',
    rating: 5,
    text: 'Every meme page needs this tool. The WhatsApp and iMessage themes are pixel-perfect. My audience thinks they\'re real 💀',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Author & Storyteller',
    avatar: 'ER',
    avatarGradient: 'from-emerald-500 to-teal-600',
    rating: 5,
    text: 'I embed fake chat screenshots in my novels for immersion. ChatForge makes it feel like the reader is scrolling through a real phone.',
  },
  {
    name: 'David Kim',
    role: 'Social Media Manager',
    avatar: 'DK',
    avatarGradient: 'from-red-500 to-pink-600',
    rating: 5,
    text: 'Managing content for 12 brands means I need tools that are fast AND premium. ChatForge delivers both. Worth every penny.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 relative overflow-hidden">
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
            <Star className="w-3.5 h-3.5" />
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Loved by{' '}
            <span className="gradient-text">50,000+ Creators</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            From TikTok creators to Hollywood directors, ChatForge is the industry standard.
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group relative p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--border-hover)] transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-[var(--accent)] opacity-20 mb-4" />
              
              {/* Text */}
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarGradient} flex items-center justify-center text-xs font-bold text-white`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-[var(--text-tertiary)]">{t.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
