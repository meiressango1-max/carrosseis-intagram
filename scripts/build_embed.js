// Builds a single self-contained HTML gallery with all card PNGs inlined as
// base64 data URIs, so it can be deployed via a "fetch one HTML bundle" style
// import tool (no separate static file hosting required).
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const OUT = path.join(DIST, 'gallery-embed.html');

const files = [
  ['01-capa.png', '1 · Capa'],
  ['02-mito-01.png', '2 · Mito 01'],
  ['03-mito-02.png', '3 · Mito 02'],
  ['04-mito-03.png', '4 · Mito 03'],
  ['05-mito-04.png', '5 · Mito 04'],
  ['06-mito-05.png', '6 · Mito 05'],
  ['07-fechamento.png', '7 · Fechamento'],
];

const cards = files.map(([name, label]) => {
  const buf = fs.readFileSync(path.join(DIST, name));
  const b64 = buf.toString('base64');
  return `<a class="card" href="data:image/png;base64,${b64}" download="${name}">
    <img src="data:image/png;base64,${b64}" alt="${label}">
    <div class="label">${label}</div>
  </a>`;
}).join('\n');

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>Carrossel — Mito ou Verdade | O Corpo Responde™</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root { --vinho:#5C1A24; --dourado:#BE9B4E; --creme:#FBF7EF; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--vinho);
    color: var(--creme);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    padding: 48px 24px 80px;
  }
  h1 { text-align: center; font-weight: 600; letter-spacing: 0.02em; margin-bottom: 8px; }
  p.sub { text-align: center; color: var(--dourado); margin-top: 0; margin-bottom: 40px; }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .card {
    background: rgba(251,247,239,0.04);
    border: 1px solid rgba(190,155,78,0.25);
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none;
    color: var(--creme);
  }
  .card img { display: block; width: 100%; height: auto; }
  .card .label { padding: 10px 14px; font-size: 14px; letter-spacing: 0.04em; color: var(--dourado); }
</style>
</head>
<body>
  <h1>Carrossel "Mito ou Verdade"</h1>
  <p class="sub">O Corpo Responde™ — Método MP4</p>
  <div class="grid">
${cards}
  </div>
</body>
</html>
`;

fs.writeFileSync(OUT, html);
console.log('Wrote', OUT, `(${(html.length / 1024 / 1024).toFixed(2)} MB)`);
