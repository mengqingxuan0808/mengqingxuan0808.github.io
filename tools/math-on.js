'use strict';
const fs = require('fs');
let c = fs.readFileSync('_config.butterfly.yml', 'utf8');
c = c.replace('  # Leave it empty if you don\'t need math\n  use:', '  # Leave it empty if you don\'t need math\n  use: mathjax');
fs.writeFileSync('_config.butterfly.yml', c, 'utf8');
const i = c.indexOf('math:');
console.log(c.slice(i, i + 120));