'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, Gamepad2, Code2, Bot, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Gaming',    href: '/gaming',    icon: Gamepad2, color: '#00ffa3', rgb: '0,255,163'   },
  { name: 'Fullstack', href: '/fullstack', icon: Code2,    color: '#00e5ff', rgb: '0,229,255'   },
  { name: 'AI',        href: '/ai',        icon: Bot,      color: '#b44dff', rgb: '180,77,255'  },
];

/* ── Custom Cursor ─────────────────────────────── */
function Cursor() {
  const mx = useMotionValue(-200), my = useMotionValue(-200);
  const rx = useSpring(useMotionValue(-200), { stiffness: 120, damping: 18 });
  const ry = useSpring(useMotionValue(-200), { stiffness: 120, damping: 18 });
  const [accent, setAccent] = useState('#ffffff');
  const [big, setBig]       = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX); my.set(e.clientY);
      (rx as any).set(e.clientX); (ry as any).set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cur]');
      setBig(!!el);
      setAccent(el?.getAttribute('data-cur') || '#ffffff');
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); };
  }, []);

  return (
    <>
      <motion.div style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-white pointer-events-none z-[99999] mix-blend-difference" />
      <motion.div style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%', borderColor: accent }}
        animate={{ width: big ? 52 : 30, height: big ? 52 : 30, opacity: big ? 0.7 : 0.35 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[99998] transition-colors duration-300" />
    </>
  );
}

/* ── Constellation Logo ─────────────────────────── */
function ConstellationLogo() {
  const dots = [
    { cx: 12, cy: 8  },
    { cx: 24, cy: 4  },
    { cx: 36, cy: 10 },
    { cx: 20, cy: 20 },
    { cx: 32, cy: 24 },
  ];
  const lines = [[0,1],[1,2],[1,3],[3,4],[2,4]];
  return (
    <svg width="48" height="28" viewBox="0 0 48 28" className="overflow-visible">
      {lines.map(([a,b], i) => (
        <motion.line key={i}
          x1={dots[a].cx} y1={dots[a].cy} x2={dots[b].cx} y2={dots[b].cy}
          stroke="rgba(180,77,255,0.4)" strokeWidth="0.8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: i * 0.12, duration: 0.8 }}
        />
      ))}
      {dots.map((d, i) => (
        <motion.circle key={i} cx={d.cx} cy={d.cy} r={i === 3 ? 2.5 : 1.5}
          fill={i === 3 ? '#b44dff' : 'rgba(200,160,255,0.7)'}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 0.4, type: 'spring' }}
        />
      ))}
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname              = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <Cursor />

      <motion.nav
        initial={{ y: -110, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.23,1,0.32,1] }}
        className={cn(
          'fixed left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500',
          scrolled ? 'top-3' : 'top-5'
        )}
      >
        <div className={cn(
          'w-full max-w-5xl flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-500',
          scrolled
            ? 'glass border-white/10 shadow-[0_0_80px_rgba(90,20,200,0.2)]'
            : 'bg-white/[0.02] border border-white/[0.05]'
        )}>

          {/* Logo */}
          <Link href="/" data-cur="#b44dff" className="flex items-center gap-3 group">
            <ConstellationLogo />
            <div>
              <div className="font-display text-sm font-bold tracking-[0.2em] text-white group-hover:txt-cosmic transition-all">
                COSMOS
              </div>
              <div className="font-code text-[8px] text-white/20 tracking-[0.35em]">AGENCY</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] rounded-xl px-1 py-1 border border-white/[0.05]">
            {navItems.map(item => {
              const active = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}
                  data-cur={item.color}
                  className={cn(
                    'relative flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-display font-semibold tracking-wider transition-all duration-300',
                    active ? 'text-white' : 'text-white/30 hover:text-white'
                  )}
                >
                  {active && (
                    <motion.div layoutId="nav-bg"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: `rgba(${item.rgb},0.12)`, border: `1px solid rgba(${item.rgb},0.25)`, boxShadow: `0 0 20px rgba(${item.rgb},0.15)` }}
                      transition={{ type:'spring', bounce:.15, duration:.5 }}
                    />
                  )}
                  <item.icon className="w-3.5 h-3.5 relative z-10" style={{ color: active ? item.color : 'inherit' }} />
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link href="/contact" data-cur="#ffffff"
              className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl font-display text-xs font-bold tracking-wider overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 anim-aurora" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              <span className="relative z-10 text-white">Launch</span>
              <Rocket className="relative z-10 w-3.5 h-3.5 text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/05 text-white/50 hover:text-white"
          >
            <AnimatePresence mode="wait">
              {open
                ? <motion.div key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}}><X size={15}/></motion.div>
                : <motion.div key="m" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}}><Menu size={15}/></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 nebula-home" />
            <div className="relative pt-28 px-6 flex flex-col gap-3">
              {navItems.map((item, i) => (
                <motion.div key={item.name}
                  initial={{opacity:0, x:-24}} animate={{opacity:1, x:0}}
                  transition={{delay: i*0.07, ease:[0.23,1,0.32,1]}}
                >
                  <Link href={item.href} onClick={() => setOpen(false)}
                    className="flex items-center gap-4 p-5 rounded-2xl border border-white/05"
                    style={{ background: `rgba(${item.rgb},0.06)`, borderColor: `rgba(${item.rgb},0.2)` }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `rgba(${item.rgb},0.15)` }}>
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <span className="font-display font-bold text-white tracking-wide">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.button initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.25}}
                className="w-full py-4 mt-2 rounded-xl font-display font-bold tracking-wider text-white text-sm bg-gradient-to-r from-violet-600 to-purple-600 shadow-[0_0_30px_rgba(139,92,246,0.4)]"
              >
                Launch Project →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}