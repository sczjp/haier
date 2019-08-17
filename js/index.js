define(["jquery"],function($){
    function index(){
        //下载商品列表的数据
        $.ajax({
            url: "data/goodsCategory.json",
            success: function(arr){
                
                for(var i = 0; i < arr.length; i++){
                    var node1 = $(` 
                        <li><a href=""><span>${arr[i].title}</span><span class="iconfont">&#xe608;</span></a></li>
                    
                    `);

                    node1.appendTo(".Hair-index-nav-left-con ul");
                    var childLeft = arr[i].leftChild;

                    var childRight = arr[i].rightChild;

                    var node2 = $(` <div class="goodsList">
                        <div class="goodsListLeft">
                            <ol></ol>
                        </div>
                        <div class="goodsListRight">
                        
                        </div>
                    </div>`);
                        
                    if(childLeft){
                       for(var j = 0 ;j<childLeft.length;j++){
                            var node2l = $(`<li><a href=""><img src="${childLeft[j].img}" alt="">${childLeft[j].title}</a></li>`);
                            node2l.appendTo(node2.find(".goodsListLeft ol"));
                           
                        }
                      
                    }
                   if(childRight){
                       
                       for(var k = 0; k<childRight.length;k++){
                            var node2r = $(` <dl>
                                <dt><img src="${childRight[k].img}" alt=""></dt>
                                <dd><span>${childRight[k].desc}</span><span>${childRight[k].pirce}</span></dd>
                                
                            </dl>`);
                            node2r.appendTo(node2.find(".goodsListRight"));
                            //alert(i,j,k);
                            
                       }
                   }  

                   node2.appendTo(".Hair-index-nav-left-con");
                  
                }

            },
            error: function(msg){
                alert(msg);
            }
        });
    }

    function download(){
        $.ajax({
            url: "data/indexContent.json",
            success: function(arr){
                for(var i = 0;i<arr.length;i++){

                    if(i == 0){
                        var arr0 = arr[0].child;
                        for(var j = 0; j < arr0.length;j++){
                            if(j == 0){
                                var node1 = $(`<a href=""><img src="${arr0[0].img}" alt=""></a>`);
                                node1.appendTo(".Hair-index-jptj-bot-left");
                            }else{
                                var node2 = $(`
                                    <li class="li">
                                        <a href="">
                                            <img src="${arr0[j].img}" alt="">
                                        </a>
                                        <a href="">${arr0[j].desc}</a>
                                        <span>${arr0[j].price}</span>
                                    </li>
                                `);
                                node2.appendTo(".Hair-index-jptj-bot-right");
                            }
                        }
                    }

                    if(i == 1){
                        var arr1 = arr[1].child;
                        for(var j = 0;j<arr1.length;j++){
                            var node1 = $(`
                                <li><a href=""><i class="iconfont">${arr1[j].icon}</i>${arr1[j].name}</a></li>
                                <span>|</span>
                            `)

                            node1.appendTo(".Hair-index-layout-topCon");
                            var node3 = $(`
                                <div class="Hair-index-layout-bot">
                                    <div class="Hair-index-layout-botLeft">
                                       
                                    </div>
                                    <ul class="Hair-index-layout-botRight">
                                        <li class="border1"></li>
                                        <li class="border2"></li>
                                        <li class="border3"></li>
                                        <li class="border4"></li>
                                    </ul>
                                </div>
                            
                            `);
                            var children = arr1[j].children;
                            for(var k = 0; k <children.length;k++){
                                if(k==0){
                                    var node31 = $(`
                                        <a href="">
                                            <img src="${children[0].img}" alt="11111">
                                        </a>
                                    `);
                                   //console.log(children[0].img);
                                    node31.appendTo(node3.find(".Hair-index-layout-botLeft"));
                                }else{
                                    var node32 = $(`
                                        <li class="pin">
                                            <a href="">
                                                <span>
                                                    ${children[k].desc}
                                                </span>
                                            </a>
                                            <b>${children[k].price}</b>
                                            <a href=""><img src="${children[k].img}" alt=""></a>
                                        </li>
                                    `);
                                    node32.appendTo(node3.find(".Hair-index-layout-botRight") );
                                }
                            }
                            node3.appendTo(".Hair-index-layout");
                        }
                           
                    }

                    if(i == 2){
                        var arr2 = arr[2].child;
                        for(var j = 0;j < arr2.length; j++){
                            var node = $(`
                                <li>
                                    <a href="">
                                        <img src="${arr2[j].img}" alt="">
                                    </a>
                                    <a href="">
                                        <div>
                                            <span>${arr2[j].title}</span>
                                            <span>
                                                <i>${arr2[j].price}</i>
                                            </span>
                                        </div>
                                        <p>
                                            ${arr2[j].desc}
                                        </p>
                                    </a>
                                    <p class="date">
                                        <span>${arr2[j].date}</span>
                                    </p>
                                </li>
                            
                            `);

                            node.appendTo(".Hair-index-saying-bot-con ul");
                        }
                    }


                    if(i == 3){
                       
                        var arr3 = arr[3].child;
                        for(var j = 0;j < arr3.length; j++){
                            var node = $(`
                                <li>
                                    <a href="">
                                        <img src="${arr3[j].img}" alt="tu">
                                    </a>
                                    <a href="">
                                        ${arr3[j].desc}
                                    </a>
                                    <p>
                                    <i>￥</i>
                                        ${arr3[j].price}
                                    </p>
                                </li>
                            
                            `);

                            node.appendTo(".Hair-index-recommend-bot ul");
                        }
                    }
                    
                }
               

            },
            error: function(msg){
                alert(msg);
            }
        });
    }
    //侧边栏选项卡的功能实现
    function slide(){
        $(function(){
            $(".Hair-index-nav-left-con ul").on("mouseenter","li",function(){
                var index = $(this).index();
                $(".goodsList").css("display","none")
                .eq($(this).index()).css("display","block");
                if(index==8){
                    //alert( $(".goodsList").eq(index))
                    $(".goodsList").eq(index).css("width","0");
                }
                if(index==3 || index==9){
                    //alert( $(".goodsList").eq(index))
                    $(".goodsList").eq(index).css("width","210");
                }
                if( $(".goodsList").eq($(this).index()).css("display","block")){
                    $(".goodsList").eq($(this).index()).mouseenter(function(){
                        $(this).css("display","block");
                    }).mouseleave(function(){
                        $(this).css("display","none");
                    })
                }else{
                    $(".goodsList").eq($(this).index()).css("display","none")
                }
            });
            $(".Hair-index-nav-left-con ul").on("mouseleave","li",function(){
                $(".goodsList").eq($(this).index()).css("display","none");
            })

        })
    }
    //优品专辑选项卡
    function ypslide(){
        $(function(){
            $(".Hair-index-layout-topCon").on("mouseenter","li",function(){
               
                //alert($(this).index()/2);
                $(".Hair-index-layout-bot").css("display","none")
                .eq($(this).index()/2).css("display","block");
   
                
                
            });
                                                                                           
        })
    }
    //首页轮播图
    function banner(){
        $(function(){
            var aBtns = $("#Hair-play").find("ol").find("li");
            var oUl = $("#Hair-play").find("ul");
            var iNow = 0; //代表现在是第几张图片在显示
            var timer = null;

            aBtns.click(function(){
                iNow = $(this).index();
                tab();
            })
            //启动定时器让他自动切换
            timer = setInterval(function(){
                iNow++;
                tab();
                // document.title = iNow;
            }, 2000);

            $("#Hair-play").mouseenter(function(){
                clearInterval(timer);
            }).mouseleave(function(){
                timer = setInterval(function(){
                    iNow++;
                    tab();
                    
                }, 2000);
            })
            //封装一个切换图片和切换按钮的函数
            function tab(){
                aBtns.attr("class", '').eq(iNow).attr("class", 'active');
                if(iNow == aBtns.size()){
                    //当下标=5的时候，说明是最后一张图片
                    aBtns.eq(0).attr("class", 'active');
                }
                oUl.animate({top: -iNow * 430}, 300, function(){
                    //判断是否是最后一张图片
                    if(iNow == aBtns.size()){
                        iNow = 0;
                        oUl.css("top", 0);
                    }
                });
            }

        })

    }

    $(".Hair-index-saleHot ul").on("mouseenter","li",function(){
        $(this).css("marginTop","-2px");
        $(this).css("boxShadow","10px 10px 10px #ccc");
        }).on("mouseleave","li",function(){
        $(this).css("marginTop","0");
        $(this).css("boxShadow","0 0 0 #ffffff");
    })

    $(".Hair-index-jptj-bot-right").on("mouseenter","li",function(){
        //alert(1111111);
        $(this).css("marginLeft","-2px");
        $(this).css("boxShadow","10px 10px 10px #ccc");
        }).on("mouseleave","li",function(){
        $(this).css("marginLeft","0");
        $(this).css("boxShadow","0 0 0 #ffffff");
    })
    $(".Hair-index-recommend-bot ul").on("mouseenter","li",function(){
        $(this).css("marginTop","-2px");
        $(this).css("boxShadow","10px 10px 10px #ccc");
        }).on("mouseleave","li",function(){
        $(this).css("marginTop","0");
        $(this).css("boxShadow","0 0 0 #ffffff");
    })
    //大家都在说的轮播图
    function sayingBanner(){
        
        
       var timer= setInterval(function(){
            //alert($(".Hair-index-saying-bot-con ul").position().left);
            if($(".Hair-index-saying-bot-con ul").position().left <= 0){
                $(".Hair-index-saying-bot-con ul").css({
                    left: $(".Hair-index-saying-bot-con ul").position().left- 300
                });
                
            }/* else{
                $(".Hair-index-saying-bot-con ul").css({
                    left: $(".Hair-index-saying-bot-con ul").position().left+ 300
                });
            } */
            if($(".Hair-index-saying-bot-con ul").position().left == -1800){
                //alert($(".Hair-index-saying-bot-con ul").position().left);
                $(".Hair-index-saying-bot-con ul").css({
                    left:0,
                })
            }
            
            
        },2000);

        $(".Hair-index-saying-bot").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer= setInterval(function(){
                //alert($(".Hair-index-saying-bot-con ul").position().left);
                if($(".Hair-index-saying-bot-con ul").position().left <= 0){
                    $(".Hair-index-saying-bot-con ul").css({
                        left: $(".Hair-index-saying-bot-con ul").position().left- 300
                    });
                    
                }/* else{
                    $(".Hair-index-saying-bot-con ul").css({
                        left: $(".Hair-index-saying-bot-con ul").position().left+ 300
                    });
                } */
                if($(".Hair-index-saying-bot-con ul").position().left == -1800){
                    //alert($(".Hair-index-saying-bot-con ul").position().left);
                    $(".Hair-index-saying-bot-con ul").css({
                        left:0,
                    })
                }
                
                
            },2000);
        })
        $(".firstSpan").click(function(){
            //clearInterval(timer);
            $(".Hair-index-saying-bot-con ul").css({
                left: $(".Hair-index-saying-bot-con ul").position().left- 300
            });
            if($(".Hair-index-saying-bot-con ul").position().left == -1800){
                //alert($(".Hair-index-saying-bot-con ul").position().left);
                $(".Hair-index-saying-bot-con ul").css({
                    left:0,
                })
            }
        });

        $(".lastSpan").click(function(){
            $(".Hair-index-saying-bot-con ul").css({
                
                left: $(".Hair-index-saying-bot-con ul").position().left + 300
            });
            if($(".Hair-index-saying-bot-con ul").position().left >= 0){
                //alert($(".Hair-index-saying-bot-con ul").position().left);
                $(".Hair-index-saying-bot-con ul").css({
                    left:-1800,
                })
            }
        }); 

        

       

    }

    return {
        index:index,
        download:download,
        slide:slide,
        banner:banner,
        ypslide:ypslide,
        sayingBanner:sayingBanner,
    }
});