'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, MapPin, Zap, Shield, Globe } from 'lucide-react';

const links = {
  Services: [
    { label:'Gaming & VR',   href:'/gaming',    color:'#00ffa3' },
    { label:'AI Automation', href:'/ai',        color:'#b44dff' },
    { label:'Fullstack Dev', href:'/fullstack', color:'#00e5ff' },
    { label:'Consulting',    href:'/consulting', color:'#ffb300' },
  ],
  Company: [
    { label:'About Us',  href:'/about',    color:'#fff' },
    { label:'Careers',   href:'/careers',  color:'#fff' },
    { label:'Blog',      href:'/blog',     color:'#fff' },
    { label:'Contact',   href:'/contact',  color:'#fff' },
  ],
  Legal: [
    { label:'Privacy',   href:'/privacy', color:'#fff' },
    { label:'Terms',     href:'/terms',   color:'#fff' },
  ],
};

const socials = [
  { Icon:Github,   href:'https://github.com',   label:'GitHub'   },
  { Icon:Twitter,  href:'https://twitter.com',  label:'Twitter'  },
  { Icon:Linkedin, href:'https://linkedin.com', label:'LinkedIn' },
  { Icon:Mail,     href:'mailto:hello@cosmos.agency', label:'Email' },
];

export default function Footer() {
  const ref  = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset:['start end','end end'] });
  const y    = useTransform(scrollYProgress, [0,1], [50,0]);
  const op   = useTransform(scrollYProgress, [0,0.3], [0,1]);
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/[0.04]"
      style={{ background:'#04020f' }}
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-violet-800/12 blur-[120px]" />
      </div>

      {/* CTA banner */}
      <motion.div style={{ y, opacity:op }} className="container mx-auto px-6 pt-24 pb-16">
        <div className="relative rounded-2xl border border-white/[0.05] overflow-hidden p-12 md:p-16">
          {/* Banner glow */}
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-800/15 via-transparent to-cyan-800/10" />
          </div>
          {/* Grid */}
          <div className="absolute inset-0 grid-cosmic opacity-50" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse" />
                <span className="font-code text-[9px] text-white/25 tracking-[.3em] uppercase">Available Now</span>
              </div>
              <h3 className="font-display font-black text-4xl md:text-5xl leading-[.9] tracking-tight text-white mb-4">
                Ready to build<br />
                <span className="txt-ghost">something great?</span>
              </h3>
              <p className="text-white/28 text-sm max-w-md leading-relaxed">
                Cosmos turns complexity into competitive advantage. Let's forge your digital reality together.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/contact"
                className="group relative px-7 py-3.5 rounded-xl font-display font-bold text-sm tracking-wider overflow-hidden text-black"
                data-cur="#00ffa3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00ffa3] to-[#00e5ff]" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                <span className="relative z-10">Start a Project →</span>
              </Link>
              <Link href="/about"
                className="px-7 py-3.5 rounded-xl font-display font-semibold text-sm tracking-wider text-white/35 hover:text-white border border-white/08 hover:border-white/15 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Links */}
      <div className="container mx-auto px-6 pb-16">
        <div className="flex flex-col md:flex-row justify-between gap-14 mb-14">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(140,80,255,0.35)]">
                <span className="font-display font-bold text-xs text-white">C</span>
              </div>
              <div>
                <div className="font-display font-bold text-sm tracking-[.2em] text-white">COSMOS</div>
                <div className="font-code text-[7px] text-white/15 tracking-[.3em]">AGENCY</div>
              </div>
            </div>
            <p className="text-white/22 text-sm leading-relaxed mb-6">
              We build digital products that define the future — immersive 3D experiences, enterprise AI, and systems that scale.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-white/18 mb-7">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="font-code tracking-[.1em]">Vadodara, India · Remote worldwide</span>
            </div>
            <div className="flex gap-2.5">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/22 hover:text-white hover:border-white/12 hover:bg-white/[0.05] transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {Object.entries(links).map(([cat, items]) => (
              <div key={cat}>
                <h4 className="font-display font-semibold text-[9px] text-white/18 tracking-[.25em] uppercase mb-5">{cat}</h4>
                <ul className="space-y-3.5">
                  {items.map(({ label, href, color }) => (
                    <li key={label}>
                      <Link href={href}
                        className="group flex items-center gap-1.5 text-sm text-white/28 hover:text-white transition-colors duration-300"
                      >
                        <span className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: color }} />
                        {label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:-translate-y-px group-hover:translate-x-px transition-all" style={{ color }} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-code text-[10px] text-white/14">© {year} Cosmos Agency · All rights reserved</p>
          <div className="flex items-center gap-4">
            {[{ icon:Shield, t:'NDA Protected' },{ icon:Globe, t:'Remote-first' },{ icon:Zap, t:'2-week Sprints' }].map(({ icon:Ic, t }) => (
              <div key={t} className="flex items-center gap-1.5">
                <Ic className="w-3 h-3 text-white/15" />
                <span className="font-code text-[9px] text-white/15 tracking-[.1em]">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Giant watermark */}
      <div className="absolute bottom-0 inset-x-0 overflow-hidden pointer-events-none select-none">
        <div className="font-display font-black text-[22vw] leading-none tracking-tighter text-center txt-ghost opacity-[0.025]">
          COSMOS
        </div>
      </div>
    </footer>
  );
}