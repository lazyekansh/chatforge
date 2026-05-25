'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Is ChatForge really free to use?', a: 'Yes! The free plan gives you access to all 8 platform themes, basic message types, and screenshot export with a small watermark. Up to 3 projects.' },
  { q: 'How realistic are the chat mockups?', a: "Extremely realistic. We replicate every detail — bubble shapes, fonts, colors, status bars, read receipts, typing indicators. Most people can't tell the difference." },
  { q: 'Can I export videos?', a: 'Pro and Enterprise plans include video export with typing animations, scroll effects, and notification popups. Export in TikTok, YouTube Shorts, or custom formats up to 4K.' },
  { q: 'Which messaging platforms are supported?', a: 'WhatsApp, iMessage, Instagram DM, Telegram, Discord, Snapchat, Messenger, and Twitter/X DM. Each with pixel-perfect theming.' },
  { q: 'Does the AI generator produce realistic chats?', a: 'Yes! Our AI understands texting patterns including abbreviations, typos, emoji usage, and personality styles like casual, formal, flirty, and more.' },
  { q: 'Can I use it for commercial projects?', a: 'Yes, all plans allow commercial use. Pro and Enterprise give you watermark-free exports and higher resolution options.' },
  { q: 'Is my data saved?', a: 'Free plan saves locally in your browser. Pro and Enterprise include cloud sync across devices. All data is encrypted.' },
  { q: 'Can I collaborate with my team?', a: 'Enterprise plan includes team collaboration — share projects, create team templates, and manage permissions.' },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="border border-[var(--border)] rounded-xl overflow-hidden"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--bg-hover)] transition-colors">
        <span className="text-sm font-medium pr-4">{faq.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.15 }}>
          <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)] shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="px-4 pb-4 text-sm text-[var(--text-secondary)] leading-relaxed">{faq.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-28">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-4">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
        </motion.div>
        <div className="space-y-2">
          {faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
        </div>
      </div>
    </section>
  );
}
