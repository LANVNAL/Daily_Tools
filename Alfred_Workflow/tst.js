
var httphead='';
$(function(){


    $("#loginBox").bind("click",function(){
        if($(this).find('img').size()==0) {
            window.location = 'https://passport.weibo.cn/signin/login?r=' + window.location.href;
        }
    });
    $("#loginBox").on("click","img",function(event){
        event.stopPropagation();
        event.preventDefault();
        window.location = '/fb/user/';
    });
    var inti=0;
    var tuichu=setInterval(function(){
        if(inti==10){
            clearInterval(tuichu);
            return;
        }
        if($("#loginBox").children().size()==1 && $("#loginBox img").size()==1){
            $("#loginBox").append("<a href='//passport.sina.cn/sso/logout?vt=4&entry=wapsso&r="+encodeURIComponent(location.href)+"' class='linkico'>\u9000\u51fa</a>");//闂備緡鍋€閸嬫捇鏌涢幋顖涘
            clearInterval(tuichu);
            return;
        }
        inti++;
    },300);

    if($("#c_list_box").size()>0){
        var order_name='c_time',npage=1,hpage=1,opage=1;
        $("#c_list_box .publiclist").eq(0).find(".loading_box").remove();
        $("#c_list_box .publiclist").eq(0).append('<div class="loading_box"></div>');
        getNewComplain(npage);
        getHotComplain(hpage);
        getOverComplain(opage);

        $("#c_pathcomplain").bind("click",function(){
            $("#flow_diagram").css({'transform':'translateY(0)'});
            $("#mask_box").css({'display':'block'});
        });
        $(".flow_diagram .flow_tit").bind("click",function(){
            $("#flow_diagram").css({'transform':'translateY(100%)'});
            $("#mask_box").css({'display':'none'});
        });
        $("#mask_box").bind("click",function(){
            $(".flow_diagram .flow_tit").trigger("click");
        });

        var zhantingboxswiper = new Swiper('.zhantingbox .swiper-container', {
            pagination: '.tit',
            paginationClickable: true,
            loop: false,
            autoHeight: true,
            observer:true,
            observeParents:true,
            onInit: function(swiper){
                //Swiper闂佸憡甯楃换鍌烇綖閹版澘绀岄柡宥忓閸燂拷

                //$("#c_list_box .swiper-wrapper").height($("#c_list_box .swiper-slide").eq(0).height()+100);
            },
            paginationBulletRender: function (swiper, index, className) {
                var wrap = swiper.wrapper[0],
                    titlebox = $(wrap).siblings('.swipertithide');
                for(var i = 0; i < titlebox.children().length; i++) {
                    if (i == index) {
                        name = titlebox.children().eq(index).html();
                    }
                }
                return '<i class="' + className + '"><span>' + name + '</span></i>';
            },
            onSlideChangeEnd: function(swiper){
                var obj=$("#c_list_box .tit i").eq(swiper.realIndex),w=$(window).width(),tw=0;
                for(var i=0;i<=swiper.realIndex;i++){
                    tw+=$("#c_list_box .tit i").eq(i).width();
                }
                if(tw>w && tw-w>10){
                    $("#c_list_box .tit").css({'transform':'translateX('+(w-tw)+'px)'});
                }else{
                    $("#c_list_box .tit").css({'transform':'translateX(0)'});
                }
                lloaddata=true;
                $(window).scrollTop(0);
            }
        });

        var plist = new Swiper('.new_part.swiper-container', {
            loop: true,
            autoHeight: false,
            observer:true,
            observeParents:true,
            autoplay:2500,
            onInit: function(swiper){
                //Swiper闂佸憡甯楃换鍌烇綖閹版澘绀岄柡宥忓閸燂拷
                $("#p_list_box .tit_b em").html(swiper.realIndex+1);
                $("#p_list_box .tit_b span").html('/'+(swiper.slides.length-2));
            },
            onSlideChangeEnd: function(swiper){
                $("#p_list_box .tit_b em").html(swiper.realIndex+1);
            }
        });

        $(window).scroll(function(){
            switch(zhantingboxswiper.realIndex){
                case 0:
                    if(lloaddata && $(window).scrollTop()+$(window).height() >= $(document).height()-$(window).height()/2){
                        lloaddata=false;
                        npage++;
                        $("#c_list_box .swiper-slide").eq(0).find('.publiclist ul').append('<li id="li_loading"></li>');
                        setTimeout(function(){
                            getComplainList(npage,0,'ctime',0);
                        },1000);
                    }
                    break;
                case 1:
                    if(lloaddata && $(window).scrollTop()+$(window).height() >= $(document).height()-$(window).height()/2){
                        lloaddata=false;
                        hpage++;
                        $("#c_list_box .swiper-slide").eq(1).find('.publiclist ul').append('<li id="li_loading"></li>');
                        setTimeout(function(){
                            getComplainList(hpage,4,'ctime',1);
                        },1000);
                    }
                    break;
                case 2:
                    if(lloaddata && $(window).scrollTop()+$(window).height() >= $(document).height()-$(window).height()/2){
                        lloaddata=false;
                        opage++;
                        $("#c_list_box .swiper-slide").eq(2).find('.publiclist ul').append('<li id="li_loading"></li>');
                        setTimeout(function(){
                            getComplainList(opage,5,'ctime',2);
                        },1000);
                    }
                    break;
            }
        });

        //$(".search_box .c_search").bind("click",function(){
        $(".c_search").bind("click",function(){
            $("#search_floatBox").show();
            setTimeout(function(){
                $("#search_floatBox").addClass("show");
            },300);
            $("#search_txt").triggerHandler('focus');
        });
        $("#search_floatBox .search_htit .cancel").bind("click",function(){
            $("#search_floatBox").removeClass("show");
            setTimeout(function(){
                $("#search_floatBox").hide();
            },300);
        });

    }

    if($(".my_complain").size()>0) {
        $("#myc_list_box .swiper-wrapper .swiper-slide .publiclist ul").html('');
        function myc_status(n){
            var status=0;
            switch(n){
                case 0:
                    status=0;
                    break;
                case 1:
                    status=1;
                    break;
                case 2:
                    status=3;
                    break;
                case 3:
                    status=4;
                    break;
                case 4:
                    status=5;
                    break;
                case 5:
                    status=2;
                    break;
                case 6:
                    status=6;
                    break;
            }
            return status;
        }
        function myc_index(n){
            var status=0;
            switch(n){
                case 0:
                    status=0;
                    break;
                case 1:
                    status=1;
                    break;
                case 3:
                    status=2;
                    break;
                case 4:
                    status=3;
                    break;
                case 5:
                    status=4;
                    break;
                case 2:
                    status=5;
                    break;
                case 6:
                    status=6;
                    break;
            }
            return status;
        }
        var myc_page=[1,1,1,1,1,1,1];
        var my_complain = new Swiper('.my_complain .swiper-container', {
            pagination: '.tit',
            paginationClickable: true,
            loop: false,
            autoHeight: true,
            paginationBulletRender: function (swiper, index, className) {
                var wrap = swiper.wrapper[0],
                    titlebox = $(wrap).siblings('.swipertithide');
                for (var i = 0; i < titlebox.children().length; i++) {
                    if (i == index) {
                        name = titlebox.children().eq(index).html();
                    }
                }
                return '<i class="' + className + '"><span>' + name + '</span></i>';
            },
            onSlideChangeStart:function(swiper){
                $("#myc_list_box .swiper-slide").eq(swiper.realIndex).find("ul").html('<li id="li_loading"></li>');
            },
            onSlideChangeEnd: function (swiper) {
                var obj = $("#myc_list_box .tit i").eq(swiper.realIndex), w = $(window).width(), tw = 0;
                for (var i = 0; i <= swiper.realIndex; i++) {
                    tw += $("#myc_list_box .tit i").eq(i).width();
                }
                if (tw > w && tw - w > 10) {
                    $("#myc_list_box .tit").css({'transform': 'translateX(' + (w - tw) + 'px)'});
                } else {
                    $("#myc_list_box .tit").css({'transform': 'translateX(0)'});
                }
                // if($("#myc_list_box .swiper-slide").eq(swiper.realIndex).find("ul li").size()==0){
                getcd=true;
                myc_page[swiper.realIndex]=1;
                $("#myc_list_box .swiper-slide").eq(swiper.realIndex).find("#li_loading").remove();
                getMyComplainData(myc_page[swiper.realIndex],20,myc_status(swiper.realIndex),$("#myc_list_box .swiper-slide").eq(swiper.realIndex));
                // }
            }
        });
        if(/#(\d+)/ig.test(window.location)){
            getMyComplainData(myc_page[myc_index(/#(\d+)/ig.exec(window.location)[1])], 20, 0, $("#myc_list_box .swiper-slide").eq(myc_index(/#(\d+)/ig.exec(window.location)[1])));
        }else {
            //闂佺ǹ绻堥崝鎴﹀磿閿燂拷
            getMyComplainData(1, 20, 0, $("#myc_list_box .swiper-slide").eq(0));
        }
        $(window).scroll(function(){
            if($(window).scrollTop()+$(window).height()*1.5>$(document).height()){
                myc_page[my_complain.realIndex]+=1;
                getMyComplainData(myc_page[my_complain.realIndex],20,myc_status(my_complain.realIndex),$("#myc_list_box .swiper-slide").eq(my_complain.realIndex));
            }
        });

    }

    if($(".bind_mobile").size()>0){
        $(".bind_mobile .cancel").bind("click",function(){
            $(".bind_mobile").css({'transform':'translateX(100%)'});
        });
        //闂佸吋鍎抽崲鑼躲亹閸ヮ煈娈界€光偓閸愵亝顫嶉梺娲诲櫙閹凤拷
        $("#getCode").bind("click",function(){
            if($(this).is(".countdown")) return;
            var m=$("#txt_msgMobile").val().replace(/\s/ig,'');
            if(m==null || m=='' || /^1[3|5|7|8]\d{9}$/ig.test(m)==false){
                hintMsg('\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801'); //闁荤姴娲ㄩ弻澶屾椤撱垹绀傞柕澶涘瘜閸斺偓缂佺虎鍙庨崰姘枔閹达箑绠ラ悗锝庡亝缁ㄦ岸鏌涘▎鎿冩闁绘牭鎷�
                return;
            }
            $("#getCode").addClass("countdown");
            var s60=60;
            var stopcd=setInterval(function(){
                if(s60<0){
                    $("#getCode").removeClass("countdown");
                    $("#getCode").html('\u83b7\u53d6\u9a8c\u8bc1\u7801');
                    clearInterval(stopcd);
                }else {
                    $("#getCode").html(s60 + ' \u79d2');
                }
                s60--;
            },1000);
            getCode(m);
        });
        //缂傚倷鐒﹂崹鐢告偩妤ｅ啫绠ラ悗锝庡亝缁ㄦ岸鏌涘▎娆愬
        $(".bind_mobile .ok_btn").bind("click",function(){
            var v=$("#txt_msgMobile").val();
            var c=$("#txt_msgmCode").val();
            if(v==null || v.replace(/\s/ig,'')=='' || /^1[3|5|7|8]\d{9}$/ig.test(v)==false){
                hintMsg('\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801'); //闁荤姴娲ㄩ弻澶屾椤撱垹绀傞柕澶涘瘜閸斺偓缂佺虎鍙庨崰姘枔閹达箑绠ラ悗锝庡亝缁ㄦ岸鏌涘▎鎿冩闁绘牭鎷�
                return;
            }
            if(c==null || c.replace(/\s/ig,'')==''){
                hintMsg('\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801'); //闁荤姴娲ㄩ弻澶屾椤撱垹绀傞柕澶嗘櫇瀹曪綁鎮归崶锕佸厡闁绘牭鎷�
                return;
            }
            //闂佸湱绮崝鎺戭潩閿斿墽纾奸柟瀛樼箘閺嗕即鏌熼棃娑卞剱婵犙€鍋撻梺鍛婄懕閹凤拷
            bindMobile(v,c);
        });
    }

    if($(".my_info").size()>0){
        $(".my_info").height($(window).height()-$(".complain_user_head").height());

        $(".my_mobile .btn").bind("click",function(){
            $(".bind_mobile").css({'transform':'translateX(0)'});
        });
    }

    if($(".complain_content").size()>0){
        //缂傚倷鐒﹂崹鐢告偩妤ｅ啫绠ラ悗锝庡亝缁拷
        $.getJSON(httphead+'/api/user/isBind?callback=?',function(s){
            if(s.status!=1000 || s.data.is_bind!=1){
                //闂佸搫鐗滄禍鐐靛垝閿旈敮鍋撶憴鍕暡濠⒀勭矒瀵敻宕崟顐⑩枏
                $(".bind_mobile").show();
                $(".bind_mobile").css({'transform':'translateX(0%)','-webkit-transform':'translateX(0%)'});
            }
        });


        //闂佸憡甯楃换鍌烇綖閹版澘鏄ラ幖杈剧磿椤忓啿菐閸ワ絽澧插ù纭锋嫹
        getcity();
        //闁哄鍎戠粻鎴︽倵閻戣棄浼犲ù锝呮惈椤わ拷
        getBrandlist();

        //闂備緡鍋勯ˇ鎵偓姘ュ姂瀹曠儤鎯旈敍鍕典紜
        $("#select_city").bind("click",function(event){
            event.stopPropagation();
            event.preventDefault();
            $(".mask_box").show();
            setTimeout(function(){
                $(".dir").addClass("on");
                // $(".gradient_m").show();
                $("#province_list").css({'transform':'translateX(0%)','-webkit-transform':'translateX(0%)'});
            },100);
        });
        $("#province_list").on("click","ul li",function(event){
            event.stopPropagation();
            event.preventDefault();
            var v=$(this).attr("data_v"),n=$(this).find("span").html();
            $("#city_list .box_tit .province").html(n).attr("data_v",v);
            getcity(v);
            setTimeout(function(){
                $("#city_list").css({'transform':'translateX(0%)','-webkit-transform':'translateX(0%)'});
            },100);
        });
        $("#city_list").on("click","ul li",function(event){
            event.stopPropagation();
            event.preventDefault();
            var v=$(this).attr("data_v"),n=$(this).find("span").html();
            if(parseInt(v)>0){
                n=$("#city_list .box_tit .province").html()+' '+n;
                v=$("#city_list .box_tit .province").attr("data_v")+','+v;
                $("#select_city .val").html(n).attr("data_v",v).removeClass("null");
            }else{
                $("#select_city .val").html('\u8bf7\u9009\u62e9').removeAttr("data_v");
            }
            $(this).parents(".mask_box").hide();
            $(".typebox").css({'transform':'translateX(100%)','-webkit-transform':'translateX(100%)'});
        });

        //闂備緡鍋勯ˇ鎵偓姘ュ姂濮婂顢氶埀顒勩€傞悾宀€灏甸悹鍥皺閳ь剨鎷�
        $("#question_type").bind("click",function(event){
            event.stopPropagation();
            event.preventDefault();
            $(".mask_box").show();
            setTimeout(function(){
                $(".dir").addClass("on");
                $("#typebox").css({'transform':'translateX(0%)','-webkit-transform':'translateX(0%)'});
            },100);
        });
        $("#typebox").on("click","ul li",function(event){
            event.stopPropagation();
            event.preventDefault();
            if($(this).attr("data_v")==0){
                $(this).addClass("on").siblings("li").removeClass("on");
            }else{
                $("#typebox ul li[data_v='0']").removeClass("on");
                if($(this).is(".on")){
                    $(this).removeClass("on");
                }else{
                    $(this).addClass("on");
                }
            }
        });
        $("#typebox .clear_btn").bind("click",function(event){
            event.stopPropagation();
            event.preventDefault();
            $("#typebox ul li").removeClass("on");
        });
        $("#typebox .btn_ok").bind("click",function(event){
            event.stopPropagation();
            event.preventDefault();
            var v='',n='';
            $("#typebox li").each(function(){
                if($(this).is(".on")){
                    if(v==''){
                        v=$(this).attr("data_v");
                        n=$(this).find("span").html();
                    }else{
                        v+=','+$(this).attr("data_v");
                        n+=','+$(this).find("span").html();
                    }
                }
            });

            if(v==''){
                $("#rem_msgbox").css({'display':'inline-block','opacity':1});
                $("#rem_msgbox .rem_str").html('\u8bf7\u9009\u62e9\u95ee\u9898\u7c7b\u578b');//闂佸搫鐗冮崑鎾愁熆閼搁潧鍝洪柍褜鍓欓ˇ顔剧箔娴ｅ箍浜滈柨鐕傛嫹
                setTimeout(function(){
                    $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                    setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
                },1000);
                return;
            }else if(v.split(',').length>3){
                $("#rem_msgbox").css({'display':'inline-block','opacity':1});
                $("#rem_msgbox .rem_str").html('\u6700\u591a\u9009\u4e09\u9879');//闂佸搫鐗冮崑鎾愁熆閼搁潧鍝洪柍褜鍓欓ˇ顔剧箔娴ｅ箍浜滈柨鐕傛嫹
                setTimeout(function(){
                    $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                    setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
                },1000);
                return;
            }
            $("#question_type .val").html(n.length>18?n.substring(0,18)+'...':n).attr("data_v",v).removeClass("null");
            $(this).parents(".mask_box").hide();
            $(".typebox").css({'transform':'translateX(100%)','-webkit-transform':'translateX(100%)'});
            $(".dir").removeClass("on");
        });

        //闂備緡鍋勯ˇ鎵偓姘ュ妽濞碱亪鏁冮埀顒勬倵閻戣棄浼犲ù锝呮惈椤わ拷
        $("#select_car").bind("click",function(){
            $(".mask_box").show();
            setTimeout(function(){
                $(".dir").addClass("on");
                $("#brand_list").css({'transform':'translateX(0%)','-webkit-transform':'translateX(0%)'});
            },100);
        });
        $("#brand_list").on("click","ul li",function(event){
            event.stopPropagation();
            event.preventDefault();
            if($(this).is(".group_t")) return;
            var bid=$(this).attr("data_v"),bname=$(this).find(".brand_name").html();
            if(parseInt(bid)==0){
                $(this).parents(".mask_box").hide();
                $("#brand_list").css({'transform':'translateX(100%)','-webkit-transform':'translateX(100%)'});
                $("#select_car .val").html(bname).attr("data_v",0);
                bid=0;
                sid=0;
                p=1;
                loadv=true;
                $(".complain_hot .com_list").html('');
                //get_complain_list(bid,sid,sta,fbo,qtype,n,p);
                return;
            }
            getSerieslist(bid);
            $("#series_list .brand").attr("data_v",bid).html($(this).find('.brand_name').html());
            $("#car_list .box_tit .b_logo img").attr("src",$(this).find(".brand_logo img").attr("src"));
            $("#car_list .box_tit .brand").html($(this).find(".brand_name").html());
            setTimeout(function(){
                $("#series_list").css({'transform':'translateX(0%)','-webkit-transform':'translateX(0%)'});
            },100);
        });
        $("#series_list").on("click","ul li",function(event){
            event.stopPropagation();
            event.preventDefault();
            if($(this).is(".sgroup"))return;
            bid=$("#series_list .brand").attr("data_v");
            sid=$(this).attr("data_v");
            p=1;
            loadv=true;
            var sname=$(this).find(".series_name").html();
            var bname=$("#series_list .brand").html();

            if(sid==0){
                $(".mask_box").hide();
                $(".mask_box .typebox").css({'transform':'translateX(100%)','-webkit-transform':'translateX(100%)'});
                $("#select_car .val").html(bname).attr("data_v",bid+','+sid+',0');
            }else{
                //$("#select_car .val").html(sname).attr("data_v",bid+','+sid);
                getCarlist(sid);
                $("#car_list .box_tit .brand").attr("data_v",bid+','+sid);
                $("#car_list .box_tit .brand").attr("data_n",sname);
                var subbname='';
                $("#series_list ul li").each(function(m,v){
                    if($(this).attr("data_v")==sid) {
                        return false;
                    }else {
                        if ($(this).is(".sgroup")) {
                            subbname = $(this).find(".cname").html();
                        }
                    }
                });
                $("#car_list .car_btit span").html(subbname);
                setTimeout(function(){
                    $("#car_list").css({'transform':'translateX(0%)','-webkit-transform':'translateX(0%)'});
                },100);
            }
        });
        $("#car_list").on("click",function(event){
            event.preventDefault();
            event.stopPropagation();
        });
        $("#car_list").on("click","ul li",function(event){
            event.preventDefault();
            event.stopPropagation();
            var bid,sid,cid,v,carname;
            cid=$(this).attr("data_v");
            v=$("#car_list .box_tit .brand").attr("data_v")+','+cid;
            //carname=$("#car_list .box_tit .brand").attr("data_n");
            carname=$(this).find(".car_name").html();
            carname=carname.substring(0,20)+(carname.length>20 ? '...':'');
            $(".mask_box").hide();
            $(".mask_box .typebox").css({'transform':'translateX(100%)','-webkit-transform':'translateX(100%)'});
            $("#select_car .val").html(carname).attr("data_v",v).removeClass("null");
        });

        var carlist = new Swiper('#car_list .swiper-container', {
            pagination: '.car_tag',
            paginationClickable: true,
            loop: false,
            autoHeight: true,
            observer:true,
            observeParents:true,
            onInit: function(swiper){},
            paginationBulletRender: function (swiper, index, className) {
                var wrap = swiper.wrapper[0],
                    titlebox = $(wrap).siblings('.swipertithide');
                for(var i = 0; i < titlebox.children().length; i++) {
                    if (i == index) {
                        name = titlebox.children().eq(index).html();
                    }
                }
                return '<i class="' + className + '"><span>' + name + '</span></i>';
            },
            onSlideChangeEnd: function(swiper){}
        });

        $("#brand_list .close_btn").bind("click",function(event){
            event.preventDefault();
            $(this).parents(".mask_box").hide();
            $("#brand_list").css({'transform':'translateX(100%)','-webkit-transform':'translateX(100%)'});
        });
        $("#series_list .close_btn").bind("click",function(){
            $("#series_list").css({'transform':'translateX(100%)','-webkit-transform':'translateX(100%)'});
        });

        //闂備緡鍋勯ˇ鎵偓姘ュ姂濮婂顢氶埀顒勩€傛禒瀣闁惧繒鎳撶粻娑㈡煛閸愩劎鍩ｆ俊顐嫹
        $("#question_date_v").bind("click",function(event){
            event.preventDefault();
            $(".mask_box").show();
            setTimeout(function(){
                $(".dir").addClass("on");
                $("#question_date_list").css({'transform':'translateX(0%)','-webkit-transform':'translateX(0%)'});
            },100);
        });
        $("#question_date_list").on("click","ul li",function(event){
            event.preventDefault();
            var v=$(this).attr("data_v"),n=$(this).find("span").html();
            $("#question_date_v .val").html(n).attr("data_v",v).removeClass("null");
            $(this).parents(".mask_box").hide();
            $(".typebox").css({'transform':'translateX(100%)','-webkit-transform':'translateX(100%)'});
        });
        //闂備緡鍋勯ˇ鎵偓姘ュ姂濮婂顢氶埀顒勩€傛禒瀣闁惧繒鎳撶粻娑㈡煟閵娿儱顏╅柛娆愭礋閺屽瞼浠﹂悙顒侇啀
        $("#question_kilometre_v").bind("click",function(event){
            event.preventDefault();
            $(".mask_box").show();
            setTimeout(function(){
                $(".dir").addClass("on");
                $("#question_kilometre_list").css({'transform':'translateX(0%)','-webkit-transform':'translateX(0%)'});
            },100);
        });
        $("#question_kilometre_list").on("click","ul li",function(event){
            event.preventDefault();
            var v=$(this).attr("data_v"),n=$(this).find("span").html();
            $("#question_kilometre_v .val").html(n).attr("data_v",v).removeClass("null");
            $(this).parents(".mask_box").hide();
            $(".typebox").css({'transform':'translateX(100%)','-webkit-transform':'translateX(100%)'});
        });

        $("#pro_btn").bind("click",function(){
            if($(this).is(".no")){
                $(this).removeClass("no");
            }else{
                $(this).addClass("no");
            }
        });

        //婵炴垶鎸搁敃锝囨閸洖鐐婇柛鎾楀喚鏆�
        $(".uploadimg_btn .file").bind("change",function(){
            var v=$(this).val();
            opt_lump++;
            ajaxFileUpload();
        });

        $("#buy_date input").bind("change",function(){
            var v=$(this).val();
            $("#buy_date .val").html(v).removeClass("null");
        });

        $("#sel_IDtype select").bind("change",function(){
            var v=$(this).val(),c=$("#sel_IDtype option:checked").html();
            $("#sel_IDtype span").html(c);
            $("#sel_IDtype").attr("data-v",v);
        });

        $("#title_txt").bind("keyup",function(){
            var v=$(this).val();
            $(this).siblings(".num").find("em").html(v.length);
            if(v.length>24){
                $(this).siblings(".num").css("color","#f00");
            }else{
                $(this).siblings(".num").css("color","#999");
            }
        });
        $("#content_txt").bind("keyup",function(){
            var v=$(this).val();
            $(this).siblings(".con_num").find("em").html(v.length);
            if(v.length>1000 || v.length<20){
                $(this).siblings(".con_num").css("color","#f00");
            }else{
                $(this).siblings(".con_num").css("color","#999");
            }
        });

        //闂佸湱绮崝鎺戭潩閿曞倸绠柡鍥风磿濡诧拷
        $("#submit_btn").bind("click",function(){
            //缂傚倷鐒﹂崹鐢告偩妤ｅ啫绠ラ悗锝庡亝缁拷
            $.getJSON(httphead+'/api/user/isBind?callback=?',function(s){
                if(s.status!=1000 || s.data.is_bind!=1){
                    //闂佸搫鐗滄禍鐐靛垝閿旈敮鍋撶憴鍕暡濠⒀勭矒瀵敻宕崟顐⑩枏
                    $(".bind_mobile").show();
                    $(".bind_mobile").css({'transform':'translateX(0%)','-webkit-transform':'translateX(0%)'});
                }else{
                    submit_complain();
                }
            });
        });
        $(".complain_htit .ch_tit .cancel").bind("click",function(){
            //window.history.back(-1);
            window.location='/';
        });

        //闂佺ǹ绻戞繛濠偽涢弶鎳ㄥ綊顢欓懖鈺傚嬀
        $(".mask_box").bind('click',function(){
            $(this).hide();
            $(this).children().removeAttr("style");
            $(this).find(".on").removeClass("on");
            // $(".gradient_m").hide();
        });
        $(".typebox .close_btn").bind("click",function(event){
            event.stopPropagation();
            event.preventDefault();
            if($(this).parents(".typebox").is("#car_list")){
                $("#car_list").css({'transform':'translateX(100%)','-webkit-transform':'translateX(100%)'});
                return;
            }
            $(".dir").removeClass("on");
            // $(".gradient_m").hide();
            if($(this).parents("#series_list").size()>0){
                $("#series_list").css({'transform':'translateX(100%)','-webkit-transform':'translateX(100%)'});
            }else {
                $(this).parents(".mask_box").hide();
                $(".typebox").css({'transform': 'translateX(100%)', '-webkit-transform': 'translateX(100%)'});
            }
        });
    }

    if($("#search_txt").size()>0){
        if(localStorage.complain_search){
            get_search_bu('');
        }else{
            $(".search_content .history ul").html('');
            $(".history .h_tit").hide();
            $(".history .clear_btn").hide();
        }
        $("#search_txt").on("blur",function(){
            var tempvalue=$(this).val();
            get_search_bu(tempvalue);
            if(tempvalue.replace(/\s/ig,'')=='') return;
            save_search(tempvalue);
        }).on("keyup",function(e){
            var tempvalue = $(this).val();
            if(e.keyCode==13){
                save_search(tempvalue);
                window.location='/fb/search?keywords='+tempvalue+'&type=1';
            }else {
                get_search_bu(tempvalue);
            }
        });
        $(".search_content .history .clear_btn").on("click",function(){
            $(".search_content .history ul").html("");
            localStorage.complain_search='';
            $(".history .h_tit").hide();
            $(".history .clear_btn").hide();
        });

        $(".search_htit .search_box .search_btn").on("click",function(){
            var v=$("#search_txt").val();
            if(v.replace(/\s/ig,'')=='')return;
            window.location='/fb/search?keywords='+v+'&type=1';
        });
        $(".searchp_htit .search_box .search_btn").bind("click",function(){
            var v=$("#search_txt").val();
            if(v.replace(/\s/ig,'')=='')return;
            save_search(v);
            window.location='/fb/search?keywords='+v+'&type=1';
        });
        $(".searchp_htit .cancel").bind("click",function(){
            if($("#search_floatBox").is(".show")){
                $("#search_floatBox").removeClass("show");
                $(".searchp_htit").css({'position':'relative','top':0,'left':0});
            }else{
                window.location='/';
            }
        });
    }
    //闂佺懓鍚嬬划搴ㄥ磼閵婏负浜滈柛顭戝亝濞堝爼鏌熼惂鍛婂
    if($("#search_Databox").size()>0){
        //婵炲濮寸粣鎼憀闂備焦褰冮惌渚€鐛箛娑樼煑闁哄秲鍔嶉崑婵堢磼妲屾牗绶氬ǎ鍥э躬楠炰線鏁撻敓锟�
        var search=window.location.search.split('&'),search_type='',search_key='';
        for(var i in search){
            if(search[i].indexOf('type=')>-1){
                search_type=search[i].replace(/type=|\?/ig,'');
            }
            if(search[i].indexOf('keywords=')>-1){
                search_key=decodeURI(search[i].replace(/keywords=|\?/ig,''));
            }
        }
        if(search_key!=''){
            $(".searchp_htit .c_search span").html(search_key);
        }
        if(localStorage.complain_search){
            get_search_bu('');
        }else{
            $(".search_content .history ul").html('');
            $(".history .h_tit").hide();
            $(".history .clear_btn").hide();
        }
        $(".searchp_htit .search_box .c_search").on("click",function(){
            $("#search_floatBox").addClass("show");
            $(".searchp_htit").css({'position':'fixed','top':0,'left':0});
        });
        $("#search_floatBox .search_htit .cancel").bind("click",function(){
            $("#search_floatBox").removeClass("show");
        });
        getSearch_data(search_type,search_key,search_page);
    }

    $(".page_tit .btn").bind("click",function(){
        window.history.back(-1);
    });

    $("#regulation_box .close").bind("click",function(){
        $("#regulation_box").css({'transform':'scale(0.1)','opacity':0});
        setTimeout(function(){
            $(".mask_msg_box").hide();
        },500);
    });
    $(".provision span a").bind("click",function(){
        $(".mask_msg_box").show();
        setTimeout(function(){
            $("#regulation_box").css({'transform':'scale(1) translate(-50%,-50%)','opacity':1});
        },200);
    });

    
    $('.swiper-container-autoheight').css('min-height', $(window).height());
});


var nloaddata=true,hloaddata=true,oloaddata=true,lloaddata=true;
function getNewComplain(page){
    $.ajax({
        url:httphead+'/api/czfeedback/list',
        data:{'status':0,'page':page,'size':10,'order_name':'ctime','order_type':'desc'},
        type:'get',
        dataType:'jsonp',
        success:function(jsondata){
            $("#c_list_box .swiper-slide").eq(0).find('#li_loading').remove();
            $(".zhantingbox .partner").css('display','block');
            var data=jsondata.data.data;
            if(data.length>0){
                nloaddata=true;
            }else{
                nloaddata=false;
                if($("#c_list_box .swiper-slide").eq(0).find('.publiclist ul .over').size()==0) {
                    $("#c_list_box .swiper-slide").eq(0).find('.publiclist ul').append('<li class="over"><span>\u6ca1\u6709\u66f4\u591a\u4fe1\u606f</span></li>');//濠电偛澶囬崜婵嗭耿娓氣偓瀵挳寮堕幋顓熲柤婵烇絽娲犻崜婵囧閿燂拷
                }
                return;
            }
            if(data){
                var html='';
                /***婵犮垼娉涚€氼噣骞冩繝鍥х倞闁告挆鍐炬毈***/
                for(var i in data){
                    var li='';
                    if(data[i].img.length>0){
                        li='<li>' +
                            '                            <a href="'+data[i].wap_url+'" class="user">' +
                            '                                <div class="photo"><span><img src="' + data[i].profile_image_url.replace(/^[\s\S]+default_avatar_(female|male)_180.gif$/ig,'http://n.sinaimg.cn/auto/chezhan2017/nophoto_w.png') + '" /></span></div>' +
                            '                                <div class="name"><span>' + data[i].screen_name + '</span></div>' +
                            '                                <div class="date"><span>' + data[i].pub_date + '</span></div>' +
                            '                                <div class="state '+getState(data[i].status_desc)+'">' + data[i].status_desc + '</div>' +
                            '                            </a>' +
                            '                            <div class="content">';
                        li+='                                <div class="con_tit"><a href="'+data[i].wap_url+'">'+data[i].title+'</a></div>';
                        li+='                                <div class="subhead_s"><a href="'+data[i].wap_url+'"><span>'+data[i].content+'</span><div class="img"><img src="'+data[i].img[0]+'"/><span class="num'+(data[i].img.length==1?' hide':'')+'">'+data[i].img.length+'</span></div></a></div>' +
                            '                            </div>';

                    }else {
                        li = '<li>' +
                            '                            <a href="'+data[i].wap_url+'" class="user">' +
                            '                                <div class="photo"><span><img src="' + data[i].profile_image_url.replace(/^[\s\S]+default_avatar_(female|male)_180.gif$/ig,'http://n.sinaimg.cn/auto/chezhan2017/nophoto_w.png"') + '" /></span></div>' +
                            '                                <div class="name"><span>' + data[i].screen_name + '</span></div>' +
                            '                                <div class="date"><span>' + data[i].pub_date + '</span></div>' +
                            '                                <div class="state '+getState(data[i].status_desc)+'">' + data[i].status_desc + '</div>' +
                            '                            </a>' +
                            '                            <div class="content">';
                        li+='                                <div class="con_tit"><a href="'+data[i].wap_url+'">'+data[i].title+'</a></div>';
                        li+='                                <div class="subhead"><a href="'+data[i].wap_url+'"><span>' + data[i].content + '</span></a></div>' +
                            '                            </div>';


                    }
                    if(data[i].reply!=undefined && data[i].reply!=''){
                        if (data[i].reply_pre!=undefined && data[i].reply_pre!='' &&  data[i].reply_txt!=undefined && data[i].reply_txt!='') {
                            li+='                            <a href="'+data[i].wap_url+'" class="reply">' +
                                '                                <span class="r_user">'+data[i].reply_pre+'\u56de\u590d\uff1a</span>' +
                                '                                <span class="r_content">'+data[i].reply_txt+'</span>' +
                                '                            </a>';
                        }else{
                            li+='                            <a href="'+data[i].wap_url+'" class="reply">' +
                                '                                <span class="r_content">'+data[i].reply+'</span>' +
                                '                            </a>';
                        }
                    }
                    li+='                        </li>';
                    html+=li;
                }
                $("#c_list_box .swiper-slide").eq(0).find('.publiclist ul').append(html);
                /*
                $("#c_list_box .swiper-slide").eq(0).find('li').eq(2).after('<a class="btm_img" href="https://tousu.sina.cn/"><img src="http://n.sinaimg.cn/auto/style/29.png"></a>')
                */

                /*
                if(/sinanews/ig.test(navigator.userAgent)) {
                    window._sinaCallEvent && window._sinaCallEvent.trigger('sina_bind_target');
                }
                */
                setTimeout(function(){
                    var ulheight=0;
                    // $("#c_list_box .swiper-slide").eq(0).find('.publiclist ul li').each(function(){
                    //     ulheight+=$(this).height();
                    // });
                    ulheight=$("#c_list_box .swiper-slide").eq(0).find('.publiclist').height();
                    $("#c_list_box .publiclist").eq(0).find(".loading_box").remove();
                    $("#c_list_box .swiper-wrapper").height(ulheight+64);
                },500);


            }else{
                return false;
            }
        },
        error:function(v,m){
            $("#c_list_box .swiper-slide").eq(0).find('#li_loading').remove();
            $(".zhantingbox .partner").css('display','block');
        }
    });
}

function getHotComplain(page){
    $.ajax({
        url:httphead+'/api/czfeedback/list',
        data:{'status':0,'step':4,'feedback_object':0,'question_type':0,'big_brand_id':0,'sub_brand_id':0,'page':page,'size':10,'order_name':'ctime','order_type':'desc'},
        type:'get',
        dataType:'jsonp',
        success:function(jsondata){
            $("#c_list_box .swiper-slide").eq(1).find('#li_loading').remove();
            var data=jsondata.data.data;
            if(data.length>0){
                hloaddata=true;
            }else{
                hloaddata=false;
                if($("#c_list_box .swiper-slide").eq(1).find('.publiclist ul .over').size()==0) {
                    $("#c_list_box .swiper-slide").eq(1).find('.publiclist ul').append('<li class="over"><span>\u6ca1\u6709\u66f4\u591a\u4fe1\u606f</span></li>');//濠电偛澶囬崜婵嗭耿娓氣偓瀵挳寮堕幋顓熲柤婵烇絽娲犻崜婵囧閿燂拷
                }
                return;
            }
            if(data){
                var html='';
                for(var i in data){
                    var li='';
                    if(data[i].img.length>0){
                        li='<li>' +
                            '                            <a href="'+data[i].wap_url+'" class="user">' +
                            '                                <div class="photo"><span><img src="' + data[i].profile_image_url.replace(/^[\s\S]+default_avatar_(female|male)_180.gif$/ig,'http://n.sinaimg.cn/auto/chezhan2017/nophoto_w.png') + '" /></span></div>' +
                            '                                <div class="name"><span>' + data[i].screen_name + '</span></div>' +
                            '                                <div class="date"><span>' + data[i].pub_date + '</span></div>' +
                            '                                <div class="state '+getState(data[i].status_desc)+'">' + data[i].status_desc + '</div>' +
                            '                            </a>' +
                            '                            <div class="content">';
                            li+='                                <div class="con_tit"><a href="'+data[i].wap_url+'">'+data[i].title+'</a></div>';
                            li+='                                <div class="subhead_s"><a href="'+data[i].wap_url+'"><span>'+data[i].content+'</span><div class="img"><img src="'+data[i].img[0]+'" /><span class="num'+(data[i].img.length==1?' hide':'')+'">'+data[i].img.length+'</span></div></a></div>' +
                                '                            </div>';

                    }else {
                        li = '<li>' +
                            '                            <a href="'+data[i].wap_url+'" class="user">' +
                            '                                <div class="photo"><span><img src="' + data[i].profile_image_url.replace(/^[\s\S]+default_avatar_(female|male)_180.gif$/ig,'http://n.sinaimg.cn/auto/chezhan2017/nophoto_w.png') + '" /></span></div>' +
                            '                                <div class="name"><span>' + data[i].screen_name + '</span></div>' +
                            '                                <div class="date"><span>' + data[i].c_time + '</span></div>' +
                            '                                <div class="state '+getState(data[i].status_desc)+'">' + data[i].status_desc + '</div>' +
                            '                            </a>' +
                            '                            <div class="content">';
                            li+='                                <div class="con_tit"><a href="'+data[i].wap_url+'">'+data[i].title+'</a></div>';
                            li+='                                <div class="subhead"><a href="'+data[i].wap_url+'"><span>' + data[i].content + '</span></a></div>' +
                                '                            </div>';

                    }
                    if(data[i].reply!=undefined && data[i].reply!=''){
                        if (data[i].reply_pre!=undefined && data[i].reply_pre!='' &&  data[i].reply_txt!=undefined && data[i].reply_txt!='') {
                            li+='                            <a href="'+data[i].wap_url+'" class="reply">' +
                                '                                <span class="r_user">'+data[i].reply_pre+'\u56de\u590d\uff1a</span>' +
                                '                                <span class="r_content">'+data[i].reply_txt+'</span>' +
                                '                            </a>';
                        }else{
                            li+='                            <a href="'+data[i].wap_url+'" class="reply">' +
                                '                                <span class="r_content">'+data[i].reply+'</span>' +
                                '                            </a>';
                        }
                    }
                    li+='                        </li>';
                    html+=li;
                }
                $("#c_list_box .swiper-slide").eq(1).find('.publiclist ul').append(html);
                /*
                if(/sinanews/ig.test(navigator.userAgent)) {
                    window._sinaCallEvent && window._sinaCallEvent.trigger('sina_bind_target');
                }
                */
                // setTimeout(function(){
                //     var ulheight=0;
                //     // $("#c_list_box .swiper-slide").eq(1).find('.publiclist ul li').each(function(){
                //     //     ulheight+=$(this).height();
                //     // });
                //     ulheight=$("#c_list_box .swiper-slide").eq(1).find('.publiclist').height();
                //     $("#c_list_box .publiclist").eq(1).find(".loading_box").remove();
                //     $("#c_list_box .swiper-wrapper").height(ulheight+64);
                // },500);
            }else{
                return;
            }
        },
        error:function(v,m){
            $("#c_list_box .swiper-slide").eq(1).find('#li_loading').remove();
        }
    });
}

function getOverComplain(page){
    $.ajax({
        url:httphead+'/api/czfeedback/list',
        data:{'status':0,'step':5,'feedback_object':0,'question_type':0,'big_brand_id':0,'sub_brand_id':0,'page':page,'size':10,'order_name':'ctime','order_type':'desc'},
        type:'get',
        dataType:'jsonp',
        success:function(jsondata){
            $("#c_list_box .swiper-slide").eq(2).find('#li_loading').remove();
            var data=jsondata.data.data;
            if(data.length>0){
                oloaddata=true;
            }else{
                oloaddata=false;
                if($("#c_list_box .swiper-slide").eq(2).find('.publiclist ul .over').size()==0){
                    $("#c_list_box .swiper-slide").eq(2).find('.publiclist ul').append('<li class="over"><span>\u6ca1\u6709\u66f4\u591a\u4fe1\u606f</span></li>');//濠电偛澶囬崜婵嗭耿娓氣偓瀵挳寮堕幋顓熲柤婵烇絽娲犻崜婵囧閿燂拷
                }
                return;
            }
            if(data){
                var html='';
                for(var i in data){
                    var li='';
                    if(data[i].img.length>0){
                        li='<li>' +
                            '                            <a href="'+data[i].wap_url+'" class="user">' +
                            '                                <div class="photo"><span><img src="' + data[i].profile_image_url.replace(/^[\s\S]+default_avatar_(female|male)_180.gif$/ig,'http://n.sinaimg.cn/auto/chezhan2017/nophoto_w.png') + '" /></span></div>' +
                            '                                <div class="name"><span>' + data[i].screen_name + '</span></div>' +
                            '                                <div class="date"><span>' + data[i].pub_date + '</span></div>' +
                            '                                <div class="state '+getState(data[i].status_desc)+'">' + data[i].status_desc + '</div>' +
                            '                            </a>' +
                            '                            <div class="content">';
                        li+='                                <div class="con_tit"><a href="'+data[i].wap_url+'">'+data[i].title+'</a></div>';
                        li+='                                <div class="subhead_s"><a href="'+data[i].wap_url+'"><span>'+data[i].content+'</span><div class="img"><img src="'+data[i].img[0]+'" /><span class="num'+(data[i].img.length==1?' hide':'')+'">'+data[i].img.length+'</span></div></a></div>' +
                            '                            </div>';

                    }else {
                        li = '<li>' +
                            '                            <a href="'+data[i].wap_url+'" class="user">' +
                            '                                <div class="photo"><span><img src="' + data[i].profile_image_url.replace(/^[\s\S]+default_avatar_(female|male)_180.gif$/ig,'http://n.sinaimg.cn/auto/chezhan2017/nophoto_w.png') + '" /></span></div>' +
                            '                                <div class="name"><span>' + data[i].screen_name + '</span></div>' +
                            '                                <div class="date"><span>' + data[i].c_time + '</span></div>' +
                            '                                <div class="state '+getState(data[i].status_desc)+'">' + data[i].status_desc + '</div>' +
                            '                            </a>' +
                            '                            <div class="content">';
                        li+='                                <div class="con_tit"><a href="'+data[i].wap_url+'">'+data[i].title+'</a></div>';
                        li+='                                <div class="subhead"><a href="'+data[i].wap_url+'"><span>' + data[i].content + '</span></a></div>' +
                            '                            </div>';

                    }
                    if(data[i].reply!=undefined && data[i].reply!=''){
                        if (data[i].reply_pre!=undefined && data[i].reply_pre!='' &&  data[i].reply_txt!=undefined && data[i].reply_txt!='') {
                            li+='                            <a href="'+data[i].wap_url+'" class="reply">' +
                                '                                <span class="r_user">'+data[i].reply_pre+'\u56de\u590d\uff1a</span>' +
                                '                                <span class="r_content">'+data[i].reply_txt+'</span>' +
                                '                            </a>';
                        }else{
                            li+='                            <a href="'+data[i].wap_url+'"  class="reply">' +
                                '                                <span class="r_content">'+data[i].reply+'</span>' +
                                '                            </a>';
                        }
                    }
                    li+='                        </li>';
                    html+=li;
                }
                $("#c_list_box .swiper-slide").eq(2).find('.publiclist ul').append(html);
                /*
                if(/sinanews/ig.test(navigator.userAgent)) {
                    window._sinaCallEvent && window._sinaCallEvent.trigger('sina_bind_target');
                }
                */
                // setTimeout(function(){
                //     var ulheight=0;
                //     // $("#c_list_box .swiper-slide").eq(2).find('.publiclist ul li').each(function(){
                //     //     ulheight+=$(this).height();
                //     // });
                //     ulheight=$("#c_list_box .swiper-slide").eq(2).find('.publiclist ul').height();
                //     $("#c_list_box .publiclist").eq(2).find(".loading_box").remove();
                //     $("#c_list_box .swiper-wrapper").height(ulheight+64);
                // },500);
            }else{
                return;
            }
        },
        error:function(v,m){
            $("#c_list_box .swiper-slide").eq(2).find('#li_loading').remove();
        }
    });
}

function getComplainList(page,status,order_name,eq_i,feedback_object,question_type,big_brand_id,sub_brand_id,size){
    this.page=page,this.status=status,this.order_name=order_name;
    this.feedback_object=feedback_object==undefined||feedback_object==null||feedback_object==''?0:feedback_object;
    this.question_type=question_type==undefined||question_type==null||question_type==''?0:question_type;
    this.big_brand_id=big_brand_id==undefined||big_brand_id==null||big_brand_id==''?0:big_brand_id;
    this.sub_brand_id=sub_brand_id==undefined||sub_brand_id==null||sub_brand_id==''?0:sub_brand_id;
    this.size=size==undefined||size==null||size==''?10:size;

    $.ajax({
        url:httphead+'/api/czfeedback/list',
        data:{'step':status,'status':0,'feedback_object':feedback_object,'question_type':question_type,'big_brand_id':big_brand_id,'sub_brand_id':sub_brand_id,'page':page,'size':size,'order_name':order_name,'order_type':'desc'},
        type:'get',
        dataType:'jsonp',
        success:function(jsondata){
            $("#c_list_box .swiper-slide").eq(eq_i).find('#li_loading').remove();
            var data=jsondata.data.data;
            if(data.length>0){
                this.lloaddata=true;
            }else{
                this.lloaddata=false;
                if($("#c_list_box .swiper-slide").eq(eq_i).find('.publiclist ul .over').size()==0 && page==1){
                    $("#c_list_box .swiper-slide").eq(eq_i).find('.publiclist ul').append('<li class="over"><span>\u6ca1\u6709\u66f4\u591a\u4fe1\u606f</span></li>');//濠电偛澶囬崜婵嗭耿娓氣偓瀵挳寮堕幋顓熲柤婵烇絽娲犻崜婵囧閿燂拷
                }
                return this.lloaddata;
            }
            if(data){
                var html='';
                for(var i in data){
                    var li='';
                    if(data[i].img.length>0){
                        li='<li>' +
                            '                            <a href="'+data[i].wap_url+'" class="user">' +
                            '                                <div class="photo"><span><img src="' + data[i].profile_image_url.replace(/^[\s\S]+default_avatar_(female|male)_180.gif$/ig,'http://n.sinaimg.cn/auto/chezhan2017/nophoto_w.png') + '" /></span></div>' +
                            '                                <div class="name"><span>' + data[i].screen_name + '</span></div>' +
                            '                                <div class="date"><span>' + data[i].pub_date + '</span></div>' +
                            '                                <div class="state '+getState(data[i].status_desc)+'">' + data[i].status_desc + '</div>' +
                            '                            </a>' +
                            '                            <div class="content">';
                        li+='                                <div class="con_tit"><a href="'+data[i].wap_url+'">'+data[i].title+'</a></div>';
                        li+='                                <div class="subhead_s"><a href="'+data[i].wap_url+'"><span>'+data[i].content+'</span><div class="img"><img src="'+data[i].img[0]+'" /><span class="num'+(data[i].img.length==1?' hide':'')+'">'+data[i].img.length+'</span></div></a></div>' +
                            '                            </div>';

                    }else {
                        li = '<li>' +
                            '                            <div class="user">' +
                            '                                <div class="photo"><a><img src="' + data[i].profile_image_url.replace(/^[\s\S]+default_avatar_(female|male)_180.gif$/ig,'http://n.sinaimg.cn/auto/chezhan2017/nophoto_w.png') + '" /></a></div>' +
                            '                                <div class="name"><a>' + data[i].screen_name + '</a></div>' +
                            '                                <div class="date"><a>' + data[i].pub_date + '</a></div>' +
                            '                                <div class="state '+getState(data[i].status_desc)+'">' + data[i].status_desc + '</div>' +
                            '                            </div>' +
                            '                            <div class="content">';
                        li+='                                <div class="con_tit"><a href="'+data[i].wap_url+'">'+data[i].title+'</a></div>';
                        li+='                                <div class="subhead"><a href="'+data[i].wap_url+'"><span>' + data[i].content + '</span></a></div>' +
                            '                            </div>';

                    }
                    if(data[i].reply!=undefined && data[i].reply!=''){
                        if (data[i].reply_pre!=undefined && data[i].reply_pre!='' &&  data[i].reply_txt!=undefined && data[i].reply_txt!='') {
                            li+='                            <a href="'+data[i].wap_url+'" class="reply">' +
                                '                                <span class="r_user">'+data[i].reply_pre+'\u56de\u590d\uff1a</span>' +
                                '                                <span class="r_content">'+data[i].reply_txt+'</span>' +
                                '                            </a>';
                        }else{
                            li+='                            <a href="'+data[i].wap_url+'" class="reply">' +
                                '                                <span class="r_content">'+data[i].reply+'</span>' +
                                '                            </a>';
                        }
                    }
                    li+='                        </li>';
                    html+=li;
                }
                $("#c_list_box .swiper-slide").eq(eq_i).find('.publiclist ul').append(html);
                /*
                if(/sinanews/ig.test(navigator.userAgent)) {
                    window._sinaCallEvent && window._sinaCallEvent.trigger('sina_bind_target');
                }
                */
                setTimeout(function(){
                    var ulheight=0;
                    $("#c_list_box .swiper-slide").eq(eq_i).find('.publiclist ul li').each(function(){
                        ulheight+=$(this).height();
                    });
                    $("#c_list_box .publiclist").eq(eq_i).find(".loading_box").remove();
                    $("#c_list_box .swiper-wrapper").height(ulheight+64);
                },500);
                return this.lloaddata;
            }else{
                return this.lloaddata;
            }
        },
        error:function(v,m){
            $("#c_list_box .swiper-slide").eq(eq_i).find('#li_loading').remove();
        }
    });
}


//闂佸吋鍎抽崲鑼躲亹閸ヮ剚鍎戝ù锝呭槻閺佹粓鏌涢埡渚€顎楃紒鏃撴嫹
function getcity(id){
    if(id){
        citylist=city[id];
        city_html='<li data_v="0"><span class="l">\u8bf7\u9009\u62e9</span></li>';
        for(var i in citylist){
            city_html+='<li data_v="'+i+'"><span class="l">'+citylist[i]+'</span></li>';
        }
        $("#city_list ul").html(city_html).css("z-index","100");
    }else{

        var privce_html='<li data_v="0"><span class="l">\u9009\u62e9\u7701\u4efd</span></li>',city_html='<li data_v="0"><span class="l">\u8bf7\u9009\u62e9</span></li>';
        for(var i in province){
            privce_html+='<li data_v="'+i+'"><span class="l">'+province[i]+'</span></li>';
        }
        $("#province_list ul").html(privce_html).css("z-index","100");
    }
}

//闂佸吋鍎抽崲鑼躲亹閸ャ劍濮滈柨鏇楀亾闁诲海鍏樺畷顐ｆ媴閸濆嫷鏉�
function getBrandlist(){
    $.getJSON('//photo.auto.sina.com.cn/interface/v2/general/mul_opt_search.php?orderby=pv&seq=desc&page=1&limit=18&callback=?', function (data) {
        mul_opt_search_data=data;
        var datas = data.result.data;
        var tree = datas.tree;
        var contDom = '', treeDom = '';
        var nn = 0;
        for (var i in tree) {
            contDom+='<li class="group_t"><span>'+i+'</span></li>';
            var itm = tree[i];
            for( var j in itm){
                contDom+='<li data_v="'+itm[j].cid+'"><span class="brand_logo"><img src="' + itm[j].logo + '" /></span><span class="brand_name">'+itm[j].cname+'</span></li>';
            }
        }
        contDom='<li data_v="0" style="padding-left:1em;"><span class="brand_name">\u4e0d\u9650</span></li>'+contDom;
        $("#brand_list ul").html(contDom);

    });
}
//闂佸吋鍎抽崲鑼躲亹閸ャ劍濮滈柨鏃堢畺閸忥拷
function getSerieslist(bid,all){
    $.ajax({
        url:'//db.auto.sina.cn/api/car/getBrandDetail.json?brandid='+bid,
        type:'get',
        dataType:'jsonp',
        jsonp:'callback',
        success:function(jsond){
            var tmp_data=jsond.result.data.data_list,bname='',contDom='';
            if(all==undefined && all==null && all!=0){
                contDom+='<li data_v="0"><span class="series_name">\u5168\u90e8</span></li>';//闂佺ǹ绻堥崝鎴﹀磿鐎涙ɑ濮滈柨鏃堢畺閸忥拷
            }
            if(tmp_data){
                for(var i in tmp_data){
                    if(bid==tmp_data[i].bid){
                        bname=tmp_data[i].cname;
                    }
                    contDom+='<li class="sgroup"><span class="cname">'+tmp_data[i].cname+'</span></li>';
                    for(var j in tmp_data[i].data_list.data){
                        if(tmp_data[i].data_list.data[j].isSell=='1') {
                            contDom += '<li data_v="' + tmp_data[i].data_list.data[j].serialId + '"><span class="series_name">' + tmp_data[i].data_list.data[j].cname + '</span></li>';
                        }
                    }
                }
                $("#series_list ul").html(contDom);
            }
        },
        error:function(v,m){

        }
    });
}

//闂佸吋鍎抽崲鑼躲亹閸ャ劍濮滈柨鏇楀亾闁诲函鎷�
function getCarlist(sid){
    $("#car_list .swiper-container").height($(window).height()-$("#car_list .box_tit").height());
    var url='//db.auto.sina.cn/api/cms/car/getCarBySerialId.json?status=&callback=?&serialid='+sid;
    $.getJSON(url,function(jsond){
        if(jsond.data){
            var ul1='',ul2='';
            for(var i in jsond.data){
                if(jsond.data[i].status=='\u5728\u4ea7'){
                    //闂侀潻璐熼崝瀣殽閿燂拷
                    ul1+='                            <li data_v="'+jsond.data[i].id+'">' +
                        '                                <div class="img"><img src="'+jsond.data[i].photo+'" /></div>' +
                        '                                <div class="car_info">' +
                        '                                    <span class="car_name">'+jsond.data[i].name+'</span>' +
                        '                                    <span class="car_price">'+jsond.data[i].price+'</span>' +
                        '                                </div>' +
                        '                            </li>';
                }else{
                    //闂佺ǹ顑嗙划鍫燁殽閿燂拷
                    ul2+='                            <li data_v="'+jsond.data[i].id+'">' +
                        '                                <div class="img"><img src="'+jsond.data[i].photo+'" /></div>' +
                        '                                <div class="car_info">' +
                        '                                    <span class="car_name">'+jsond.data[i].name+'</span>' +
                        '                                    <span class="car_price">'+jsond.data[i].price+'</span>' +
                        '                                </div>' +
                        '                            </li>';
                }
            }
            $("#car_list .swiper-wrapper .swiper-slide").eq(0).find("ul").html(ul1);
            $("#car_list .swiper-wrapper .swiper-slide").eq(1).find("ul").html(ul2);
        }
    });
}


//闂佸憡鐟﹂崹鐢电博閻戣棄绠柡鍥风磿濡诧拷
var submittrue=true;
function submit_complain(){
    if(submittrue){
        submittrue=false;
        var title='',question_type=0,select_car,big_brand_id,sub_brand_id,car_id,dealer_name,question_date,question_kilometre,select_city,province,city,feedback_name,describe,platform=1,ID_type,ID_code,plate_number,plate_id_code,imgs=[],buy_time,pro=1;
        //var title,question_type,big_brand_id,sub_brand_id,car_id,dealer_name,question_date,question_kilometre,province,city,feedback_name,describe,platform=1,ID_type,ID_code,plate_number,plate_id_code,buy_time,imgs=[],pro=1;
        title=$("#title_txt").val();
        question_type=$("#question_type .val").attr("data_v");
        select_car=$("#select_car .val").attr("data_v");
        dealer_name=$("#dealer_name_txt").val();
        question_date=$("#question_date_v .val").attr("data_v");
        question_kilometre=$("#question_kilometre_v .val").attr("data_v");
        select_city=$("#select_city .val").attr("data_v");
        feedback_name=$("#feedback_name_txt").val();
        describe=$("#content_txt").val();
        buy_time=$("#buy_date .val").html();
        ID_type=$("#sel_IDtype").attr("data-v");
        ID_code=$("#feedback_IDnumber_txt").val();
        plate_number=$("#feedback_plate_number_txt").val();
        plate_id_code=$("#feedback_plate_code_txt").val();
        if($("#pro_btn").is(".no")){
            pro=0;
        }
        $(".uploadimg_box .img").each(function(){
            //imgs.push($(this).find("img").attr('src'));
            imgs.push($(this).find("img").attr('data-src'));
        });

        if(select_car==undefined || select_car==null || select_car=='' || select_car.split(",").length<2){
            $("#rem_msgbox").css({'display':'inline-block','opacity':1});
            $("#rem_msgbox .rem_str").html('\u8bf7\u9009\u62e9\u54c1\u724c\u8f66\u578b'); //闁荤姴娲ㄩ崗姗€鍩€椤掆偓椤︽壆鈧哎鍔戝畷顐ｆ媴閸濆嫷鏉洪柡澶屽剳缁犳垿鎮楅敓锟�
            setTimeout(function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
            },1000);
            submittrue=true;
            return;
        }
        if(question_type==undefined || question_type==null || question_type.replace(/\s/ig,'')==''){
            $("#rem_msgbox").css({'display':'inline-block','opacity':1});
            $("#rem_msgbox .rem_str").html('\u8bf7\u9009\u62e9\u95ee\u9898\u7c7b\u578b'); //闁荤姴娲ㄩ崗姗€鍩€椤掆偓椤︽壆鈧哎鍔戝濠氼敋閳ь剟銆傞悾宀€灏甸悹鍥皺閳ь剨鎷�
            submittrue=true;
            setTimeout(function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
            },1000);
            return;
        }
        if(title==undefined || title==null || title.replace(/\s/ig,'')==''){
            $("#rem_msgbox").css({'display':'inline-block','opacity':1});
            $("#rem_msgbox .rem_str").html('\u6807\u9898\u4e0d\u53ef\u4e3a\u7a7a'); //闂佸搫绉村ú顓€傞懞銉р枖鐎广儱鎳庣拋鎻掆槈閹捐顏犻柍鐧告嫹
            submittrue=true;
            setTimeout(function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
            },1000);
            return;
        }
        if(describe==undefined || describe==null || describe.replace(/\s/ig,'')==''){
            $("#rem_msgbox").css({'display':'inline-block','opacity':1});
            $("#rem_msgbox .rem_str").html('\u8bf7\u8be6\u7ec6\u63cf\u8ff0\u60a8\u8981\u6295\u8bc9\u7684\u95ee\u9898'); //闁荤姴娲ㄩ弻澶愵敋濞戞氨纾奸柛鈩兠导搴ㄥ级閳哄啫顣奸柛瀣Ф閹茬増鎷呴悷閭︽綋闁荤姴娲らˇ鍗炩枔閹达附鈷掓い鏇楀亾妞わ綇鎷�
            submittrue=true;
            setTimeout(function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
            },1000);
            return;
        }
        if(describe.length<20 || describe.length>1000){
            $("#rem_msgbox").css({'display':'inline-block','opacity':1});
            $("#rem_msgbox .rem_str").html('\u8be6\u60c5\u5185\u5bb9\u8981\u5728\u0032\u0030\u002d\u0031\u0030\u0030\u0030\u5b57\u4ee5\u5185'); //闁荤姴娴勯梽鍕磿韫囨稑绀冮柛娑卞弾閸熷洭鎮烽弴姘鳖槮婵犫偓閿燂拷20-1000闁诲孩绋掗妵鐐寸閹烘绀冮柨鐕傛嫹
            submittrue=true;
            setTimeout(function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
            },1000);
            return;
        }
        if(imgs.length<1){
            $("#rem_msgbox").css({'display':'inline-block','opacity':1});
            $("#rem_msgbox .rem_str").html('\u8bf7\u81f3\u5c11\u4e0a\u4f20\u4e00\u5f20\u56fe\u7247'); //闁荤姴娲ㄩ弻澶愬吹閿斿彞鐒婇柟瀛樼矌閻熸劕霉閼测晛小缂佹梹娼欓锝夋偐閸欏顩梺缁橆殣閹凤拷
            submittrue=true;
            setTimeout(function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
            },1000);
            return;
        }
        if(select_city==undefined || select_city==null || select_city=='' || select_city.split(",").length<2){
            $("#rem_msgbox").css({'display':'inline-block','opacity':1});
            $("#rem_msgbox .rem_str").html('\u8bf7\u9009\u62e9\u7701\u4efd\u57ce\u5e02'); //闁荤姴娲ㄩ崗姗€鍩€椤掆偓椤︽壆鈧哎鍔戦幆鍥ㄦ媴瀹勭増鏆呴梺绯曟櫅妤犲摜绮╅敓锟�
            setTimeout(function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
            },1000);
            submittrue=true;
            return;
        }
        if(buy_time==undefined || buy_time==null || buy_time=='' || /^\d{4}-\d{1,2}$/ig.test(buy_time)==false){
            $("#rem_msgbox").css({'display':'inline-block','opacity':1});
            $("#rem_msgbox .rem_str").html('\u8bf7\u9009\u62e9\u8d2d\u8f66\u65f6\u95f4'); //闁荤姴娲ㄩ崗姗€鍩€椤掆偓椤︽壆鈧哎鍔庨幏褰掝敇閳╁啰鐩冮梺鍝勫暙閻栫厧螞閿燂拷
            setTimeout(function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
            },1000);
            submittrue=true;
            return;
        }
        if(dealer_name==undefined || dealer_name==null || dealer_name.replace(/\s/ig,'')==''){
            $("#rem_msgbox").css({'display':'inline-block','opacity':1});
            $("#rem_msgbox .rem_str").html('\u8bf7\u8f93\u5165\u7ecf\u9500\u5546\u540d\u79f0'); //闁荤姴娲ㄩ弻澶屾椤撱垹绀傞柕澹懐姊鹃梻浣哥氨閸嬫捇鏌涢悢閿嬵棞闁诡喗娲滅划鏃堟晸閿燂拷
            setTimeout(function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
            },1000);
            submittrue=true;
            return;
        }
        if(feedback_name==undefined || feedback_name==null || feedback_name.replace(/\s/ig,'')==''){
            $("#rem_msgbox").css({'display':'inline-block','opacity':1});
            $("#rem_msgbox .rem_str").html('\u8bf7\u8f93\u5165\u60a8\u7684\u59d3\u540d'); //闁荤姴娲ㄩ弻澶屾椤撱垹绀傞柕澶涚畱娴滃爼鏌ｉ妸銉ヮ仼妞ゎ偅锕㈠畷銉╂晸閿燂拷
            setTimeout(function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
            },1000);
            submittrue=true;
            return;
        }
        if(ID_code.replace(/\s/ig,'')==''){
            $("#rem_msgbox").css({'display':'inline-block','opacity':1});
            $("#rem_msgbox .rem_str").html('\u8bf7\u586b\u5199\u8bc1\u4ef6\u53f7\u7801'); //闁荤姴娲ら崲鏌ユ晲閻愬搫绀冩繛鍡樺笧濡插牆霉閻樼儤纭剧憸鏉挎健閹秹鏁撻敓锟�
            setTimeout(function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
            },1000);
            submittrue=true;
            return;
        }
        if(plate_number.replace(/\s/ig,'')==''){
            $("#rem_msgbox").css({'display':'inline-block','opacity':1});
            $("#rem_msgbox .rem_str").html('\u8bf7\u586b\u5199\u8f66\u724c\u53f7\u7801'); //闁荤姴娲ら崲鏌ユ晲閻愬搫绀冩繛鍡樺笚缁ㄧ娀鏌ｅΔ鈧懟顖濄亹閸ф鍎橀柨鐕傛嫹
            setTimeout(function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
            },1000);
            submittrue=true;
            return;
        }
        if(plate_id_code.replace(/\s/ig,'')==''){
            $("#rem_msgbox").css({'display':'inline-block','opacity':1});
            $("#rem_msgbox .rem_str").html('\u8bf7\u586b\u5199\u8f66\u8f86\u8bc6\u522b\u7801'); //闁荤姴娲ら崲鏌ユ晲閻愬搫绀冩繛鍡樺笚缁ㄧ娀寮堕崼婵囶棥闁伙附鍨垮畷姘额敃閵堝洤鐏�
            setTimeout(function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
            },1000);
            submittrue=true;
            return;
        }
        if(pro==0){
            $("#rem_msgbox").css({'display':'inline-block','opacity':1});
            $("#rem_msgbox .rem_str").html('\u8bf7\u9605\u8bfb\u5e76\u540c\u610f\u65b0\u6d6a\u6c7d\u8f66\u6295\u8bc9\u5e73\u53f0\u89c4\u5219'); //闁荤姴娲ㄩ崗妯何ｉ崟顓熷珰閻犲洩灏€氭瑩鏌涘顒佹拱闁告挷鍗冲顒勬偋閸喓鍩嶅┑顔炬嚀閳ь剛鍠愮花鐘绘煙閼稿灚绀夐柣锔芥閻涱噣宕橀幓鎺楀彙闁荤喐鐟ョ€氼剟宕归敓锟�
            setTimeout(function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
            },1000);
            submittrue=true;
            return;
        }

        big_brand_id=select_car.split(',')[0];
        sub_brand_id=select_car.split(',')[1];
        car_id=select_car.split(',')[2];
        province=select_city.split(',')[0];
        city=select_city.split(',')[1];


        $.ajax({
            // url:'https://feedback.auto.sina.cn/api/pubMyFeedback',
            url: httphead+'/api/pubMyFeedback',
            type:'post',
            dataType:'json',
            data:{'title':title,'question_type':question_type,'big_brand_id':big_brand_id,'sub_brand_id':sub_brand_id,'car_id':car_id,'dealer_name':dealer_name,'question_date':question_date,'question_kilometre':question_kilometre,
                'province':province,'city':city,'feedback_name':feedback_name,'describe':describe,'platform':platform,'ID_type':ID_type,'ID_code':ID_code,'plate_number':plate_number,'plate_id_code':plate_id_code,'buy_time':buy_time,'imgs':imgs},
            success:function(json_data){
                if(json_data.status==1000){
                    $("#rem_msgbox").css({'display':'inline-block','opacity':1});
                    $("#rem_msgbox .rem_str").html('\u60a8\u7684\u6295\u8bc9\u53d1\u5e03\u6210\u529f');
                    $("#rem_msgbox .rem_str i").addClass("s");
                    $("#rem_msgbox").removeClass("hide");
                    $("#loadimg_msgbox").addClass("hide").removeAttr("data_v");
                    setTimeout(function(){
                        $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                        setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
                        window.location=httphead+'/fb/my/';
                    },500);
                }else{
                    $("#rem_msgbox").css({'display':'inline-block','opacity':1});
                    $("#rem_msgbox .rem_str").html(json_data.msg);//闂佸憡鐟﹂崹鐢电博闁垮绶為弶鍫亯琚�
                    $("#rem_msgbox .rem_str i").removeClass("s");
                    $("#rem_msgbox").removeClass("hide");
                    $("#loadimg_msgbox").addClass("hide").removeAttr("data_v");
                    setTimeout(function(){
                        $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                        setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
                    },1000);
                }
                submittrue=true;
            },
            error:function(){
                $("#rem_msgbox").css({'display':'inline-block','opacity':1});
                $("#rem_msgbox .rem_str").html('\u53d1\u5e03\u6295\u8bc9\u5931\u8d25');
                $("#rem_msgbox .rem_str i").removeClass("s");
                $("#rem_msgbox").removeClass("hide");
                $("#loadimg_msgbox").addClass("hide").removeAttr("data_v");
                setTimeout(function(){
                    $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                    setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
                },1000);
                submittrue=true;
            }
        });
    }
}

