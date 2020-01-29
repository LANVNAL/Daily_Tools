# -*- coding: UTF-8 -*-
"""
@author: lanvnal
用于保存喜欢的A岛串
"""

import requests
from pyquery import PyQuery as pq
import re,os,sys

class Save_adnmb:
    pages = 1
    po = "po"

    def __init__(self, tid):
        self.tid = tid
        self.url = "https://adnmb2.com/t/" + str(tid) 
        self.basepath = os.path.abspath(os.path.dirname(__file__))
        self.savetype = "txt"
    
    def test_tid(self):
        r = requests.get(self.url)
        status = r.status_code
        text = r.text
        exist = text.find('<p class="error">该主题不存在</p>')
        if status != 200 or exist != -1:
            #返回200也有可能有误
            print ("串号有误，请检查")
            return False
        else:
            print ("即将开始......")
            return True

    def get_pages(self):
        print ("获取页数......")
        print ("如果图片较多保存速度会慢一点")
        r = requests.get(self.url)
        data = r.text
        doc = pq(data)
        self.current_page = data
        pagesdoc = doc.find('.uk-pagination-left').children()
        pages = max(list(map(int,re.findall(r'\?page=([0-9]*)',str(pagesdoc)))))
        self.pages = int(pages)
        print ("页数为：{}".format(self.pages))
        
    def get_po_id(self,id):
        if self.po == "po":
            self.po = id
        else:
            return

    def judge_po(self,id):
        if id == self.po:
            return "po"
        else:
            return

    def save_img(self,replyid,replyimg):
        img_savepath = os.path.join(self.basepath,  self.tid)   #解决不同系统路径问题
        if not os.path.exists(img_savepath):
            os.mkdir(img_savepath)
        if len(replyimg) > 0:   #判断是否有图片
            imgsrc = re.findall(r'data-src=\"(.*?)\"',str(replyimg))[0]
            with open(os.path.join(img_savepath, "{}.jpg".format(replyid)),'wb') as f:
                data = requests.get(imgsrc)
                f.write(data.content)
        else:
            return

    def get_reply_data(self):
        for page in range(1,self.pages + 1):
            url = self.url + "?page=" + str(page)
            r = requests.get(url)
            data = r.text
            doc = pq(data)
            #TODO:未保存正文
            
            maindoc = doc.find('.h-threads-item-main')
            
            maintime = maindoc.find('.h-threads-info-createdat').text()
            mainuid = maindoc.find('.h-threads-info-uid').text()
            mainid = maindoc.find('.h-threads-info-id').text()
            mainmsg = maindoc.find('.h-threads-content').text() 
            mainimg = maindoc.find('.h-threads-img-box a .h-threads-img')
            
            if self.savetype == "txt":
                self.save_to_txt(maintime,mainuid,mainid,mainmsg)
            else:
                self.save_to_markdown(maintime,mainuid,mainid,mainmsg,mainimg)    
            self.save_img(mainid,mainimg)
            
            replydoc = doc.find('.h-threads-item-reply-main').items()
        
            for reply in replydoc:
                replytime = reply.find('.h-threads-info-createdat').text()
                replyuid = reply.find('.h-threads-info-uid').text()
                replyid = reply.find('.h-threads-info-id').text()
                replymsg = reply.find('.h-threads-content').text() 
                replyimg = reply.find('.h-threads-img-box a .h-threads-img')
                if page == 1:self.get_po_id(replyuid)
                if self.savetype == "txt":
                    self.save_to_txt(replytime,replyuid,replyid,replymsg)
                else:
                    self.save_to_markdown(replytime,replyuid,replyid,replymsg,replyimg)    
                self.save_img(replyid,replyimg)            
                #print (replyid,replyimg)
            
            print ("第{}页已保存".format(page))

    def save_to_txt(self,replytime,replyuid,replyid,replymsg):
        filename = os.path.join(self.basepath, str(self.tid) + ".txt")
        if self.judge_po(replyuid) == "po":
            replyuid = replyuid + " (po)"
        with open (filename, 'a', encoding="utf-8") as savetxt:
            savetxt.write(replytime + "   " + replyuid + "   " + replyid + '\n')
            savetxt.write(replymsg + '\n')
            savetxt.write("======================================================" + '\n')

    def save_to_markdown(self,replytime,replyuid,replyid,replymsg,replyimg):
        filename = os.path.join(self.basepath, str(self.tid) + ".md")
        if self.judge_po(replyuid) == "po":
            replyuid = replyuid + " (po)"
        with open (filename, 'a', encoding="utf-8") as savemd:
            savemd.write("> **" + replytime + "**\\" + "\n")
            savemd.write("> " + replyuid + "&emsp;" + replyuid + "\n")
            if len(replyimg) > 0:   #判断是否有图片
                imgpath = "./{}/{}.jpg".format(self.tid,replyid)
                savemd.write("\n" + "![]({})".format(imgpath) + "\n")
            savemd.write("```" + "\n")
            savemd.write(replymsg + "\n")
            savemd.write("```" + "\n\n")


    def saveee(self,savetype = "txt"):
        self.savetype = savetype
        if self.test_tid():
            self.get_pages()
            self.get_reply_data()
            print ("完工 (*´ω`*)")

    def test(self):
        self.get_reply_data()


if __name__ == "__main__":
    mode = 1
    if(mode == 1):
        tid = input("请输入串号：")
        choicetype = input("请选择保存的文件类型(1-txt 2-markdown):")
    else:
        tid = 3
        choicetype = 3
    save = Save_adnmb(tid)
    if choicetype == "1":
        savetype = "txt"
    elif choicetype == "2":
        savetype = "markdown"
    else:
        print("类型不正确")
        sys.exit(0)
    save.saveee(savetype)
