'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

/* ── Star / Asteroid Canvas ─────────────────────── */
function CosmicCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let mouse = { x: W / 2, y: H / 2 };
    let raf: number;

    /* Stars */
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.15 + 0.03,
      twinkle: Math.random() * Math.PI * 2,
    }));

    /* Nebula dust specs */
    const dust = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 80 + 40,
      hue: [260, 200, 300, 180][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.04 + 0.01,
    }));

    /* Comets */
    const comets: { x:number; y:number; vx:number; vy:number; len:number; alpha:number }[] = [];
    const spawnComet = () => {
      comets.push({ x: Math.random() * W, y: 0, vx: 3 + Math.random() * 4, vy: 2 + Math.random() * 3, len: 80 + Math.random() * 120, alpha: 1 });
    };
    const cometInterval = setInterval(spawnComet, 4000);

    window.addEventListener('mousemove', e => { mouse = { x: e.clientX, y: e.clientY }; });
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.01;

      /* Nebula dust */
      dust.forEach(d => {
        const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
        grd.addColorStop(0,   `hsla(${d.hue},80%,60%,${d.alpha * 2})`);
        grd.addColorStop(1,   `hsla(${d.hue},80%,60%,0)`);
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
      });

      /* Stars with mouse parallax */
      stars.forEach(s => {
        s.twinkle += 0.02;
        const a = s.alpha * (0.7 + 0.3 * Math.sin(s.twinkle));
        const px = s.x + (mouse.x - W / 2) * s.speed * -0.04;
        const py = s.y + (mouse.y - H / 2) * s.speed * -0.04;
        ctx.beginPath(); ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill();
        /* Occasional bright star cross */
        if (s.r > 1.0) {
          ctx.strokeStyle = `rgba(255,255,255,${a * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(px - s.r * 3, py); ctx.lineTo(px + s.r * 3, py);
          ctx.moveTo(px, py - s.r * 3); ctx.lineTo(px, py + s.r * 3);
          ctx.stroke();
        }
      });

      /* Comets */
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        const grd = ctx.createLinearGradient(c.x - c.vx * c.len / 4, c.y - c.vy * c.len / 4, c.x, c.y);
        grd.addColorStop(0, `rgba(180,150,255,0)`);
        grd.addColorStop(1, `rgba(220,200,255,${c.alpha * 0.9})`);
        ctx.beginPath();
        ctx.moveTo(c.x - c.vx * c.len / 4, c.y - c.vy * c.len / 4);
        ctx.lineTo(c.x, c.y);
        ctx.strokeStyle = grd; ctx.lineWidth = 1.5; ctx.stroke();
        c.x += c.vx; c.y += c.vy; c.alpha -= 0.004;
        if (c.alpha <= 0 || c.x > W + 100) comets.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); clearInterval(cometInterval); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" />;
}

/* ── Glitch Text ────────────────────────────────── */
function GlitchWord({ word, className }: { word: string; className?: string }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {word}
      {glitch && (
        <>
          <span className="absolute inset-0 text-[#00ffa3] translate-x-[3px]" style={{clipPath:'inset(30% 0 40% 0)'}}>{word}</span>
          <span className="absolute inset-0 text-[#ff2d78] -translate-x-[3px]" style={{clipPath:'inset(60% 0 10% 0)'}}>{word}</span>
        </>
      )}
    </span>
  );
}

/* ── Orbiting Stats ─────────────────────────────── */
function OrbitingStat({ label, value, angle, radius }: { label:string; value:string; angle:number; radius:number }) {
  const rad = (angle * Math.PI) / 180;
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{
        left: `calc(50% + ${Math.cos(rad) * radius}px)`,
        top:  `calc(50% + ${Math.sin(rad) * radius}px)`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8 + angle / 360, duration: 0.6, type: 'spring' }}
    >
      <div className="font-display text-xl font-bold txt-cosmic">{value}</div>
      <div className="font-code text-[9px] text-white/25 tracking-[.2em] uppercase mt-0.5">{label}</div>
    </motion.div>
  );
}

/* ── Magnetic CTA ──────────────────────────────── */
function MagBtn({ children, primary, href }: { children: React.ReactNode; primary?: boolean; href?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const move = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width  / 2) * 0.22);
    y.set((e.clientY - r.top  - r.height / 2) * 0.22);
  };

  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.95 }}
      data-cur={primary ? '#00ffa3' : '#ffffff'}
      className={primary
        ? 'group relative px-8 py-4 rounded-xl font-display font-bold text-sm tracking-wider overflow-hidden text-black'
        : 'group px-8 py-4 rounded-xl font-display font-semibold text-sm tracking-wider text-white/50 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all'
      }
    >
      {primary && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ffa3] via-[#00e5ff] to-[#00ffa3] bg-[length:200%] anim-aurora" />
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity" />
        </>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

export default function Hero() {
  const [mouseXY, setMouseXY] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e: MouseEvent) => setMouseXY({
      x: (e.clientX / window.innerWidth  - 0.5) * 30,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  const words = ['DIGITAL', 'REALITY'];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden nebula-home">
      <CosmicCanvas />

      {/* Grid */}
      <div className="absolute inset-0 grid-cosmic opacity-60 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_30%,rgba(4,2,15,0.6)_100%)]" />

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">

        {/* Status badge */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-xs text-white/40 mb-12 font-code"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse" />
          <span className="tracking-[.2em] uppercase">Accepting New Clients · 2026</span>
          <Sparkles className="w-3 h-3 text-yellow-300/60" />
        </motion.div>

        {/* Main headline */}
        <div style={{ transform: `translate(${mouseXY.x * 0.12}px, ${mouseXY.y * 0.08}px)` }}>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="font-display text-[11px] tracking-[.5em] text-white/25 uppercase mb-4"
          >
            Cosmos Agency
          </motion.p>

          <h1 className="font-display font-black leading-[0.88] tracking-tight">
            {['We Forge', ...words].map((line, i) => (
              <motion.div key={line} initial={{ opacity: 0, y: 60, skewY: 4 }} animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ delay: 0.55 + i * 0.18, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className={`block ${
                  i === 0 ? 'text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] text-white mb-1'
                  : i === 1 ? 'text-6xl sm:text-8xl md:text-9xl lg:text-[9rem]'
                  : 'text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] text-white/20'
                }`}
                style={i === 1 ? {
                  background: 'linear-gradient(100deg, #00ffa3 0%, #00e5ff 40%, #b44dff 75%, #ff2d78 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 40px rgba(0,255,163,0.4))',
                } : undefined}
              >
                {i === 1 ? <GlitchWord word={line} /> : line}
              </motion.div>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
          className="text-base md:text-lg text-white/28 mt-8 mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Bridging <span className="text-white/60 font-medium">Concept</span> and{' '}
          <span className="text-white/60 font-medium">Code</span> —{' '}
          High-performance web, game development, and AI systems that redefine what's possible.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagBtn primary>
            Explore Our Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagBtn>
          <MagBtn>
            <span className="w-2 h-2 rounded-full bg-[#00ffa3] mr-1" />
            View Services
          </MagBtn>
        </motion.div>

        {/* Floating stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="flex items-center justify-center gap-10 mt-20 pt-10 border-t border-white/[0.05]"
        >
          {[
            { v: '50+',  l: 'Projects'    },
            { v: '4+',   l: 'Years'       },
            { v: '100%', l: 'Satisfaction' },
          ].map(({ v, l }, i) => (
            <div key={l} className="flex items-center gap-10">
              {i > 0 && <div className="w-px h-8 bg-white/08" />}
              <div className="text-center">
                <div className="font-display text-2xl font-bold txt-cosmic">{v}</div>
                <div className="font-code text-[9px] text-white/25 tracking-[.25em] uppercase mt-1">{l}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#04020f] to-transparent pointer-events-none" />

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-code text-[9px] tracking-[.35em] text-white/20 uppercase">Scroll</span>
        <motion.div className="w-px h-10 origin-top"
          style={{ background: 'linear-gradient(to bottom, rgba(180,77,255,0.5), transparent)' }}
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}