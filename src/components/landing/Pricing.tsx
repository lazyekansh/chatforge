'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free', price: '$0', period: 'forever',
    description: 'Try out ChatForge',
    features: ['3 projects', 'All 8 platform themes', 'Basic message types', 'Screenshot export (watermark)', 'Community templates'],
    cta: 'Get Started', ctaStyle: 'btn-secondary', popular: false,
  },
  {
    name: 'Pro', price: '$12', period: '/month',
    description: 'For creators who demand perfection',
    features: ['Unlimited projects', 'All message types', 'HD export (no watermark)', 'Video export (1080p)', 'AI generator', 'Premium templates', 'Cloud sync', 'Priority support'],
    cta: 'Start Pro Trial', ctaStyle: 'btn-primary', popular: true,
  },
  {
    name: 'Enterprise', price: '$29', period: '/month',
    description: 'For teams and agencies',
    features: ['Everything in Pro', '4K video export', 'Custom branding', 'Team collaboration', 'API access', 'Bulk export', 'Custom templates', 'Dedicated support'],
    cta: 'Contact Sales', ctaStyle: 'btn-secondary', popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-4">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Simple pricing
          </h2>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto">
            Start free. Upgrade when you need more. No hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative p-7 rounded-xl border bg-[var(--bg-secondary)] ${
                plan.popular ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]/20' : 'border-[var(--border)]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--accent)] text-white text-xs font-semibold rounded-full">
                  Popular
                </div>
              )}
              <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-[var(--text-tertiary)] text-sm">{plan.period}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mb-6">{plan.description}</p>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check className="w-3.5 h-3.5 text-[var(--success)] shrink-0" />
                    <span className="text-[var(--text-secondary)]">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/editor" className={`${plan.ctaStyle} w-full justify-center text-sm`}>{plan.cta}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
