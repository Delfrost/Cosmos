'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, MapPin, Zap } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'Gaming & VR', href: '/gaming', accent: '#00ff9d' },
    { label: 'AI Automation', href: '/ai', accent: '#a855f7' },
    { label: 'Fullstack Dev', href: '/fullstack', accent: '#3b82f6' },
    { label: 'Tech Consulting', href: '/consulting', accent: '#f97316' },
  ],
  Company: [
    { label: 'About Us', href: '/about', accent: '#ffffff' },
    { label: 'Careers', href: '/careers', accent: '#ffffff' },
    { label: 'Blog', href: '/blog', accent: '#ffffff' },
    { label: 'Contact', href: '/contact', accent: '#ffffff' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy', accent: '#ffffff' },
    { label: 'Terms of Service', href: '/terms', accent: '#ffffff' },
  ],
};

const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@cosmos.agency', label: 'Email' },
];

function FooterLink({ href, label, accent }: { href: string; label: string; accent: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-1.5 text-sm text-white/30 hover:text-white transition-colors duration-300"
    >
      <span
        className="w-1 h-1 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: accent }}
      />
      {label}
      <ArrowUpRight
        className="w-3 h-3 opacity-0 -translate-y-px translate-x-px group-hover:opacity-100 group-hover:translate-y-[-3px] group-hover:translate-x-[2px] transition-all duration-300"
        style={{ color: accent }}
      />
    </Link>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const currentYear = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative bg-[#030303] text-white overflow-hidden border-t border-white/[0.04]">

      {/* Top CTA Banner */}
      <motion.div
        style={{ y, opacity }}
        className="relative"
      >
        <div className="container mx-auto px-6 pt-24 pb-20">
          <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 md:p-16 overflow-hidden">

            {/* Background glow */}
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/10 blur-[80px] rounded-full" />
            </div>

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono-custom text-xs text-white/30 tracking-widest uppercase">Available Now</span>
                </div>
                <h3 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
                  Ready to build<br />
                  <span className="text-white/20">something great?</span>
                </h3>
                <p className="text-white/30 text-sm max-w-md leading-relaxed">
                  We turn complexity into competitive advantage. Let's forge your digital reality together.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="group relative px-7 py-3.5 rounded-xl font-display font-bold text-sm text-black bg-white overflow-hidden hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">Start a Project →</span>
                </Link>
                <Link
                  href="/about"
                  className="px-7 py-3.5 rounded-xl font-display font-semibold text-sm text-white/40 hover:text-white border border-white/10 hover:border-white/20 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pb-16">
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                <span className="font-display font-bold text-xs text-white">C</span>
              </div>
              <span className="font-display font-bold text-lg tracking-widest">COSMOS</span>
            </div>

            <p className="text-white/25 text-sm leading-relaxed mb-6">
              We build digital products that define the future — from immersive 3D web experiences to enterprise AI agents.
            </p>

            <div className="flex items-center gap-2 text-xs text-white/20 mb-6">
              <MapPin className="w-3 h-3" />
              <span className="font-mono-custom">Vadodara, India · Remote worldwide</span>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group w-9 h-9 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/25 hover:text-white hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-display font-semibold text-xs text-white/20 tracking-[0.2em] uppercase mb-5">
                  {category}
                </h4>
                <ul className="space-y-3.5">
                  {links.map(link => (
                    <li key={link.label}>
                      <FooterLink {...link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono-custom text-xs text-white/15">
            © {currentYear} Cosmos Agency · All rights reserved
          </p>
          <div className="flex items-center gap-2 font-mono-custom text-xs text-white/15">
            <Zap className="w-3 h-3 text-green-400/40" />
            <span>Designed & built by Anant & Team · Vadodara</span>
          </div>
        </div>
      </div>

      {/* Giant COSMOS watermark */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none">
        <div className="font-display font-extrabold text-[18vw] leading-none tracking-tighter text-center text-white opacity-[0.02]">
          COSMOS
        </div>
      </div>
    </footer>
  );
}