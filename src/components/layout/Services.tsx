'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gamepad2, Code2, Bot, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    title: 'Gaming & Interactive',
    description: 'Immersive 3D worlds, Unity engines, and WebGL experiences.',
    href: '/gaming',
    icon: Gamepad2,
    // Using direct Hex codes for shadows to guarantee visibility
    colorClass: 'text-[#00ff9d]', 
    shadowClass: 'hover:shadow-[0_0_30px_-5px_#00ff9d60] hover:border-[#00ff9d]/50',
    bgClass: 'hover:bg-[#00ff9d]/10',
    delay: 0.1,
  },
  {
    title: 'AI & Automation',
    description: 'Custom agents, LLM integration, and intelligent workflows.',
    href: '/ai',
    icon: Bot,
    colorClass: 'text-[#a855f7]',
    shadowClass: 'hover:shadow-[0_0_30px_-5px_#a855f760] hover:border-[#a855f7]/50',
    bgClass: 'hover:bg-[#a855f7]/10',
    delay: 0.2,
  },
  {
    title: 'Fullstack Systems',
    description: 'Enterprise-grade React dashboards, scalable backends, and cloud infra.',
    href: '/fullstack',
    icon: Code2,
    colorClass: 'text-[#3b82f6]',
    shadowClass: 'hover:shadow-[0_0_30px_-5px_#3b82f660] hover:border-[#3b82f6]/50',
    bgClass: 'hover:bg-[#3b82f6]/10',
    delay: 0.3,
  },
];

export default function Services() {
  return (
    <section className="py-32 px-6 bg-black text-white relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Choose Your <span className="text-gray-500">Upgrade.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We don't just write code. We build ecosystems. Select a domain to explore our specific capabilities.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: service.delay }}
            >
              <Link href={service.href} className="block h-full">
                <div 
                  className={cn(
                    "group relative h-full p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2",
                    service.shadowClass, // Adds the strong glow
                    service.bgClass      // Adds the tinted background
                  )}
                >
                  {/* Icon */}
                  <div className={cn(
                    "mb-6 w-12 h-12 rounded-2xl bg-black/50 flex items-center justify-center border border-white/10 transition-colors", 
                    service.colorClass
                  )}>
                    <service.icon className="w-6 h-6" />
                  </div>

                  {/* Text */}
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-8 leading-relaxed group-hover:text-gray-300">
                    {service.description}
                  </p>

                  {/* Arrow Indicator */}
                  <div className={cn(
                    "absolute bottom-8 right-8 p-2 rounded-full border border-white/10 bg-black/20 group-hover:scale-110 transition-transform group-hover:border-white/30",
                    service.colorClass
                  )}>
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}