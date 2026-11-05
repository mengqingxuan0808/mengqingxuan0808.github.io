const fs = require('fs');
const l = fs.readFileSync('_config.butterfly.yml', 'utf8').split(/\r?\n/);
const i = l.findIndex(x => /^subtitle:/.test(x));
for (let k = i; k < i + 22 && k < l.length; k++) console.log(String(k + 1).padStart(4) + '  ' + l[k]);