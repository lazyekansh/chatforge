'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Sarah Chen', role: 'Content Creator', text: 'ChatForge literally changed my content game. My fake chat TikToks went from 10k to 2M+ views. The realism is insane.' },
  { name: 'Marcus Thompson', role: 'UI/UX Designer', text: "I use ChatForge for all my app mockups now. Clients can't tell the difference from real screenshots." },
  { name: 'Priya Sharma', role: 'Film Director', text: "The cinematic export feature is chef's kiss. I create phone screen inserts for my short films in minutes." },
  { name: 'Jake Williams', role: 'Meme Creator', text: "Every meme page needs this tool. The WhatsApp and iMessage themes are pixel-perfect. My audience thinks they're real 💀" },
  { name: 'Elena Rodriguez', role: 'Author', text: 'I embed fake chat screenshots in my novels. ChatForge makes it feel like the reader is scrolling through a real phone.' },
  { name: 'David Kim', role: 'Social Media Manager', text: 'Managing content for 12 brands means I need tools that are fast AND premium. ChatForge delivers both.' },
];

export default function Testimonials() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Loved by 50,000+ creators
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]"
            >
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-[var(--text-tertiary)]">{t.role}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
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
