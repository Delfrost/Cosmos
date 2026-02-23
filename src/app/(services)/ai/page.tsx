'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, ArrowRight, Brain, Cpu, MessageSquare, Network, Sparkles, Zap } from 'lucide-react';

/* ══════════════════════════════════════════════
   NEURAL BRAIN CANVAS
   Live nodes connected by synaptic edges,
   with electrochemical pulse animations
   firing along random paths
══════════════════════════════════════════════ */
function NeuralBrain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    let raf: number, t = 0;
    let mouse = { x: W/2, y: H/2 };

    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    });

    /* Generate organic node positions (brain-like blob) */
    const nodeCount = 55;
    const nodes = Array.from({ length: nodeCount }, (_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      const dist  = (0.3 + Math.random() * 0.38) * Math.min(W, H) * 0.5;
      const jitter = Math.random() * 0.35;
      return {
        x: W/2 + Math.cos(angle + jitter) * dist * (0.7 + Math.random() * 0.6),
        y: H/2 + Math.sin(angle + jitter) * dist * 0.55 * (0.7 + Math.random() * 0.6),
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.20,
        r:  Math.random() * 4 + 2,
        phase: Math.random() * Math.PI * 2,
        hue: 260 + Math.random() * 60,
        active: false,
        activeTimer: 0,
      };
    });

    /* Build edges (connect nearby nodes) */
    type Edge = { a:number; b:number; dist:number };
    const edges: Edge[] = [];
    const maxEdgeDist = Math.min(W,H) * 0.26;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i+1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < maxEdgeDist) edges.push({ a:i, b:j, dist:d });
      }
    }

    /* Synaptic pulses */
    type Pulse = { edgeIdx:number; progress:number; speed:number; color:string };
    const pulses: Pulse[] = [];
    const colors = ['#b44dff','#ff2d78','#c084fc','#e879f9','#ffffff'];

    const firePulse = () => {
      if (edges.length === 0) return;
      const eIdx = Math.floor(Math.random() * edges.length);
      pulses.push({
        edgeIdx: eIdx,
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
      nodes[edges[eIdx].a].active = true;
      nodes[edges[eIdx].a].activeTimer = 25;
    };
    const pulseInterval = setInterval(firePulse, 280);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.012;

      /* Mouse proximity influence */
      const mInfluenceR = 120;
      nodes.forEach(n => {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < mInfluenceR) {
          const force = (mInfluenceR - d) / mInfluenceR * 0.015;
          n.vx += (dx / d) * force;
          n.vy += (dy / d) * force;
        }
        /* Slow drift */
        n.x += n.vx; n.y += n.vy;
        n.vx *= 0.98; n.vy *= 0.98;
        /* Soft boundary */
        const pad = 50;
        if (n.x < pad || n.x > W - pad) n.vx *= -1;
        if (n.y < pad || n.y > H - pad) n.vy *= -1;
        if (n.activeTimer > 0) n.activeTimer--;
        if (n.activeTimer === 0) n.active = false;
      });

      /* Draw edges */
      edges.forEach(({ a, b, dist }) => {
        const na = nodes[a], nb = nodes[b];
        const alpha = Math.max(0, (1 - dist / (maxEdgeDist * 1.1))) * 0.14;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(180,77,255,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      /* Draw pulses along edges */
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const edge = edges[p.edgeIdx];
        if (!edge) { pulses.splice(i, 1); continue; }
        p.progress += p.speed;
        if (p.progress >= 1) {
          nodes[edge.b].active = true;
          nodes[edge.b].activeTimer = 30;
          pulses.splice(i, 1);
          continue;
        }
        const na = nodes[edge.a], nb = nodes[edge.b];
        const px = na.x + (nb.x - na.x) * p.progress;
        const py = na.y + (nb.y - na.y) * p.progress;

        /* Pulse glow */
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color; ctx.shadowBlur = 18;
        ctx.fill();
        ctx.shadowBlur = 0;

        /* Trail */
        const trailLen = 0.08;
        const t0 = Math.max(0, p.progress - trailLen);
        const tx = na.x + (nb.x - na.x) * t0;
        const ty = na.y + (nb.y - na.y) * t0;
        const grd = ctx.createLinearGradient(tx, ty, px, py);
        grd.addColorStop(0, `${p.color}00`);
        grd.addColorStop(1, `${p.color}80`);
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(px, py);
        ctx.strokeStyle = grd; ctx.lineWidth = 2; ctx.stroke();
      }

      /* Draw nodes */
      nodes.forEach(n => {
        const pulse = 0.8 + 0.2 * Math.sin(t * 1.5 + n.phase);
        const active = n.active;
        const radius = n.r * pulse * (active ? 1.6 : 1);
        const alpha  = 0.3 + 0.3 * pulse + (active ? 0.3 : 0);

        /* Outer glow */
        if (active) {
          ctx.beginPath(); ctx.arc(n.x, n.y, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,77,255,0.08)`; ctx.fill();
        }

        /* Core */
        ctx.beginPath(); ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = active ? `rgba(220,140,255,${alpha + .2})` : `rgba(${n.hue > 285 ? '200,80,255' : '140,80,220'},${alpha})`;
        ctx.shadowColor = active ? '#e879f9' : '#b44dff';
        ctx.shadowBlur  = active ? 20 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      /* Center "brain stem" glow */
      const cgrd = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.min(W,H)*0.12);
      cgrd.addColorStop(0, 'rgba(180,77,255,0.08)');
      cgrd.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(W/2, H/2, Math.min(W,H)*0.12, 0, Math.PI*2);
      ctx.fillStyle = cgrd; ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); clearInterval(pulseInterval); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={ref} className="w-full h-full" />;
}

/* ══ Page content ══════════════════════════════ */
const features = [
  { title: 'LLM Integration',   desc: 'GPT-4o, Claude, Gemini and open-source models woven seamlessly into your product.',       icon: Brain        },
  { title: 'Custom AI Agents',  desc: 'Autonomous multi-step agents that reason, plan and act — without human intervention.',     icon: Bot          },
  { title: 'RAG Pipelines',     desc: 'Retrieval-Augmented Generation over your proprietary data for pinpoint accuracy.',         icon: Network      },
  { title: 'AI Chat UIs',       desc: 'Production streaming chat interfaces with memory, tools, and multi-modal input.',          icon: MessageSquare },
  { title: 'Fine-tuning',       desc: 'Domain-specific model training for unmatched accuracy and brand-aligned responses.',       icon: Cpu          },
  { title: 'Automation Flows',  desc: 'End-to-end process automation saving thousands of manual hours per month.',                icon: Zap          },
];

const models = ['GPT-4o','Claude 3.5','Gemini Pro','Llama 3','Mistral','Whisper','DALL·E 3','Stable Diffusion','Sora'];

export default function AIPage() {
  return (
    <main className="min-h-screen nebula-ai text-white selection:bg-[#b44dff]/25 selection:text-purple-200">

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-cosmic opacity-35 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

        <div className="container mx-auto px-6 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 relative z-10">

          {/* Text */}
          <motion.div initial={{ opacity:0, x:-50 }} animate={{ opacity:1, x:0 }} transition={{ duration:.9, ease:[0.23,1,0.32,1] }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#b44dff]/28 bg-[#b44dff]/07 text-[#c084fc] text-[9px] font-code tracking-[.25em] uppercase mb-8">
              <Sparkles className="w-3 h-3" /> AI Automation
            </div>

            <h1 className="font-display font-black text-5xl md:text-7xl leading-[.88] tracking-tight mb-6">
              <span className="block text-white/12">Intelligence</span>
              <span className="block txt-ai">as a</span>
              <span className="block text-white">Service.</span>
            </h1>

            <p className="text-white/33 text-lg leading-relaxed mb-10 max-w-md">
              We architect{' '}
              <span className="text-white/65">intelligent systems</span>{' '}
              that think, learn and compound — turning your most complex workflows into autonomous, scalable assets.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:.96 }}
                className="group relative px-8 py-4 rounded-xl font-display font-bold text-sm tracking-wider text-white overflow-hidden"
                data-cur="#b44dff"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] via-[#b44dff] to-[#e879f9]" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">Build Your AI Stack <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </motion.button>
              <button className="px-8 py-4 rounded-xl font-display font-semibold text-sm tracking-wider text-white/40 hover:text-white border border-white/08 hover:border-white/18 bg-white/03 transition-all">
                See Use Cases
              </button>
            </div>

            <div className="flex gap-8">
              {[['10×','Efficiency'],['∞','Scale'],['<100ms','Latency']].map(([v,l]) => (
                <div key={l}>
                  <div className="font-display text-xl font-bold txt-ai">{v}</div>
                  <div className="font-code text-[9px] text-white/20 tracking-[.2em] uppercase">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Neural brain visual */}
          <motion.div initial={{ opacity:0, scale:.85 }} animate={{ opacity:1, scale:1 }}
            transition={{ duration:1.2, delay:.3, ease:[0.23,1,0.32,1] }}
          >
            <div className="absolute inset-[-15%] rounded-full bg-purple-600/05 blur-[80px] pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden border border-[#b44dff]/12 shadow-[0_0_80px_rgba(180,77,255,0.1)]"
              style={{ height:'520px', background:'#060210' }}
            >
              <NeuralBrain />
              <div className="absolute top-5 left-5 font-code text-[9px] text-purple-400/35 tracking-[.2em]">// NEURAL NETWORK LIVE</div>
              <div className="absolute bottom-5 right-5 font-code text-[9px] text-purple-400/35 tracking-[.2em]">SYNAPSES FIRING ●</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mb-14">
            <span className="font-code text-[9px] tracking-[.3em] text-white/18 uppercase">AI Capabilities</span>
            <h2 className="font-display font-black text-4xl mt-3 text-white">What we build</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-20px' }}
                transition={{ delay:i*.07, duration:.7, ease:[0.23,1,0.32,1] }}
                className="group p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-[#b44dff]/22 hover:bg-[#b44dff]/[0.04] transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-[#b44dff]/08 flex items-center justify-center text-[#c084fc] mb-5 group-hover:scale-110 group-hover:shadow-[0_0_14px_rgba(180,77,255,0.3)] transition-all">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-white mb-2">{f.title}</h3>
                <p className="text-white/28 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODELS MARQUEE ───────────────────────── */}
      <section className="py-14 border-t border-white/[0.04] overflow-hidden">
        <div className="container mx-auto px-6">
          <p className="font-code text-[9px] text-white/12 text-center mb-8 tracking-[.4em] uppercase">Models We Work With</p>
          <div className="overflow-hidden">
            <div className="flex gap-5 anim-marquee" style={{ width:'max-content' }}>
              {[...models,...models].map((m,i) => (
                <div key={i} className="shrink-0 px-5 py-2.5 rounded-lg border border-white/06 bg-white/02 font-display font-bold text-sm text-white/20 hover:text-[#c084fc] hover:border-[#b44dff]/30 transition-all cursor-default">
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}