//婵炴垶鎸搁敃锝囨閸洖鐐婇柛鎾楀喚鏆�
var opt_lump=0;
function ajaxFileUpload(){
    var file = document.getElementById("file_name").files;
    //formData.append('file_name[]', file);
    if(file.length>3){
        $("#rem_msgbox").css({'display':'inline-block','opacity':1});
        $("#rem_msgbox .rem_str").html('\u4e00\u6b21\u6700\u591a\u4e0a\u4f20\u0033\u5f20\u56fe'); //婵炴垶鎸撮崑鎾寸箾閸″繐澧叉繛鎾瑰煐瀵板嫬顫濋銈囨啰婵炲銆嬮幏锟�3閻庢鍠氭慨鏉懨归敓锟�
        submittrue=true;
        setTimeout(function(){
            $("#rem_msgbox").css({'display':'inline-block','opacity':0});
            setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
        },1000);
        return;
    }else{
        for(var i=0;i<file.length;i++){
            if(file[i].size/1024>1024*10){
                $("#rem_msgbox").css({'display':'inline-block','opacity':1});
                $("#rem_msgbox .rem_str").html('\u4e0a\u4f20\u56fe\u7247\u5355\u5f20\u5bb9\u91cf\u5c0f\u4e8e\u0031\u0030\u004d'); //婵炴垶鎸搁敃锝囨閸洖鐐婇柛鎾楀喚鏆梺鍛婎殕濞叉牜妲愰崜浣插亾閻熸壆绉洪柛锝堟娴滄瓕绠涙惔锝堝10M
                submittrue=true;
                setTimeout(function(){
                    $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                    setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
                },1000);
                return;
            }
        }
    }

    if($("#loading_msg").size()>0){
        $("#loading_msg").remove();
    }

    $(".msgbox").show();
    $("#grade_msgbox").after('<div class="mbox" id="loading_msg"><div class="rem_str" style="margin:2.5em 0; font-size:0.875em; color:#868686;">\u6b63\u5728\u4e0a\u4f20\uff0c\u8bf7\u8010\u5fc3\u7b49\u5f85</div></div>');

    var uploadmb='<div class="msg_box" id="uploadimg_mb">' +
        '        <div class="up_progress">0%</div>' +
        '        <div class="msg_str">\u6b63\u5728\u4e0a\u4f20\u4e2d\uff0c\u8bf7\u8010\u5fc3\u7b49\u5f85\uff01</div>' +
        '        <div class="msg_tit"><span><em>0</em>/0</span></div>' +
        '        <div class="msg_btn">' +
        '            <span class="cancel_btn">\u53d6\u6d88</span>' +
        '        </div>' +
        '    </div>';
    $("#uploadimg_mb").remove();
    $(".mask_msg_box").append(uploadmb);
    $("#uploadimg_mb .msg_tit span").html('<em>0</em>/'+file.length);
    $("#uploadimg_mb").show();
    $(".mask_msg_box").show();

    $("#uploadimg_mb .cancel_btn").bind("click",function(){
        $("#uploadimg_mb").remove();
        $(".mask_msg_box").hide();
        requpload.abort();
    });

    /*
        婵炴垶鎸搁ˇ顕€鏌屽鍫濈煑闁稿本绋掑▓锟�
        file闂佹寧绋掗惌顔剧博鐎涙鈻旀い蹇撴噺绗戦梺鍝勫€稿ú锝呪枎閿燂拷(缂備緡鍋夐褔鎮楅悜钘夊強妞ゆ牗纰嶇粋鍫ユ煟濡も偓濞诧箓鎮х粙娆惧殨闁跨噦鎷�)闂佹寧鍐婚幏锟�
        w闂佹寧绋掗惌顔剧博鐎涙鈻旀い蹇撴噺绗戦梺鍝勫€稿ú锝呪枎閵忋倕鍌ㄩ悗锝庡墰缁辨岸鏌ｉ妸銉ヮ仼闁诡喗顨堥埀顒傤攰濡嫮鈧濞婇弫宥囦沪缁涘鏅柟鑹版彧缁犳帞绮旈搹閫涚剨闊洢鍎崇粈澶愭倵濞戞瑯娈欏┑鈽嗗幘閹肩偓绻濋崒婊勭槗
        objDiv闂佹寧绋掗惌顔剧博鐎涙鈻旀い蹇撴噺绗戦柣搴℃贡閹虫挸鈻嶉幒妤€绠ｉ柡宥庡厴閸嬫捇宕ㄩ鐔侯槬闁荤姴顑呴崯顐﹀吹闁秴鏋侀柨鐕傛嫹
        photoCompress()
         */
    function photoCompress(file,w,objDiv){
        var ready=new FileReader();
        /*閻庢鍠掗崑鎾斥攽椤旂⒈鍎撴い鏇氬嵆瀹曪綁寮介妸銉ф▌闁诲氦顫夊銊モ枔閹卞獥ob闁诲海鏁搁、濠囨寘閸曨垰绠ｉ柡鍫濇偅le闁诲海鏁搁、濠囨寘閸曨剛鈻旀い鎾跺У閻ｉ亶鏌涢幇顒佸櫣妞ゆ棑鎷�. 閻熸粎澧楅幑渚€顢氭导鏉戠煑闁哄秲鍔嶉幆娆徝归敐鍡欑煀闁伙綆鍓熼獮瀣箛椤撶噥妲�,readyState闁诲繒鍋熼崑鐐哄焵椤戭剙鎳忛悾閬嶆煕婵犲洦锛熺紒鍙樺嵆楠炲骞囬鍥╊槹DONE,婵犵鈧啿鈧綊鎮樻径灞惧闁告挆鍛€繛瀛樼矊閺€绌榣oadend婵炲瓨绮岄鍕枎閵忊€崇窞闁告洦鍘介崐鐐电磼鐎ｎ亶鍎忕紒顭掓嫹,闂佸憡甯楅悷銊╂儍閻斿吋鍋ㄩ柕濞垮€楅锟�.闂佸憡鑹鹃張顒€顪冮敓锟�,result闁诲繒鍋熼崑鐐哄焵椤戭剙鍊介崢顒勬倶韫囨挻顥滈悗鍨耿瀹曘儵顢曢敍鍕典紘婵炴垶鎸剧亸淇泃a: URL闂佸搫绉堕崢褏妲愰敓鐘冲剭闁告洦鍋嗛幗鐔虹磼濡ゅ绱伴悷鏇炴缁傛帡濡烽妸锝傚亾閸愵亞鐭嗛柣鎴灻。鏌ユ偣閸ヮ亶鍤欑憸鏉挎喘瀵剟宕堕敂绛嬪仺闂佹眹鍔岀€氼剟宕€电硶鍋撻惂鍛婂.*/
        ready.readAsDataURL(file);
        ready.onload=function(){
            var re=this.result;
            w.filename=file.name;
            canvasDataURL(re,w,objDiv)
        }
    }
    function canvasDataURL(path, obj, callback){
        var img = new Image();
        img.src = path;
        img.onload = function(){
            var that = this;
            // 婵帗绋掓灙妞ゆ挸顭烽獮鎰緞鐎ｎ剚啸婵炴挻鑹鹃鍛暜閸モ晝纾介柨鐕傛嫹
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
            var quality = 0.7;  // 婵帗绋掓灙妞ゆ挸顭峰畷鍫曞礈瑜嶉。濠氭偣閹扳晛濮傞柛锝囧劋缁嬪鏁撻敓锟�0.7
            //闂佹眹鍨婚崰鎰板垂濮濇細nvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // 闂佸憡甯楃粙鎴犵磽閹炬湹娌柣鎰ˉ閸嬫捁顦跺┑鈽嗗弮閹瑩鏁撻敓锟�
            var anw = document.createAttribute("width");
            anw.nodeValue = w;
            var anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(that, 0, 0, w, h);
            // 闂佹悶鍎查崕鎶藉磿濮樿鲸瀚婚柕濞炬櫅濞咃拷
            if(obj.quality && obj.quality <= 1 && obj.quality > 0){
                quality = obj.quality;
            }
            // quality闂佺ǹ锕ㄦ竟鍫㈢矓閾忛€涚剨闊洢鍎崇粈澶愭煙绾版ê浜剧紓鍌欑劍閿氶柛鈺傤殜瀹曟瑩鎼圭憴鍕殸闂佹悶鍎查崕鎶藉磿濮樿鲸鎯ュ┑鐘插弨娴ｅ搫瀵查柨鐕傛嫹
            var base64 = canvas.toDataURL('image/jpeg', quality);
            // 闂佹悶鍎抽崑鐘绘儍閻旂厧绀勯柤鎭掑劜濞堝爼寮堕埡鍌涚叆婵炲弶婧嘺se64闂佹眹鍔岀€氼剟鍩€椤掑﹥瀚�
            callback(base64,obj.filename);
        }
    }
    /**
     * 闁诲繐绻愬Λ鏃€绂嶉幎瀹巗e64闂佹眹鍔岀€氼剙霉濮椻偓閹囧闯閹兼唨闂佽桨鑳舵晶妤€鐣垫担瑙勫妞ゆ帊绀佹惔濠傗槈閹惧墎妲榣ob
     * @param urlData
     *            闂佺儵鎳囬弳鐖巐闂佸搫鍊婚幊鎾舵閿涘嫭鍋橀柕濞т椒绮甸梺姹囧妼閸ㄧse64闂佹悶鍎辨晶鑺ユ櫠閺嶎厼鏋侀柣妤€鐗嗙粊锟�
     */
    function convertBase64UrlToBlob(urlData){
        var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }


    for(var i=0;i<file.length;i++){
        if (!/\/(?:jpeg|png|gif)/i.test(file[i].type)) return;
        var f_file=file[i];
        //console.log('闂佸憡顭囬崰搴∶瑰Ο璇茬窞鐟滃秹鎯冮鍕櫖闁跨噦鎷�'+f_file.size);
        photoCompress(f_file, {
            quality: 0.2
        }, function(base64Codes,filename){
            var bl = convertBase64UrlToBlob(base64Codes);
            var formData = new FormData();
            //console.log('闂佸憡锚椤戝洨绱撴径鎰偍闁绘棃鏀辩粋鍫濐熆閸棗鍟板В鍫ユ煥濞戣櫕瀚�'+bl.size);
            formData.append('file_name', bl, filename);
            //formData.append('filename', f_file.name, f_file.name);
            requpload = $.ajax({
                url: httphead+"/api/upload?file_id=file_name",
                type: "post",
                data: formData,
                dataType:'json',
                contentType: false,
                processData: false,
                mimeType: "multipart/form-data",
                xhr: function() { //闂佸吋鍎抽崲鑼躲亹閸㈢皜axSettings婵炴垶鎼╅崢鎯р枔閹插尝r闁诲海鏁搁、濠囨寘閸曨垱鏅悘鐐跺缁€瀣倵閻熸澘鏆熸繛鍫熷敼pload闁诲繒鍋熼崑鐐哄焵椤戭剙鎳愰幏銊╂倵鐟欏嫷鍔抮ogress婵炲瓨绮岄鍕枎閵忋倖鍎嶉柛鏇ㄥ亽濡查亶鏌ｉ悙鍙夘棞闁搞倝浜跺顐︽晸閿燂拷
                    myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) { //濠碘槅鍋€閸嬫捇鏌″畝濠冾仮pload闁诲繒鍋熼崑鐐哄焵椤戭剙瀚瑧闂佸憡鐔粻鎴︽偤閵娾晛鎹堕柨鐕傛嫹
                        //缂傚倷鐒﹂崹鐢告偩缁跺獰ogress婵炲瓨绮岄鍕枎閵忋倖鍎嶉柛鏇ㄥ亝缁€鈧柣鐘差儏閸燁偊宕甸柆宥呮瀬闁跨噦鎷�
                        var c=parseInt($("#uploadimg_mb .msg_tit span em").html())+1;
                        $("#uploadimg_mb .up_progress").html('0%');
                        $("#uploadimg_mb .msg_tit span").html('<em>'+c+'</em>/'+file.length);
                        myXhr.upload.addEventListener('progress', progressHandlingFunction, false);
                    }
                    return myXhr; //xhr闁诲海鏁搁、濠囨寘閸曨剚浜ら柡鍌涘缁€鈧紓鍌欑劍閻涙瓐uery婵炶揪缍€濞夋洟寮敓锟�
                },
                success: function (data) {
                    if(data.status==1000){
                        $(".msgbox").hide();
                        $("#loading_msg").remove();
                        $("#loadimg_msgbox").addClass("hide").removeAttr("data_v");
                        /*var addstr_html='';
                        for(var ii in data.data) {
                            opt_lump++;
                            addstr_html+='<div class="img">' +
                                '                    <img src="' + data.data[ii].img + '" />' +
                                '                    <span class="close"></span>' +
                                '                </div>';
                        }
                        $(".uploadimg").before(addstr_html);*/
                        var addstr_html='';
                        addstr_html+='<div class="img">' +
                            '                    <img src="' + base64Codes + '" data-src="'+data.data[0].img+'" />' +
                            '                    <span class="close"></span>' +
                            '                </div>';
                        $(".uploadimg").before(addstr_html);
                        $(".uploadimg_box .img .close").bind("click",function(){
                            $(this).parent().remove();
                            var n1=$(".uploadimg_box .img").size();
                            $(".uploadimg .lab em").html(n1+'/20');
                        });
                        var n1,n2;
                        n1=parseInt($(".uploadimg .lab em").html().split('/')[0]);
                        n2=parseInt($(".uploadimg .lab em").html().split('/')[1]);
                        $(".uploadimg .lab em").html((n1+data.data.length)+'/'+n2);
                    }else{
                        $("#rem_msgbox").css({'display':'inline-block','opacity':1});
                        $("#rem_msgbox .rem_str").html(data.msg);
                        setTimeout(function(){
                            $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                            setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
                        },1000);
                        // $("#loadimg_msgbox").addClass("hide").removeAttr("data_v");
                        // $(".msgbox").show();
                        // $("#loading_msg").remove();
                    }

                    setTimeout(function(){
                        $("#uploadimg_mb").remove();
                        $(".mask_msg_box").hide();
                    },1000);
                },
                error: function (data) {
                    $("#rem_msgbox").css({'display':'inline-block','opacity':1});
                    $("#rem_msgbox .rem_str").html('\u4e0a\u4f20\u5931\u8d25');
                    setTimeout(function(){
                        $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                        setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
                        $("#uploadimg_mb").remove();
                        $(".mask_msg_box").hide();
                    },1000);
                    // $("#loadimg_msgbox").addClass("hide").removeAttr("data_v");
                    // $(".msgbox").show();
                    // $("#loading_msg").remove();
                }
            });
        });

        /*
        var formData = new FormData();
        formData.append('file_name', f_file);
        requpload = $.ajax({
            url: httphead+"/api/upload?file_id=file_name",
            type: "post",
            data: formData,
            dataType:'json',
            contentType: false,
            processData: false,
            mimeType: "multipart/form-data",
            xhr: function() { //闂佸吋鍎抽崲鑼躲亹閸㈢皜axSettings婵炴垶鎼╅崢鎯р枔閹插尝r闁诲海鏁搁、濠囨寘閸曨垱鏅悘鐐跺缁€瀣倵閻熸澘鏆熸繛鍫熷敼pload闁诲繒鍋熼崑鐐哄焵椤戭剙鎳愰幏銊╂倵鐟欏嫷鍔抮ogress婵炲瓨绮岄鍕枎閵忋倖鍎嶉柛鏇ㄥ亽濡查亶鏌ｉ悙鍙夘棞闁搞倝浜跺顐︽晸閿燂拷
                myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { //濠碘槅鍋€閸嬫捇鏌″畝濠冾仮pload闁诲繒鍋熼崑鐐哄焵椤戭剙瀚瑧闂佸憡鐔粻鎴︽偤閵娾晛鎹堕柨鐕傛嫹
                    //缂傚倷鐒﹂崹鐢告偩缁跺獰ogress婵炲瓨绮岄鍕枎閵忋倖鍎嶉柛鏇ㄥ亝缁€鈧柣鐘差儏閸燁偊宕甸柆宥呮瀬闁跨噦鎷�
                    var c=parseInt($("#uploadimg_mb .msg_tit span em").html())+1;
                    $("#uploadimg_mb .up_progress").html('0%');
                    $("#uploadimg_mb .msg_tit span").html('<em>'+c+'</em>/'+file.length);
                    myXhr.upload.addEventListener('progress', progressHandlingFunction, false);
                }
                return myXhr; //xhr闁诲海鏁搁、濠囨寘閸曨剚浜ら柡鍌涘缁€鈧紓鍌欑劍閻涙瓐uery婵炶揪缍€濞夋洟寮敓锟�
            },
            success: function (data) {
                if(data.status==1000){
                    $(".msgbox").hide();
                    $("#loading_msg").remove();
                    $("#loadimg_msgbox").addClass("hide").removeAttr("data_v");
                    var addstr_html='';
                    for(var ii in data.data) {
                        opt_lump++;
                        addstr_html+='<div class="img">' +
                            '                    <img src="' + data.data[ii].img + '" />' +
                            '                    <span class="close"></span>' +
                            '                </div>';
                    }
                    $(".uploadimg").before(addstr_html);
                    $(".uploadimg_box .img .close").bind("click",function(){
                        $(this).parent().remove();
                        var n1=$(".uploadimg_box .img").size();
                        $(".uploadimg .lab em").html(n1+'/20');
                    });
                    var n1,n2;
                    n1=parseInt($(".uploadimg .lab em").html().split('/')[0]);
                    n2=parseInt($(".uploadimg .lab em").html().split('/')[1]);
                    $(".uploadimg .lab em").html((n1+data.data.length)+'/'+n2);
                }else{
                    $("#rem_msgbox").css({'display':'inline-block','opacity':1});
                    $("#rem_msgbox .rem_str").html(data.msg);
                    setTimeout(function(){
                        $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                        setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
                    },1000);
                    // $("#loadimg_msgbox").addClass("hide").removeAttr("data_v");
                    // $(".msgbox").show();
                    // $("#loading_msg").remove();
                }

                setTimeout(function(){
                    $("#uploadimg_mb").remove();
                    $(".mask_msg_box").hide();
                },1000);
            },
            error: function (data) {
                $("#rem_msgbox").css({'display':'inline-block','opacity':1});
                $("#rem_msgbox .rem_str").html('\u4e0a\u4f20\u5931\u8d25');
                setTimeout(function(){
                    $("#rem_msgbox").css({'display':'inline-block','opacity':0});
                    setTimeout(function(){$("#rem_msgbox").css({'display':'none'});},300);
                    $("#uploadimg_mb").remove();
                    $(".mask_msg_box").hide();
                },1000);
                // $("#loadimg_msgbox").addClass("hide").removeAttr("data_v");
                // $(".msgbox").show();
                // $("#loading_msg").remove();
            }
        });
        */
    }

    function progressHandlingFunction(e){
        var curr=e.loaded;
        var total=e.total;
        process=Math.ceil(curr/total*100);
        $("#uploadimg_mb .up_progress").html(process+'%');
    }
}
//闂佸憡锚椤戝洨绱撴径鎰倞闁告挆鍐炬毈
/**
 * 闁荤姳绶ょ槐鏇㈡偩婵犳艾鐐婇柛鎾楀喚鏆梺姹囧妼鐎氼剟寮伴崒婧惧亾閻㈠憡浜ょ紒杈ㄧ箞瀵晫鎲撮崟顐ゃ偊闁诲繐绻愰幖顐︻敋椤撱垹鍌ㄩ悗锝庡墰缁憋拷
 * 1. iphone闂佸綊娼ч鍡椻攦閳х惐tml5婵炴垶鎸搁敃锝囨閸洖鐐婇柛鎾楀喚鏆梺鍝勫€婚幊鎾诲箖濠婂牊鈷掓い鏇楀亾妞わ絼绮欓弫宥囦沪鐟欙絽浜鹃柣鏂垮槻琚爀xif.js
 * 2. 闁诲海鎳撻ˇ顖氱暦濞ｇ枌濠电偞娼欑换妤咃綖瀹ュ闂柕濞垮€楅悷婵嬫煛閳ь剟顢涘☉妯兼Х new Blob()闂佹寧绋戞總鏃€绻涢崶顒佸仺閽樼湋obBuilder
 * @param  {Object} _img         闂佹悶鍎辨晶鑺ユ櫠閿燂拷
 * @param  {Number} _orientation 闂佺粯鎸嗛崨顓ф毈婵烇絽娲犻崜婵囧閿燂拷
 * @return {String}              闂佸憡锚椤戝洨绱撴径鎰Е鐎圭ǹ鍨穝e64闂佸搫绉堕崢褏妲愰敓鐘冲剭闁告洦鍋呯粋鍫ユ煟濡ゅ瀚�
 */
