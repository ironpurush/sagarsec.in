// Loader
window.addEventListener('load',()=>{
setTimeout(()=>{
const l=document.getElementById('loader');
l.style.opacity='0';
l.style.transition='opacity 0.5s';
setTimeout(()=>{l.style.display='none';initAnimations()},500);
},2000);
});

// Cursor
const cursor=document.getElementById('cursor');
const ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
mx=e.clientX;my=e.clientY;
cursor.style.left=mx+'px';cursor.style.top=my+'px';
});
function animRing(){
rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;
ring.style.left=rx+'px';ring.style.top=ry+'px';
requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.skill-card,.project-card,.blog-card,.achv-card,.timeline-item').forEach(el=>{
el.addEventListener('mouseenter',()=>{cursor.style.width='20px';cursor.style.height='20px';ring.style.width='60px';ring.style.height='60px'});
el.addEventListener('mouseleave',()=>{cursor.style.width='12px';cursor.style.height='12px';ring.style.width='36px';ring.style.height='36px'});
});

// Nav scroll
window.addEventListener('scroll',()=>{
const nav=document.getElementById('nav');
nav.classList.toggle('scrolled',window.scrollY>50);
});

// Typing effect
const phrases=['Penetration Tester','Security Researcher','Bug Bounty Hunter','CVE Author','Red Team Analyst'];
let pi=0,ci=0,del=false;
function type(){
const el=document.getElementById('typed');
if(!el)return;
const phrase=phrases[pi];
if(!del){
el.textContent=phrase.slice(0,++ci);
if(ci===phrase.length){del=true;setTimeout(type,2000);return;}
} else {
el.textContent=phrase.slice(0,--ci);
if(ci===0){del=false;pi=(pi+1)%phrases.length;}
}
setTimeout(type,del?60:100);
}
type();

// Particles
function createParticles(){
const container=document.getElementById('particles');
if(!container)return;
for(let i=0;i<30;i++){
const p=document.createElement('div');
p.className='particle';
const x=Math.random()*100;
const dur=10+Math.random()*20;
const delay=-Math.random()*20;
const drift=(Math.random()-0.5)*200;
p.style.cssText=`left:${x}%;animation-duration:${dur}s;animation-delay:${delay}s;--drift:${drift}px;opacity:${0.3+Math.random()*0.5}`;
container.appendChild(p);
}
}
createParticles();

// Scroll animations
function initAnimations(){
const obs=new IntersectionObserver((entries)=>{
entries.forEach(e=>{
if(e.isIntersecting){
e.target.classList.add('visible');
// Skill bars
const bar=e.target.querySelector('.skill-fill');
if(bar)bar.style.width=bar.dataset.pct+'%';
// Count up
const nums=e.target.querySelectorAll('[data-count]');
nums.forEach(n=>countUp(n,parseInt(n.dataset.count)));
}
});
},{threshold:0.15});
document.querySelectorAll('.fade-up,.timeline-item').forEach(el=>obs.observe(el));

// About stats
const aboutStats=document.querySelectorAll('#about .stat-num[data-count]');
const aboutObs=new IntersectionObserver(entries=>{
entries.forEach(e=>{if(e.isIntersecting){countUp(e.target,parseInt(e.target.dataset.count));aboutObs.unobserve(e.target)}});
},{threshold:0.5});
aboutStats.forEach(el=>aboutObs.observe(el));
}

function countUp(el,target){
let start=0;const dur=1500;const step=target/dur*16;
const interval=setInterval(()=>{
start=Math.min(start+step,target);
el.textContent=Math.floor(start)+(target>=40?'+':'');
if(start>=target)clearInterval(interval);
},16);
}

// Skill card glow
function skillGlow(e,card){
const rect=card.getBoundingClientRect();
const x=((e.clientX-rect.left)/rect.width)*100;
const y=((e.clientY-rect.top)/rect.height)*100;
card.style.setProperty('--mx',x+'%');
card.style.setProperty('--my',y+'%');
}

// Theme
let darkMode=true;
function toggleTheme(){
darkMode=!darkMode;
document.documentElement.setAttribute('data-theme',darkMode?'dark':'light');
document.getElementById('themeToggle').textContent=darkMode?'☽ DARK':'☀ LIGHT';
}

// Mobile menu
function toggleMenu(){
document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobile(){
document.getElementById('mobileMenu').classList.remove('open');
}

// Form
function submitForm(e){
e.preventDefault();
const btn=e.target.querySelector('button');
btn.textContent='✓ Message Sent!';
btn.style.background='linear-gradient(135deg,#00ff88,#00cc70)';
setTimeout(()=>{btn.textContent='⚡ Send Message';btn.style.background='';e.target.reset();},3000);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
a.addEventListener('click',e=>{
e.preventDefault();
const target=document.querySelector(a.getAttribute('href'));
if(target)target.scrollIntoView({behavior:'smooth'});
});
});