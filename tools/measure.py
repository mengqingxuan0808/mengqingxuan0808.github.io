import re, os, gzip, sys
html_path = sys.argv[1] if len(sys.argv) > 1 else 'public/index.html'
html = open(html_path, encoding='utf-8').read()
urls = set(re.findall(r'(?:href|src)="([^"]+)"', html))
urls |= set(re.findall(r'url\(\s*[\'"]?([^\'"\)]+)', open('public/css/main.css', encoding='utf-8').read() if os.path.exists('public/css/main.css') else ''))
tot = 0
totg = 0
rows = []
for u in urls:
    if not u.startswith('/') or u.startswith('//'):
        continue
    p = os.path.join('public', u.lstrip('/').split('?')[0])
    if not os.path.isfile(p):
        continue
    d = open(p, 'rb').read()
    g = gzip.compress(d, 6)
    tot += len(d)
    totg += len(g)
    rows.append((u, len(d), len(g)))
for u, s, g in sorted(rows, key=lambda r: -r[2])[:8]:
    print('%-46s %7.1f KB raw %7.1f KB gz' % (u[:46], s / 1024, g / 1024))
print('%-46s %7.1f KB raw %7.1f KB gz' % ('TOTAL', tot / 1024, totg / 1024))