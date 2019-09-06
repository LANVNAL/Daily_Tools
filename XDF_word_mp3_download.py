#-*- coding:utf-8 -*-
"""
@author: lanvnal
用于下载《新东方：十天搞定考研词汇》对应音频资料
"""

import requests
import re
import os
import time

def get_media_code(S,index_url):
    r = S.get(index_url).content
    crcode_list = re.findall(r'crcode=(.*?)\"',r)
    return crcode_list

def mp3_url(S,crcode):
    url = "http://s8.bookln.cn/qr.html?crcode={}".format(crcode)
    #print url
    r = S.get(url).content
    mp3_url = re.findall(r'src=\"(.*?)\"\>\<\/audio\>',r)
    if len(mp3_url)>0:
        return mp3_url[0]
    else:
        return 

def download_mp3(S,url_list):
    basepath = os.path.abspath(os.path.dirname(__file__))
    id = 1
    for i in url_list:
        if i != None:
            with open(basepath+"/mp3/List{}.mp3".format(id),'wb') as f:
                data = S.get(i)
                f.write(data.content)
                print "List{} download success!".format(id)
                id += 1
                time.sleep(1)
            

if __name__ == "__main__":
    S = requests.Session()
    download_url = []
    index_url="http://s8.bookln.cn/chapter.htm?_appbiz=bookresdetail&bookid=57363&bookId=57363&srcchannel=mp&r=0.3228599536630412#13232393"
    crcode_list = get_media_code(S,index_url)
    for crcode in crcode_list:
        url = mp3_url(S,crcode)
        download_url.append(url)
    download_mp3(S,download_url)