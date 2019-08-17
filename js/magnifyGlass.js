define(["headerNav","range","jquery","jquery-cookie"],function(headerNav,range,$){
    function magnifyGlass(){
        $.ajax({
            url: "../data/details.json",
            // dataType: "json",
            success: function(arr){
               // alert(1)
                /*
                    JQ会对我们拿到的数据进行自动检测，如果是json格式的数据，自动转成数据结构
                    dataType: 
                    alert(data);
                */
               //alert(arr[0].img1);
                    var node = $(`
                    <div id = 'big'>
                        <img src="../images/details-bigkt1.jpg" alt="">
                    </div>
                 <div class="Hair-details-header">
                    您现在的位置：
                    <a href="">首页</a>
                    <span>></span>
                    <a href="">冰箱</a>
                    <span>></span>
                    <a href="">站式冰箱</a>
                    <span>></span>
                    <b>${arr[0].title}</b>
                 </div>
                 <div class="Hair-details-center">
                     <div class="product-info-left">
                         <div class="product-info-bigPic">
                             <div class="product-info-bigPic-top">
                                <img src="${arr[0].img1}" alt="空调">
                                
                             </div>
                             <div class="product-info-bigPic-top">
                                <img src="${arr[0].img2}" alt="空调">
                                
                             </div>
                             <div class="product-info-bigPic-top">
                                <img src="${arr[0].img3}" alt="空调">
                                
                             </div>
                             <div class="product-info-bigPic-top">
                                <img src="${arr[0].img4}" alt="空调">
                                
                             </div>
                             <div class="product-info-bigPic-top">
                                <img src="${arr[0].img5}" alt="空调">
                                
                             </div>
                            

                          
                             <div class="product-info-bigPic-bot">
                                 <a href="#"><span class="iconfont">&#xe605;</span><span>查看大图</span></a>
                             </div>
                             <div id = 'mark'></div> 
                             
                         </div>
                        
                         <div class="product-info-smallPic">
                             <b class="iconfont">&#xe60a;</b>
                             <div class="product-info-smallPic-con">
                                 <ul>
                                     <li class="active"><a href=""><img src="${arr[0].img1}" alt=""></a></li>
                                     <li><a href=""><img src="${arr[0].img2}" alt=""></a></li>
                                     <li><a href=""><img src="${arr[0].img3}" alt=""></a></li>
                                     <li><a href=""><img src="${arr[0].img4}" alt=""></a></li>
                                     <li><a href=""><img src="${arr[0].img5}" alt=""></a></li>
                                 </ul>
                             </div>
                             
                             <b class="iconfont">&#xe608;</b>
                         </div>
                         <div class="product-info-share">
                            <span>
                                分享
                                <a href="" class = "iconfont">&#xe527;</a>
                                <a href="" class = "iconfont">&#xe683;</a>
                                <a href="" class = "iconfont">&#xe616;</a>
                                <a href="" class = "iconfont">&#xe638;</a>    
                            </span>
                            <a href=""class="iconfont shoucang">&#xe631;<span>收藏</span></a>
                         </div>
                     </div>
                     <div class="product-info-right" id = "${arr[0].id}">
                         <h1> ${arr[0].title}</h1>
                         <h2>
                         ${arr[0].desc}
                        </h2>
                         <ul>
                             <li><span>分期付：</span><span>花呗</span></li>
                             <li><span>价格：</span><span><i>￥</i>${arr[0].price}</span></li>
                             <li><span>已售出：</span><span>${arr[0].sale}</span>台</li>
                             <li><span>客户评价：</span><span>5颗星</span></li>
                             <li><span>服务承诺：</span><span>送货入户（违约赔付100元），送装同步</span><a href=""class="iconfont">&#xe62e;<span>在线客服</span></a></li>
                         </ul>
                         <div class="product-info-bottom"  id = "${arr[0].id}">
                            <p><span>配送至：</span></p>
                            <p>
                                <span>我要买：</span>
                                <button class= "product-sdd-btn" id = "${arr[0].id}">+</button>
                                <span>1</span>
                                <button class= "product-sdd-btn" id= "${arr[0].id}">-</button>
                            </p>
                            <p>
                                <button><span class="iconfont">&#xe63c;</span><span>立即购买</span></button>
                                <button><span class="iconfont">&#xe64a;</span><span class="sc_btn" id="${arr[0].id}">加入购物车</span></button>
                            </p>
                            <p>顺逛商城作为全国首批电子发票试点网上商城，于2014年3月31日起全面推行<span>电子发票</span></p>
                         </div>
                     </div>
                 </div>
                 <div class="Hair-details-bot"></div>
                    
                    
                    `);

                    node.appendTo('.Hair-details');
                
            },
            error:function(error){
                alert(error);
            }
        })
    
        //alert(22);
         //点击 + - 号 操作商品的数量
            var gdsnum = 1;
			$(".Hair-details").on("click",".product-sdd-btn",function(){
                //alert(111)
				
				//alert(id);
                
                if(this.innerHTML == "+"){
                    gdsnum++;
                    $(this).nextAll("span").html(gdsnum);
                }else{
                    if(gdsnum == 1){
                        alert("数量已经为1");
                    }else{
                        gdsnum--;
                        $(this).prev("span").html(gdsnum);
                    }
                }
            })   

                        
                //加入购物车
        $(".Hair-details").on("click", ".sc_btn", function(){
            //alert(1)
            //this.id是当前按钮所在商品的id。
            /*
                cookie存储空间是有限的，存储只能是json格式的字符串。
                1、商品id
                2、商品数量
            */
            var id = this.id;
            //alert(id)

            //1、判断是否是第一次添加
            var first = $.cookie("goods") == null ? true : false;
            if(first){
                $.cookie("goods", `[{"id":"${id}","num":${gdsnum}}]`, {
                    expires: 7
                });
            }else{
                //2、判断之前是否添加过该商品
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                var same = false;
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        cookieArr[i].num += gdsnum;
                        same = true;
                        break;
                    }
                }


                //3、没有添加过该商品
                if(!same){
                    var obj = {id:id, num:gdsnum};
                    cookieArr.push(obj);
                }

                //4、存储cookie
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })

            }
            
            var  goon = confirm("是否继续购物");
            if(goon){
                window.open("../html/Hair-goodsList.html");
            }
        })

           
        //放大镜
            //console.log(333)
            //alert(444);
      /*       $(".product-info-bigPic-top").mouseenter(function(){
                alert(111);
                $("#mark,#big").show();
            }).mouseleave(function(){
                alert(2)
                $("#mark,#big").hide();
            }).mousemove(function(ev){
                var l = ev.clientX - $(this).offset().left  -75;
                var t = ev.clientY - $(this).offset().top +75;
                l = range.range(l,0,230);
                t = range.range(t,0,230);
                $("#mark").css({
                    left: l,
                    top: t
                })

                $("#big img").css({
                    left: -2.5 * l,
                    top: -2.5 * t
                })
            }) */
        
    }
    //阻止默认行为
    function a(){
        /* $("a").click(function(ev){
            //alert(1222);
            return false;
        }) */
    }

    function big(){
        $(".Hair-details").on("mouseenter", '.product-info-bigPic', function(){
            $("#mark,#big").show();
            
            //$("#mark,#big").eq($(this).index()).show();
            
        }).on("mouseleave", '.product-info-bigPic', function(){
            $("#mark,#big").hide();
        }).on("mousemove", ".product-info-bigPic", function(ev){
            var l = ev.pageX - $(this).offset().left  -75;
            var t = ev.pageY - $(this).offset().top -75;
            l = range.range(l,0,230);
            t = range.range(t,0,230);
            $("#mark").css({
                left: l,
                top: t
            })

            $("#big img").css({
                left: -2.5 * l,
                top: -2.5 * t
            })
        })
    }
    //选项卡
    function tab(){
       
            $(".Hair-details").on("mouseenter",".product-info-smallPic-con ul li",function(){
                //alert(1)
               
                $(".product-info-bigPic-top").css("display","none")
                .eq($(this).index()).css("display","block");

               
                $("#big img").attr("src", $(this).find("img").attr("src"))
                
                //alert($(this).index())
                //$("#big img").attr("src",this.src);
            })
        
    }
    //查看大图
    function seeBigPic(){
       
        $(".Hair-details").on("click",".product-info-bigPic-bot a",function(){
            //alert(1);
            $(".seeBigPic").css("display","block");
             $(".seeBigPic div").click(function(){
            //console.log(1);
                $(".seeBigPic").css("display","none");
            })
        });
       
    }
    return{
        magnifyGlass:magnifyGlass,
        tab:tab,
        a:a,
        sbp:seeBigPic,
        big:big,
    }
})