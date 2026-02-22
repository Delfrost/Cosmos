'use client';

import { motion } from 'framer-motion';
import { Bot, ArrowRight, Brain, Cpu, MessageSquare, Network, Sparkles, Zap } from 'lucide-react';

const features = [
  {
    title: 'LLM Integration',
    desc: 'GPT-4, Claude, Gemini and open-source models integrated seamlessly into your product stack.',
    icon: Brain,
  },
  {
    title: 'Custom AI Agents',
    desc: 'Autonomous agents that reason, plan, and act — handling complex multi-step workflows without human intervention.',
    icon: Bot,
  },
  {
    title: 'RAG Pipelines',
    desc: 'Retrieval-Augmented Generation with your proprietary data for highly accurate, contextual responses.',
    icon: Network,
  },
  {
    title: 'AI Chat Interfaces',
    desc: 'Production-ready conversational UIs with streaming, memory, and multi-modal capabilities.',
    icon: MessageSquare,
  },
  {
    title: 'Model Fine-tuning',
    desc: 'Custom model training on your domain-specific data for unmatched accuracy and performance.',
    icon: Cpu,
  },
  {
    title: 'Automation Workflows',
    desc: 'End-to-end business process automation that saves thousands of hours per month.',
    icon: Zap,
  },
];

const models = ['GPT-4o', 'Claude 3.5', 'Gemini Pro', 'Llama 3', 'Mistral', 'Whisper', 'DALL·E 3', 'Stable Diffusion'];

export default function AIPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-purple-500/30 selection:text-purple-200">

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-1/4 w-[700px] h-[500px] bg-purple-500/06 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500/05 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 dot-pattern opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent)]" />

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16 relative">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-500/08 text-purple-400 text-xs font-mono-custom tracking-widest uppercase mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Automation</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[0.9]">
              Intelligence<br />
              <span className="gradient-text-purple">as a</span><br />
              <span className="text-white/15">Service.</span>
            </h1>

            <p className="text-white/35 text-lg mb-10 max-w-lg leading-relaxed">
              We don't just integrate AI — we architect intelligent systems that think, learn, and scale. Custom agents and LLM workflows that become your competitive moat.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 py-4 bg-purple-600 text-white font-display font-bold text-sm tracking-wide rounded-xl overflow-hidden hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  Build Your AI Stack
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              <button className="px-8 py-4 border border-white/08 bg-white/03 rounded-xl font-display font-medium text-sm text-white/40 hover:text-white hover:border-white/15 transition-all">
                See Use Cases
              </button>
            </div>
          </motion.div>

          {/* AI Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Neural network animation */}
            <div className="relative w-72 h-72">
              {/* Center node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-purple-500/40 bg-purple-500/10 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                <Bot className="w-7 h-7 text-purple-400" />
              </div>

              {/* Orbit rings */}
              <div className="absolute inset-0 rounded-full border border-purple-500/10 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-purple-500/06 animate-spin-reverse" />
              <div className="absolute inset-8 rounded-full border border-white/04 animate-spin-slow" style={{ animationDuration: '25s' }} />

              {/* Satellite nodes */}
              {[
                { label: 'GPT-4o', angle: 0, color: '#a855f7' },
                { label: 'Claude', angle: 60, color: '#ec4899' },
                { label: 'Gemini', angle: 120, color: '#8b5cf6' },
                { label: 'Llama', angle: 180, color: '#a855f7' },
                { label: 'RAG', angle: 240, color: '#ec4899' },
                { label: 'Fine-tune', angle: 300, color: '#8b5cf6' },
              ].map(({ label, angle, color }) => {
                const rad = (angle * Math.PI) / 180;
                const x = 50 + 42 * Math.cos(rad);
                const y = 50 + 42 * Math.sin(rad);
                return (
                  <div
                    key={label}
                    className="absolute flex items-center justify-center"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div
                      className="px-2 py-1 rounded-md font-mono-custom text-[9px] border"
                      style={{
                        color,
                        borderColor: `${color}30`,
                        background: `${color}10`,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating stat */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-4 top-8 px-4 py-3 rounded-xl border border-purple-500/20 bg-[#080808] shadow-[0_0_25px_rgba(168,85,247,0.1)]"
            >
              <div className="font-display text-xl font-bold text-purple-400">10x</div>
              <div className="font-mono-custom text-[9px] text-white/25 tracking-wider">Faster execution</div>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -left-4 bottom-8 px-4 py-3 rounded-xl border border-green-500/20 bg-[#080808] shadow-[0_0_25px_rgba(0,255,157,0.08)]"
            >
              <div className="font-display text-xl font-bold text-green-400">∞</div>
              <div className="font-mono-custom text-[9px] text-white/25 tracking-wider">Scale potential</div>
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
            <span className="font-mono-custom text-xs text-white/20 tracking-[0.3em] uppercase">AI Capabilities</span>
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
                className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-purple-500/25 hover:bg-purple-500/[0.04] transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODELS MARQUEE */}
      <section className="py-16 border-t border-white/[0.04] overflow-hidden">
        <div className="container mx-auto px-6">
          <p className="font-mono-custom text-xs text-white/15 text-center mb-10 tracking-[0.4em] uppercase">
            Models We Work With
          </p>
          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
              {[...models, ...models].map((model, i) => (
                <div
                  key={i}
                  className="px-5 py-2.5 rounded-lg border border-white/06 bg-white/02 font-display font-bold text-sm text-white/20 hover:text-purple-400 hover:border-purple-500/30 transition-all shrink-0"
                >
                  {model}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}