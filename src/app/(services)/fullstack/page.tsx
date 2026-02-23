'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, ArrowRight, Database, Server, Globe, Layers, Shield, Zap } from 'lucide-react';

/* ══════════════════════════════════════════════════════════
   LIVE CODE EDITOR VISUAL
   Three panes: file tree, code editor typing in real-time,
   and a deploy terminal streaming logs
══════════════════════════════════════════════════════════ */

const CODE_FILE = `// api/users/route.ts
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({
  page: z.number().default(1),
  limit: z.number().max(100),
});

export async function GET(req: Request) {
  const session = await auth();
  if (!session) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { page, limit } = schema.parse(
    Object.fromEntries(new URL(req.url).searchParams)
  );

  const [users, total] = await Promise.all([
    db.user.findMany({
      where: { active: true },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    db.user.count({ where: { active: true } }),
  ]);

  return Response.json({
    data: users,
    meta: { page, limit, total,
      pages: Math.ceil(total / limit) },
  });
}`;

const DEPLOY_LOGS = [
  { t: 0,    text: '▶  cosmos deploy --prod',            color: '#00e5ff' },
  { t: 400,  text: '✓  Verifying credentials...',         color: '#888' },
  { t: 800,  text: '✓  Linked to project cosmos-api',     color: '#888' },
  { t: 1200, text: '⠿  Building Next.js app...',          color: '#ffb300' },
  { t: 2200, text: '✓  Compiled 147 modules in 2.1s',     color: '#888' },
  { t: 2600, text: '✓  Running type checks...',           color: '#888' },
  { t: 3100, text: '✓  No TypeScript errors found',       color: '#888' },
  { t: 3500, text: '⠿  Uploading bundle (1.2 MB)...',     color: '#ffb300' },
  { t: 4200, text: '✓  Deployed to 28 edge regions',      color: '#888' },
  { t: 4700, text: '✓  Cache invalidated globally',        color: '#888' },
  { t: 5000, text: '✓  Health checks passing (28/28)',    color: '#00ffa3' },
  { t: 5400, text: '🚀 LIVE  https://cosmos.agency',      color: '#00e5ff' },
  { t: 5800, text: '   Latency: p50=18ms p99=64ms',       color: '#b44dff' },
];

const FILES = [
  { name: 'route.ts',        icon: '📄', active: true  },
  { name: 'middleware.ts',   icon: '🔒', active: false },
  { name: 'schema.prisma',   icon: '🗄', active: false },
  { name: 'docker-compose',  icon: '🐳', active: false },
  { name: 'deploy.yml',      icon: '⚙', active: false },
];

