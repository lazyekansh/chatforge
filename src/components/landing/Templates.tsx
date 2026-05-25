'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const templatePreviews = [
  { name: 'The Breakup Text', category: 'Drama', platform: 'iMessage', icon: '🍎',
    messages: [{ s: 'them', t: 'We need to talk...' }, { s: 'me', t: 'About what?' }, { s: 'them', t: "It's not working anymore" }] },
  { name: 'Caught Red-Handed', category: 'Funny', platform: 'WhatsApp', icon: '💬',
    messages: [{ s: 'me', t: "I'm working late tonight 😅" }, { s: 'them', t: 'Really? I just saw you at the mall 💀' }, { s: 'me', t: '...' }] },
  { name: 'Job Offer Flex', category: 'Business', platform: 'Telegram', icon: '✈️',
    messages: [{ s: 'them', t: 'We loved your interview! 🎉' }, { s: 'them', t: 'Starting salary: $250k + equity' }, { s: 'me', t: '🥹🥹🥹' }] },
  { name: 'Bestie Energy', category: 'Wholesome', platform: 'Instagram', icon: '📸',
    messages: [{ s: 'them', t: 'YOU LOOK INCREDIBLE 😍' }, { s: 'me', t: 'STOPPP 🥰🥰' }, { s: 'them', t: 'I literally cannot' }] },
  { name: 'Gaming Rage', category: 'Meme', platform: 'Discord', icon: '🎮',
    messages: [{ s: 'them', t: 'bro u just died to a bot 💀' }, { s: 'me', t: 'my controller disconnected' }, { s: 'them', t: 'sure bro sure 😂😂' }] },
  { name: 'Late Night Confession', category: 'Romantic', platform: 'iMessage', icon: '🍎',
    messages: [{ s: 'me', t: 'can i tell you something?' }, { s: 'them', t: 'of course, anything' }, { s: 'me', t: 'i think about you all the time' }] },
];

export default function Templates() {
  return (
    <section id="templates" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-4">Templates</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Start with ready-made templates
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Browse curated conversations. Customize everything or start from scratch.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {templatePreviews.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden hover:border-[var(--border-hover)] transition-colors"
            >
              <div className="p-4 bg-black/30">
                <div className="space-y-1.5">
                  {t.messages.map((msg, j) => (
                    <div key={j} className={`flex ${msg.s === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`px-3 py-1.5 rounded-2xl text-xs max-w-[80%] ${
                        msg.s === 'me' ? 'bg-[var(--accent)] text-white' : 'bg-white/10 text-white/80'
                      }`}>
                        {msg.t}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{t.name}</h3>
                  <span className="text-xs text-[var(--text-tertiary)]">{t.category} · {t.platform}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/templates" className="btn-secondary text-sm">
            Browse All Templates
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
