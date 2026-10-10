const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const OUT_FILE = path.join(__dirname, '..', 'www', 'templates.js');

function walk(dir) {
    const results = [];
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        if (fs.statSync(full).isDirectory()) results.push(...walk(full));
        else if (name.endsWith('.html')) results.push(full);
    }
    return results;
}

const files = walk(TEMPLATES_DIR);
let compiled = '';

for (const file of files) {
    const src = fs.readFileSync(file, 'utf-8');
    const name = path.relative(TEMPLATES_DIR, file).replace(/\\/g, '/');
    compiled += nunjucks.precompileString(src, { name }) + '\n';
}

const output = `(function (global) {
  ${compiled}

  var env = null;

  function getEnv() {
    if (env) return env;
    env = new nunjucks.Environment(new nunjucks.PrecompiledLoader(window.nunjucksPrecompiled), { autoescape: true });
    return env;
  }

  global.renderPage = function (name, context) {
    return getEnv().render(name, context || {});
  };
})(window);
`;

fs.writeFileSync(OUT_FILE, output, 'utf-8');
console.log('Собрано шаблонов:', files.length);
