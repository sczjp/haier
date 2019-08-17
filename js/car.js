define(["jquery","jquery-cookie"],function($){
    function car(){
        sc_msg();
        function sc_msg(){
            $.ajax({
                url: "../data/goodsList.json",
                success: function(arr){
                    //alert(arr[0].id);
                    //判断哪些商品的数据，被添加在cookie里
                    var cookieStr = $.cookie("goods");
                    //alert(cookieStr);
                    if(cookieStr){
                        var newArr = [];
                        var cookieArr = JSON.parse(cookieStr);
                        //alert(cookieArr);
                        for(var i = 0; i < arr.length; i++){
                            for(var j = 0; j < cookieArr.length; j++){
                                if(arr[i].id == cookieArr[j].id){
                                    //将商品数量，添加在我们数据中
                                    arr[i].num = cookieArr[j].num;

                                    newArr.push(arr[i]);
                                }

                            }
                        }
                        //alert(newArr);
                        $(".car-table .two").html("");

                        //newArr
                        //通过循环将数据添加到我们右侧购物车的页面上
                        var numsum = null;
                        var pricesum = null;
                        for(var i = 0; i < newArr.length; i++){

                            var n = newArr[i].num;
                            var p = newArr[i].price;
                            var mul = n*p;
                            numsum+=n;
                            pricesum+=mul;
                            //alert(pricesum);
                            var node = $(`<tr class="two" id = "${newArr[i].id}">
                            <td><input type="checkbox" id="tag_box"></td>
                            <td>
                                <a href="">
                                    <img src="${newArr[i].img}" alt="11111111">
                                    <span>
                                    ${newArr[i].title}
                                    </span>
                                </a>
                            </td>
                            <td>
                                支持
                            </td>
                            <td>
                                <i>$</i>
                                ${newArr[i].price}
                            </td>
                            <td>
                                <b class="jiajianBtn">+</b>
                                <span>${newArr[i].num}</span>
                                <b class="jiajianBtn">-</b>
                            </td>
                            <td>
                                <i>$</i>
                                ${mul}
                            </td>
                            <td>
                                <b class="shanBtn" id = '${newArr[i].id}'>删除</b>
                            </td>

                    </tr>`);

                            node.appendTo('.car-table');
                        }
                    }else{
                        $(".car-table .two").html("");
                    }

                    $(".three .three-price span").html(numsum);
                    $(".three .three-price i b").html(pricesum);


                },
                error:function(msg){
                    alert(msg);
                }
            })
        }
        $(".car-table").on("click", ".shanBtn", function(){
            var id = this.id;
            /*
                删除当前这条商品
                1、删除当前这条商品的cookie
                2、页面显示的标签也要删除
            */
            $(this).closest('tr').remove();
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){

                // var n = newArr[i].num;
                // alert(n);
                // var p = newArr[i].price;
                // var mul = n*p;
                // numsum+=n;
                // pricesum+=mul;
                // alert(p)
                // alert(mul)
                // alert(pricesum)
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
            sc_msg();
            sc_num();


        })
         //点击 + - 号 操作商品的数量
			$(".car-table").on("click",".jiajianBtn",function(){
                //alert(111)
				var id = $(this).closest("tr").attr("id");
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
                sc_msg();

				
            });

            //清空购物车
            $("#delete_car").click(function(){
				$.cookie("goods",null);
				sc_msg();
                //sc_num();                
                $(".three .three-price span").html("0");
                $(".three .three-price i b").html("0");
			});
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

            $("#tag_box").click(function(){
                $(".car-table .two input").prop('checked',this.checked);
            })

           
            
    }

    function carGetUser(){
        var cookieStr = $.cookie("username");
        if(cookieStr){
   
            $(".Hair-car-headerr li:first").html( "欢迎 "+ cookieStr +"用户");
            $(".Hair-car-headerr li:first").css("color","red")
            .css("fontWeight","900")
        }
    }
    return{
        car:car,
        carGetUser:carGetUser,
    }
});