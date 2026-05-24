'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out ChatForge',
    icon: Zap,
    gradient: 'from-slate-500 to-zinc-600',
    borderColor: 'border-[var(--border)]',
    features: [
      '3 projects',
      'All 8 platform themes',
      'Basic message types',
      'Screenshot export (with watermark)',
      'Community templates',
    ],
    cta: 'Get Started Free',
    ctaStyle: 'btn-secondary',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    description: 'For creators who demand perfection',
    icon: Sparkles,
    gradient: 'from-[var(--accent)] to-pink-500',
    borderColor: 'border-[var(--accent)]/30',
    features: [
      'Unlimited projects',
      'All message types',
      'HD screenshot export (no watermark)',
      'Video export (1080p)',
      'AI conversation generator',
      'Premium templates',
      'Cloud sync',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    ctaStyle: 'btn-primary',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$29',
    period: '/month',
    description: 'For teams and agencies',
    icon: Crown,
    gradient: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/30',
    features: [
      'Everything in Pro',
      '4K video export',
      'Custom branding',
      'Team collaboration',
      'API access',
      'Bulk export',
      'Custom templates',
      'Dedicated support',
      'Analytics dashboard',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'btn-secondary',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 relative">
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
            <Crown className="w-3.5 h-3.5" />
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Simple, Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Start free. Upgrade when you need more power. No hidden fees, ever.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative p-8 rounded-3xl border bg-[var(--bg-secondary)] transition-all duration-300 hover:border-[var(--border-hover)] ${plan.borderColor} ${
                plan.popular ? 'scale-[1.03] shadow-[var(--shadow-glow)]' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--accent)] text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                <plan.icon className="w-6 h-6 text-white" />
              </div>

              {/* Name & Price */}
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-[var(--text-secondary)] text-sm">{plan.period}</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-8">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                    <span className="text-[var(--text-secondary)]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/editor" className={`${plan.ctaStyle} w-full justify-center text-sm`}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
