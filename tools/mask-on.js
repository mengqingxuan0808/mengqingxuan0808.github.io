const fs = require('fs');
let c = fs.readFileSync('_config.butterfly.yml', 'utf8');
c = c.replace(/mask:\r?\n  header: false/, 'mask:\n  header: true');
fs.writeFileSync('_config.butterfly.yml', c, 'utf8');
console.log('mask header =', /mask:\n  header: true/.test(c));