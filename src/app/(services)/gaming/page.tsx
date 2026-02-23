'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Layers, Zap, Globe, Cpu, ArrowRight, Trophy, Users } from 'lucide-react';

/* ══════════════════════════════════════════════════════════
   SPACE SHOOTER MINI-GAME
   Controls: WASD / Arrow Keys to move & turn
             SPACE to shoot forward
             Click anywhere to shoot toward cursor
══════════════════════════════════════════════════════════ */
function SpaceShooterGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    /* ── State ── */
    const keys: Record<string, boolean> = {};
    let score = 0, lives = 3, level = 1, gameOver = false, scoreFlash = 0;
    let spawnTimer = 0, lastTime = performance.now(), raf = 0;

    const ship = { x: W/2, y: H/2, vx: 0, vy: 0, angle: -Math.PI/2, r: 13, cooldown: 0, invincible: 0 };

    interface Bullet   { x:number; y:number; vx:number; vy:number; life:number }
    interface Rock     { x:number; y:number; vx:number; vy:number; r:number; rot:number; drot:number; hp:number; pts:number; shape:number[] }
    interface Spark    { x:number; y:number; vx:number; vy:number; life:number; maxLife:number; color:string; r:number }

    const bullets: Bullet[] = [];
    const rocks:   Rock[]   = [];
    const sparks:  Spark[]  = [];

    /* Background stars */
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      r: Math.random()*1.2+0.2,
      a: Math.random()*0.5+0.08,
      t: Math.random()*Math.PI*2,
    }));

    /* Nebula blobs */
    const nebulas = Array.from({ length: 5 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      r: 80+Math.random()*140,
      hue: [140,160,120,180][Math.floor(Math.random()*4)],
      a: 0.02+Math.random()*0.04,
    }));

    /* ── Helpers ── */
    function makeRock(x:number, y:number, r:number): Rock {
      const cx = W/2, cy = H/2;
      const a  = Math.atan2(cy-y, cx-x) + (Math.random()-.5)*.8;
      const spd = .5 + Math.random()*.8 + level*.1;
      const n = 7+Math.floor(Math.random()*4);
      const shape = Array.from({length:n}, ()=> .62+Math.random()*.55);
      return { x, y, vx:Math.cos(a)*spd, vy:Math.sin(a)*spd, r, rot:0, drot:(Math.random()-.5)*.03, hp:r>30?2:1, pts:r>30?20:10, shape };
    }

    function spawnRock() {
      const side = Math.floor(Math.random()*4);
      let x=0,y=0;
      if      (side===0){x=Math.random()*W; y=-50;}
      else if (side===1){x=W+50; y=Math.random()*H;}
      else if (side===2){x=Math.random()*W; y=H+50;}
      else              {x=-50; y=Math.random()*H;}
      rocks.push(makeRock(x, y, 18+Math.random()*26));
    }

    function burst(x:number,y:number,n:number,color:string) {
      for(let i=0;i<n;i++){
        const a=Math.random()*Math.PI*2, s=.8+Math.random()*3.5;
        sparks.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:30+Math.random()*40,maxLife:70,color,r:1+Math.random()*2});
      }
    }

    function fire(ax:number, ay:number) {
      if(ship.cooldown>0) return;
      bullets.push({x:ship.x,y:ship.y,vx:Math.cos(ax)*13,vy:Math.sin(ay)*13,life:55});
      ship.cooldown=8;
    }

    function resetGame() {
      score=0; lives=3; level=1; gameOver=false; spawnTimer=0;
      bullets.length=0; rocks.length=0; sparks.length=0;
      ship.x=W/2; ship.y=H/2; ship.vx=0; ship.vy=0;
      ship.angle=-Math.PI/2; ship.cooldown=0; ship.invincible=80;
    }

    /* ── Draw ship ── */
    function drawShip() {
      if(ship.invincible>0 && Math.floor(ship.invincible/5)%2===0) return;
      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(ship.angle+Math.PI/2);

      const thrusting = keys['ArrowUp']||keys['KeyW'];

      if(thrusting){
        // Engine glow
        const eg=ctx.createRadialGradient(0,12,0,0,12,22);
        eg.addColorStop(0,'rgba(0,255,163,.8)'); eg.addColorStop(1,'rgba(0,255,163,0)');
        ctx.beginPath(); ctx.arc(0,12,22,0,Math.PI*2); ctx.fillStyle=eg; ctx.fill();
        // Flame
        const flen=8+Math.random()*12;
        ctx.beginPath(); ctx.moveTo(-4,10); ctx.lineTo(0,10+flen); ctx.lineTo(4,10);
        ctx.strokeStyle=`rgba(0,255,163,${.6+Math.random()*.4})`; ctx.lineWidth=2;
        ctx.shadowColor='#00ffa3'; ctx.shadowBlur=10; ctx.stroke(); ctx.shadowBlur=0;
      }

      // Hull
      ctx.beginPath();
      ctx.moveTo(0,-14); ctx.lineTo(-10,10); ctx.lineTo(-4,6); ctx.lineTo(0,8); ctx.lineTo(4,6); ctx.lineTo(10,10);
      ctx.closePath();
      ctx.strokeStyle='#00ffa3'; ctx.lineWidth=2;
      ctx.shadowColor='#00ffa3'; ctx.shadowBlur=16; ctx.stroke(); ctx.shadowBlur=0;

      // Cockpit
      ctx.beginPath(); ctx.arc(0,-4,3.5,0,Math.PI*2);
      ctx.fillStyle='rgba(0,255,163,.45)'; ctx.fill();
      ctx.restore();
    }

    /* ── Draw rock ── */
    function drawRock(r: Rock) {
      ctx.save(); ctx.translate(r.x,r.y); ctx.rotate(r.rot);
      ctx.beginPath();
      const n=r.shape.length;
      for(let i=0;i<n;i++){
        const a=(i/n)*Math.PI*2;
        const rv=r.r*r.shape[i];
        if(i===0) ctx.moveTo(Math.cos(a)*rv, Math.sin(a)*rv);
        else      ctx.lineTo(Math.cos(a)*rv, Math.sin(a)*rv);
      }
      ctx.closePath();
      ctx.fillStyle = r.hp>1 ? 'rgba(0,60,25,.65)' : 'rgba(0,40,18,.45)';
      ctx.strokeStyle= r.hp>1 ? 'rgba(0,210,100,.65)' : 'rgba(0,170,80,.45)';
      ctx.lineWidth=r.hp>1?1.8:1.2;
      ctx.fill(); ctx.stroke();
      ctx.restore();
    }

    /* ── Input ── */
    const onKD=(e:KeyboardEvent)=>{ keys[e.code]=true; if(e.code==='Space') e.preventDefault(); };
    const onKU=(e:KeyboardEvent)=>{ keys[e.code]=false; };
    const onCK=(e:MouseEvent)=>{
      if(gameOver){ resetGame(); return; }
      const rect=canvas.getBoundingClientRect();
      const mx=e.clientX-rect.left, my=e.clientY-rect.top;
      const a=Math.atan2(my-ship.y, mx-ship.x);
      bullets.push({x:ship.x,y:ship.y,vx:Math.cos(a)*13,vy:Math.sin(a)*13,life:55});
      ship.cooldown=8;
    };

    window.addEventListener('keydown',onKD);
    window.addEventListener('keyup',onKU);
    canvas.addEventListener('click',onCK);

    /* ── Main loop ── */
    function loop(now:number){
      const dt=Math.min((now-lastTime)/16.67,2.5); lastTime=now;
      ctx.clearRect(0,0,W,H);

      /* BG nebulas */
      nebulas.forEach(n=>{
        const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);
        g.addColorStop(0,`hsla(${n.hue},80%,45%,${n.a*2})`);
        g.addColorStop(1,`hsla(${n.hue},80%,45%,0)`);
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
      });

      /* Stars */
      stars.forEach(s=>{
        s.t+=.018;
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${s.a*(0.7+0.3*Math.sin(s.t))})`; ctx.fill();
      });

      if(!gameOver){
        /* ── Ship movement ── */
        const left  = keys['ArrowLeft']||keys['KeyA'];
        const right = keys['ArrowRight']||keys['KeyD'];
        const fwd   = keys['ArrowUp']||keys['KeyW'];
        const shoot = keys['Space'];

        if(left)  ship.angle-=.055*dt;
        if(right) ship.angle+=.055*dt;
        if(fwd){  ship.vx+=Math.cos(ship.angle)*.28*dt; ship.vy+=Math.sin(ship.angle)*.28*dt; }
        ship.vx*=.975; ship.vy*=.975;
        const spd=Math.hypot(ship.vx,ship.vy);
        if(spd>7){ ship.vx=ship.vx/spd*7; ship.vy=ship.vy/spd*7; }
        ship.x+=ship.vx*dt; ship.y+=ship.vy*dt;
        // Wrap
        if(ship.x<-20)ship.x=W+20; if(ship.x>W+20)ship.x=-20;
        if(ship.y<-20)ship.y=H+20; if(ship.y>H+20)ship.y=-20;

        if(ship.cooldown>0)  ship.cooldown  -=dt;
        if(ship.invincible>0) ship.invincible-=dt;

        if(shoot && ship.cooldown<=0){
          bullets.push({x:ship.x,y:ship.y,vx:Math.cos(ship.angle)*13,vy:Math.sin(ship.angle)*13,life:55});
          ship.cooldown=9;
        }

        /* ── Bullets ── */
        for(let i=bullets.length-1;i>=0;i--){
          const b=bullets[i];
          b.x+=b.vx*dt; b.y+=b.vy*dt; b.life-=dt;
          if(b.life<=0||b.x<-10||b.x>W+10||b.y<-10||b.y>H+10){bullets.splice(i,1);continue;}
          ctx.beginPath(); ctx.arc(b.x,b.y,2.5,0,Math.PI*2);
          ctx.fillStyle='#00ffa3'; ctx.shadowColor='#00ffa3'; ctx.shadowBlur=10; ctx.fill(); ctx.shadowBlur=0;
        }

        /* ── Rocks ── */
        spawnTimer+=dt;
        const spawnRate=Math.max(50,140-level*14);
        if(spawnTimer>=spawnRate){ spawnRock(); spawnTimer=0; }
        level=1+Math.floor(score/200);

        for(let i=rocks.length-1;i>=0;i--){
          const rock=rocks[i];
          rock.x+=rock.vx*dt; rock.y+=rock.vy*dt; rock.rot+=rock.drot*dt;
          // Cull far rocks
          if(Math.hypot(rock.x-W/2,rock.y-H/2)>Math.max(W,H)+120){rocks.splice(i,1);continue;}
          drawRock(rock);

          /* Bullet collision */
          let hit=false;
          for(let j=bullets.length-1;j>=0;j--){
            const b=bullets[j];
            if(Math.hypot(b.x-rock.x,b.y-rock.y)<rock.r){
              bullets.splice(j,1); hit=true; rock.hp--;
              burst(b.x,b.y,5,'rgba(0,255,120,.9)');
              if(rock.hp<=0){
                score+=rock.pts; scoreFlash=28;
                burst(rock.x,rock.y,20,'rgba(0,255,120,.85)');
                if(rock.r>28){
                  for(let k=0;k<2;k++){
                    const nr=rock.r*.55;
                    const offs=(Math.random()-.5)*20;
                    rocks.push(makeRock(rock.x+offs,rock.y+offs,nr));
                  }
                }
                rocks.splice(i,1);
              }
              break;
            }
          }
          if(hit) continue;

          /* Ship collision */
          if(ship.invincible<=0 && Math.hypot(ship.x-rock.x,ship.y-rock.y)<ship.r+rock.r-6){
            lives--;
            ship.invincible=130;
            ship.vx=-rock.vx*2; ship.vy=-rock.vy*2;
            burst(ship.x,ship.y,24,'rgba(0,255,163,.8)');
            if(lives<=0){ burst(ship.x,ship.y,42,'rgba(0,255,163,.95)'); gameOver=true; }
          }
        }

        drawShip();
      }

      /* ── Sparks ── */
      for(let i=sparks.length-1;i>=0;i--){
        const s=sparks[i];
        s.x+=s.vx; s.y+=s.vy; s.vx*=.92; s.vy*=.92; s.life--;
        if(s.life<=0){sparks.splice(i,1);continue;}
        const a=s.life/s.maxLife;
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r*a,0,Math.PI*2);
        ctx.fillStyle=s.color; ctx.globalAlpha=a; ctx.fill(); ctx.globalAlpha=1;
      }

      /* ── HUD ── */
      ctx.font='bold 14px "Fira Code",monospace';
      ctx.fillStyle=scoreFlash>0?'#00ffa3':'rgba(0,255,163,.55)';
      ctx.shadowColor='#00ffa3'; ctx.shadowBlur=scoreFlash>0?22:3;
      ctx.fillText(`SCORE  ${String(score).padStart(6,'0')}`, 16, 30);
      ctx.fillText(`LV ${level}`, W-72, 30);
      ctx.shadowBlur=0;
      if(scoreFlash>0) scoreFlash--;

      // Lives icons
      for(let i=0;i<lives;i++){
        ctx.save(); ctx.translate(16+i*24,52); ctx.rotate(-Math.PI/2);
        ctx.beginPath(); ctx.moveTo(0,-7); ctx.lineTo(-5,6); ctx.lineTo(0,3); ctx.lineTo(5,6); ctx.closePath();
        ctx.strokeStyle='rgba(0,255,163,.65)'; ctx.lineWidth=1.4; ctx.stroke();
        ctx.restore();
      }

      // Controls hint
      ctx.font='9px "Fira Code",monospace';
      ctx.fillStyle='rgba(0,255,163,.18)';
      ctx.textAlign='center';
      ctx.fillText('WASD/ARROWS to move · SPACE or CLICK to fire', W/2, H-12);
      ctx.textAlign='left';

      /* ── Game Over overlay ── */
      if(gameOver){
        ctx.fillStyle='rgba(1,13,4,.82)'; ctx.fillRect(0,0,W,H);
        ctx.textAlign='center';
        ctx.font='bold 42px "Unbounded",sans-serif';
        ctx.fillStyle='#00ffa3'; ctx.shadowColor='#00ffa3'; ctx.shadowBlur=35;
        ctx.fillText('GAME OVER', W/2, H/2-28); ctx.shadowBlur=0;
        ctx.font='16px "Fira Code",monospace';
        ctx.fillStyle='rgba(0,255,163,.7)';
        ctx.fillText(`FINAL SCORE: ${score}`, W/2, H/2+18);
        ctx.font='11px "Fira Code",monospace';
        ctx.fillStyle='rgba(0,255,163,.35)';
        ctx.fillText('— CLICK TO PLAY AGAIN —', W/2, H/2+52);
        ctx.textAlign='left';
      }

      raf=requestAnimationFrame(loop);
    }

    raf=requestAnimationFrame(loop);

    const resize=()=>{
      W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight;
    };
    window.addEventListener('resize',resize);

    return ()=>{
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown',onKD);
      window.removeEventListener('keyup',onKU);
      canvas.removeEventListener('click',onCK);
      window.removeEventListener('resize',resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

/* ══ Features & page layout ════════════════════ */
const features = [
  { title:'Unity & Unreal',     desc:'High-fidelity worlds with cinematic physics and real-time lighting.',           icon:Layers  },
  { title:'Multiplayer Infra',  desc:'Photon / Mirror backends for 10,000-player concurrent PVP arenas.',            icon:Globe   },
  { title:'60fps Guaranteed',   desc:'Shader micro-optimisations and GPU profiling for silky-smooth performance.',   icon:Zap     },
  { title:'VR / AR / XR',       desc:'Meta Quest, Vision Pro, and PSVR2 native immersive experiences.',              icon:Cpu     },
  { title:'Live Game Services', desc:'Season pass, analytics, player economies, and live-ops dashboards.',           icon:Trophy  },
  { title:'Crossplay & SBMM',   desc:'Platform-agnostic matchmaking with skill-based pairing algorithms.',           icon:Users   },
];
const stack=['UNITY','UNREAL','BLENDER','C#','HLSL','WEBGL','THREE.JS','PHOTON','WWISE'];

export default function GamingPage() {
  return (
    <main className="min-h-screen nebula-game text-white selection:bg-[#00ffa3]/20 selection:text-[#00ffa3]">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-cosmic opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"/>

        <div className="container mx-auto px-6 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 relative z-10">

          {/* Text */}
          <motion.div initial={{opacity:0,x:-50}} animate={{opacity:1,x:0}} transition={{duration:.9,ease:[0.23,1,0.32,1]}}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#00ffa3]/25 bg-[#00ffa3]/06 text-[#00ffa3] text-[9px] font-code tracking-[.25em] uppercase mb-8">
              <Gamepad2 className="w-3 h-3"/> Level Up Your Brand
            </div>
            <h1 className="font-display font-black text-5xl md:text-7xl leading-[.88] tracking-tight mb-6">
              <span className="block text-white/20">Forging</span>
              <span className="block" style={{background:'linear-gradient(120deg,#00ffa3,#00e5ff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Virtual</span>
              <span className="block text-white">Worlds.</span>
            </h1>
            <p className="text-white/35 text-lg leading-relaxed mb-10 max-w-md">
              We engineer <span className="text-white/70">immersive experiences</span> — from hyper-casual hits to AAA cinematic worlds.
              <br/><span className="text-[#00ffa3]/55 text-sm">↑ Play our mini-game demo to feel the craft.</span>
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <motion.button whileHover={{scale:1.02}} whileTap={{scale:.96}}
                className="group relative px-8 py-4 rounded-xl font-display font-bold text-sm tracking-wider text-black overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00ffa3] to-[#00e5ff]"/>
                <span className="relative z-10 flex items-center gap-2">Start Development <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></span>
              </motion.button>
              <button className="px-8 py-4 rounded-xl font-display font-semibold text-sm tracking-wider text-white/40 hover:text-white border border-white/08 hover:border-white/18 bg-white/03 transition-all">
                View Portfolio
              </button>
            </div>
            <div className="flex gap-8">
              {[['20+','Games Shipped'],['60fps','Guaranteed'],['5★','Client Rating']].map(([v,l])=>(
                <div key={l}>
                  <div className="font-display text-xl font-bold" style={{background:'linear-gradient(120deg,#00ffa3,#00e5ff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{v}</div>
                  <div className="font-code text-[9px] text-white/20 tracking-[.2em] uppercase">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* GAME BOX */}
          <motion.div initial={{opacity:0,scale:.88}} animate={{opacity:1,scale:1}} transition={{duration:1.1,delay:.35,ease:[0.23,1,0.32,1]}}>
            <div className="relative rounded-3xl overflow-hidden border border-[#00ffa3]/15 shadow-[0_0_80px_rgba(0,255,163,0.12)]" style={{height:'500px',background:'#010d04'}}>
              <SpaceShooterGame/>
            </div>
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="font-code text-[9px] text-white/18 tracking-[.15em]">// INTERACTIVE DEMO · FULLY PLAYABLE</span>
              <span className="font-code text-[9px] text-[#00ffa3]/30 tracking-[.12em]">WASD · SPACE TO FIRE</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="container mx-auto px-6">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-14">
            <span className="font-code text-[9px] tracking-[.3em] text-white/18 uppercase">Capabilities</span>
            <h2 className="font-display font-black text-4xl mt-3 text-white">What we build</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f,i)=>(
              <motion.div key={f.title} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-20px'}} transition={{delay:i*.07,duration:.7,ease:[0.23,1,0.32,1]}}
                className="group p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-[#00ffa3]/22 hover:bg-[#00ffa3]/[0.03] transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00ffa3]/08 flex items-center justify-center text-[#00ffa3] mb-5 group-hover:scale-110 group-hover:shadow-[0_0_14px_rgba(0,255,163,0.3)] transition-all">
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
          <p className="font-code text-[9px] text-white/12 text-center mb-8 tracking-[.4em] uppercase">Tech Stack</p>
          <div className="overflow-hidden">
            <div className="flex gap-5 anim-marquee" style={{width:'max-content'}}>
              {[...stack,...stack].map((s,i)=>(
                <div key={i} className="shrink-0 px-5 py-2.5 rounded-lg border border-white/06 bg-white/02 font-display font-bold text-sm text-white/20 hover:text-[#00ffa3] hover:border-[#00ffa3]/30 transition-all cursor-default">{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}