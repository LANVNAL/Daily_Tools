# -*- coding:utf-8 -*-
"""
文件批量重命名
"""
import os
basepath = os.path.abspath(os.path.dirname(__file__))
for file in os.listdir(basepath):
    try:
        name = file.replace('【2020考研资料免费更新  关注微信公众号 快乐考研人 免费获取】','')
        name = name.replace('（','(')
        name = name.replace('）',')')
        newname = name
    except:
        newname = file 
    os.rename(file,newname)
    print file