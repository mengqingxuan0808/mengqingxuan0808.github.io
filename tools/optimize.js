'use strict';
// 生成后的静态资源瘦身：
//   1) 给 #banner 追加 image-set，现代浏览器走 WebP，老浏览器保留 JPEG
//   2) 删除不再被引用的文件（主题自带 banner、关闭 fancybox 后的资源）
// 全部基于实际引用检测，可重复执行。
const fs = require('fs');
const path = require('path');

const pub = path.join(__dirname, '..', 'public');
const read = (p) => { try { return fs.readFileSync(p, 'utf8'); } catch (e) { return ''; } };
const stat = (p) => { try { return fs.statSync(p).size; } catch (e) { return 0; } };
const rm = (p) => { try { fs.rmSync(p, { recursive: true, force: true }); } catch (e) {} };

let saved = 0;
const log = (msg) => console.log('  ' + msg);

// 1. WebP + JPEG 回退
const cssPath = path.join(pub, 'css', 'style.css');
const css = read(cssPath);
const webpPath = path.join(pub, 'images', 'banner.webp');
const jpgPath = path.join(pub, 'images', 'banner.jpg');
if (css && fs.existsSync(webpPath) && fs.existsSync(jpgPath) && !css.includes('banner.webp')) {
  const rule = [
    '',
    '/* banner: webp for modern browsers, jpeg fallback */',
    '#banner{background-image:image-set(url("/images/banner.webp") type("image/webp"),url("/images/banner.jpg") type("image/jpeg"))}',
    '#banner{background-image:-webkit-image-set(url("/images/banner.webp") 1x,url("/images/banner.jpg") 1x)}'
  ].join('\n');
  fs.writeFileSync(cssPath, css.trimEnd() + rule + '\n');
  log('banner: 已追加 image-set (webp ' + (stat(webpPath) / 1024).toFixed(1) + 'KB)');
}

// 2. 主题自带的 banner 若已不被 CSS 引用则删除
const themeBanner = path.join(pub, 'css', 'images', 'banner.jpg');
if (fs.existsSync(themeBanner) && !/css\/images\/banner\.jpg/.test(read(cssPath))) {
  const n = stat(themeBanner);
  rm(themeBanner);
  saved += n;
  log('移除未引用主题 banner: ' + (n / 1024).toFixed(1) + 'KB');
}

// 3. fancybox 未被任何页面引用则整目录删除
const fancyDir = path.join(pub, 'fancybox');
const html = read(path.join(pub, 'index.html'));
if (fs.existsSync(fancyDir) && html && !/fancybox/i.test(html)) {
  const before = fs.readdirSync(fancyDir).reduce((s, f) => s + stat(path.join(fancyDir, f)), 0);
  rm(fancyDir);
  saved += before;
  log('移除未引用 fancybox: ' + (before / 1024).toFixed(1) + 'KB');
}

console.log('  optimize 完成，清理 ' + (saved / 1024).toFixed(1) + 'KB');