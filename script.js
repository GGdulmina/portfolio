// --- BOOT SEQUENCE ---
const lines = [
  'BIOS v2.2.0  //  RETRO-FUTURE SYSTEMS INC.',
  'RAM check.................. 65536K OK',
  'Loading kernel modules..... DONE',
  'Mounting /dev/security..... OK',
  'Scanning threat vectors.... CLEAR',
  'Establishing VPN tunnel.... ENCRYPTED',
  'Loading operator profile...',
  '',
  '  ACCESS GRANTED. WELCOME, OPERATOR.',
  '',
  '> Launching DULMINA.EXE ...',
  ' ERORR 430 '
];
const bl = document.getElementById('boot-lines');
const boot = document.getElementById('boot');
lines.forEach((line, i) => {
  const d = document.createElement('div');
  d.textContent = line || '\u00A0';
  d.style.animationDelay = i * 190 + 'ms';
  bl.appendChild(d);
});
const bootDur = lines.length * 190 + 700;
setTimeout(() => {
  boot.style.transition = 'opacity .7s';
  boot.style.opacity = '0';
  setTimeout(() => { boot.style.display = 'none'; startTyper(); }, 700);
}, bootDur);

// --- CURSOR ---
const cur = document.getElementById('cur');
const dot = document.getElementById('curdot');
document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px';
  dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
});

// --- TYPED TITLE ---
const TITLES = ['CYBERSECURITY SPECIALIST','PENETRATION TESTER','CTF ENTHUSIAST','TRYHACKME LAB PRACTITIONER','HACK THE BOX LAB SPECIALIST','NETWORK ANALYST','LINUX POWER USER'];
let ti = 0, ci = 0, del = false;
const typedEl = document.getElementById('typed');
function tick() {
  const t = TITLES[ti];
  if (!del) {
    typedEl.textContent = t.substring(0, ci + 1); ci++;
    if (ci === t.length) { del = true; setTimeout(tick, 2200); return; }
  } else {
    typedEl.textContent = t.substring(0, ci - 1); ci--;
    if (ci === 0) { del = false; ti = (ti + 1) % TITLES.length; }
  }
  setTimeout(tick, del ? 45 : 75);
}
function startTyper() { setTimeout(tick, 400); }

// --- SCROLL REVEAL + SKILL BARS ---
const revEls = document.querySelectorAll('.rev');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      e.target.querySelectorAll('.sk-fill').forEach(b => { b.style.width = b.dataset.w + '%'; });
    }
  });
}, { threshold: 0.1 });
revEls.forEach(r => io.observe(r));

// --- Nav Toggle ---
function toggleNav() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('nav-links').classList.toggle('open');
}

// --- E-mail Form ---
async function sendForm(e) {
  const btn = e.target;
  const data = {
    name:    document.getElementById('cf-name').value,
    email:   document.getElementById('cf-email').value,
    subject: document.getElementById('cf-subject').value,
    message: document.getElementById('cf-message').value
  };

  btn.textContent = 'TRANSMITTING...';
  btn.disabled = true;

  const res = await fetch('https://formspree.io/f/xrerezva', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    btn.textContent = 'MESSAGE TRANSMITTED ✓';
    btn.style.background = 'var(--neon-cyan)';
    btn.style.color = 'var(--bg-primary)';
  } else {
    btn.textContent = 'TRANSMISSION FAILED ✗';
    btn.style.background = 'var(--neon-pink)';
    btn.style.color = '#fff';
    btn.disabled = false;
  }
}
