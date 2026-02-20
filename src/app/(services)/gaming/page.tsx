'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Layers, Zap, Globe, Cpu, ArrowRight } from 'lucide-react';
import GameModel from '@/components/3d/GameModel'; // Import the 3D Scene

const features = [
  {
    title: 'Unity & Unreal Engine',
    desc: 'High-fidelity 3D environments with physics-based rendering.',
    icon: Layers,
  },
  {
    title: 'Multiplayer Networking',
    desc: 'Scalable backends (Photon/Mirror) for real-time PVP experiences.',
    icon: Globe,
  },
  {
    title: 'Performance Optimization',
    desc: 'Shader optimization and memory management for 60fps on all devices.',
    icon: Zap,
  },
  {
    title: 'VR / AR Integration',
    desc: 'Immersive XR experiences for Meta Quest and Apple Vision Pro.',
    icon: Cpu,
  },
];

export default function GamingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#00ff9d] selection:text-black">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00ff9d]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ff9d]/30 bg-[#00ff9d]/10 text-[#00ff9d] text-sm font-mono mb-6">
              <Gamepad2 className="w-4 h-4" />
              <span>LEVEL UP YOUR BRAND</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Forging <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-emerald-600">
                Virtual Worlds
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
              We don't just build games; we engineer immersive experiences. From hyper-casual mobile hits to AAA-quality PC titles, we bring your vision to life with precision code.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[#00ff9d] text-black font-bold rounded-lg hover:bg-[#00cc7d] transition-colors flex items-center gap-2">
                Start Development
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border border-white/10 bg-white/5 rounded-lg font-medium hover:bg-white/10 transition-colors">
                View Portfolio
              </button>
            </div>
          </motion.div>

          {/* 3D Scene */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
             <GameModel />
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 bg-zinc-900/30 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-black border border-white/10 hover:border-[#00ff9d]/50 hover:shadow-[0_0_20px_-5px_#00ff9d40] transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#00ff9d]/10 flex items-center justify-center text-[#00ff9d] mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK TICKER (Simple CSS Animation) */}
      <section className="py-10 border-y border-white/5 bg-black overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm font-mono mb-6 uppercase tracking-widest">Powered By Industry Standards</p>
          <div className="flex justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* You can replace these with actual Logo Images later */}
            <span className="text-2xl font-bold text-white">UNITY</span>
            <span className="text-2xl font-bold text-white">UNREAL</span>
            <span className="text-2xl font-bold text-white">BLENDER</span>
            <span className="text-2xl font-bold text-white">C#</span>
            <span className="text-2xl font-bold text-white">WEBGL</span>
          </div>
        </div>
      </section>

    </main>
  );
}