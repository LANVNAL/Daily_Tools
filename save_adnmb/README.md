## A岛串保存

**已实现功能：**
   - [x] 保存回复时间，ID，回复ID，内容，引用
   - [x] 区分po主
   - [x] 能看懂的排版（txt嘛~~）
   - [x] 保存图片
   - [x] 更友好的排版和存储类型
   - [x] 实现包含图片的排版
   
   
**待实现功能：**
   - [ ] 实现引用的查看
   - [ ] 添加饼干，爬取页数较多的串
   

**使用效果：**

![](https://github.com/LANVNAL/Daily_Tools/blob/master/save_adnmb/adnmb1.png)
![](https://github.com/LANVNAL/Daily_Tools/blob/master/save_adnmb/adnmb2.png)
![](https://github.com/LANVNAL/Daily_Tools/blob/master/save_adnmb/adnmb3.png)
![](https://github.com/LANVNAL/Daily_Tools/blob/master/save_adnmb/adnmb4.png)

**使用：**

输入串号，选择保存的文件类型，txt只有文本，图片存到串号命名文件夹。markdown格式和原排版类似，图片在对应的回复中显示。
```
λ python adnmb.py
请输入串号：21731157
请选择保存的文件类型(1-txt 2-markdown):2
```