/*
function compress(_img, _orientation) {
    //2.闁荤姳绶ょ槐鏇㈡偩閼姐倗绠旈柨鏇楀亾闁诡喖閰ｉ幆鍕敊閻ｅ苯鐏遍柣蹇撶箰閹碱偊顢氶鐘亾闁稓鐭欓柣婵愬櫍瀹曟劗娑垫搴ｎ槷闂佸吋鐪归崕鎵箔閸屾稑顕遍柣妯哄级缁傚牓鏌ｅΔ鈧ú銊モ枔閹寸姭鍋撻柅娑氱煓闁绘繍鍣ｉ弻鍫ユ寠婢跺牅娴锋繛瀛樼矊濞村嘲煤娴兼潙鍐€闁搞儜鍕洯闂佹寧绋戦懟顖烆敋椤曗偓閹嫰顢欓悾灞界伇闂佹悶鍎辨晶浠嬫偤閹存粳鎺楀棘閸喚顏荤紓鍌氬€甸弲顏嗘鏉堛劋绻嗛柛灞剧〒娴滎垶鏌￠崼婵愭Х缂佹柨鐡ㄥ蹇涙偡閹殿喗鐦撴繛瀛樼矊閸戠晫妲愬┑鍫氬亾閻㈢硶鍋撳☉姘辨啰婵炵鍋愭慨鏉懨瑰鈧幃褔宕堕埡鍐╂儯濠殿噯绲惧褰掑棘娴ｇ懓绶炵憸瀣焵椤掑﹥瀚�
    var _goalWidth = 750,                  //闂佺儵鏅╅崰妤呮偉閿濆洠鍋撶涵鍛棄閻庣櫢鎷�
        _goalHeight = 750,                 //闂佺儵鏅╅崰妤呮偉閿濆棭娈楁俊顖氭惈椤旓拷
        _imgWidth = _img.naturalWidth,     //闂佹悶鍎辨晶鑺ユ櫠閺嶎偀鍋撶涵鍛棄閻庣櫢鎷�
        _imgHeight = _img.naturalHeight,   //闂佹悶鍎辨晶鑺ユ櫠閺嶎煈娈楁俊顖氭惈椤旓拷
        _tempWidth = _imgWidth,            //闂佽　鍋撻柟顖嗕椒娴烽梺鐟扮摠閻楁粎绱撴径灞肩剨闊洦鎸婚崐鐢告煟閵娿儱顏у璺虹Ч瀵喚鎹勬笟顖氭櫖闁硅壈鎻幏锟�
        _tempHeight = _imgHeight,          //闂佽　鍋撻柟顖嗕椒娴烽梺鐟扮摠閻楁粎绱撴径灞肩剨闊洦鎸婚崐鐢告煟閵娿儱顏у璺虹Ч瀵喚鎹勬笟顖氭櫖闁硅壈鎻幏锟�
        _r = 0;                            //闂佸憡锚椤戝洨绱撴径濞︽帡鏁撻敓锟�
    if(_imgWidth === _goalWidth && _imgHeight === _goalHeight) {
    } else if(_imgWidth > _goalWidth && _imgHeight > _goalHeight) {//闁诲酣鈧稓鐭欓柣婵愬櫍閺屽牓鎸婃径鍫滄捣婵炲瓨绮屽ù宄懊烘导鏉戝唨闁搞儜鍕洯闂佹寧绋戦惌鍌氥€掗崜浣洪┏濠㈣泛顑囧Σ鐑芥煕濡警鍎戠紓鍌︽嫹
        _r = _imgWidth / _goalWidth;
        if(_imgHeight / _goalHeight < _r) {
            _r = _imgHeight / _goalHeight;
        }
        _tempWidth = Math.ceil(_imgWidth / _r);
        _tempHeight = Math.ceil(_imgHeight / _r);
    } else {
        if(_imgWidth < _goalWidth && _imgHeight < _goalHeight) {//闁诲酣鈧稓鐭欓柣婵愬櫍閺屽牓鎸婃径灞剧槗婵炲瓨绮ｉ幏锟�
            _r = _goalWidth / _imgWidth;
            if(_goalHeight / _imgHeight < _r) {
                _r = _goalHeight / _imgHeight;
            }
        } else {
            if(_imgWidth < _goalWidth) {         //闁诲海顢婂Λ鍕儍椤掍胶顩查柨鐕傛嫹
                _r = _goalWidth / _imgWidth;
            } else{                              //婵°倕鍊归敋闁活煈鍓氱粋宥夋晸閿燂拷
                _r = _goalHeight / _imgHeight;
            }
        }
        _tempWidth = Math.ceil(_imgWidth * _r);
        _tempHeight = Math.ceil(_imgHeight * _r);
    }
    //3.闂佸憡宸婚弲婵嬪极椤﹀¨nvas闁诲海鏁搁幊鎾趁瑰鈧幃褔宕堕鍡欘啋闁荤偞绋戦惌渚€藟閸℃稑绀堟い蹇撴捣缁€澶岀磼濞戞﹩妲归柣锔诲櫍瀵劑骞嗚娴滐綁鏌熺€涙澧辩紓鍌氼槺娴滄瓕绠涢幘鏉戔偓鐢稿级閳哄倻顬兼い銏″灩娴狅箓宕ㄩ鍐ㄥ箑闁荤喍妞掔粈浣圭珶閳э拷
    var _canvas = e._$get('canvas-clip');
    if(!_canvas.getContext) return;
    var _context = _canvas.getContext('2d');
    _canvas.width = _tempWidth;
    _canvas.height = _tempHeight;
    var _degree;
    //ios bug闂佹寧绋戦绺玥one闂佸綊娼ч鍡椻攦閳ь剙鈽夐幘绛瑰伐鐟滅増鐓￠幊妤呭箣閹烘梻鐛ラ梻渚囧墮濞层倝宕哄畝鍕倞闁告挆鍐炬毈闂佸搫鍊婚幊鎾诲箖濠婂牊鐓ユ繛鍡樺俯閸ゆ牠姊婚崒銈呮珝妞わ綇鎷�
    switch(_orientation){
        //iphone濠碘槅鍨兼禍婊堟儓閸℃稑绠€广儱妫欓崯鏃堟煥濞戞ɑ婀版い鎺撶箞瀵喚绮旈崳濡媏闂備焦顑欓崰鏍э耿椤忓嫷鍟呴柨鏃€瀵у▍锟�
        case 3:
            _degree=180;
            _tempWidth=-_imgWidth;
            _tempHeight=-_imgHeight;
            break;
        //iphone缂備焦姊归悧鏇㈡儓閸℃稑绠€广儱妫欓崯鏃堟煥濞戞ɑ婀版い鎺撶箞瀵喚绮旈崳濡媏闂備焦顑欓崰鏍э耿椤忓懐鈻旈悗锝庡亝閻擄拷(濠殿喗绻愮徊浠嬫偉閸洖绠柟绋块椤や線鏌￠崼锝嗩仩婵炲牊鍨垮顒勬偡閻楀牆鈧拷)
        case 6:
            _canvas.width=_imgHeight;
            _canvas.height=_imgWidth;
            _degree=90;
            _tempWidth=_imgWidth;
            _tempHeight=-_imgHeight;
            break;
        //iphone缂備焦姊归悧鏇㈡儓閸℃稑绠€广儱妫欓崯鏃堟煥濞戞ɑ婀版い鎺撶箞瀵喚绮旈崳濡媏闂備焦顑欓崰鏍э耿椤忓懐鈻斿┑鐘插暞閻擄拷
        case 8:
            _canvas.width=_imgHeight;
            _canvas.height=_imgWidth;
            _degree=270;
            _tempWidth=-_imgWidth;
            _tempHeight=_imgHeight;
            break;
    }
    if(window.navigator.userAgent.indexOf('iphone') > 0 && !!_degree) {
        _context.rotate(_degree*Math.PI/180);
        _context.drawImage(_img, 0, 0, _tempWidth, _tempHeight);
    } else {
        _context.drawImage(_img, 0, 0, _tempWidth, _tempHeight);
    }
    //toDataURL闂佸搫鍊介～澶屾兜閸洘鏅悘鐐舵鐠佹彃霉閻橆喖鍔ユ鐐茬箻瀹曪綁寮介妸褍顥曢悗娈垮枛缁诲鎷归敓锟�"data:image/png;base64,***"闂佹眹鍔岄崹绡磗e64闂佹悶鍎辨晶鑺ユ櫠閺嶃劎鈹嶉柍鈺佸暕缁辨牠鏌ㄥ☉铏
    var _data = _canvas.toDataURL('image/jpeg');
    return _data;
}
*/
function compress(img) {
    var initSize = img.src.length;
    var width = img.width;
    var height = img.height;

    //婵犵鈧啿鈧綊鎮樻径鎰倞闁告挆鍐炬毈婵犮垹鐖㈤崒婊嗗闂佹悶鍎茬粙鎾斥枍閵婏妇鈻旈柛銉戝啫澹栫紓浣戒含婵妲愬┑鍫熷闁挎稑瀚弳顒勬煕濡警鍎戠紓鍌氼槸琚欓柡鍌濆劵鐎氭瑩鎮樿箛鎾搭棞闁靛洤娲ㄦ禍姝岀疀閹惧磭顏婚梺鐓庡殩閹凤拷400婵炴垶鎸稿ú锝嗙閹烘挾鈻旈柨鐕傛嫹
    var ratio;
    if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }

    canvas.width = width;
    canvas.height = height;

    //闂備焦鍎抽幖顐よ姳閹惰姤鍤岄柨鐕傛嫹
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //婵犵鈧啿鈧綊鎮樻径鎰倞闁告挆鍐炬毈闂佺ǹ绉寸换鎺旂矆鐏炴儳绶炵憸宀€鑺遍敓锟�100婵炴垶鎸稿ú銈夊垂椤栨稒濯撮悹鎭掑妽閺嗗繘鏌ｉ埥鍛洭濠⒀勭墱缁辨帒螣閸濆嫮鍘�
    var count;
    if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //闁荤姳绶ょ槐鏇㈡偩閼姐倖鍟哄ù锝嚽归悗濠氭煙鐎涙ê濮囨い锕佹硶娴滄悂骞嬪┑鍥т淮闂佺儵妲勬俊鍥ㄦ櫠閿燂拷

        //闁荤姳绶ょ槐鏇㈡偩鐠囨畫鎺曠疀閹炬潙浠撮梺鐑╂婵″洦鏅堕弽顓熷剭闁告洦鍋掗崯宥夋煕濠婂啰鐒搁柣婵撴嫹
        var nw = ~~(width / count);
        var nh = ~~(height / count);

        tCanvas.width = nw;
        tCanvas.height = nh;

        for (var i = 0; i < count; i++) {
            for (var j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }

    //闁哄鏅滅粙鏍€侀幋锕€瀚夐柍褜鍓涙禍姝岀疀閹惧磭顏荤紓鍌氬亰閹凤拷
    var ndata = canvas.toDataURL('image/jpeg', 0.1);

    //console.log('闂佸憡锚椤戝洨绱撴径鎰鐎广儱绻掔粣锟�' + initSize);
    //console.log('闂佸憡锚椤戝洨绱撴径鎰Е閹兼惌鍨崇粣锟�' + ndata.length);
    //console.log('闂佸憡锚椤戝洨绱撴径鎰仢闁搞儵顥撶粣锟�' + ~~(100 * (initSize - ndata.length) / initSize) + "%");

    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

    return ndata;
}

