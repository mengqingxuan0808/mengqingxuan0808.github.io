'use strict';
const fs = require('fs');
let c = fs.readFileSync('_config.butterfly.yml', 'utf8');
c = c.replace(/index_post_content:\n  method: 3/, 'index_post_content:\n  method: 2');
fs.writeFileSync('_config.butterfly.yml', c, 'utf8');
let p = fs.readFileSync('source/_posts/first-post.md', 'utf8');
p = p.replace(/^description: .*$/m, 'description: 记录自己的日常折腾还有繁杂琐事。');
fs.writeFileSync('source/_posts/first-post.md', p, 'utf8');
console.log('method2 =', c.includes('method: 2'), 'desc =', p.includes('记录自己的日常折腾还有繁杂琐事。'));