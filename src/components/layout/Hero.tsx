'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      
      {/* 1. BACKGROUND GLOW (Aurora Effect) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] mix-blend-screen animate-float delay-1000" />
      </div>

      {/* 2. GRID PATTERN OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />

      {/* 3. CONTENT CONTAINER */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>Accepting New Clients for 2026</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          className="text-5xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          We Forge <br /> Digital Reality.
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          An agency bridging the gap between <span className="text-white font-medium">Concept</span> and <span className="text-white font-medium">Code</span>. 
          Specializing in High-Performance Web, Game Development, and AI Systems.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            View Our Work
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button className="px-8 py-4 rounded-full bg-white/5 text-white font-medium text-lg border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2">
            <Github className="w-5 h-5" />
            GitHub Profile
          </button>
        </motion.div>
      </div>
      
    </section>
  );
}