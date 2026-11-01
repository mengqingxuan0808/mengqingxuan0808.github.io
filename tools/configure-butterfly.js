'use strict';
const fs = require('fs');
let c = fs.readFileSync('themes/butterfly/_config.yml', 'utf8').replace(/\r\n/g, '\n');

c = c.replace(/^menu:\n(?:[ \t]*#[^\n]*\n)*/m, [
  'menu:',
  '  首页: / || fas fa-home',
  '  归档: /archives/ || fas fa-archive',
  '  标签: /tags/ || fas fa-tags',
  '  分类: /categories/ || fas fa-folder-open',
  ''
].join('\n'));
c = c.replace('/img/butterfly-icon.png', '/img/avatar.png');
c = c.replace(/^default_top_img:[ \t]*$/m, 'default_top_img: /images/banner.webp');
c = c.replace(/^index_img:[ \t]*$/m, 'index_img: /images/banner.webp');
c = c.replace(/^  use:[ \t]*$/m, '  use: local_search');

fs.writeFileSync('_config.butterfly.yml', c, 'utf8');
console.log('menu ok =', /首页: \/ \|\| fas fa-home/.test(c));