from PIL import Image, ImageDraw
import os
d = r'C:\Users\mqx13\Documents\deepseek-harness\default-workspace\preview\bg'
ids = [1015, 1016, 1036, 1043, 1044]
labels = ['A', 'B', 'C', 'D', 'E']
thumbs = []
for i, n in enumerate(ids):
    p = os.path.join(d, str(n) + '.jpg')
    im = Image.open(p).convert('RGB').resize((760, 475), Image.LANCZOS)
    thumbs.append((labels[i], im))
sheet = Image.new('RGB', (1560, 1010), (245, 245, 248))
sd = ImageDraw.Draw(sheet)
pos = [(10, 10), (790, 10), (10, 510), (790, 510), (390, 1005)]
for (lab, im), (x, y) in zip(thumbs, pos):
    if y + 475 > sheet.height: continue
    sheet.paste(im, (x, y))
    sd.rectangle([x, y, x + 30, y + 24], fill=(0, 0, 0))
    sd.text((x + 11, y + 5), lab, fill=(255, 255, 255))
sheet.save(os.path.join(d, 'photo-options.png'))
print('ok')