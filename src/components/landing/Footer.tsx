'use client';

import Link from 'next/link';
import { Sparkles, AtSign, Link2, Mail } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Platforms', href: '#platforms' },
    { label: 'Templates', href: '/templates' },
    { label: 'Pricing', href: '#pricing' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Tutorials', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'API', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      {/* CTA */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to forge your first chat?</h3>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-6">
            Join 50,000+ creators. Start for free, no credit card required.
          </p>
          <Link href="/editor" className="btn-primary text-base px-8 py-3">
            Start Creating Now
          </Link>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-base font-bold">ChatForge</span>
            </Link>
            <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
              The world&apos;s most advanced fake chat studio.
            </p>
            <div className="flex gap-2">
              {[AtSign, Link2, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--border)] mt-10 pt-6 text-center text-xs text-[var(--text-tertiary)]">
          © 2025 ChatForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
