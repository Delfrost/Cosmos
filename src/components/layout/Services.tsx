'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Gamepad2, Code2, Bot, ArrowUpRight, Zap, Shield, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    title: 'Gaming & Interactive',
    subtitle: 'Build Worlds',
    description: 'Immersive 3D worlds, Unity engines, WebGL experiences, and hyper-realistic environments that redefine digital interaction.',
    href: '/gaming',
    icon: Gamepad2,
    accent: '#00ff9d',
    accentRGB: '0, 255, 157',
    tags: ['Unity', 'WebGL', 'VR/AR', 'Unreal'],
    stat: '60fps',
    statLabel: 'Guaranteed',
    delay: 0,
  },
  {
    title: 'AI & Automation',
    subtitle: 'Think Smarter',
    description: 'Custom agents, LLM integration, and intelligent workflows that automate the complex and amplify human potential.',
    href: '/ai',
    icon: Bot,
    accent: '#a855f7',
    accentRGB: '168, 85, 247',
    tags: ['LLMs', 'Agents', 'Pipelines', 'RAG'],
    stat: '10x',
    statLabel: 'Efficiency',
    delay: 0.15,
  },
  {
    title: 'Fullstack Systems',
    subtitle: 'Scale Fast',
    description: 'Enterprise-grade React dashboards, scalable backends, and cloud infrastructure built to handle millions of users.',
    href: '/fullstack',
    icon: Code2,
    accent: '#3b82f6',
    accentRGB: '59, 130, 246',
    tags: ['Next.js', 'Postgres', 'AWS', 'Docker'],
    stat: '99.9%',
    statLabel: 'Uptime',
    delay: 0.3,
  },
];

// 3D Tilt Card
function TiltCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: service.delay, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { x.set(0); y.set(0); setIsHovered(false); }}
      >
        <Link href={service.href} className="block h-full">
          <div
            className="relative h-full rounded-2xl border overflow-hidden transition-all duration-500"
            style={{
              borderColor: isHovered ? `${service.accent}40` : 'rgba(255,255,255,0.06)',
              background: isHovered
                ? `radial-gradient(ellipse at 50% 0%, rgba(${service.accentRGB}, 0.08) 0%, #080808 70%)`
                : '#080808',
              boxShadow: isHovered ? `0 0 60px rgba(${service.accentRGB}, 0.15), 0 30px 60px rgba(0,0,0,0.5)` : 'none',
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
              style={{
                background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
                opacity: isHovered ? 0.6 : 0,
              }}
            />

            {/* Corner number */}
            <div
              className="absolute top-6 right-6 font-mono-custom text-5xl font-bold leading-none transition-opacity duration-500"
              style={{ color: `rgba(${service.accentRGB}, ${isHovered ? 0.08 : 0.03})` }}
            >
              0{index + 1}
            </div>

            <div className="p-8">
              {/* Subtitle chip */}
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono-custom tracking-widest uppercase mb-6 transition-all duration-300"
                style={{
                  color: service.accent,
                  background: `rgba(${service.accentRGB}, 0.1)`,
                  border: `1px solid rgba(${service.accentRGB}, 0.2)`,
                }}
              >
                <Zap className="w-2.5 h-2.5" />
                {service.subtitle}
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500"
                style={{
                  background: `rgba(${service.accentRGB}, ${isHovered ? 0.15 : 0.08})`,
                  border: `1px solid rgba(${service.accentRGB}, ${isHovered ? 0.3 : 0.15})`,
                  boxShadow: isHovered ? `0 0 20px rgba(${service.accentRGB}, 0.3)` : 'none',
                }}
              >
                <service.icon className="w-6 h-6" style={{ color: service.accent }} />
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl font-bold text-white mb-3 tracking-tight">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/35 text-sm leading-relaxed mb-8 group-hover:text-white/50">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {service.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md font-mono-custom text-[10px] tracking-wider"
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom stat + CTA */}
              <div className="flex items-end justify-between">
                <div>
                  <div
                    className="font-display text-3xl font-bold"
                    style={{ color: service.accent }}
                  >
                    {service.stat}
                  </div>
                  <div className="font-mono-custom text-[10px] text-white/25 tracking-widest uppercase">
                    {service.statLabel}
                  </div>
                </div>

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: `rgba(${service.accentRGB}, ${isHovered ? 0.15 : 0.05})`,
                    border: `1px solid rgba(${service.accentRGB}, ${isHovered ? 0.4 : 0.1})`,
                    transform: isHovered ? 'scale(1.1) rotate(-3deg)' : 'scale(1) rotate(0)',
                  }}
                >
                  <ArrowUpRight className="w-4 h-4" style={{ color: service.accent }} />
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
    <section className="py-32 px-6 bg-[#030303] text-white relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-6 h-px bg-white/20" />
            <span className="font-mono-custom text-xs text-white/25 tracking-[0.3em] uppercase">Our Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-5xl md:text-7xl font-extrabold leading-[0.9] tracking-tight"
          >
            <span className="text-white">Choose Your</span>
            <br />
            <span className="text-white/15">Upgrade.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-white/35 text-lg max-w-lg leading-relaxed"
          >
            We don't just write code. We build ecosystems — select a domain to explore specific capabilities.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <TiltCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-8 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400/60" />
              <span className="text-white/40 text-sm">NDA Protected</span>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400/60" />
              <span className="text-white/40 text-sm">Remote-first Team</span>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400/60" />
              <span className="text-white/40 text-sm">2-week Sprint Cycles</span>
            </div>
          </div>
          <Link
            href="/contact"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all"
          >
            Start a Project
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}