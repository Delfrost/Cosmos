'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Layers, Zap, Globe, Cpu, ArrowRight, Trophy, Users } from 'lucide-react';
import GameModel from '@/components/3d/GameModel';

const features = [
  {
    title: 'Unity & Unreal Engine',
    desc: 'High-fidelity 3D environments with physics-based rendering and cinematic quality.',
    icon: Layers,
  },
  {
    title: 'Multiplayer Networking',
    desc: 'Scalable backends (Photon/Mirror) for real-time PVP experiences up to 10,000 players.',
    icon: Globe,
  },
  {
    title: 'Performance Optimization',
    desc: 'Shader optimization and memory management for a locked 60fps on all target devices.',
    icon: Zap,
  },
  {
    title: 'VR / AR Integration',
    desc: 'Immersive XR experiences for Meta Quest, PSVR2, and Apple Vision Pro.',
    icon: Cpu,
  },
  {
    title: 'Live Game Services',
    desc: 'Season passes, battle passes, analytics dashboards, and live operations infrastructure.',
    icon: Trophy,
  },
  {
    title: 'Crossplay & Matchmaking',
    desc: 'Platform-agnostic crossplay systems with intelligent skill-based matchmaking (SBMM).',
    icon: Users,
  },
];

const stack = ['UNITY', 'UNREAL', 'BLENDER', 'C#', 'WEBGL', 'HLSL', 'THREE.JS', 'PHOTON'];

export default function GamingPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-[#00ff9d]/20 selection:text-[#00ff9d]">

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">

        {/* BG effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00ff9d]/05 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-emerald-600/04 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_20%,black,transparent)]" />

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#00ff9d]/25 bg-[#00ff9d]/06 text-[#00ff9d] text-xs font-mono-custom tracking-widest uppercase mb-8">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Level Up Your Brand</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[0.9]">
              Forging<br />
              <span className="gradient-text-green">Virtual</span><br />
              <span className="text-white/15">Worlds.</span>
            </h1>

            <p className="text-white/35 text-lg mb-10 max-w-lg leading-relaxed">
              We don't just build games — we engineer immersive experiences. From hyper-casual mobile hits to AAA-quality PC titles, precision code brings your vision to life.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 py-4 bg-[#00ff9d] text-black font-display font-bold text-sm tracking-wide rounded-xl overflow-hidden hover:shadow-[0_0_40px_rgba(0,255,157,0.4)] transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00ff9d] to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  Start Development
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              <button className="px-8 py-4 border border-white/08 bg-white/03 rounded-xl font-display font-medium text-sm text-white/40 hover:text-white hover:border-white/15 transition-all">
                View Portfolio
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/[0.04]">
              <div>
                <div className="font-display text-2xl font-bold text-[#00ff9d]">20+</div>
                <div className="font-mono-custom text-[10px] text-white/25 tracking-widest uppercase">Games Shipped</div>
              </div>
              <div className="w-px h-8 bg-white/08" />
              <div>
                <div className="font-display text-2xl font-bold text-white">60fps</div>
                <div className="font-mono-custom text-[10px] text-white/25 tracking-widest uppercase">Guaranteed</div>
              </div>
              <div className="w-px h-8 bg-white/08" />
              <div>
                <div className="font-display text-2xl font-bold text-white">5★</div>
                <div className="font-mono-custom text-[10px] text-white/25 tracking-widest uppercase">Client Rating</div>
              </div>
            </div>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#00ff9d]/04 blur-[60px] rounded-full scale-110" />
              <GameModel />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-mono-custom text-xs text-white/20 tracking-[0.3em] uppercase">Game Dev Capabilities</span>
            <h2 className="font-display text-4xl font-extrabold mt-3 text-white">What we build</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: idx * 0.08, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-[#00ff9d]/25 hover:bg-[#00ff9d]/[0.03] transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00ff9d]/08 flex items-center justify-center text-[#00ff9d] mb-5 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-16 border-t border-white/[0.04] overflow-hidden">
        <div className="container mx-auto px-6">
          <p className="font-mono-custom text-xs text-white/15 text-center mb-10 tracking-[0.4em] uppercase">
            Powered by Industry Standards
          </p>
          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
              {[...stack, ...stack].map((tech, i) => (
                <div
                  key={i}
                  className="px-5 py-2.5 rounded-lg border border-white/06 bg-white/02 font-display font-bold text-sm text-white/20 hover:text-[#00ff9d] hover:border-[#00ff9d]/30 transition-all shrink-0"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}