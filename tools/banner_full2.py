from PIL import Image, ImageDraw, ImageFilter
import random, os, math
random.seed(11)
W, H = 1600, 1000
stops = [(0,(8,9,26)),(30,(28,24,64)),(56,(78,50,94)),(76,(186,102,92)),(88,(238,150,108)),(100,(250,196,152))]
def color_at(pct):
    if pct <= stops[0][0]: return stops[0][1]
    if pct >= stops[-1][0]: return stops[-1][1]
    for i in range(len(stops)-1):
        p0,c0 = stops[i]; p1,c1 = stops[i+1]
        if p0 <= pct <= p1:
            t = (pct-p0)/(p1-p0)
            return tuple(int(c0[k]+(c1[k]-c0[k])*t) for k in range(3))
    return stops[-1][1]
img = Image.new('RGB',(W,H)); d = ImageDraw.Draw(img)
for y in range(H):
    base = color_at(y/(H-1)*100); j = random.randint(-1,1)
    d.line([(0,y),(W,y)], fill=tuple(max(0,min(255,c+j)) for c in base))
for _ in range(420):
    x = random.randint(0,W-1); y = random.randint(0,int(H*0.5))
    v = random.randint(120,235); d.point((x,y), fill=(v,v,min(255,v+12)))
mx,my,mr = 1300,150,26
d.ellipse([mx-mr,my-mr,mx+mr,my+mr], fill=(250,242,226))
d.ellipse([mx-mr-12,my-mr-4,mx+mr-12,my+mr-4], fill=color_at(18))
layers = [(80,(52,42,76),0.0,70),(86,(34,28,54),60.0,50),(92,(22,18,38),120.0,34),(97,(12,10,22),180.0,22)]
for base,color,phase,amp in layers:
    pts=[(0,H)]; x=0
    while x <= W:
        y = H*base/100 + math.sin((x+phase)/280.0)*amp + random.randint(-6,6)
        pts.append((x,int(y))); x += 110
    pts.append((W,H)); d.polygon(pts, fill=color)
img = img.filter(ImageFilter.GaussianBlur(0.3))
img.save('source/images/banner-full.webp','WEBP',quality=86,method=6)
print('KB =', round(os.path.getsize('source/images/banner-full.webp')/1024,1))