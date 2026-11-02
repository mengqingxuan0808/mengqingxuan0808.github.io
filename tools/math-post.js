'use strict';
const fs = require('fs');
const p = 'source/_posts/physics-dynamic-equilibrium.md';
let s = fs.readFileSync(p, 'utf8');

// front-matter 打开数学渲染
if (!s.includes('mathjax: true')) {
  s = s.replace('categories:\n  - 学习', 'categories:\n  - 学习\nmathjax: true');
}

// 比例式 -> 公式块
s = s.replace('> F₁ / L₁ = F₂ / L₂ = mg / L₃', '$$\\frac{F_1}{L_1} = \\frac{F_2}{L_2} = \\frac{mg}{L_3}$$');
s = s.replace('> T / L = N / R = mg / R', '$$\\frac{T}{L} = \\frac{N}{R} = \\frac{mg}{R}$$');

// 行内公式
s = s.replace('夹角 θ 满足 tanθ = μ 时最省力', '夹角 $\\theta$ 满足 $\\tan\\theta = \\mu$ 时最省力');
s = s.replace('临界条件是 tanθ = μ', '临界条件是 $\\tan\\theta = \\mu$');
s = s.replace('- N = mg，**支持力保持不变**', '- $N = mg$，**支持力保持不变**');
s = s.replace('- T = mg·L / R，绳变短时', '- $T = \\dfrac{mgL}{R}$，绳变短时');

// 临界表格
s = s.replace('| 接触面刚要分离 | N = 0 |', '| 接触面刚要分离 | $N = 0$ |');
s = s.replace('| 刚要相对滑动 | f = μN（静摩擦取最大值） |', '| 刚要相对滑动 | $f = \\mu N$（静摩擦取最大值） |');
s = s.replace('| 绳刚要松弛 / 刚要断 | T = 0 / T = T最大 |', '| 绳刚要松弛 / 刚要断开 | $T = 0$ / $T = T_{\\max}$ |');

fs.writeFileSync(p, s, 'utf8');
console.log('mathjax flag =', s.includes('mathjax: true'));
console.log('formula blocks =', (s.match(/\$\$/g) || []).length / 2);
console.log('inline math =', (s.match(/\$/g) || []).length);