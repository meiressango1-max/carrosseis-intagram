const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const sharp = require('sharp');
const { PAIRS, TOTAL_CARDS } = require('./data');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const FONTS_CSS = fs.readFileSync(path.join(ROOT, 'fonts', 'fonts.embedded.css'), 'utf8');
const STYLES_CSS = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');

if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });

const X_ICON = `<svg viewBox="0 0 24 24" fill="none"><path d="M6 6L18 18M18 6L6 18" stroke="#FBF7EF" stroke-width="3" stroke-linecap="round"/></svg>`;
const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 13L10 18L19 7" stroke="#FBF7EF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ARROW = `<svg viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="#BE9B4E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function dots(activeIndex, onBg) {
  let items = '';
  for (let i = 0; i < TOTAL_CARDS; i++) {
    items += `<div class="dot${i === activeIndex ? ' active' : ''}"></div>`;
  }
  return `<div class="dots dots--on${onBg}">${items}</div>`;
}

function footer(onBg) {
  return `
  <div class="footer footer--on${onBg}">
    <div class="line"></div>
    <div class="handle">@meiresango</div>
    <div class="brand">O CORPO RESPONDE™</div>
  </div>`;
}

function pageShell(bodyInner, extraClass) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
${FONTS_CSS}
${STYLES_CSS}
</style>
</head>
<body>
${bodyInner}
</body>
</html>`;
}

function coverCard() {
  const inner = `
  <div class="card card--vinho">
    ${dots(0, 'vinho')}
    <div class="cover-content">
      <div class="cover-title">5 mitos que estão sabotando seu corpo depois dos 40</div>
      <div class="cover-subtitle">(o nº 3 ainda engana muita gente)</div>
      <div class="cover-drag">
        <div class="txt">ARRASTE PARA O LADO</div>
        <div class="arrows">${ARROW}${ARROW}</div>
      </div>
      <div class="seal">
        <div class="mp4">MP4</div>
        <div class="rule"></div>
        <div class="tagline">Força · Proteína<br>Recuperação · Progressão</div>
      </div>
    </div>
    ${footer('vinho')}
  </div>`;
  return pageShell(inner);
}

function mitoVerdadeCard(pair, index) {
  const inner = `
  <div class="card card--creme">
    ${dots(index + 1, 'creme')}
    <div class="mv-number">${pair.n}</div>
    <div class="mv-content">
      <div class="mv-eyebrow">Mito nº ${pair.n}</div>
      <div class="selo mito">
        <div class="selo-icon">${X_ICON}</div>
        <div class="selo-label">MITO</div>
      </div>
      <div class="mv-text">${pair.mito}</div>
      <div class="separator"><div class="line"></div><div class="diamond"></div><div class="line"></div></div>
      <div class="selo verdade">
        <div class="selo-icon">${CHECK_ICON}</div>
        <div class="selo-label">VERDADE</div>
      </div>
      <div class="mv-text verdade-text">${pair.verdade}</div>
    </div>
    ${footer('creme')}
  </div>`;
  return pageShell(inner);
}

function closingCard() {
  const inner = `
  <div class="card card--vinho">
    ${dots(6, 'vinho')}
    <div class="closing-content">
      <div class="closing-title">Manda esse post pra amiga que precisa ouvir isso hoje</div>
      <div class="closing-subtitle">Depois dos 40, o corpo não para — ele só passa a exigir o estímulo certo.</div>
      <div class="closing-button">Salve. Compartilhe. Comente.</div>
      <div class="closing-quote">Mulher forte é mulher livre.</div>
    </div>
    ${footer('vinho')}
  </div>`;
  return pageShell(inner);
}

async function main() {
  const cards = [
    { name: '01-capa', html: coverCard() },
    ...PAIRS.map((p, i) => ({ name: `0${i + 2}-mito-${p.n}`, html: mitoVerdadeCard(p, i) })),
    { name: '07-fechamento', html: closingCard() },
  ];

  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });

  for (const card of cards) {
    await page.setContent(card.html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const buf = await page.screenshot({ type: 'png' });
    const outPath = path.join(DIST, `${card.name}.png`);
    await sharp(buf).resize(1080, 1350, { kernel: 'lanczos3' }).png({ quality: 95 }).toFile(outPath);
    console.log('Rendered', outPath);
  }

  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
