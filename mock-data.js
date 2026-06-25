'use strict';
/* Shared fake data + ambient sea + detail reader for the three concept mockups. */

const RC = { 'Game Designer':'#7fe3ff', 'Technical Game Designer':'#ffd27a', 'Leadership':'#e6a8ff', 'Game Programmer':'#7dffd0' };
const CATS = ['PROFESSIONAL','PERSONAL','UNIVERSITY','JAM'];

const DATA = [
  { id:'cadence', title:'Project Cadence', year:2025, cat:'PERSONAL', role:'Technical Game Designer', img:'./assets/images/ProjectCadence.png',
    blurb:'A C++ Unreal Engine plugin that turns music into gameplay. It parses a beatmap, maps each timestamp to an action, and fires those actions in-game on the beat.',
    story:'Built as a reusable framework, not a single game. Lightweight UObjects manage thousands of note events with no spawn cost, and timing data is separated from behaviour so the same beatmap can power a different genre entirely.' },
  { id:'monk', title:'Monk Homebrew (D&D 5e)', year:2023, cat:'PERSONAL', role:'Game Designer', img:'./assets/images/Monk.png',
    blurb:'A ground-up rebuild of the D&D Monk around one new mechanic: the Vessels of Ki, spectral objects that hold memories and ideas, used to attack, defend, and pay for abilities.',
    story:'The base Monk has an identity problem: its features are useful but disconnected. The redesign started from one question, what if ki was something you could hold, shape, and lose? Every existing subclass slotted in more naturally than before.' },
  { id:'hol', title:'High on Life', year:2025, cat:'PROFESSIONAL', role:'Game Programmer', img:'./assets/images/HighOnLife.png',
    blurb:'Nintendo Switch port. Deep C++ and Blueprint debugging, internal tooling built from scratch, and critical subsystems rewritten for Switch stability.',
    story:'Became the team reference for how the game actually worked. A division by zero killing the collision matrix, Ubergraph memory leaks, the Bink player reading the wrong path. One fix at a time.' },
  { id:'cycle', title:'Cycle', year:2021, cat:'UNIVERSITY', role:'Leadership', img:'./assets/images/Cycle.png',
    blurb:'Best 3rd-Year Videogame at Falmouth 2021, shown at the G7 Summit. A surrealist puzzle-adventure built by two artists and me.',
    story:'I had never used Unreal before this. I spent August learning it, then we made the game. The seamless teleports are my favourite detail: nobody noticed them, everybody felt subtly disoriented.' },
  { id:'crt', title:'CRT.exe', year:2026, cat:'JAM', role:'Leadership', img:'./assets/images/CRTexe.svg',
    blurb:'Led a team of eight through a game jam by designing the game around how the team could actually function. Each area owned by one person, one mechanic, one hidden code.',
    story:'No dependencies, no bottlenecks. The design solved the team problem; they were the same solution. I went in to make sound effects and left having led the whole group to a finished submission.' },
  { id:'battleship', title:'UEFN: Battleship', year:2023, cat:'PROFESSIONAL', role:'Technical Game Designer', img:'./assets/images/Battleship.jpeg',
    blurb:'A fast strategy game taken from concept to launch on Fortnite. I designed the rules and built the entire custom battleship system in Verse.',
    story:'Built all primary systems in Verse: the interactive combat grid, the ship-placement logic, and real-time player feedback. Led the design from the core ruleset to launch.' },
];

const LINEAGE = [
  { when:'2023 › PRESENT', what:'Technical Game Designer & Programmer // Untold Games', where:'Ported shipped titles to Nintendo Switch (High on Life, Police Simulator); lead systems programmer in Verse on released UEFN titles.' },
  { when:'2021 › 2023', what:'MSc, Game Programming // University of Verona', where:'C#, C++, Unreal Engine, Unity, game production.' },
  { when:'2018 › 2021', what:'BA (Hons) Games Development: Design // Falmouth University', where:'Won Best 3rd-Year Videogame 2021 (Cycle).' },
];

const roleColor = r => RC[r] || '#b4e6ff';
function traitCounts(){ const m={}; Object.keys(RC).forEach(r=>m[r]=DATA.filter(p=>p.role===r).length); return m; }

function glyphSVG(rc){
  let s=''; for(let i=0;i<8;i++){const a=i/8*6.2832;s+=`<line x1="${(20+Math.cos(a)*7).toFixed(1)}" y1="${(20+Math.sin(a)*7).toFixed(1)}" x2="${(20+Math.cos(a)*16).toFixed(1)}" y2="${(20+Math.sin(a)*16).toFixed(1)}" opacity=".4"/>`;}
  return `<svg class="glyph" viewBox="0 0 40 40" aria-hidden="true"><g fill="none" stroke="${rc}" stroke-width="1"><circle cx="20" cy="20" r="13" opacity=".5"/><circle cx="20" cy="20" r="7" opacity=".7" stroke-dasharray="2 4"/>${s}</g><circle cx="20" cy="20" r="2.4" fill="${rc}"/></svg>`;
}
function cardHTML(p){
  const rc=roleColor(p.role);
  return `<button class="card" data-id="${p.id}" data-cat="${p.cat}" style="--rc:${rc}">
    <div class="thumb"><img src="${p.img}" alt="${p.title}" loading="lazy">${glyphSVG(rc)}</div>
    <div class="cbody"><div class="cmeta">${p.cat} · ${p.year}</div><div class="ctitle">${p.title}</div><div class="crole">${p.role}</div></div>
  </button>`;
}
function wireCards(scope){ (scope||document).querySelectorAll('.card[data-id]').forEach(c=>c.addEventListener('click',()=>openDetail(c.dataset.id))); }

