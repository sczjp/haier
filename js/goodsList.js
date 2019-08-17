define([
    "headerNav",
    "parabola", 
    'jquery',
    'jquery-cookie',
], function(headerNav,parabola,$) {
    function goodsList(){

    
        $(function(){
            sc_num();
            sc_msg();


            $.ajax({
                url: "../data/goodsList.json",
                // dataType: "json",
                success: function(arr){
                   // alert(1)
                    /*
                        JQ会对我们拿到的数据进行自动检测，如果是json格式的数据，自动转成数据结构
                        dataType: 
                        alert(data);
                    */

                    for(var i = 0; i < arr.length; i++){
                        var node = $(`
                            <li class = 'goods_item'>
                                <a href="../html/Hair-details.html" class = 'goods_pic'>
                                    <img src="${arr[i].img}" alt="">
                                </a>
                                <a href="" class = 'goods_title'>
                                    <div>
                                        <span>${arr[i].title}</span>
         
                                    </div>
                                </a>
                                <p class="priceCar">
                                    <span>
                                        <i>$</i>
                                        ${arr[i].price}
                                    </span>
                                    <span class = 'iconfont sc_btn' id = '${arr[i].id}'>&#xe64a;</span>
                                </p>
                            </li>
                        `);

                        node.appendTo('.Hair-goodsList-mod ul');
                    }
                },
                error: function(error){
                    alert(error);
                }
            })

            /*
                购物车商品通过cookie进行缓存
            */
            $(".Hair-goodsList-mod ul").on("click", ".sc_btn", function(){
                //alert(1)
                //this.id是当前按钮所在商品的id。
                /*
                    cookie存储空间是有限的，存储只能是json格式的字符串。
                    1、商品id
                    2、商品数量
                */
                var id = this.id;

                //1、判断是否是第一次添加
                var first = $.cookie("goods") == null ? true : false;
                if(first){
                    $.cookie("goods", `[{"id":"${id}","num":1}]`, {
                        expires: 7
                    });
                }else{
                    //2、判断之前是否添加过该商品
                    var cookieStr = $.cookie("goods");
                    var cookieArr = JSON.parse(cookieStr);
                    var same = false;
                    for(var i = 0; i < cookieArr.length; i++){
                        if(cookieArr[i].id == id){
                            cookieArr[i].num++;
                            same = true;
                            break;
                        }
                    }


                    //3、没有添加过该商品
                    if(!same){
                        var obj = {id:id, num:1};
                        cookieArr.push(obj);
                    }

                    //4、存储cookie
                    $.cookie("goods", JSON.stringify(cookieArr), {
                        expires: 7
                    })

                }

                
                sc_num();
                sc_msg();
                headerNav.sc_num();

                ballMove(this);
            })

            //给右侧购物车添加移入和移出
            $(".sc_right").mouseenter(function(){
                $(this).stop().animate({
                    right: 0
                }, 500)
            });

            $(".sc_right").mouseleave(function(){
                $(this).stop().animate({
                    right: -270
                }, 500)
            });

            /*
                抛物线运动的函数
            */
            function ballMove(node){
                //传入当前点击的按钮node
                $("#ball").css({
                    left: $(node).offset().left,
                    top: $(node).offset().top,
                    display: "block"
                })

                var X = $(".sc_right .sc_pic").offset().left - $("#ball").offset().left;
                var Y = $(".sc_right .sc_pic").offset().top - $("#ball").offset().top;
                //1、创建一个抛物线对象
                var bool = new Parabola({
                    el: "#ball",
                    offset: [X, Y],
                    duration: 500,
                    curvature: 0.001,
                    callback: function(){
                        $("#ball").hide();
                    }
                })

                bool.start();
            }

            $("#clearBtn").click(function(){
                $.cookie("goods", null);
                sc_num();
                sc_msg();
            })

            //右侧购物车的删除按钮添加点击，点击以后删除数据
            $(".sc_right ul").on("click", ".sc_deleteBtn", function(){
                var id = this.id;
                /*
                    删除当前这条商品
                    1、删除当前这条商品的cookie
                    2、页面显示的标签也要删除
                */
                $(this).closest('li').remove();
                var cookieArr = JSON.parse($.cookie("goods"));
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        cookieArr.splice(i, 1);
                        break;
                    }
                }
                if(cookieArr.length == 0){
                    $.cookie("goods", null);
                }else{
                    $.cookie("goods", JSON.stringify(cookieArr), {
                        expires: 7
                    });
                }

                sc_num();

            })

            //点击 + - 号 操作商品的数量
			$(".sc_right ul").on("click",".sc_NumBtn",function(){
				var id = $(this).closest("li").attr("id");
				//alert(id);
				var cookieArr = eval($.cookie("goods"));
				for(var i = 0 ; i<cookieArr.length; i++){
					if(id == cookieArr[i].id){
						if(this.innerHTML == "+"){
							cookieArr[i].num++;
							$(this).nextAll("span").html(cookieArr[i].num);
						}else{
							if(cookieArr[i].num == 1){
								alert("数量已经为1");
							}else{
								cookieArr[i].num--;
								$(this).prevAll("span").html(cookieArr[i].num);
							}
						}
						break;
					}
				}
				$.cookie("goods",JSON.stringify(cookieArr),{
					expires:7
				});
				sc_num();
				
			});


            //加载右侧购物车数据
            /*
                cookie  只存储了id和数量
                页面加载数据，还要商品的信息
                【注】通过ajax将数据下载下来，通过cookie存储商品id，判断哪些商品加载在购物车。
            */

            
            function sc_msg(){
                $.ajax({
                    url: "../data/goodsList.json",
                    success: function(arr){
                        //判断哪些商品的数据，被添加在cookie里
                        var cookieStr = $.cookie("goods");
                        if(cookieStr){
                            var newArr = [];
                            var cookieArr = JSON.parse(cookieStr);
                            for(var i = 0; i < arr.length; i++){
                                for(var j = 0; j < cookieArr.length; j++){
                                    if(arr[i].id == cookieArr[j].id){
                                        //将商品数量，添加在我们数据中
                                        arr[i].num = cookieArr[j].num;

                                        newArr.push(arr[i]);
                                    }

                                }
                            }
                            $(".sc_right ul").html("");

                            //newArr
                            //通过循环将数据添加到我们右侧购物车的页面上
                            for(var i = 0; i < newArr.length; i++){
                                var node = $(`<li id = '${newArr[i].id}'>
                                    <div class = 'sc_goodsPic'>
                                        <img src="${newArr[i].img}" alt="">
                                    </div>
                                    <div class = 'sc_goodsTitle'>
                                        <p>${newArr[i].title}</p>
                                        
                                        <p><i>$<i>${newArr[i].price}</p>

                                    </div>
                                    <div class="sc_Bon_Bot">
                                        <div class = 'sc_goodsBtn' id = '${newArr[i].id}'>购买</div>
                                        <div class = 'sc_deleteBtn' id = '${newArr[i].id}'>删除</div>
                                        <div class = 'sc_goodsNum'>商品数量：
                                            <button class = 'sc_NumBtn'>+</button>
                                            <span>${newArr[i].num}</span>
                                        
                                            <button class = 'sc_NumBtn'>-</button>
                                        </div>
                                    </div>

                                </li>`);

                                node.appendTo('.sc_right ul');
                            }
                        }else{
                            $(".sc_right ul").html("");
                        }


                    }
                })
            }

            //计算购物车数量  eval 要求数据必须是最外层是数组，元素是对象。
            function sc_num(){
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = eval(cookieStr);
                    var sum = 0;
                    for(var i = 0; i < cookieArr.length; i++){
                        sum += cookieArr[i].num;
                    }
                    $(".sc_right .sc_num").html(sum);

                }else{
                    $(".sc_right .sc_num").html(0);
                }
            }
            
        })
    }

    return {
        goodsList:goodsList,
    }
});