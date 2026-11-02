'use strict';
const fs = require('fs');
const p = 'source/_posts/physics-dynamic-equilibrium.md';
let s = fs.readFileSync(p, 'utf8');
s = s.replace(/^\$\\frac\{F_1\}.*$/m, () => '$$$\\frac{F_1}{L_1} = \\frac{F_2}{L_2} = \\frac{mg}{L_3}$$$');
s = s.replace(/^\$\\frac\{T\}.*$/m, () => '$$$\\frac{T}{L} = \\frac{N}{R} = \\frac{mg}{R}$$$');
fs.writeFileSync(p, s, 'utf8');
s.split('\n').forEach((l, i) => { if (l.includes('frac')) console.log((i + 1) + '|' + l); });