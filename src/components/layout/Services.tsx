'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Gamepad2, Code2, Bot, ArrowUpRight, Zap, Shield, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    title: 'Gaming & Interactive',
    sub: 'Build Worlds',
    desc: 'Immersive 3D environments, physics engines, and real-time WebGL experiences that blur the line between digital and real.',
    href: '/gaming',
    icon: Gamepad2,
    color: '#00ffa3', rgb: '0,255,163',
    tag: '// game.engine',
    stat: '60fps', statLabel: 'guaranteed',
    tags: ['Unity', 'Unreal', 'WebGL', 'VR/AR'],
    gradient: 'from-[#00ffa3]/10 via-transparent to-[#00e5ff]/5',
    delay: 0,
  },
  {
    title: 'AI & Automation',
    sub: 'Think Smarter',
    desc: 'Autonomous agents, LLM integrations, and intelligent pipelines that transform how your business operates.',
    href: '/ai',
    icon: Bot,
    color: '#b44dff', rgb: '180,77,255',
    tag: '// neural.network',
    stat: '10×', statLabel: 'efficiency',
    tags: ['GPT-4', 'Agents', 'RAG', 'Pipelines'],
    gradient: 'from-[#b44dff]/10 via-transparent to-[#ff2d78]/5',
    delay: 0.14,
  },
  {
    title: 'Fullstack Systems',
    sub: 'Scale Fast',
    desc: 'Enterprise React dashboards, Golang backends, and cloud infrastructure engineered for millions of users.',
    href: '/fullstack',
    icon: Code2,
    color: '#00e5ff', rgb: '0,229,255',
    tag: '// sys.architecture',
    stat: '99.9%', statLabel: 'uptime SLA',
    tags: ['Next.js', 'Postgres', 'AWS', 'Docker'],
    gradient: 'from-[#00e5ff]/10 via-transparent to-[#3b82f6]/5',
    delay: 0.28,
  },
];

function HoloCard({ svc, i }: { svc: typeof services[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5,0.5], [10,-10]), { stiffness:180, damping:25 });
  const ry = useSpring(useTransform(x, [-0.5,0.5], [-10,10]), { stiffness:180, damping:25 });
  const [hov, setHov] = useState(false);

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width  - 0.5);
    y.set((e.clientY - r.top)  / r.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity:0, y:70, rotateX: 15 }}
      whileInView={{ opacity:1, y:0, rotateX:0 }}
      viewport={{ once:true, margin:'-40px' }}
      transition={{ delay: svc.delay, duration:0.9, ease:[0.23,1,0.32,1] }}
      style={{ perspective: 900 }}
    >
      <motion.div ref={ref} style={{ rotateX: rx, rotateY: ry, transformStyle:'preserve-3d' }}
        onMouseMove={move}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { x.set(0); y.set(0); setHov(false); }}
      >
        <Link href={svc.href} className="block h-full" data-cur={svc.color}>
          <div className="relative h-full rounded-2xl overflow-hidden border transition-all duration-500"
            style={{
              borderColor: hov ? `rgba(${svc.rgb},.35)` : 'rgba(255,255,255,.05)',
              background: hov
                ? `radial-gradient(ellipse 100% 80% at 50% -10%, rgba(${svc.rgb},.10) 0%, transparent 70%), #090618`
                : '#090618',
              boxShadow: hov ? `0 30px 80px rgba(${svc.rgb},.18), 0 0 0 1px rgba(${svc.rgb},.1)` : 'none',
            }}
          >
            {/* Holographic shimmer layer */}
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, rgba(${svc.rgb},.04) 0%, transparent 50%, rgba(${svc.rgb},.03) 100%)`,
                opacity: hov ? 1 : 0,
              }}
            />

            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-px transition-all duration-500"
              style={{ background: `linear-gradient(90deg,transparent,rgba(${svc.rgb},.7),transparent)`, opacity: hov ? 1 : 0 }}
            />

            {/* Corner index */}
            <div className="absolute top-6 right-6 font-display text-6xl font-black leading-none transition-all duration-500"
              style={{ color: `rgba(${svc.rgb},${hov ? .06 : .025})` }}
            >
              0{i+1}
            </div>

            <div className="p-8 flex flex-col h-full">
              {/* Tag chip */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md mb-7 w-fit font-code text-[10px] tracking-widest transition-all duration-300"
                style={{ color: svc.color, background: `rgba(${svc.rgb},.08)`, border: `1px solid rgba(${svc.rgb},.2)` }}
              >
                <Zap className="w-2.5 h-2.5" /> {svc.tag}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500"
                style={{
                  background: `rgba(${svc.rgb},${hov ? .15 : .07})`,
                  border: `1px solid rgba(${svc.rgb},${hov ? .35 : .12})`,
                  boxShadow: hov ? `0 0 25px rgba(${svc.rgb},.25), inset 0 0 15px rgba(${svc.rgb},.1)` : 'none',
                  transform: hov ? 'translateZ(20px)' : 'none',
                }}
              >
                <svc.icon className="w-6 h-6" style={{ color: svc.color }} />
              </div>

              {/* Sub-label */}
              <p className="font-code text-[9px] tracking-[.25em] uppercase mb-2 transition-colors duration-300"
                style={{ color: `rgba(${svc.rgb}, ${hov ? .8 : .4})` }}
              >
                {svc.sub}
              </p>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-white mb-4 leading-tight">{svc.title}</h3>
              <p className="text-white/30 text-sm leading-relaxed mb-8 flex-1">{svc.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {svc.tags.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              {/* Bottom row */}
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <div className="font-display text-3xl font-black" style={{ color: svc.color }}>{svc.stat}</div>
                  <div className="font-code text-[9px] text-white/20 tracking-[.2em] uppercase">{svc.statLabel}</div>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-400"
                  style={{
                    background: `rgba(${svc.rgb},${hov ? .15 : .05})`,
                    border: `1px solid rgba(${svc.rgb},${hov ? .4 : .1})`,
                    transform: hov ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
                  }}
                >
                  <ArrowUpRight className="w-4 h-4" style={{ color: svc.color }} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="relative py-36 px-6 overflow-hidden" style={{ background: '#04020f' }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/08 blur-[100px]" />
      </div>
      <div className="absolute inset-0 grid-cosmic [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:.8, ease:[0.23,1,0.32,1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-white/15" />
            <span className="font-code text-[9px] tracking-[.35em] text-white/20 uppercase">Our Services</span>
          </div>
          <h2 className="font-display font-black text-5xl md:text-7xl leading-[.88] tracking-tight">
            <span className="text-white">Choose Your</span><br />
            <span className="txt-ghost">Upgrade.</span>
          </h2>
          <p className="mt-6 text-white/30 text-lg max-w-lg leading-relaxed">
            We don't write code — we architect ecosystems. Pick a domain to explore capabilities.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {services.map((s, i) => <HoloCard key={s.title} svc={s} i={i} />)}
        </div>

        {/* Trust strip */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ delay:.4 }}
          className="mt-12 p-6 rounded-2xl border border-white/[0.04] bg-white/[0.015] flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
            {[{ icon: Shield, label: 'NDA Protected' }, { icon: Globe, label: 'Remote-first' }, { icon: Zap, label: '2-week Sprints' }].map(({ icon:Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-white/20" />
                <span className="font-code text-[10px] text-white/25 tracking-[.1em]">{label}</span>
              </div>
            ))}
          </div>
          <Link href="/contact" data-cur="#ffffff"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs font-semibold tracking-wider text-white/40 hover:text-white border border-white/08 hover:border-white/15 transition-all"
          >
            Start a Project
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}