# -*- coding:utf-8 -*-

import requests
import re
import datetime
import time
from twilio.rest import Client


def login(S,cookies):
    url = "http://seat.ujn.edu.cn/"
    try:
        r = S.post(url,cookies=cookies,timeout=10)
        if "请输入学号" in r.content:
            print "login status error"
    except Exception as e:
        print "login error"
    #print r.content

def send_msg(msg):
    #添加自己的twilio配置
    account_sid = 'twilio_sid'
    auth_token = 'twilio_token'
    client = Client(account_sid, auth_token)
    message = client.messages.create(
                                from_='+twilio_phone',
                                body=msg,
                                to='+86your_phone'
                            )

def send_msg_to_me(msg):
    account_sid = 'twilio_sid'
    auth_token = 'twilio_token'
    client = Client(account_sid, auth_token)
    message = client.messages.create(
                                from_='+twilio_phone',
                                body=msg,
                                to='+86your_phone'
                            )

def get_token(S,cookies):
    url = "http://seat.ujn.edu.cn/map"
    r = S.get(url,cookies=cookies,timeout=10).content
    return re.findall(r'SYNCHRONIZER_TOKEN\" value=\"(.*?)\"',r)[0]


def order(S,day,cookies):
    token = get_token(S,cookies)
    burp0_url = "http://seat.ujn.edu.cn:80/selfRes"
    headers = {"Cache-Control": "max-age=0", "Origin": "http://seat.ujn.edu.cn", "Upgrade-Insecure-Requests": "1", "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3", "Referer": "http://seat.ujn.edu.cn/map", "Accept-Encoding": "gzip, deflate", "Accept-Language": "zh-CN,zh;q=0.9", "Connection": "close"}
    data={"SYNCHRONIZER_TOKEN": token, "SYNCHRONIZER_URI": "/map", "date": day, "seat": "40052", "start": "480", "end": "1320", "authid": "-1"}#座位参数，在网页可以看到
    r=S.post(burp0_url, headers=headers, cookies=cookies, data=data,timeout=10)
    returndata =  r.content
    #print returndata
    tmrday = datetime.date.today() + datetime.timedelta(days=1)
    if "系统已经为您预定好了" in returndata:
        print "order success"
        send_msg("已经为XXX成功预定了【{} 8:00-22:00】的专属座位,今天也要加油呀！😆".format(tmrday.strftime('%Y-%m-%d')))
        send_msg_to_me("已经为XXX成功预定了【{} 8:00-22:00】的专属座位,今天也要加油呀！😆".format(tmrday.strftime('%Y-%m-%d')))
        return "success"
    elif "已有1个有效预约" in returndata:
        print "one successed"
        #send_msg("An existing appointment")
        return "ordered"
    elif "参数错误" in returndata:
        print "error parameter,pls check order day"
        return "error"
    else:
        return "none"

def order_tue(S,day,cookies):
    token = get_token(S,cookies)
    burp0_url = "http://seat.ujn.edu.cn:80/selfRes"
    headers = {"Cache-Control": "max-age=0", "Origin": "http://seat.ujn.edu.cn", "Upgrade-Insecure-Requests": "1", "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3", "Referer": "http://seat.ujn.edu.cn/map", "Accept-Encoding": "gzip, deflate", "Accept-Language": "zh-CN,zh;q=0.9", "Connection": "close"}
    data={"SYNCHRONIZER_TOKEN": token, "SYNCHRONIZER_URI": "/map", "date": day, "seat": "40052", "start": "960", "end": "1320", "authid": "-1"}
    r=S.post(burp0_url, headers=headers, cookies=cookies, data=data,timeout=10)
    returndata =  r.content
    #print returndata
    tmrday = datetime.date.today() + datetime.timedelta(days=1)
    if "系统已经为您预定好了" in returndata:
        print "order success"
        send_msg("已经为XXX成功预定了【{} 16:00-22:00】的专属座位,今天也要加油呀！😆".format(tmrday.strftime('%Y-%m-%d')))
        send_msg_to_me("已经为XXX成功预定了【{} 16:00-22:00】的专属座位,今天也要加油呀！😆".format(tmrday.strftime('%Y-%m-%d')))
        return "success"
    elif "已有1个有效预约" in returndata:
        print "one successed"
        #send_msg("An existing appointment")
        return "ordered"
    elif "参数错误" in returndata:
        print "error parameter,pls check order day"
        return "error"
    else:
        return "none"

def get_time():
    dt1 = datetime.date.today() + datetime.timedelta(days=1)
    dt2 = datetime.date.today() + datetime.timedelta(days=2)
    tmr = dt1.strftime('%Y-%m-%d')  
    aftertmr = dt2.strftime('%Y-%m-%d')
    return tmr,aftertmr



if __name__ == "__main__":
    while True:
        nowhour = datetime.datetime.now().strftime('%H') 
        nowmins = datetime.datetime.now().strftime('%M') 
        cookies = dict(JSESSIONID='XXXX')#用自己的cookie
        S=requests.Session()
        if int(nowhour) < 7 or int(nowhour) >= 22:
            if int(nowhour) == 6 and int(nowmins) >= 50:
                if int(nowmins) >= 56:
                    stime = 10
                else:
                    stime = 60
            else:
                login(S,cookies)
                print "order system is closing"
                stime = 600
        elif int(nowhour) < 8:  #8点前自动预约
            login(S,cookies)
            day1,day2 = get_time()
            if datetime.datetime.now().strftime('%a') == "Mon": #周一预约周二的
                try:
                    status = order_tue(S,day1,cookies)
                    #print status
                except:
                    status = "error"    
            else:
                try:
                    status = order(S,day1,cookies)
                except:
                    status = "error"
            #order(S,day2,cookies)
            if int(nowmins) <= 30 and status != "success":
                stime = 5
            else:
                stime = 300
        else:
            login(S,cookies)
            print "9:00 - 22:00 stop order"
            stime = 600
        nowtime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M')
        print "+++ Now Time +++ " + "|============" + nowtime + "============|"
        time.sleep(stime)
