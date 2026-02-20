'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, ChevronRight, Gamepad2, Code2, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Gaming', href: '/gaming', icon: Gamepad2, color: 'text-gaming-main' },
  { name: 'Fullstack', href: '/fullstack', icon: Code2, color: 'text-tech-main' },
  { name: 'AI Automation', href: '/ai', icon: Bot, color: 'text-ai-main' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300',
          scrolled ? 'top-4' : 'top-6'
        )}
      >
        <div className="w-full max-w-5xl bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/10 px-6 py-3 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold shadow-lg overflow-hidden">
              <span className="relative z-10">C</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-purple-300 transition-colors">
              COSMOS
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-1 py-1 border border-white/5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2',
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon className={cn("w-4 h-4 relative z-10", isActive && item.color)} />
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA BUTTON */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="group relative px-6 py-2.5 bg-white text-black font-semibold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2 z-10">
                Launch
                <Rocket className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white bg-white/5 rounded-lg border border-white/5"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl pt-28 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 text-lg font-medium text-white active:scale-95 transition-transform group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={cn("w-5 h-5", item.color)} />
                      {item.name}
                    </div>
                    <ChevronRight className="text-gray-500 group-hover:text-white transition-colors" />
                  </Link>
                </motion.div>
              ))}
              <button className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-lg shadow-purple-500/20">
                Start Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}