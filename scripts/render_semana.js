// Renderiza os carrosséis da semana (SEMANA1 em data.js) em dist/semana1/<slug>/
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const sharp = require('sharp');
const { SEMANA1 } = require('./data');
let TOTAL_CARDS = 7;

const ROOT = path.join(__dirname, '..');
const OUT_ROOT = path.join(ROOT, 'dist', 'semana1');
const FONTS_CSS = fs.readFileSync(path.join(ROOT, 'fonts', 'fonts.embedded.css'), 'utf8');
const STYLES_CSS = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');

const X_ICON = `<svg viewBox="0 0 24 24" fill="none"><path d="M6 6L18 18M18 6L6 18" stroke="#FBF7EF" stroke-width="3" stroke-linecap="round"/></svg>`;
const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 13L10 18L19 7" stroke="#FBF7EF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ARROW = `<svg viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="#BE9B4E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const dots = (active, onBg) =>
  `<div class="dots dots--on${onBg}">${Array.from({ length: TOTAL_CARDS }, (_, i) => `<div class="dot${i === active ? ' active' : ''}"></div>`).join('')}</div>`;

const footer = (onBg) => `
  <div class="footer footer--on${onBg}">
    <div class="line"></div>
    <div class="handle">@meiresango</div>
    <div class="brand">O CORPO RESPONDE™</div>
  </div>`;

const shell = (inner) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS_CSS}\n${STYLES_CSS}</style></head><body>${inner}</body></html>`;

const cover = (c) => shell(`
  <div class="card card--vinho">
    ${dots(0, 'vinho')}
    <div class="cover-content">
      <div class="cover-title">${c.title}</div>
      <div class="cover-subtitle">${c.subtitle}</div>
      <div class="cover-drag"><div class="txt">ARRASTE PARA O LADO</div><div class="arrows">${ARROW}${ARROW}</div></div>
      <div class="seal"><div class="mp4">MP4</div><div class="rule"></div><div class="tagline">Força · Proteína<br>Recuperação · Progressão</div></div>
    </div>
    ${footer('vinho')}
  </div>`);

const mv = (p, i) => shell(`
  <div class="card card--creme">
    ${dots(i + 1, 'creme')}
    <div class="mv-number">${p.n}</div>
    <div class="mv-content">
      <div class="mv-eyebrow">Mito nº ${p.n}</div>
      <div class="selo mito"><div class="selo-icon">${X_ICON}</div><div class="selo-label">MITO</div></div>
      <div class="mv-text">${p.mito}</div>
      <div class="separator"><div class="line"></div><div class="diamond"></div><div class="line"></div></div>
      <div class="selo verdade"><div class="selo-icon">${CHECK_ICON}</div><div class="selo-label">VERDADE</div></div>
      <div class="mv-text verdade-text">${p.verdade}</div>
    </div>
    ${footer('creme')}
  </div>`);

const info = (p, i) => shell(`
  <div class="card card--creme">
    ${dots(i + 1, 'creme')}
    <div class="mv-number">${p.n}</div>
    <div class="mv-content">
      <div class="mv-eyebrow">${p.eyebrow}</div>
      <div class="ls-title">${p.titulo}</div>
      <div class="separator"><div class="line"></div><div class="diamond"></div><div class="line"></div></div>
      ${p.bullets ? `<ul class="bul">${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : `<div class="ls-text">${p.texto}</div>`}
    </div>
    ${footer('creme')}
  </div>`);

const duo = (p, i) => shell(`
  <div class="card card--creme">
    ${dots(i + 1, 'creme')}
    <div class="mv-number">${p.n}</div>
    <div class="mv-content">
      <div class="mv-eyebrow">Sinal nº ${p.n}</div>
      <div class="selo mito"><div class="selo-icon">${X_ICON}</div><div class="selo-label">SINAL</div></div>
      <div class="mv-text" style="font-weight:700">${p.a}</div>
      <div class="separator"><div class="line"></div><div class="diamond"></div><div class="line"></div></div>
      <div class="selo verdade"><div class="selo-icon">${CHECK_ICON}</div><div class="selo-label">O QUE FAZER</div></div>
      <div class="mv-text verdade-text">${p.b}</div>
    </div>
    ${footer('creme')}
  </div>`);

const closing = (c) => shell(`
  <div class="card card--vinho">
    ${dots(TOTAL_CARDS - 1, 'vinho')}
    <div class="closing-content">
      <div class="closing-title">${c.title}</div>
      <div class="closing-byline">${c.subtitle}</div>
      <div class="closing-button">${c.button}</div>
      <div class="closing-quote">${c.quote}</div>
    </div>
    ${footer('vinho')}
  </div>`);

async function main() {
  const exe = ['/opt/pw-browsers/chromium-1243/chrome-linux/chrome', '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome']
    .find((p) => fs.existsSync(p));
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });

  for (const car of SEMANA1) {
    const dir = path.join(OUT_ROOT, car.slug);
    fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
    TOTAL_CARDS = car.cards.length + 2;
    const kinds = { mv, info, duo };
    const cards = [
      { name: '01-capa', html: cover(car.cover) },
      ...car.cards.map((p, i) => ({ name: `${String(i + 2).padStart(2, '0')}-card-${p.n}`, html: kinds[p.type](p, i) })),
      { name: `${String(car.cards.length + 2).padStart(2, '0')}-fechamento`, html: closing(car.closing) },
    ];
    for (const card of cards) {
      await page.setContent(card.html, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const buf = await page.screenshot({ type: 'png' });
      await sharp(buf).resize(1080, 1350, { kernel: 'lanczos3' }).png({ quality: 95 }).toFile(path.join(dir, `${card.name}.png`));
    }
    console.log('OK', car.slug);
  }
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
