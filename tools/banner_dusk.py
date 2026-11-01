from PIL import Image, ImageDraw, ImageFilter
import random, os, math
random.seed(7)
W, H = 1600, 420

stops = [
    (0, (10, 12, 34)),
    (30, (34, 30, 74)),
    (55, (92, 58, 96)),
    (76, (196, 108, 92)),
    (88, (240, 150, 104)),
    (100, (252, 196, 148)),
]

def color_at(pct):
    if pct <= stops[0][0]:
        return stops[0][1]
    if pct >= stops[-1][0]:
        return stops[-1][1]
    for i in range(len(stops) - 1):
        p0, c0 = stops[i]
        p1, c1 = stops[i + 1]
        if p0 <= pct <= p1:
            t = (pct - p0) / (p1 - p0)
            return tuple(int(c0[k] + (c1[k] - c0[k]) * t) for k in range(3))
    return stops[-1][1]

img = Image.new('RGB', (W, H))
d = ImageDraw.Draw(img)
for y in range(H):
    base = color_at(y / (H - 1) * 100)
    j = random.randint(-1, 1)
    d.line([(0, y), (W, y)], fill=tuple(max(0, min(255, c + j)) for c in base))

for _ in range(150):
    x = random.randint(0, W - 1)
    y = random.randint(0, int(H * 0.40))
    v = random.randint(130, 235)
    d.point((x, y), fill=(v, v, min(255, v + 14)))

mx, my, mr = 1288, 78, 20
d.ellipse([mx - mr, my - mr, mx + mr, my + mr], fill=(250, 242, 226))
d.ellipse([mx - mr - 9, my - mr - 3, mx + mr - 9, my + mr - 3], fill=color_at(16))

layers = [
    (74, (58, 46, 82), 0.0, 40),
    (80, (40, 32, 60), 45.0, 30),
    (87, (26, 20, 40), 95.0, 22),
    (94, (14, 11, 24), 150.0, 15),
]
for base_pct, color, phase, amp in layers:
    pts = [(0, H)]
    x = 0
    while x <= W:
        y = H * base_pct / 100 + math.sin((x + phase) / 240.0) * amp + random.randint(-5, 5)
        pts.append((x, int(y)))
        x += 100
    pts.append((W, H))
    d.polygon(pts, fill=color)

img = img.filter(ImageFilter.GaussianBlur(0.3))
img.save('source/images/banner.png', optimize=True)
img.save('source/images/banner.webp', 'WEBP', quality=86, method=6)
print('png KB=', round(os.path.getsize('source/images/banner.png') / 1024, 1))
print('webp KB=', round(os.path.getsize('source/images/banner.webp') / 1024, 1))