from PIL import Image, ImageEnhance
import os
src = r'C:\Users\mqx13\Documents\deepseek-harness\default-workspace\preview\bg\1043.jpg'
dst = r'C:\Users\mqx13\Desktop\编程\hexo\source\images\banner-full.webp'
im = Image.open(src).convert('RGB')
sw, sh = im.size
ar_t = 16 / 10
if sw / sh > ar_t:
    nw = int(sh * ar_t); im = im.crop(((sw - nw) // 2, 0, (sw + nw) // 2, sh))
else:
    nh = int(sw / ar_t); im = im.crop((0, (sh - nh) // 2, sw, (sh + nh) // 2))
im = im.resize((1440, 900), Image.LANCZOS)
im = ImageEnhance.Brightness(im).enhance(0.85)
im.save(dst, 'WEBP', quality=72, method=6)
print('1440 q72 ->', round(os.path.getsize(dst) / 1024, 1), 'KB')