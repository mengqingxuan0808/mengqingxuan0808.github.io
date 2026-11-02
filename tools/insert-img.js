'use strict';
const fs = require('fs');
const p = 'source/_posts/physics-dynamic-equilibrium.md';
let s = fs.readFileSync(p, 'utf8');
const img = [
  '![光滑球面上绳系小球：场景、几何三角形与力三角形](/img/physics/dynamic-equilibrium.svg)',
  '',
  '<p style="text-align:center;font-size:.88em;opacity:.7;margin-top:-.6rem">① 场景　② 几何三角形 O-A-P　③ 与它相似的力三角形</p>',
  ''
].join('\n');
if (!s.includes('dynamic-equilibrium.svg')) {
  s = s.replace('**受力分析**：', img + '\n**受力分析**：');
  fs.writeFileSync(p, s, 'utf8');
}
console.log('image inserted =', s.includes('dynamic-equilibrium.svg'));