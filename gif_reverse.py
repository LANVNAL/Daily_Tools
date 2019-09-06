#-*- coding:utf-8 -*-
"""
@author: lanvnal
GIF倒放
"""

from PIL import Image, ImageSequence 
import os
# 读取GIF
im = Image.open("/Users/lanvnal/Pictures/gif/1.gif")
# GIF图片流的迭代器
iter = ImageSequence.Iterator(im)

index = 1
# 遍历图片流的每一帧
for frame in iter:
    print("image %d: mode %s, size %s" % (index, frame.mode, frame.size))
    frame.save("/Users/lanvnal/Pictures/gif/temp/frame%d.png" % index)
    index += 1

# 把GIF拆分为图片流
imgs = [frame.copy() for frame in ImageSequence.Iterator(im)]
# 把图片流重新成成GIF动图
imgs[0].save('out.gif', save_all=True, append_images=imgs[1:])

# 图片流反序
imgs.reverse() 
# 将反序后的所有帧图像保存下来
imgs[0].save('/Users/lanvnal/Pictures/gif/1_out.gif', save_all=True, append_images=imgs[1:])
#clean temp
for frame in iter:
	os.remove("/Users/lanvnal/Pictures/gif/temp/frame%d.png" % index)
	index -=1