//闂佸吋鍎抽崲鑼躲亹閸ヮ剙绠规繝濠傛噹閸嬪秹鎮跺☉鏍у姎闁告瑥绻樺畷姗€宕ㄩ褍鏅�
function get_search_bu(o){
    if(o==''){
        var temp = localStorage.complain_search==undefined?[]:localStorage.complain_search.split(','),ulhtml='';
        if(temp=="" || temp.length<1)return;
        $(".history .h_tit").show();
        $(".history .clear_btn").show();
        for(var i in temp){
            ulhtml+='<li><a>'+temp[i]+'</a><i class="close"></i></li>';
        }
        $(".search_content .history ul").html(ulhtml);
        $(".search_content .history ul li a").on("click",function(){
            var v=$(this).html();
            window.location='/fb/search?keywords='+v+'&type=1';
        });
        $(".search_content .history ul li .close").on("click",function(event){
            event.stopPropagation();
            event.preventDefault();
            $(this).parents("li").remove();
            if($(".search_content .history ul li").size()<1){
                $(".history .h_tit").hide();
                $(".history .clear_btn").hide();
            }
        });
        return;
    }
    //var url='http://db.auto.sina.com.cn/search/api/inside/sinaapi/search.json?callback=?&keyworld='+o;
    var url='//feedback.auto.sina.cn/api/auto?callback=?&keyworld='+o;
    $(".history .h_tit").hide();
    $(".history .clear_btn").hide();
    $.getJSON(url,function(data){
        if(data.value){
            var html='';
            for(var i in data.value){
                html+='<li><a>'+data.value[i].r_name+'</a><i class="close"></i></li>';
            }
            $(".search_content .history ul").html(html);
            $(".search_content .history ul li a").on("click",function(){
                var v=$(this).html();
                window.location='/fb/search?keywords='+v+'&type=1';
            });
            $(".search_content .history ul li .close").on("click",function(event){
                event.stopPropagation();
                event.preventDefault();
                $(this).parents("li").remove();
            });
        }
    });
}

