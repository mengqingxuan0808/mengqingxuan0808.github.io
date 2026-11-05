from PIL import Image, ImageEnhance
import os
src = r'C:\Users\mqx13\Documents\deepseek-harness\default-workspace\preview\bg\1043.jpg'
im = Image.open(src).convert('RGB')
w, h = im.size
target = (1600, 1000)
# 居中裁剪到 16:10
ar_t = target[0] / target[1]
ar = w / h
if ar > ar_t:
    nw = int(h * ar_t); im = im.crop(((w - nw) // 2, 0, (w + nw) // 2, h))
else:
    nh = int(w / ar_t); im = im.crop((0, (h - nh) // 2, w, (h + nh) // 2))
im = im.resize(target, Image.LANCZOS)
im = ImageEnhance.Brightness(im).enhance(0.86)
im.save(r'C:\Users\mqx13\Desktop\编程\hexo\source\images\banner-full.webp', 'WEBP', quality=82, method=6)
print('KB =', round(os.path.getsize(r'C:\Users\mqx13\Desktop\编程\hexo\source\images\banner-full.webp') / 1024, 1))