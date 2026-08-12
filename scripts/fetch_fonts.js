// Downloads only the "latin" subset of the requested Google Fonts and
// produces a self-contained fonts.css with base64-embedded woff2 data.
const fs = require('fs');
const path = require('path');

const CSS_PATH = path.join(__dirname, '..', 'fonts', 'fonts.css');
const OUT_PATH = path.join(__dirname, '..', 'fonts', 'fonts.embedded.css');

async function main() {
  const raw = fs.readFileSync(CSS_PATH, 'utf8');
  // Split into @font-face blocks, keeping the preceding comment line.
  const blocks = raw.split(/\n(?=\/\* )/g);
  const latinBlocks = blocks.filter(b => /^\/\* latin \*\//.test(b.trim()));

  let outCss = '';
  for (const block of latinBlocks) {
    const urlMatch = block.match(/url\((https:[^)]+)\)/);
    if (!urlMatch) continue;
    const url = urlMatch[1];
    console.log('Fetching', url);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch ' + url + ': ' + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    const b64 = buf.toString('base64');
    const dataUri = `data:font/woff2;base64,${b64}`;
    const newBlock = block.replace(/url\(https:[^)]+\)/, `url(${dataUri})`);
    outCss += newBlock + '\n';
  }
  fs.writeFileSync(OUT_PATH, outCss);
  console.log('Wrote', OUT_PATH, `(${(outCss.length / 1024 / 1024).toFixed(2)} MB)`);
}

main().catch(err => { console.error(err); process.exit(1); });