//闂佸吋鍎抽崲鑼躲亹閸ヮ剙绠规繝濠傛噹閸嬪秶绱撴担瑙勫鞍闁诲繐顦靛顐︽偋閸繄銈�
var search_page=1,loaddata=true,loaddata_p=true;
function getSearch_data(type,key,page){
    var url=httphead+'/api/czfeedback/search?callback=?';
    if(loaddata==false) return;
    loaddata=false;
    if(type==null || type=='' || key==null || key==''){
        $("#search_Databox .search_data_ul ul").html('<li class="null">\u6682\u65e0<em>'+key+'</em>\u76f8\u5173\u4fe1\u606f</li>'); //闂佸搫妫楅崐鐟拔涢妶澶嬪剮缂佸鐏濊ぐ鐘睬庨崶锝呭⒉濞寸》鎷�
        $("#search_Databox .search_crumbs span em").html('0');
        loaddata=true;
        return;
    }
    if(page==1){
        $("#search_Databox .search_data_ul ul").html('<div class="loading_box" id="loadbox" style="display:block;"><span></span>\u52a0\u8f7d\u4e2d</div>');
    }else{
        $("#search_Databox .search_data_ul ul").append('<div class="loading_box" id="loadbox" style="display:block;"><span></span>\u52a0\u8f7d\u4e2d</div>');
    }
    $.getJSON(url,{type:type,keywords:key,page:page,size:20},function(jsond){
        loaddata=true;
        loaddata_p=true;
        if(jsond.data && jsond.data.data.length>0 && jsond.data.total>0){
            var html='';
 $('#search_txt').attr('placeholder', key);
            for(var i in jsond.data.data){
                if(jsond.data.data[i].img.length>0){
                    //闂佸搫鐗嗛ˇ顖毭瑰鈧畷姗€宕ㄩ褍鏅�
                    html+='<li>' +
                        '                <a href="'+jsond.data.data[i].wap_url+'" class="user">' +
                        '                    <div class="photo"><span><img src="'+jsond.data.data[i].profile_image_url+'"></span></div>' +
                        '                    <div class="name"><span>'+jsond.data.data[i].screen_name+'</span></div>' +
                        '                    <div class="date"><span>'+jsond.data.data[i].c_time+'</span></div>' +
                        '                    <div class="state '+getState(jsond.data.data[i].status_desc)+'">'+jsond.data.data[i].status_desc+'</div>' +
                        '                </a>' +
                        '                <div class="content">' +
                        '                    <div class="con_tit"><a href="'+jsond.data.data[i].wap_url+'">'+jsond.data.data[i].title+'</a></div>' +
                        '                    <div class="subhead_s"><a href="'+jsond.data.data[i].wap_url+'"><span>'+jsond.data.data[i].content+'</span><div class="img"><img src="'+jsond.data.data[i].img[0]+'"><span class="num">'+jsond.data.data[i].img.length+'</span></div></a></div>' +
                        '                </div>';
                }else{
                    //闂佸搫鍟版慨鏉懨瑰鈧畷姗€宕ㄩ褍鏅�
                    html+='<li>' +
                        '   <a href="'+jsond.data.data[i].wap_url+'" class="user">' +
                        '       <div class="photo"><span><img src="'+jsond.data.data[i].profile_image_url+'"></span></div>' +
                        '       <div class="name"><span>'+jsond.data.data[i].screen_name+'</span></div>' +
                        '       <div class="date"><span>'+jsond.data.data[i].c_time+'</span></div>' +
                        '       <div class="state '+getState(jsond.data.data[i].status_desc)+'">'+jsond.data.data[i].status_desc+'</div>' +
                        '   </a>' +
                        '   <div class="content">' +
                        '       <div class="con_tit"><a href="'+jsond.data.data[i].wap_url+'">'+jsond.data.data[i].title+'</a></div>' +
                        '       <div class="subhead"><a href="'+jsond.data.data[i].wap_url+'"><span>'+jsond.data.data[i].content+'</span></a></div>' +
                        '   </div>';
                }
                if(jsond.data.data[i].reply==''){
                    html+='</li>';
                }else{
                    if (jsond.data.data[i].reply_pre!=undefined && jsond.data.data[i].reply_pre!='' &&  jsond.data.data[i].reply_txt!=undefined && jsond.data.data[i].reply_txt!='') {
                        html+='                            <a href="'+jsond.data.data[i].wap_url+'" class="reply">' +
                                '                                <span class="r_user">'+jsond.data.data[i].reply_pre+'\u56de\u590d\uff1a</span>' +
                                '                                <span class="r_content">'+jsond.data.data[i].reply_txt+'</span>' +
                                '                            </a>';
                    }else{
                        html+='                            <a href="'+jsond.data.data[i].wap_url+'"  class="reply">' +
                                '                                <span class="r_content">'+jsond.data.data[i].reply+'</span>' +
                                '                            </a>';
                    }
                    html+='</li>';
                }
            }
            $("#search_Databox .search_data_ul ul #loadbox").remove();
            $("#search_Databox .search_data_ul ul .null").remove();
            $("#search_Databox .search_data_ul ul").append(html);
            $("#search_Databox .search_crumbs span em").html(jsond.data.total);
            $("#hot_data").hide();
        }else{
            if(page==1) {
                $("#search_Databox .search_data_ul ul #loadbox").remove();
                $("#search_Databox .search_data_ul ul").html('<li class="null">\u6682\u65e0<em>'+key+'</em>\u76f8\u5173\u4fe1\u606f</li>'); //闂佸搫妫楅崐鐟拔涢妶澶嬪剮缂佸鐏濊ぐ鐘睬庨崶锝呭⒉濞寸》鎷�
                $("#search_Databox .search_crumbs span em").html('0');
                $("#hot_data").show();
            }
            loaddata=false;
            loaddata_p=false;
            $("#search_Databox .search_data_ul ul #loadbox").remove();
            return;
        }
    });
    $(window).scroll(function(){
        if($(window).scrollTop()+$(window).height()*2 > $(document).height() && loaddata_p){
            loaddata_p=false;
            search_page++;
            getSearch_data(type,key,search_page);
        }
    });
    /*$.ajax({
        url:url,
        type:'get',
        data:{type:type,keywords:key,page:page,size:20},
        dataType:'json',
        success:function(jsond){
            loaddata=true;
            if(jsond.data && jsond.data.total>0){
                $("#search_content .search_crumbs span em").html(jsond.data.total);
                var html='';
                for(var i in jsond.data.data){
                    if(jsond.data.data[i].img.length>0){
                        //闂佸搫鐗嗛ˇ顖毭瑰鈧畷姗€宕ㄩ褍鏅�
                        html+='                <li class="listli">' +
                            '                    <div class="hd clearfix">' +
                            '                        <span class="time fL">\u53d1\u5e03\u65f6\u95f4\uff1a'+jsond.data.data[i].c_time+'</span>' + //闂佸憡鐟﹂崹鐢电博閻戣棄绫嶉柛顐ｆ礃閿涚喖鏌ㄥ☉铏
                            '                        <div class="state fR '+getState(jsond.data.data[i].status_desc)+'">'+jsond.data.data[i].status_desc+'</div>' +
                            '                    </div>' +
                            '                    <div class="article_title"><a href="'+jsond.data.data[i].pc_url+'" target="_blank">'+jsond.data.data[i].title+'</a></div>' +
                            '                    <div class="bd clearfix">' +
                            '                        <div class="img">' +
                            '                            <img src="'+jsond.data.data[i].img[0]+'">' +
                            '                            <div class="num">'+jsond.data.data[i].img.length+'</div>' +
                            '                        </div>' +
                            '                        <div class="txt">'+jsond.data.data[i].content+'</div>' +
                            '                    </div>' +
                            '                </li>';
                    }else{
                        //闂佸搫鍟版慨鏉懨瑰鈧畷姗€宕ㄩ褍鏅�
                        html+='                <li class="listli">' +
                            '                    <div class="hd clearfix">' +
                            '                        <span class="time fL">\u53d1\u5e03\u65f6\u95f4\uff1a'+jsond.data.data[i].c_time+'</span>' +
                            '                        <div class="state fR '+getState(jsond.data.data[i].status_desc)+'">'+jsond.data.data[i].status_desc+'</div>' +
                            '                    </div>' +
                            '                    <div class="article_title"><a href="'+jsond.data.data[i].pc_url+'" target="_blank">'+jsond.data.data[i].title+'</a></div>' +
                            '                    <div class="bd clearfix">' +
                            '                        <div class="txt">'+jsond.data.data[i].content+'</div>' +
                            '                    </div>' +
                            '                </li>';
                    }
                }
                $("#search_content .tabCon ul .null").remove();
                $("#search_content .tabCon ul").append(html);

                $(window).scroll(function(){
                    if($(window).scrollTop()+$(window).height() > $(".footer").offset().top){
                        page++;
                        getSearchdata(type,key,page);
                    }
                });
            }else{
                $("#search_content .tabCon ul").html('<li class="null">\u6682\u65e0\u76f8\u5173\u4fe1\u606f</li>'); //闂佸搫妫楅崐鐟拔涢妶澶嬪剮缂佸鐏濊ぐ鐘睬庨崶锝呭⒉濞寸》鎷�
                $("#search_content .search_crumbs span em").html('0');
                loaddata=false;
                return;
            }
        },
        error:function(v,m){
            $("#search_content .tabCon ul").html('<li class="null">\u6682\u65e0\u76f8\u5173\u4fe1\u606f</li>'); //闂佸搫妫楅崐鐟拔涢妶澶嬪剮缂佸鐏濊ぐ鐘睬庨崶锝呭⒉濞寸》鎷�
            $("#search_content .search_crumbs span em").html('0');
            loaddata=true;
        }
    });*/

}

