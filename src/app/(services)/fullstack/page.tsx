'use client';

import { motion } from 'framer-motion';
import { Code2, ArrowRight, Database, Server, Globe, Layers, Shield, Zap } from 'lucide-react';

const features = [
  {
    title: 'React & Next.js',
    desc: 'Lightning-fast SSR/SSG apps with the latest React patterns and server components.',
    icon: Layers,
  },
  {
    title: 'Scalable Backends',
    desc: 'Node.js, Golang, or Python APIs built for millions of concurrent users.',
    icon: Server,
  },
  {
    title: 'Database Architecture',
    desc: 'PostgreSQL, Redis, and MongoDB setups optimized for performance at scale.',
    icon: Database,
  },
  {
    title: 'Cloud Infrastructure',
    desc: 'AWS, GCP, and Vercel deployments with CI/CD pipelines and zero-downtime deploys.',
    icon: Globe,
  },
  {
    title: 'Security-First',
    desc: 'SOC2-compliant architectures, OAuth 2.0, and enterprise-grade auth systems.',
    icon: Shield,
  },
  {
    title: 'Performance Tuning',
    desc: 'Core Web Vitals optimization, edge caching, and sub-100ms response times.',
    icon: Zap,
  },
];

const stack = ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Prisma', 'tRPC'];

export default function FullstackPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-blue-500/30 selection:text-blue-200">

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-500/08 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-cyan-500/05 blur-[80px] rounded-full pointer-events-none" />

        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_20%,black,transparent)]" />

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16 relative">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-500/30 bg-blue-500/08 text-blue-400 text-xs font-mono-custom tracking-widest uppercase mb-8">
              <Code2 className="w-3.5 h-3.5" />
              <span>Fullstack Engineering</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[0.9]">
              Systems<br />
              <span className="gradient-text-blue">Built to</span><br />
              <span className="text-white/15">Last.</span>
            </h1>

            <p className="text-white/35 text-lg mb-10 max-w-lg leading-relaxed">
              Enterprise-grade products from pixel to production. We architect fullstack systems that grow with your business — clean code, scalable infra, zero compromise.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 py-4 bg-[#3b82f6] text-white font-display font-bold text-sm tracking-wide rounded-xl overflow-hidden hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  Start Development
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <button className="px-8 py-4 border border-white/08 bg-white/03 rounded-xl font-display font-medium text-sm text-white/40 hover:text-white hover:border-white/15 transition-all">
                View Portfolio
              </button>
            </div>
          </motion.div>

          {/* Code Block Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-blue-500/15 bg-[#080808] overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.08)]">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/05 bg-white/[0.01]">
                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/40" />
                <span className="ml-3 font-mono-custom text-[10px] text-white/15 tracking-wider">api/route.ts</span>
              </div>

              <pre className="p-6 font-mono-custom text-xs leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-purple-400">export</span>
                  <span className="text-white/60"> async </span>
                  <span className="text-blue-400">function</span>
                  <span className="text-yellow-300"> GET</span>
                  <span className="text-white/60">(req: Request) {'{'}</span>
                  {'\n'}
                  <span className="text-white/30">  </span>
                  <span className="text-purple-400">const</span>
                  <span className="text-white/60"> data = </span>
                  <span className="text-blue-300">await</span>
                  <span className="text-white/60"> db.users</span>
                  {'\n'}
                  <span className="text-white/30">    </span>
                  <span className="text-white/60">.findMany({'{'}</span>
                  {'\n'}
                  <span className="text-white/30">      </span>
                  <span className="text-green-300">where</span>
                  <span className="text-white/60">: {'{'} active: </span>
                  <span className="text-orange-300">true</span>
                  <span className="text-white/60"> {'}'},</span>
                  {'\n'}
                  <span className="text-white/30">      </span>
                  <span className="text-green-300">cache</span>
                  <span className="text-white/60">: </span>
                  <span className="text-orange-300">"force-cache"</span>
                  {'\n'}
                  <span className="text-white/60">    {'}'});</span>
                  {'\n\n'}
                  <span className="text-white/30">  </span>
                  <span className="text-blue-300">return</span>
                  <span className="text-white/60"> Response.json({'{'} data {'}'});</span>
                  {'\n'}
                  <span className="text-white/60">{'}'}</span>
                </code>
              </pre>

              {/* Bottom status bar */}
              <div className="flex items-center gap-3 px-4 py-2 border-t border-white/05 bg-white/[0.01]">
                <span className="flex items-center gap-1.5 font-mono-custom text-[10px] text-green-400/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  200ms avg response
                </span>
                <span className="font-mono-custom text-[10px] text-white/15">· TypeScript · Prisma</span>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 px-3 py-2 rounded-xl border border-blue-500/20 bg-[#080808] shadow-[0_0_20px_rgba(59,130,246,0.15)]"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="font-mono-custom text-[10px] text-blue-400">99.9% uptime</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl border border-green-500/20 bg-[#080808] shadow-[0_0_20px_rgba(0,255,157,0.1)]"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono-custom text-[10px] text-green-400">⚡ Deploy in 30s</span>
              </div>
            </motion.div>
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
            <span className="font-mono-custom text-xs text-white/20 tracking-[0.3em] uppercase">Capabilities</span>
            <h2 className="font-display text-4xl font-extrabold mt-3 text-white">What we deliver</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: idx * 0.08, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-blue-500/25 hover:bg-blue-500/[0.04] transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
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
            Our Tech Stack
          </p>
          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
              {[...stack, ...stack].map((tech, i) => (
                <div
                  key={i}
                  className="px-5 py-2.5 rounded-lg border border-white/06 bg-white/02 font-display font-bold text-sm text-white/20 hover:text-white hover:border-blue-500/30 transition-all shrink-0"
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