// Galeria única (imagens em base64) com os 3 carrosséis da semana 1, para conferência no Netlify.
const fs = require('fs');
const path = require('path');
const { SEMANA1 } = require('./data');
const ROOT = path.join(__dirname, '..', 'dist', 'semana1');
const sections = SEMANA1.map((car, idx) => {
  const files = fs.readdirSync(path.join(ROOT, car.slug)).filter(f => f.endsWith('.png')).sort();
  const imgs = files.map((f, i) => {
    const b64 = fs.readFileSync(path.join(ROOT, car.slug, f)).toString('base64');
    return `<a class="card" href="data:image/png;base64,${b64}" download="${car.slug}-${f}"><img loading="lazy" src="data:image/png;base64,${b64}" alt="${car.slug} ${i + 1}"><div class="label">${i + 1}/${files.length}</div></a>`;
  }).join('\n');
  return `<section><h2>Carrossel ${idx + 1} — ${car.cover.title}</h2><div class="grid">${imgs}</div></section>`;
}).join('\n');
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Semana 1 — Conferência de carrosséis</title><style>
:root{--vinho:#5C1A24;--dourado:#BE9B4E;--creme:#FBF7EF}*{box-sizing:border-box}body{margin:0;background:var(--vinho);color:var(--creme);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:40px 20px 80px}h1{text-align:center;margin:0 0 6px}p.sub{text-align:center;color:var(--dourado);margin:0 0 40px}section{max-width:1200px;margin:0 auto 56px}h2{font-size:20px;color:var(--dourado);margin:0 0 16px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}.card{display:block;border:1px solid rgba(190,155,78,.25);border-radius:10px;overflow:hidden;text-decoration:none;color:var(--creme)}.card img{display:block;width:100%;height:auto}.label{padding:8px 12px;font-size:13px;color:var(--dourado)}</style></head><body><h1>Semana 1 — Conferência</h1><p class="sub">Toque em uma imagem para baixar</p>${sections}</body></html>`;
fs.writeFileSync(path.join(ROOT, 'index.html'), html);
console.log('OK', (html.length / 1048576).toFixed(1) + ' MB');