//闂佺鍩栧ú婵嬫儊閺冨牊鍋愰柤鍝ヮ暯閸嬫捇鏁撻敓锟�
function getState(str){
    switch(str){
        case '\u6295\u8bc9\u53d7\u7406': //闂佺鍩栧ú婵嬫儊閺冨牆鐭楁俊銈呭暞閸婏拷
            return 'tousushouli';
            break;
        case '\u6295\u8bc9\u5b8c\u7ed3': //闂佺鍩栧ú婵嬫儊閺冨倵鍋撻悷鎵伇缂侇噯鎷�
        case '\u5df2\u5b8c\u6210'://"閻庣懓鎲¤ぐ鍐偩椤掑嫬绠ｉ柨鐕傛嫹"
            return 'yiwancheng';
            break;
        case '\u6295\u8bc9\u7b54\u590d': //闂佺鍩栧ú婵嬫儊閺冨倻椹抽柡鍌涱儥濡诧拷
        case '\u5df2\u56de\u590d': //閻庣懓鎲¤ぐ鍐洪弽銊ョ窞闁跨噦鎷�
        case '\u5df2\u7b54\u590d'://"閻庤鐡曠亸娆撴偤閻旂ǹ绶為柨鐕傛嫹"
            return 'yidafu';
            break;
        case '\u6295\u8bc9\u5f85\u529e': //闂佺鍩栧ú婵嬫儊閺傛鍤楅柛娑卞幖椤拷
        case '\u5f85\u89e3\u51b3': //閻庡灚婢橀幊鎾诡暰闂佸憡鍔ч幏锟�
            return 'daijiejue';
            break;
        case '\u6295\u8bc9\u9a73\u56de': //闂佺鍩栧ú婵嬫儊閺冣偓閵囨瑩宕橀崣澶岊槬
        case '\u5df2\u9a73\u56de'://"閻庣懓鎲￠悡锟犲煘韫囨稑鐐婇柨鐕傛嫹"
            return 'yibohui';
            break;
        case '\u6295\u8bc9\u5ba1\u6838': //闂佺鍩栧ú婵嬫儊閺冨倵鍋撻崗澶婂⒉闁绘鎷�
        case '\u5f85\u5ba1\u6838':    //閻庡灚婢橀幊搴敇閹间礁鍐€闁跨噦鎷�
            return 'daishenhe';
            break;
    }
}



