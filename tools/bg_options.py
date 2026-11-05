from PIL import Image, ImageDraw, ImageFilter
import random, math, os
W, H = 1600, 1000
outdir = r'C:\Users\mqx13\Documents\deepseek-harness\default-workspace\preview'
random.seed(3)

def vgrad(top, bottom, size=(W, H)):
    img = Image.new('RGB', size)
    d = ImageDraw.Draw(img)
    for y in range(size[1]):
        t = y / (size[1] - 1)
        d.line([(0, y), (size[0], y)], fill=tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3)))
    return img

def stars(img, n=900, top=0.65, alpha=255):
    d = ImageDraw.Draw(img)
    for _ in range(n):
        x = random.randint(0, W - 1); y = random.randint(0, int(H * top))
        r = random.choice([0, 0, 0, 1])
        v = random.randint(140, 255)
        d.ellipse([x, y, x + r, y + r], fill=(v, v, min(255, v + 8)))
    return img

# A 星空银河
a = vgrad((5, 9, 20), (14, 18, 40))
band = Image.new('L', (W, H), 0); bd = ImageDraw.Draw(band)
for i in range(2600):
    t = random.random()
    x = int(W * t)
    y = int(H * 0.15 + math.sin(t * 2.2) * 120 + random.gauss(0, 55))
    bd.point((x, max(0, min(H - 1, y))), fill=random.randint(40, 120))
band = band.filter(ImageFilter.GaussianBlur(6))
a = Image.composite(Image.new('RGB', (W, H), (120, 130, 200)), a, band.point(lambda v: int(v * 0.55)))
a = stars(a, 1200, 0.8)

# B 极光
b = vgrad((4, 10, 20), (8, 26, 34))
aur = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ad = ImageDraw.Draw(aur)
for k, color in enumerate([(60, 220, 170), (90, 200, 255), (150, 120, 255)]):
    pts = []
    for x in range(0, W, 20):
        y = H * (0.25 + 0.08 * k) + math.sin(x / 220.0 + k * 1.7) * 90 + random.randint(-10, 10)
        pts.append((x, int(y)))
    ribbon = [(x, y) for x, y in pts] + [(x, y + 90) for x, y in reversed(pts)]
    ad.polygon(ribbon, fill=color + (60,))
aur = aur.filter(ImageFilter.GaussianBlur(45))
b = Image.alpha_composite(b.convert('RGBA'), aur).convert('RGB')
b = stars(b, 700, 0.55)

# C 流体渐变
c = vgrad((16, 18, 38), (60, 30, 60))
blob = Image.new('RGBA', (W, H), (0, 0, 0, 0)); bl = ImageDraw.Draw(blob)
random.seed(9)
for _ in range(7):
    cx, cy = random.randint(100, W - 100), random.randint(100, H - 100)
    rx, ry = random.randint(220, 420), random.randint(180, 380)
    col = random.choice([(255, 120, 180), (150, 110, 255), (90, 180, 255), (255, 160, 90), (110, 230, 200)])
    bl.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=col + (90,))
blob = blob.filter(ImageFilter.GaussianBlur(120))
c = Image.alpha_composite(c.convert('RGBA'), blob).convert('RGB')

# D 晨雾山峦（浅色）
d0 = vgrad((214, 226, 240), (246, 240, 232))
dd = ImageDraw.Draw(d0)
for i, (base, col) in enumerate([(70, (176, 194, 214)), (78, (156, 176, 200)), (88, (128, 150, 178)), (96, (96, 116, 146))]):
    pts = [(0, H)]
    x = 0
    while x <= W:
        y = H * base / 100 + math.sin((x + i * 120) / 300.0) * (50 - i * 8) + random.randint(-6, 6)
        pts.append((x, int(y))); x += 110
    pts.append((W, H))
    dd.polygon(pts, fill=col)
d0 = d0.filter(ImageFilter.GaussianBlur(1.2))

names = ['A', 'B', 'C', 'D']
imgs = [a, b, c, d0]
for n, im in zip(names, imgs):
    im.save(os.path.join(outdir, 'bg-' + n + '.png'))

# 拼成一张对比图
thumb_w, thumb_h = 780, 487
sheet = Image.new('RGB', (1600, 1010), (250, 250, 252))
sd = ImageDraw.Draw(sheet)
pos = [(10, 10), (810, 10), (10, 510), (810, 510)]
for (x, y), n, im in zip(pos, names, imgs):
    sheet.paste(im.resize((thumb_w, thumb_h), Image.LANCZOS), (x, y))
    sd.rectangle([x, y, x + 34, y + 26], fill=(0, 0, 0))
    sd.text((x + 12, y + 6), n, fill=(255, 255, 255))
sheet.save(os.path.join(outdir, 'bg-options.png'))
print('saved options')