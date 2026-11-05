'use strict';
const fs = require('fs');
let c = fs.readFileSync('_config.butterfly.yml', 'utf8');

// 1) 全屏首屏 + 全屏背景图
c = c.replace('index_top_img_height: 420px', 'index_top_img_height: 100vh');
c = c.replace('index_img: /images/banner.webp', 'index_img: /images/banner-full.webp');

// 2) 打字机副标题
c = c.replace('subtitle:\n  enable: false', 'subtitle:\n  enable: true');
c = c.replace(/  sub:\r?\n(\s*\r?\n)?/, '  sub:\n    - 记录高中日常，也收留那些奇思妙想。\n');

// 3) FPS 小挂件脚本
if (!c.includes('fps.js')) {
  c = c.replace('    - <script src="/js/mobile-nav.js" defer></script>', '    - <script src="/js/mobile-nav.js" defer></script>\n    - <script src="/js/fps.js" defer></script>');
}
fs.writeFileSync('_config.butterfly.yml', c, 'utf8');
console.log('100vh =', c.includes('index_top_img_height: 100vh'));
console.log('subtitle on =', /subtitle:\n  enable: true/.test(c));
console.log('sub line =', c.includes('记录高中日常，也收留那些奇思妙想。'));
console.log('fps =', c.includes('fps.js'));