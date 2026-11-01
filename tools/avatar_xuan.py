from PIL import Image, ImageDraw, ImageFont
import os
size = 240
img = Image.new('RGB', (size, size))
d = ImageDraw.Draw(img)
for y in range(size):
    t = y / size
    d.line([(0, y), (size, y)], fill=(int(30 + 20 * t), int(60 + 90 * t), int(90 + 80 * t)))
font = None
for f in [r'C:\Windows\Fonts\msyh.ttc', r'C:\Windows\Fonts\msyhbd.ttc', r'C:\Windows\Fonts\simhei.ttf']:
    if os.path.exists(f):
        try:
            font = ImageFont.truetype(f, 120)
            break
        except Exception:
            pass
text = '轩'
if font:
    box = d.textbbox((0, 0), text, font=font)
    w, h = box[2] - box[0], box[3] - box[1]
    d.text(((size - w) / 2 - box[0], (size - h) / 2 - box[1]), text, font=font, fill=(255, 255, 255))
img.save('source/img/avatar.png', optimize=True)
print('avatar KB=', round(os.path.getsize('source/img/avatar.png') / 1024, 1))