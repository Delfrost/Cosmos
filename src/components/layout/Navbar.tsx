'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, Rocket, Gamepad2, Code2, Bot, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Gaming', href: '/gaming', icon: Gamepad2, accent: '#00ff9d' },
  { name: 'Fullstack', href: '/fullstack', icon: Code2, accent: '#3b82f6' },
  { name: 'AI Automation', href: '/ai', icon: Bot, accent: '#a855f7' },
];

// Custom cursor component
function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(useMotionValue(-100), { stiffness: 150, damping: 20 });
  const ringY = useSpring(useMotionValue(-100), { stiffness: 150, damping: 20 });
  const [isHovering, setIsHovering] = useState(false);
  const [accentColor, setAccentColor] = useState('#ffffff');

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      (ringX as any).set(e.clientX);
      (ringY as any).set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a, button, [data-cursor]');
      setIsHovering(!!link);
      const color = link?.getAttribute('data-accent') || '#ffffff';
      if (link) setAccentColor(color);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[99999] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isHovering ? 0 : 1 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998] border border-white/60"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isHovering ? accentColor : 'rgba(255,255,255,0.4)',
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <CustomCursor />

      <motion.nav
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          'fixed left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500',
          scrolled ? 'top-3' : 'top-5'
        )}
      >
        <div
          className={cn(
            'w-full max-w-5xl px-5 py-3 flex items-center justify-between rounded-2xl transition-all duration-500',
            scrolled
              ? 'bg-black/90 backdrop-blur-3xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)]'
              : 'bg-black/40 backdrop-blur-xl border border-white/5'
          )}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group" data-accent="#a855f7">
            <div className="relative w-9 h-9 flex items-center justify-center">
              {/* Spinning rings */}
              <div className="absolute inset-0 rounded-full border border-purple-500/30 group-hover:border-purple-500/60 transition-colors animate-spin-slow" />
              <div className="absolute inset-[3px] rounded-full border border-indigo-500/20 group-hover:border-indigo-500/40 transition-colors animate-spin-reverse" />
              <div className="relative z-10 w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <span className="font-display font-bold text-xs text-white">C</span>
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-base tracking-widest text-white group-hover:text-purple-300 transition-colors">
                COSMOS
              </span>
              <span className="font-mono-custom text-[8px] text-white/20 tracking-[0.3em] group-hover:text-purple-400/50 transition-colors">
                AGENCY
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] rounded-xl px-1 py-1 border border-white/5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  data-accent={item.accent}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2',
                    isActive ? 'text-white' : 'text-white/40 hover:text-white'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}30` }}
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  {hoveredItem === item.name && !isActive && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-lg bg-white/5"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                    />
                  )}
                  <item.icon
                    className="w-3.5 h-3.5 relative z-10 transition-colors"
                    style={{ color: isActive ? item.accent : 'inherit' }}
                  />
                  <span className="relative z-10 font-display tracking-wide text-xs">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                data-accent="#ffffff"
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl overflow-hidden font-display font-semibold text-sm tracking-wide"
              >
                <div className="absolute inset-0 bg-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-black group-hover:text-white transition-colors">Launch Project</span>
                <Rocket className="relative z-10 w-3.5 h-3.5 text-black group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={16} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
            <div className="relative pt-28 px-6 flex flex-col gap-3">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] active:scale-98 transition-transform"
                    style={{ borderColor: pathname === item.href ? `${item.accent}40` : undefined }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${item.accent}15` }}
                      >
                        <item.icon className="w-4 h-4" style={{ color: item.accent }} />
                      </div>
                      <span className="font-display font-semibold text-white">{item.name}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/20" />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-display font-bold tracking-wide shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                  Launch Project →
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}