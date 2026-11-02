'use strict';
const fs = require('fs');
const p = 'source/_posts/physics-dynamic-equilibrium.md';
let s = fs.readFileSync(p, 'utf8');
s = s.split('$$$').join('$$');
fs.writeFileSync(p, s, 'utf8');
s.split('\n').forEach((l, i) => { if (l.includes('frac')) console.log((i + 1) + '|' + l); });