/* shared detail reader (bloom) */
let _detail;
function openDetail(id){
  const p=DATA.find(x=>x.id===id); if(!p) return;
  const rc=roleColor(p.role);
  if(!_detail){ _detail=document.createElement('div'); _detail.className='detail'; document.body.appendChild(_detail);
    _detail.addEventListener('click',e=>{ if(e.target===_detail||e.target.classList.contains('scrim')||e.target.classList.contains('pclose')) closeDetail(); }); }
  _detail.innerHTML=`<div class="scrim"></div><div class="panel" style="--rc:${rc}">
    <button class="pclose">RELEASE ✕</button>
    <div class="pmedia"><img src="${p.img}" alt="${p.title}"></div>
    <div class="pinner">
      <div class="pmeta">◎ OBSERVE · ${p.cat} · ${p.year} · ${p.role}</div>
      <div class="ptitle">${p.title}</div>
      <p class="pblurb">${p.blurb}</p>
      <p class="pstory">${p.story}</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn" href="#" onclick="return false">Play / Watch</a><a class="btn" href="#" onclick="return false">Source</a></div>
    </div></div>`;
  requestAnimationFrame(()=>_detail.classList.add('open'));
  document.addEventListener('keydown',_esc);
}
function closeDetail(){ if(_detail) _detail.classList.remove('open'); document.removeEventListener('keydown',_esc); }
function _esc(e){ if(e.key==='Escape') closeDetail(); }

/* ---------- ambient sea (compact) ---------- */
function mockSea(){
  const cv=document.getElementById('sea'); if(!cv) return; const g=cv.getContext('2d');
  let W,H,t=0,mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my; const trail=[],pk=[],dr=[];
  const LUM=a=>`rgba(180,230,255,${a})`;
  function seed(){ pk.length=0;dr.length=0; const N=Math.min(140,Math.round(W*H/22000));
    for(let i=0;i<N;i++)pk.push({x:Math.random()*W,y:Math.random()*H,z:Math.random(),r:.5+Math.random()*1.7,ph:Math.random()*6.28,vy:-.04-Math.random()*.16,vx:-.05+Math.random()*.1});
    for(let i=0;i<3;i++)dr.push({x:Math.random()*W,y:Math.random()*H,s:.16+Math.random()*.3,rot:Math.random()*6.28,spin:(-1+Math.random()*2)*.0005,vx:-.04+Math.random()*.08,vy:-.03-Math.random()*.04,seed:Math.random()*99});
  }
  function resize(){ W=cv.width=innerWidth;H=cv.height=innerHeight;seed(); } addEventListener('resize',resize); resize();
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  function radio(x,y,rad,rot,op){ [1,.72,.45].forEach((rk,i)=>{g.lineWidth=i===1?1:.7;g.setLineDash(i===1?[3,8]:[]);g.strokeStyle=LUM(op*.18);g.beginPath();g.arc(x,y,rad*rk,0,6.2832);g.stroke();}); g.setLineDash([]);
    for(let i=0;i<12;i++){const a=rot+i/12*6.2832;g.strokeStyle=LUM(op*.14);g.beginPath();g.moveTo(x+Math.cos(a)*rad*.3,y+Math.sin(a)*rad*.3);g.lineTo(x+Math.cos(a)*rad*1.1,y+Math.sin(a)*rad*1.1);g.stroke();const pl=.5+.5*Math.sin(t*.04+i);g.fillStyle=LUM(op*(.2+.4*pl));g.beginPath();g.arc(x+Math.cos(a)*rad,y+Math.sin(a)*rad,1.2,0,6.2832);g.fill();}
    g.fillStyle=LUM(op*.7);g.beginPath();g.arc(x,y,2,0,6.2832);g.fill(); }
  function frame(){ if(W!==innerWidth||H!==innerHeight)resize(); t++;
    g.clearRect(0,0,W,H); g.globalCompositeOperation='lighter';
    for(const p of pk){ p.x+=p.vx*(.4+p.z);p.y+=p.vy*(.4+p.z); if(p.y<-12){p.y=H+12;p.x=Math.random()*W;} if(p.x<-12)p.x=W+12;else if(p.x>W+12)p.x=-12;
      const tw=.4+.6*Math.sin(t*.03+p.ph); g.fillStyle=LUM((.1+.4*p.z)*tw); g.beginPath();g.arc(p.x,p.y,p.r*(.6+p.z),0,6.2832);g.fill(); }
    const baseR=Math.min(W,H)*.32;
    for(const d of dr){ d.x+=d.vx;d.y+=d.vy;d.rot+=d.spin; if(d.y<-260)d.y=H+260; if(d.x<-260)d.x=W+260;else if(d.x>W+260)d.x=-260; radio(d.x,d.y+Math.sin(t*.01+d.seed)*8,baseR*d.s,d.rot,.4); }
    radio(W*.8,H*.42+Math.sin(t*.012)*12,baseR*1.05,t*.0009,.5);
    cx+=(mx-cx)*.14;cy+=(my-cy)*.14; trail.push({x:cx,y:cy}); if(trail.length>16)trail.shift();
    g.lineWidth=1.3; for(let i=1;i<trail.length;i++){g.strokeStyle=LUM(i/trail.length*.2);g.beginPath();g.moveTo(trail[i-1].x,trail[i-1].y);g.lineTo(trail[i].x,trail[i].y);g.stroke();}
    const gl=g.createRadialGradient(cx,cy,0,cx,cy,70);gl.addColorStop(0,LUM(.05));gl.addColorStop(1,LUM(0));g.fillStyle=gl;g.beginPath();g.arc(cx,cy,70,0,6.2832);g.fill();
    radio(cx,cy,10,t*.02,.85);
    g.globalCompositeOperation='source-over'; document.hidden?setTimeout(frame,200):requestAnimationFrame(frame);
  }
  frame();
}