$(".opt_v .item").bind("click",function(event){
    event.stopPropagation();
    if($(this).is(".on")){
        $(this).removeClass("on").siblings(".item").removeClass("on");
    }else{
        $(this).addClass("on").siblings(".item").removeClass("on");
    }
    if ($(this).find('input').val() == 6) {
        $('.chexiaotousu .msg_con.mc1').show();
    } else {
        $('.chexiaotousu .msg_con.mc1').hide();
    }
});

$(".msg_con.mc1 textarea").bind("focus",function(){
    var v=$(this).val();
    if(v.replace(/\s/ig,'')=='请输入处理结果'){ //璇︾粏鎻忚堪鎮ㄨ鎶曡瘔鐨勯棶棰�
        $(this).val('');
        $(this).css('color','#333');
    }
}).bind("blur",function(){
    var v=$(this).val();
    if(v.replace(/\s/ig,'')==''){
        $(this).val('请输入处理结果'); //璇︾粏鎻忚堪鎮ㄨ鎶曡瘔鐨勯棶棰�
        $(this).css('color','#999');
    }
})
$(".msg_con.mc2 textarea").bind("focus",function(){
    var v=$(this).val();
    if(v.replace(/\s/ig,'')=='请输入撤诉理由'){ //璇︾粏鎻忚堪鎮ㄨ鎶曡瘔鐨勯棶棰�
        $(this).val('');
        $(this).css('color','#333');
    }
}).bind("blur",function(){
    var v=$(this).val();
    if(v.replace(/\s/ig,'')==''){
        $(this).val('请输入撤诉理由'); //璇︾粏鎻忚堪鎮ㄨ鎶曡瘔鐨勯棶棰�
        $(this).css('color','#999');
    }
})
//闂佺懓鐡ㄩ崹鐟扳枔閹达箑绠柡鍥风磿濡叉﹢鏌涢幒鎿冩畽闁靛棴鎷�
var getcd=true;
function getMyComplainData(page,size ,status, element){
    var url=httphead+'/api/czfeedback/mylist';
    if(!getcd)return;
    getcd=false;
    element.find("#li_loading").remove();
    element.find("ul").append('<div id="li_loading" style="display:block;"><span></span>\u52a0\u8f7d\u4e2d</div>');//闂佸憡姊绘慨鎯归崶銊р枖闁跨噦鎷�
    $.ajax({
        url: url,
        data: {page: page, size: size, step: status},
        type: 'get',
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (jsond) {
            element.find("#li_loading").remove();
            if(jsond.data && jsond.data.data && jsond.data.data.length>0) {
                var html='';
                for(var i in jsond.data.data){
                    var pingjia='',msg='',color='';
                    if(jsond.data.data[i].has_pingjia==1){
                        var pingjia_star='';
                        for(var k=0,j=0;k<jsond.data.data[i].pingjia_info.score,j<5;k++,j++){
                            if(j>=jsond.data.data[i].pingjia_info.score){
                                pingjia_star+='<i class="no"></i>';
                            }else{
                                pingjia_star+='<i></i>';
                            }
                        }
                        var done = ' data-done=1';
                        if ((!jsond.data.data[i].cancelInfo.cancel_step_txt&&jsond.data.data[i].status==5)||(!!jsond.data.data[i].cancelInfo.cancel_step_txt&&jsond.data.data[i].cancelInfo.cancel_step==2)) {
                            done = '';
                        }
                        var btn2 = '<span class="btn2"  data-v="'+jsond.data.data[i].id+'" '+(done)+'>'+(!!jsond.data.data[i].cancelInfo.cancel_step_txt?jsond.data.data[i].cancelInfo.cancel_step_txt:'撤诉')+'</span>';
                        if (jsond.data.data[i].cancelInfo.cancel_step_txt == '已撤诉') {
                            btn2 = '';
                        }
                        pingjia='   <div class="evaluate">' +
                            '       <div class="eval_tit"><span>\u60a8\u5bf9\u672c\u6b21\u6295\u8bc9\u7684\u8bc4\u4ef7\u4e3a\uff1a</span></div>' + //闂佽鍠撻崝宀勵敋椤曗偓瀵敻顢楁笟鍥т还闂佺鍩栧ú婵嬫儊閺冨牊鍎嶉柛鏇ㄥ枤濡叉垵霉閻樼儤鑵归悹鎰枛閺佸秹鏁撻敓锟�
                            '       <div class="eval_con">' +
                            '       <div class="eval_star">'+pingjia_star+'<span>'+jsond.data.data[i].pingjia_info.score_desc+'</span>'+btn2+'</div>' +
                            '       <div class="eval_content">'+jsond.data.data[i].pingjia_info.score_content+'</div>' +
                            '       </div>' +
                            '   </div>';
                    }
                    if(jsond.data.data[i].change_color==1){
                        color=' over';
                    }
                    // if(jsond.data.data[i].status==2){
                    //     //婵＄偟鎳撻崯鍨洪弽銊р攳闁斥晛鍟╃槐锟�
                    //     msg='<div class="msg"><div class="msg_tit"><i></i><span>\u65b0\u6d6a\u6c7d\u8f66\u5df2\u9a73\u56de\u8be5\u6295\u8bc9</span></div><div class="cause"><span>\u9a73\u56de\u539f\u56e0\uff1a</span><em>'+jsond.data.data[i].refused+'</em></div></div>';
                    // }else if(jsond.data.data[i].status==4){
                    //     //閻庣懓鎲¤ぐ鍐洪弽銊ョ窞闁跨噦鎷�
                    //     if(jsond.data.data[i].can_pingjia==1){
                    //         msg='<div class="msg'+color+'"><div class="msg_tit"><i></i><span>'+jsond.data.data[i].brand_name+'\u5df2\u5bf9\u6295\u8bc9\u60c5\u51b5\u4f5c\u51fa\u7b54\u590d</span></div><div class="cause"><span></span><em>\u70b9\u51fb\u53f3\u4fa7\u6309\u94ae\uff0c\u6765\u8fdb\u884c\u8bc4\u4ef7\u5427</em></div><div class="solve_btn" data-v="'+jsond.data.data[i].id+'">\u95ee\u9898\u5df2\u89e3\u51b3\uff1f</div></div>';
                    //     }else{
                    //         msg='<div class="msg'+color+'"><div class="msg_tit"><i></i><span>'+jsond.data.data[i].brand_name+'\u5df2\u5bf9\u6295\u8bc9\u60c5\u51b5\u4f5c\u51fa\u7b54\u590d</span></div><div class="cause"><span></span><em>\u70b9\u51fb\u53f3\u4fa7\u6309\u94ae\uff0c\u6765\u8fdb\u884c\u8bc4\u4ef7\u5427</em></div><div class="solve_btn no">\u95ee\u9898\u5df2\u89e3\u51b3\uff1f</div></div>';
                    //     }
                    // }


                    if(jsond.data.data[i].status==2){
                        //椹冲洖淇℃伅
                        // msg='<div class="msg"><div class="msg_tit"><i></i><span>\u65b0\u6d6a\u6c7d\u8f66\u5df2\u9a73\u56de\u8be5\u6295\u8bc9</span></div><div class="cause"><span>\u9a73\u56de\u539f\u56e0\uff1a</span><em>'+jsond.data.data[i].refused+'</em></div></div>';
                        msg='<div class="msg'+color+'"><div class="msg_tit"><i></i><span>\u65b0\u6d6a\u6c7d\u8f66\u5df2\u9a73\u56de\u8be5\u6295\u8bc9</span><em>'+jsond.data.data[i].refused+'</em></div></div>'; //鏂版氮姹借溅宸查┏鍥炶鎶曡瘔锛岄┏鍥炲師鍥狅細
                    }else if(jsond.data.data[i].status==3){
                        //宸插洖澶�
                        if(jsond.data.data[i].can_pingjia==1){
                            msg='<div class="msg'+color+'"><div class="msg_tit"><i></i><span>'+jsond.data.data[i].brand_name+'一周内未对投诉情况作出答复</span><span class="solve_btn" data-v="'+jsond.data.data[i].id+'" style="cursor:pointer;">评价</span></div></div>'; //宸茬瓟澶嶆姇璇�
                        }else{
                            // msg='<div class="msg'+color+'"><i></i><span>'+jsond.data.data[i].brand_name+'\u5df2\u5bf9\u6295\u8bc9\u60c5\u51b5\u4f5c\u51fa\u7b54\u590d\uff0c<em><a>\u8bf7\u8fdb\u5165\u8be6\u60c5\u9875\u67e5\u770b</a></em></span><span class="btn">\u95ee\u9898\u5df2\u89e3\u51b3\uff1f</span></div>'; //宸茬瓟澶嶆姇璇�
                        }
                    }else if(jsond.data.data[i].status==4){
                        //宸插洖澶�
                        if(jsond.data.data[i].can_pingjia==1){
                            msg='<div class="msg'+color+'"><div class="msg_tit"><i></i><span>'+jsond.data.data[i].brand_name+'\u5df2\u5bf9\u6295\u8bc9\u60c5\u51b5\u4f5c\u51fa\u7b54\u590d</span><span class="solve_btn" data-v="'+jsond.data.data[i].id+'" style="cursor:pointer;">评价</span></div></div>'; //宸茬瓟澶嶆姇璇�
                        }else{
                            msg='<div class="msg'+color+'"><div class="msg_tit"><i></i><span>'+jsond.data.data[i].brand_name+'\u5df2\u5bf9\u6295\u8bc9\u60c5\u51b5\u4f5c\u51fa\u7b54\u590d</span><span class="btn">\u95ee\u9898\u5df2\u89e3\u51b3\uff1f</span></div></div>'; //宸茬瓟澶嶆姇璇�
                        }
                    }

                    if(jsond.data.data[i].status==1 || jsond.data.data[i].wap_url=='') {
                        var linkurl = 'javascript:void(0)';
                    }else{
                        var linkurl = jsond.data.data[i].wap_url;
                    }

                    if(jsond.data.data[i].img.length>1) {
                        html+='<li data-id="'+jsond.data.data[i].id+'">' +
                            '                            <div class="user">' +
                            '                                <div class="date">\u53d1\u5e03\u65f6\u95f4\uff1a<span>'+jsond.data.data[i].c_time+'</span></div>' +
                            '                                <div class="state '+getState(jsond.data.data[i].status_name)+'">'+jsond.data.data[i].status_name+'</div>' +
                            '                            </div>' +
                            '                            <div class="content">' +
                            '                                <div class="con_tit"><a href="'+linkurl+'">'+jsond.data.data[i].title+'</a></div>' +
                            '                                <div class="subhead_s"><a href="'+linkurl+'"><span>'+jsond.data.data[i].content+'</span><div class="img"><img src="'+jsond.data.data[i].img[0]+'" /></div></a></div>' +
                            '                            </div>' +
                            msg +
                            pingjia +
                            '                        </li>';
                    }else{
                        html+='<li data-id="'+jsond.data.data[i].id+'">' +
                            '                            <div class="user">' +
                            '                                <div class="date">\u53d1\u5e03\u65f6\u95f4\uff1a<span>'+jsond.data.data[i].c_time+'</span></div>' +
                            '                                <div class="state '+getState(jsond.data.data[i].status_name)+'">'+jsond.data.data[i].status_name+'</div>' +
                            '                            </div>' +
                            '                            <div class="content">' +
                            '                                <div class="con_tit"><a href="'+linkurl+'">'+jsond.data.data[i].title+'</a></div>' +
                            '                                <div class="subhead"><a href="'+linkurl+'"><span>'+jsond.data.data[i].content+'</span></a></div>' +
                            '                            </div>' +
                            msg +
                            pingjia +
                            '                        </li>';
                    }

                }
                element.find("ul").append(html);
                element.find("ul li a").bind("click",function(){
                    var id=parseInt($(this).parents("li").attr("data-id"));
                    $.post(httphead+'/api/changeColor',{id:id});
                });

                //闂佸搫瀚晶浠嬪Φ濮樿鲸瀚氶柛鏇ㄤ簽楠炲棝鏌熼懜鍨闁伙附鏌ㄩ湁妞ゆ棁鍋愬﹢锟�
                element.find("ul li .msg .solve_btn").unbind("click");
                element.find("ul li .msg .solve_btn").bind("click",function(){
                    var id=$(this).attr("data-v");
                    if($(this).is(".no"))return;
                    if(id==undefined || id==null || id=='')return;
                    $(".mask_msg_box").show();
                    $(".mask_msg_box .evaluate").show().attr("data-id",id);
                });
                $(".publiclist .btn2").unbind("click");
                $(".publiclist .btn2").bind("click",function(){
                    if ($(this).attr('data-done') == 1) return;
                    var id=$(this).attr("data-v");
                    if(id==undefined || id==null || id=='')return;
                    $(".mask_msg_box").show();
                    $(".mask_msg_box .chexiaotousu").show().attr("data-id",id);
                });
                $(".evaluate .msg_star i").bind("click",function(){
                    var star_i=$(this).index();
                    $(".evaluate .msg_star i").each(function(v,o){
                        if(v<=star_i){
                            $(this).removeClass("no");
                        }else{
                            $(this).addClass("no");
                        }
                    });
                    $(".evaluate .msg_star span").html(evaluate_str(star_i));
                });
                $(".evaluate .msg_btn .ok_btn").unbind("click")
                $(".evaluate .msg_btn .ok_btn").bind("click",function(){
                    var v='',id=$(this).parents(".evaluate").attr("data-id"),score=1;
                    score=5-$(".evaluate .msg_star i.no").size();
                    evaluate(id,v,score);
                });
                $(".evaluate .msg_btn .cancel_btn").bind("click",function(){
                    $(".evaluate").hide();
                    $(".mask_msg_box").hide();
                });


                $(".chexiaotousu .msg_btn .ok_btn").unbind("click")
                $(".chexiaotousu .msg_btn .ok_btn").bind("click",function(){
                    var id=$(".chexiaotousu").attr("data-id");


                    var url='//feedback.auto.sina.cn/api/czfeedback/pubCancel/',
                        cancel_result = $('.chexiaotousu .opt_v .item.on input').val(),
                        other_result = $('.chexiaotousu .mc1 textarea').val();
                        cancel_reason = $('.chexiaotousu .mc2 textarea').val();

                    if (other_result == '请输入处理结果') {
                        other_result = '';
                    }
                    if (cancel_reason == '请输入撤诉理由') {
                        cancel_reason = '';
                    }
                    if (cancel_result == '6' && other_result == '') {
                        hintMsg('请输入处理结果',2000);
                        // setTimeout(function(){ $(".mask_msg_box").hide();},2000);
                        return;
                    }
                    if (cancel_reason == '') {
                        hintMsg('请输入撤诉理由',2000);
                        // setTimeout(function(){ $(".mask_msg_box").hide();},2000);
                        return;
                    }

                    $.post(url,{'sina_complaint_id':id,'cancel_reason':cancel_reason,'cancel_result':cancel_result, 'other_result':other_result},function(data){
                        if(data && data.status==1000){
                            //璇勪环鎴愬姛
                            hintMsg('撤诉已提交',2000); //鎴愬姛鍙戝竷璇勮
                            $(".publiclist .btn2[data-v='"+id+"']").html('撤诉待审核').attr('data-done', 1);
                            setTimeout(function(){ $(".mask_msg_box").hide();},2000);
                        }else{
                            hintMsg(data.msg,2000); //鎴愬姛鍙戝竷澶辫触
                            setTimeout(function(){ $(".mask_msg_box").hide();},2000);
                        }
                    });
                });
                $(".chexiaotousu .msg_btn .cancel_btn").bind("click",function(){
                    $(".chexiaotousu").hide().removeAttr("data-id");
                    $(".mask_msg_box").hide();
                });

                $(".swiper-wrapper").height(element.height()<$(window).height()/2?$(window).height()/2:element.height());
                getcd=true;
            }else{
                if(page>1){
                    return;
                }else {
                    var li_html='<li class="null"><img src="http://n.sinaimg.cn/auto/chezhan2017/con_null.png" /><span>\u6682\u65e0\u6295\u8bc9\u5185\u5bb9</span></li>'; //闂佸搫妫楅崐鐟拔涢妶澶婄闁哄浄绱曞Σ姗€鏌涢幇顒佸櫣妞ゆ棑鎷�
                    element.find("ul").html(li_html);
                }
                getcd=false;
            }
        }
    });
}
//闂佸憡鐟﹂崹濂稿Υ閸愵亝瀚氶柛鏇ㄤ簽楠烇拷
var submit_eval=true;
function evaluate(id,content,score){
    var url=httphead+'/api/czfeedback/pubUseScore',id,score;
    if(submit_eval==false) return;
    submit_eval=false;
    $.post(url,{'id':id,'score':score},function(data){
        //var data=eval('('+data+')');
        console.log(data);
        if(data && data.status==1000){
            //闁荤姴娲ょ€氼亪鎮抽鐐茬闁归偊鍓欓～锟�
            var pingjia_star='',evaluate_html='',pingjia_str='';
            for(var j=0;j<5;j++){
                if(j>=score){
                    pingjia_star+='<i class="no"></i>';
                }else{
                    pingjia_star+='<i></i>';
                }
            }
            evaluate_html='   <div class="evaluate">' +
                '       <div class="eval_tit"><span>\u60a8\u5bf9\u672c\u6b21\u6295\u8bc9\u7684\u8bc4\u4ef7\u4e3a\uff1a</span></div>' + //闂佽鍠撻崝宀勵敋椤曗偓瀵敻顢楁笟鍥т还闂佺鍩栧ú婵嬫儊閺冨牊鍎嶉柛鏇ㄥ枤濡叉垵霉閻樼儤鑵归悹鎰枛閺佸秹鏁撻敓锟�
                '       <div class="eval_con">' +
                '       <div class="eval_star">'+pingjia_star+'<span>'+evaluate_str(score)+'</span><span class="btn2" data-v="'+id+'">撤诉</span></div>' +
                '       <div class="eval_content">'+content+'</div>' +
                '       </div>' +
                '   </div>';
            $(".mask_msg_box").show();

            hintMsg('\u6210\u529f\u53d1\u5e03\u8bc4\u8bba'); //闂佺懓鐡ㄩ崝鏇熸叏濞戙垹鐭楅柟瀛樼箘椤忔挳鎮归崶褍顏い鏃撴嫹
            setTimeout(function(){ $(".mask_msg_box").hide();},3000);
            $("#myc_list_box li[data-id='"+id+"']").find(".msg").after(evaluate_html).remove();



            $(".publiclist .btn2").unbind("click")
            $(".publiclist .btn2").bind("click",function(){
                if ($(this).attr('data-done') == 1) return;
                var id=$(this).attr("data-v");
                if(id==undefined || id==null || id=='')return;
                $(".mask_msg_box").show();
                $(".mask_msg_box .evaluate").hide();
                $(".mask_msg_box .chexiaotousu").show().attr("data-id",id);
            });
            $(".chexiaotousu .msg_btn .ok_btn").unbind("click")
            $(".chexiaotousu .msg_btn .ok_btn").bind("click",function(){
                var id=$(".chexiaotousu").attr("data-id");


                var url='//feedback.auto.sina.cn/api/czfeedback/pubCancel/',
                    cancel_result = $('.chexiaotousu .opt_v .item.on input').val(),
                    other_result = $('.chexiaotousu .mc1 textarea').val();
                    cancel_reason = $('.chexiaotousu .mc2 textarea').val();

                if (other_result == '请输入处理结果') {
                    other_result = '';
                }
                if (cancel_reason == '请输入撤诉理由') {
                    cancel_reason = '';
                }
                if (cancel_result == '6' && other_result == '') {
                    hintMsg('请输入处理结果',2000);
                    // setTimeout(function(){ $(".mask_msg_box").hide();},2000);
                    return;
                }
                if (cancel_reason == '') {
                    hintMsg('请输入撤诉理由',2000);
                    // setTimeout(function(){ $(".mask_msg_box").hide();},2000);
                    return;
                }

                $.post(url,{'sina_complaint_id':id,'cancel_reason':cancel_reason,'cancel_result':cancel_result, 'other_result':other_result},function(data){
                    if(data && data.status==1000){
                        //璇勪环鎴愬姛
                        hintMsg('撤诉已提交',2000); //鎴愬姛鍙戝竷璇勮
                        $(".publiclist .btn2[data-v='"+id+"']").html('撤诉待审核').attr('data-done', 1);
                        setTimeout(function(){ $(".mask_msg_box").hide();},2000);
                    }else{
                        hintMsg(data.msg,2000); //鎴愬姛鍙戝竷澶辫触
                        setTimeout(function(){ $(".mask_msg_box").hide();},2000);
                    }
                });
            });
            $(".chexiaotousu .msg_btn .cancel_btn").bind("click",function(){
                $(".chexiaotousu").hide().removeAttr("data-id");
                $(".mask_msg_box").hide();
            });
        }else{
            hintMsg(data.msg); //闂佸憡鐟﹂崹鐢电博妞嬪孩瀚氶柛鏇ㄥ櫘閸熷牆顭块幆鎵翱閻熸瑱鎷�
            setTimeout(function(){ $(".mask_msg_box").hide();},3000);
        }
        submit_eval=true;
    });
}
//闂佸湱绮崝妤呭Φ濮橆厾鈹嶉柍鈺佸暕缁憋拷
function hintMsg(str){
    var msg_html='<div class="msg_hint" id="hint">'+str+'</div>';
    $("#hint").remove();
    $("body").append(msg_html);
    $("#hint").show();
    setTimeout(function(){
        $("#hint").remove();
    },1500);
}
//闂佸吋鍎抽崲鑼躲亹閸ヮ煈娈界€光偓閸愵亝顫嶉梺娲诲櫙閹凤拷
function getCode(num){
    var url=httphead+'/api/code';
    $.ajax({
        url:url,
        data:{feedback_mobile:num},
        type:'post',
        success:function(d){
            hintMsg('\u53d1\u9001\u6210\u529f'); //闂佸憡鐟﹂崹鍧楀焵椤戣法鍔嶉柛銊﹀哺瀹曟繈鏁撻敓锟�
        },
        error:function(v,m){
            hintMsg('\u53d1\u9001\u5931\u8d25'); //闂佸憡鐟﹂崹鍧楀焵椤戣法顦﹂柕鍥ㄥ灩閹峰綊鏁撻敓锟�
        }
    });
}

