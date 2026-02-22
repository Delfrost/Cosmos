'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

// ─── Particle Canvas ──────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = [];

    const colors = ['#00ff9d', '#a855f7', '#3b82f6', '#ffffff'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    let mouseX = -1000, mouseY = -1000;

    const handleMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', handleMouse);

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx -= (dx / dist) * force * 0.02;
          p.vy -= (dy / dist) * force * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      // Draw connections
      ctx.globalAlpha = 1;
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((q) => {
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.03 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

// ─── Scramble Text Effect ─────────────────────────────────
function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayed(
          text.split('').map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iteration) return text[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        if (iteration >= text.length) clearInterval(interval);
        iteration += 0.5;
      }, 30);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span>{displayed || text}</span>;
}

// ─── Floating Orbs ────────────────────────────────────────
function FloatingOrb({ color, size, x, y, delay }: { color: string; size: string; x: string; y: string; delay: string }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none animate-pulse-glow"
      style={{
        background: color,
        width: size,
        height: size,
        left: x,
        top: y,
        filter: 'blur(80px)',
        animationDelay: delay,
      }}
    />
  );
}

// ─── Magnetic Button ─────────────────────────────────────
function MagneticButton({ children, className, primary }: { children: React.ReactNode; className?: string; primary?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={className}
      data-cursor="button"
    >
      {children}
    </motion.button>
  );
}

// ─── Counter Animation ────────────────────────────────────
function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = value / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= value) { setCount(value); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center group">
      <div className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
        <span className="gradient-text-green">{count}</span>
        <span className="text-white/40 text-2xl">{suffix}</span>
      </div>
      <div className="font-mono-custom text-xs text-white/30 tracking-widest uppercase">{label}</div>
    </div>
  );
}

// ─── Main Hero ────────────────────────────────────────────
export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030303]">

      {/* Particle system */}
      <ParticleField />

      {/* Background orbs */}
      <FloatingOrb color="rgba(168,85,247,0.15)" size="700px" x="-15%" y="-20%" delay="0s" />
      <FloatingOrb color="rgba(0,255,157,0.08)" size="500px" x="60%" y="30%" delay="2s" />
      <FloatingOrb color="rgba(59,130,246,0.1)" size="400px" x="10%" y="60%" delay="4s" />

      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_50%,transparent_100%)]" />

      {/* Scanline effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.015]">
        <div
          className="absolute left-0 right-0 h-px bg-white"
          style={{ animation: 'scanline 8s linear infinite' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm text-sm text-white/50 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono-custom text-xs tracking-widest uppercase">
            <ScrambleText text="Accepting New Clients for 2026" delay={500} />
          </span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-400/60" />
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)` }}
        >
          <h1 className="font-display text-6xl sm:text-7xl md:text-[6rem] lg:text-[7.5rem] font-extrabold leading-[0.9] tracking-tight mb-6">
            <motion.span
              className="block text-white"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              We Forge
            </motion.span>
            <motion.span
              className="block gradient-text-green"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              Digital
            </motion.span>
            <motion.span
              className="block text-white/20"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              Reality.
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-base md:text-lg text-white/30 mb-10 max-w-xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          An agency bridging <span className="text-white/60 font-medium">Concept</span> and{' '}
          <span className="text-white/60 font-medium">Code</span>. Specializing in High-Performance Web,
          Game Development, and AI Systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <MagneticButton
            primary
            className="group relative px-8 py-4 bg-white text-black font-display font-bold text-sm tracking-wide rounded-xl overflow-hidden hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-shadow"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Our Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </MagneticButton>

          <MagneticButton className="group px-8 py-4 font-display font-semibold text-sm tracking-wide rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              View Services
            </span>
          </MagneticButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex items-center justify-center gap-12 mt-20 pt-12 border-t border-white/[0.05]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <AnimatedStat value={50} suffix="+" label="Projects" />
          <div className="w-px h-8 bg-white/10" />
          <AnimatedStat value={4} suffix="+" label="Years" />
          <div className="w-px h-8 bg-white/10" />
          <AnimatedStat value={98} suffix="%" label="Satisfaction" />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="font-mono-custom text-[10px] text-white/20 tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}