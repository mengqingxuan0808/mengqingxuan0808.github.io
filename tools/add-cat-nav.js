'use strict';
const fs = require('fs');
let c = fs.readFileSync('_config.butterfly.yml', 'utf8');
if (!c.includes('分类: /categories/')) {
  c = c.replace('  标签: /tags/ || fas fa-tags', '  标签: /tags/ || fas fa-tags\n  分类: /categories/ || fas fa-folder-open');
  fs.writeFileSync('_config.butterfly.yml', c, 'utf8');
}
console.log(c.split('\n').filter((l) => /^  (首页|归档|标签|分类|RSS):/.test(l)).join('\n'));