//缂傚倷鐒﹂崹鐢告偩妤ｅ啫绠ラ悗锝庡亝缁拷
function bindMobile(mobile,code){
    var url=httphead+'/api/user/bindMobile';
    $.ajax({
        url:url,
        type:'post',
        dataType:'json',
        data:{mobile:mobile,code:code},
        success:function(d){
            if(d.status!==undefined || d.status!==null){
                if(parseInt(d.status)==1000){
                    $(".my_mobile label").html('\u5df2\u7ed1\u5b9a\u624b\u673a'); //閻庤鐡曠亸娆戝垝閿旈敮鍋撶憴鍕暡濠⒀勭矒瀵敻鏁撻敓锟�
                    $(".my_mobile .mobile_num").html(mobile.substring(0,3)+'****'+mobile.substring(7,11));
                    $(".my_mobile").removeClass("nomobile");
                    hintMsg('\u6210\u529f\u7ed1\u5b9a\u624b\u673a\u53f7'); //闂佺懓鐡ㄩ崝鏇熸叏濞戞氨纾奸柟瀛樼箘閺嗕即鏌熼棃娑卞剱婵犙€鍋撻梺鍛婄懕閹凤拷
                    setTimeout(function(){
                        $(".bind_mobile").css({'transform':'translateX(100%)'});
                    },2000);
                }else{
                    hintMsg(d.msg); //缂傚倷鐒﹂崹鐢告偩閻愵剙绶為弶鍫亯琚�
                }
            }else{
                hintMsg('\u7ed1\u5b9a\u5931\u8d25'); //缂傚倷鐒﹂崹鐢告偩閻愵剙绶為弶鍫亯琚�
            }
        },
        error(v,m){
            hintMsg('\u7ed1\u5b9a\u5931\u8d25'); //缂傚倷鐒﹂崹鐢告偩閻愵剙绶為弶鍫亯琚�
        }
    });
}
//用户评价文案
function evaluate_str(star){
    var pingjia_str='';
    switch(star){
        case 0:
            pingjia_str='不满意';
            break;
        case 1:
            pingjia_str='一般';
            break;
        case 2:
            pingjia_str='较好';
            break;
        case 3:
            pingjia_str='满意'; 
            break;
        case 4:
            pingjia_str='非常满意'; 
            break;
    }
    return pingjia_str;
}
//闁荤姳鐒﹀妯肩礊瀹ュ绠规繝濠傛噹閸嬪秴菐閸ワ絽澧插ù纭锋嫹
function save_search(str){
    if(str.replace(/\s/ig,'')=='') return;
    if(localStorage.complain_search){
        var temp = localStorage.complain_search==undefined||localStorage.complain_search==null||localStorage.complain_search==''?[]:localStorage.complain_search.split(',');
        var nindex = temp.indexOf(str);
        if (nindex >= 0) {
            return;
        }else{
            if (temp.length == 5) {
                temp.splice(0,1);
            }
            temp.push(str);
        }
        localStorage.complain_search=temp.toString();
    }else{
        localStorage.complain_search=str;
    }
}