/* Syntax-highlight a line of TS code */
function highlight(line: string): React.ReactNode {
  // tokenise very simply with replace patterns
  const tokens: { text: string; color: string }[] = [];
  let rest = line;

  const push = (match: RegExpMatchArray | null, color: string) => {
    if (!match || match.index === undefined) return false;
    if (match.index > 0) tokens.push({ text: rest.slice(0, match.index), color: '#cdd6f4' });
    tokens.push({ text: match[0], color });
    rest = rest.slice(match.index + match[0].length);
    return true;
  };

  // Greedy character-by-character approach is slow; just do a simple split
  // Keywords
  const keywordRx = /\b(import|export|from|async|await|const|let|return|if|new|true|false|null|undefined)\b/;
  const stringRx  = /(['"`].*?['"`])/;
  const commentRx = /(\/\/.*)/;
  const typeRx    = /\b(Request|Response|Promise|string|number|boolean|void)\b/;
  const funcRx    = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/;

  // Fall back to per-character rendering with simple regex
  const parts: { text:string; color:string }[] = [];
  const toks = line.split(/(\s+|[{}()[\]:;,.<>])/);
  toks.forEach(tok => {
    if (/^(import|export|from|async|await|const|let|return|if|new|where|skip|take|select|orderBy|default|status)$/.test(tok))
      parts.push({ text: tok, color: '#cba6f7' });
    else if (/^(true|false|null|undefined)$/.test(tok))
      parts.push({ text: tok, color: '#fab387' });
    else if (/^['"`]/.test(tok))
      parts.push({ text: tok, color: '#a6e3a1' });
    else if (/^\d+$/.test(tok))
      parts.push({ text: tok, color: '#fab387' });
    else if (/^(Request|Response|Promise|string|number|boolean|void|z)$/.test(tok))
      parts.push({ text: tok, color: '#89dceb' });
    else if (/^\/\//.test(tok))
      parts.push({ text: tok, color: '#585b70' });
    else
      parts.push({ text: tok, color: '#cdd6f4' });
  });

  return parts.map((p, i) => <span key={i} style={{ color: p.color }}>{p.text}</span>);
}

function LiveCodeEditor() {
  const [visibleChars, setVisibleChars] = useState(0);
  const [deployLogs,   setDeployLogs]   = useState<typeof DEPLOY_LOGS>([]);
  const [deploying,    setDeploying]     = useState(false);
  const logsRef = useRef<HTMLDivElement>(null);

  /* Typing effect */
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setVisibleChars(i);
      if (i >= CODE_FILE.length) {
        clearInterval(iv);
        // Start deploy after a pause
        setTimeout(() => setDeploying(true), 1000);
      }
    }, 18);
    return () => clearInterval(iv);
  }, []);

  /* Deploy logs streamer */
  useEffect(() => {
    if (!deploying) return;
    DEPLOY_LOGS.forEach(entry => {
      setTimeout(() => {
        setDeployLogs(p => [...p, entry]);
      }, entry.t);
    });
  }, [deploying]);

  /* Auto-scroll terminal */
  useEffect(() => {
    if (logsRef.current) logsRef.current.scrollTop = logsRef.current.scrollHeight;
  }, [deployLogs]);

  const displayedCode = CODE_FILE.slice(0, visibleChars);
  const lines = displayedCode.split('\n');

  return (
    <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden border border-[#00e5ff]/12 shadow-[0_0_80px_rgba(0,229,255,0.08)] font-code text-xs"
      style={{ background: '#020c18' }}
    >
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.05]" style={{ background: '#030f1f' }}>
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        <span className="ml-3 text-white/20 tracking-[.15em] text-[9px]">cosmos-api — Visual Studio Code</span>
        <div className="ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse" />
          <span className="text-[#00ffa3]/50 text-[8px] tracking-wider">LIVE</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* File tree */}
        <div className="w-36 shrink-0 border-r border-white/[0.04] py-3" style={{ background: '#02111e' }}>
          <div className="px-3 mb-2 text-[8px] text-white/15 tracking-[.25em] uppercase">Explorer</div>
          <div className="px-2">
            <div className="flex items-center gap-1.5 px-2 py-1 mb-0.5 text-[9px] text-white/30 tracking-wide">
              <span>▾</span><span>src / app / api</span>
            </div>
            {FILES.map(f => (
              <div key={f.name}
                className="flex items-center gap-1.5 px-3 py-1 rounded text-[9px] mb-0.5 transition-colors"
                style={{
                  background: f.active ? 'rgba(0,229,255,0.08)' : 'transparent',
                  color: f.active ? '#00e5ff' : 'rgba(255,255,255,0.25)',
                }}
              >
                <span>{f.icon}</span>
                <span className="truncate">{f.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Editor pane */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-white/[0.04]" style={{ background: '#030f1f' }}>
            <div className="flex items-center gap-2 px-4 py-2 border-r border-white/[0.04] text-[9px]"
              style={{ color: '#00e5ff', borderBottom: '1px solid #00e5ff' }}
            >
              <span>📄</span> route.ts
              <span className="w-1 h-1 rounded-full bg-[#ffb300] ml-1" title="unsaved" />
            </div>
          </div>

          {/* Code */}
          <div className="flex-1 overflow-auto p-3 leading-relaxed" style={{ fontSize: '10.5px' }}>
            {lines.map((line, i) => (
              <div key={i} className="flex min-h-[18px]">
                <span className="w-7 shrink-0 text-right pr-3 text-white/12 select-none">{i + 1}</span>
                <span className="flex-1 whitespace-pre">{highlight(line)}</span>
                {/* Blinking cursor on last line */}
                {i === lines.length - 1 && visibleChars < CODE_FILE.length && (
                  <span className="inline-block w-[7px] h-[14px] align-middle ml-0.5"
                    style={{ background: '#00e5ff', animation: 'blink 1s step-end infinite' }} />
                )}
              </div>
            ))}
          </div>

          {/* Status bar */}
          <div className="flex items-center gap-4 px-3 py-1 border-t border-white/[0.04] text-[8px]"
            style={{ background: '#020c18', color: 'rgba(255,255,255,0.2)' }}
          >
            <span style={{ color: '#00e5ff' }}>TypeScript</span>
            <span>Ln {lines.length}</span>
            <span>UTF-8</span>
            <span className="ml-auto" style={{ color: '#00ffa3' }}>✓ No errors</span>
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div className="border-t border-white/[0.05] flex flex-col" style={{ background: '#010a14', height: '145px' }}>
        <div className="flex items-center gap-3 px-4 py-1.5 border-b border-white/[0.04]">
          <span className="text-[9px] text-white/25 tracking-[.2em] uppercase">Terminal</span>
          {deploying && (
            <span className="flex items-center gap-1.5 ml-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse" />
              <span className="text-[8px] text-[#00ffa3]/60 tracking-wider">deploying</span>
            </span>
          )}
        </div>
        <div ref={logsRef} className="flex-1 overflow-auto px-4 py-2 space-y-0.5">
          {!deploying && (
            <div className="text-[9px] text-white/15">Waiting for build...</div>
          )}
          <AnimatePresence initial={false}>
            {deployLogs.map((log, i) => (
              <motion.div key={i}
                initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
                className="text-[9px] leading-relaxed tracking-wide"
                style={{ color: log.color }}
              >
                {log.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ══ Page ══════════════════════════════════════ */
const features = [
  { title:'React & Next.js',   desc:'Lightning-fast SSR/SSG apps with React server components and streaming.',      icon:Layers   },
  { title:'Scalable Backends', desc:'Node.js, Golang, or Python APIs crafted for millions of concurrent requests.', icon:Server   },
  { title:'Database Design',   desc:'PostgreSQL, Redis & MongoDB schemas optimised for high-throughput workloads.', icon:Database },
  { title:'Cloud Infra',       desc:'AWS/GCP with CI/CD pipelines and zero-downtime blue-green deployments.',       icon:Globe    },
  { title:'Security-first',    desc:'SOC2-grade auth, OAuth 2.0, rate limiting and penetration testing.',           icon:Shield   },
  { title:'Performance',       desc:'Core Web Vitals mastery, CDN edge caching, sub-100ms global responses.',       icon:Zap      },
];
const stack = ['Next.js','TypeScript','PostgreSQL','Redis','Docker','AWS','Prisma','tRPC','Golang','Kubernetes'];

export default function FullstackPage() {
  return (
    <main className="min-h-screen nebula-full text-white selection:bg-[#00e5ff]/20 selection:text-cyan-200">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-cosmic opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"/>

        <div className="container mx-auto px-6 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 relative z-10">

          {/* Text */}
          <motion.div initial={{opacity:0,x:-50}} animate={{opacity:1,x:0}} transition={{duration:.9,ease:[0.23,1,0.32,1]}}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#00e5ff]/25 bg-[#00e5ff]/06 text-[#00e5ff] text-[9px] font-code tracking-[.25em] uppercase mb-8">
              <Code2 className="w-3 h-3"/> Fullstack Engineering
            </div>
            <h1 className="font-display font-black text-5xl md:text-7xl leading-[.88] tracking-tight mb-6">
              <span className="block text-white/20">Systems</span>
              <span className="block" style={{background:'linear-gradient(120deg,#00e5ff,#3b82f6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Built to</span>
              <span className="block text-white">Last.</span>
            </h1>
            <p className="text-white/33 text-lg leading-relaxed mb-10 max-w-md">
              Enterprise-grade products <span className="text-white/65">from pixel to production</span> — clean architecture, scalable infra, zero compromise on performance.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <motion.button whileHover={{scale:1.02}} whileTap={{scale:.96}}
                className="group relative px-8 py-4 rounded-xl font-display font-bold text-sm tracking-wider text-black overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00e5ff] to-[#3b82f6]"/>
                <span className="relative z-10 flex items-center gap-2">Start Building <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></span>
              </motion.button>
              <button className="px-8 py-4 rounded-xl font-display font-semibold text-sm tracking-wider text-white/40 hover:text-white border border-white/08 hover:border-white/18 bg-white/03 transition-all">
                View Portfolio
              </button>
            </div>
            <div className="flex gap-8">
              {[['99.9%','Uptime SLA'],['<100ms','Response'],['∞','Scale']].map(([v,l])=>(
                <div key={l}>
                  <div className="font-display text-xl font-bold" style={{background:'linear-gradient(120deg,#00e5ff,#3b82f6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{v}</div>
                  <div className="font-code text-[9px] text-white/20 tracking-[.2em] uppercase">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live code editor */}
          <motion.div initial={{opacity:0,scale:.88}} animate={{opacity:1,scale:1}} transition={{duration:1.1,delay:.35,ease:[0.23,1,0.32,1]}}
            style={{ height:'540px' }}
          >
            <LiveCodeEditor/>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="container mx-auto px-6">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-14">
            <span className="font-code text-[9px] tracking-[.3em] text-white/18 uppercase">Capabilities</span>
            <h2 className="font-display font-black text-4xl mt-3 text-white">What we deliver</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f,i)=>(
              <motion.div key={f.title} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-20px'}} transition={{delay:i*.07,duration:.7,ease:[0.23,1,0.32,1]}}
                className="group p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-[#00e5ff]/22 hover:bg-[#00e5ff]/[0.03] transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/08 flex items-center justify-center text-[#00e5ff] mb-5 group-hover:scale-110 group-hover:shadow-[0_0_14px_rgba(0,229,255,0.3)] transition-all">
                  <f.icon className="w-5 h-5"/>
                </div>
                <h3 className="font-display font-bold text-base text-white mb-2">{f.title}</h3>
                <p className="text-white/28 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-14 border-t border-white/[0.04] overflow-hidden">
        <div className="container mx-auto px-6">
          <p className="font-code text-[9px] text-white/12 text-center mb-8 tracking-[.4em] uppercase">Our Tech Stack</p>
          <div className="overflow-hidden">
            <div className="flex gap-5 anim-marquee" style={{width:'max-content'}}>
              {[...stack,...stack].map((s,i)=>(
                <div key={i} className="shrink-0 px-5 py-2.5 rounded-lg border border-white/06 bg-white/02 font-display font-bold text-sm text-white/20 hover:text-[#00e5ff] hover:border-[#00e5ff]/30 transition-all cursor-default">{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}