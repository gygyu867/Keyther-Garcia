const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Año dinámico en el pie de página
$('#y').textContent = new Date().getFullYear();

/* Stack con íconos oficiales (Devicon) */
const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';
const techs = [
  ['HTML5', 'html5'],
  ['CSS3', 'css3'],
  ['JavaScript', 'javascript'],
  ['Bootstrap', 'bootstrap'],
  ['C#', 'csharp'],
  ['.NET', 'dotnetcore'],
  ['Git', 'git'],
  ['GitHub', 'github', 1]
];

techs.forEach(([n, i, inv]) => {
  $('#techs').insertAdjacentHTML(
    'beforeend',
    `<div class="col-6 col-sm-4 col-md-3 col-lg-2">
      <div class="cn tech">
        <img class="${inv ? 'inv' : ''}" src="${D}${i}/${i}-original.svg" alt="Logo de ${n}" width="54" height="54" loading="lazy">
        <div>${n}</div>
      </div>
    </div>`
  );
});

/* Filtros de proyectos */
$$('[data-f]').forEach(b => {
  b.onclick = () => {
    $$('[data-f]').forEach(x => x.classList.toggle('on', x === b));
    $$('.pr').forEach(p => p.classList.toggle('hide', b.dataset.f !== 'all' && p.dataset.c !== b.dataset.f));
  };
});

/* Videos: 3 activos + 9 comentados */
const V = [
  { id: 'M7lc1UVf-VE', t: 'Video destacado 1' },
  { id: 'M7lc1UVf-VE', t: 'Video destacado 2' },
  { id: 'M7lc1UVf-VE', t: 'Video destacado 3' },
  // {id:'ID_4', t:'Video 4'},
  // {id:'ID_5', t:'Video 5'},
  // {id:'ID_6', t:'Video 6'},
  // {id:'ID_7', t:'Video 7'},
  // {id:'ID_8', t:'Video 8'},
  // {id:'ID_9', t:'Video 9'},
  // {id:'ID_10', t:'Video 10'},
  // {id:'ID_11', t:'Video 11'},
  // {id:'ID_12', t:'Video 12'},
];

V.forEach(v => {
  $('#vids').insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-6 col-lg-4">
      <div class="cn">
        <div class="ratio ratio-16x9">
          <iframe src="https://www.youtube-nocookie.com/embed/${v.id}" title="${v.t}" loading="lazy" allowfullscreen></iframe>
        </div>
        <h3 class="mt-3 mb-0">${v.t}</h3>
      </div>
    </div>`
  );
});

/* Fondo Matrix */
const cv = $('#matrix');
const cx = cv.getContext('2d');
const fs = 16;
const ch = 'アイウエオカキクケコサシスセソ0123456789';
let drops = [];
let bg = '5,7,10';
let gr = '0,255,156';

function size() {
  cv.width = innerWidth;
  cv.height = innerHeight;
  drops = Array.from({ length: Math.ceil(cv.width / fs) }, () => Math.random() * -40);
}

function draw() {
  cx.fillStyle = `rgba(${bg},.12)`;
  cx.fillRect(0, 0, cv.width, cv.height);
  cx.fillStyle = `rgb(${gr})`;
  cx.font = fs + 'px monospace';
  drops.forEach((y, i) => {
    cx.fillText(ch[Math.random() * ch.length | 0], i * fs, y * fs);
    drops[i] = y * fs > cv.height && Math.random() > 0.975 ? 0 : y + 1;
  });
}

size();
addEventListener('resize', size);

if (matchMedia('(prefers-reduced-motion:reduce)').matches) {
  for (let i = 0; i < 40; i++) draw();
} else {
  setInterval(draw, 60);
}

/* Modo Dark/Light */
function tema(t) {
  document.documentElement.setAttribute('data-bs-theme', t);
  bg = t === 'dark' ? '5,7,10' : '234,241,243';
  gr = t === 'dark' ? '0,255,156' : '0,131,79';
  cx.fillStyle = `rgb(${bg})`;
  cx.fillRect(0, 0, cv.width, cv.height);
  $('#tema i').className = t === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
  document.querySelector('meta[name=theme-color]').content = t === 'dark' ? '#05070a' : '#eaf1f3';
  try {
    localStorage.setItem('tema', t);
  } catch (e) {}
}

$('#tema').onclick = () => tema(document.documentElement.dataset.bsTheme === 'dark' ? 'light' : 'dark');

try {
  tema(localStorage.getItem('tema') || 'dark');
} catch (e) {
  tema('dark');
}

/* Botón Volver arriba */
addEventListener('scroll', () => {
  $('#up').style.display = scrollY > 400 ? 'block' : 'none';
});

$('#up').onclick = () => scrollTo({ top: 0 });