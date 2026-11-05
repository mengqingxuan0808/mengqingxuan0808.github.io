'use strict';
const fs = require('fs');
let c = fs.readFileSync('_config.yml', 'utf8');
fs.writeFileSync('.config.backup.yml', c, 'utf8');
c = c.replace(/^theme: .*$/m, 'theme: fomalhaut');
fs.writeFileSync('_config.yml', c, 'utf8');
console.log('theme set to fomalhaut');