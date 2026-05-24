'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Is ChatForge really free to use?',
    answer: 'Yes! The free plan gives you access to all 8 platform themes, basic message types, and screenshot export (with a small watermark). You can create up to 3 projects without paying anything.',
  },
  {
    question: 'How realistic are the chat mockups?',
    answer: "Extremely realistic. We obsessively replicate every detail — message bubble shapes, fonts, colors, status bar elements, read receipts, typing indicators, and even platform-specific animations. Most people can't tell the difference from real screenshots.",
  },
  {
    question: 'Can I export videos of the conversations?',
    answer: 'Absolutely! Pro and Enterprise plans include video export with typing animations, smooth scroll effects, and notification popups. Export in TikTok (9:16), YouTube Shorts, Instagram Reels, or custom formats up to 4K.',
  },
  {
    question: 'Which messaging platforms are supported?',
    answer: 'We support WhatsApp, iMessage, Instagram DM, Telegram, Discord, Snapchat, Messenger, and Twitter/X DM. Each platform has its own pixel-perfect theme with authentic colors, fonts, and UI elements.',
  },
  {
    question: 'Does the AI conversation generator produce realistic chats?',
    answer: 'Yes! Our AI understands realistic texting patterns including abbreviations, typos, emoji usage, varying response times, and personality styles. You can choose from casual, formal, flirty, angry, sarcastic, and more.',
  },
  {
    question: 'Can I use ChatForge for commercial projects?',
    answer: 'Yes, all plans allow commercial use. Pro and Enterprise plans give you watermark-free exports, higher resolution options, and custom branding capabilities for professional content creation.',
  },
  {
    question: 'Is my data saved and synced?',
    answer: 'Free plan projects are saved locally in your browser. Pro and Enterprise plans include cloud sync, so you can access your projects from any device. All data is encrypted and secure.',
  },
  {
    question: 'Can I collaborate with my team?',
    answer: 'The Enterprise plan includes team collaboration features. You can share projects, create team templates, and manage permissions. Perfect for agencies and content teams.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--border-hover)] transition-colors"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--bg-hover)] transition-colors"
      >
        <span className="text-[15px] font-medium pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-[var(--text-secondary)] shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-32 relative">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-[var(--accent-light)] mb-6 uppercase tracking-widest font-medium">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
