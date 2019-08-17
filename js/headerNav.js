define(["jquery","jquery-cookie"],function($){
    function headerNav(){
        $.ajax({
            url: "../data/index_nav.json",
            success: function(arr){
                
                for(var i = 0; i < arr.length; i++){
                    var node = $(` 
                    <li><a href="../index.html" target="_blank">${arr[i].title}</a>
                    <span class="iconfont">${arr[i].hot}</span>
                    </li>
                    
                    `);
                    node.appendTo(".Hair-index-nav-right");
                    
                }

            },
            error: function(msg){
                alert(msg);
            }
        })
       
        
    } 

    function getUsername(){
        
        var cookieStr = $.cookie("username");
        //alert(cookieStr)
        if(cookieStr){
           
            $(".Hair-public-header-nav-box li:first").html( "欢迎 "+cookieStr +"用户");
            $(".Hair-public-header-nav-box li:first").css("color","red")
            .css("fontWeight","900");
            var text = $(".Hair-public-header-nav-box li:first").html();
            if(text == "欢迎 "+cookieStr +"用户"){
                $(".tuilogin").css("visibility","visible");
            }
            //alert(11);
            //alert(cookieArr.username)
        }
    }

    function tuiLogin(){
        $(".tuilogin").click(function(){

            //alert(111)
            $.cookie("username",null);
            var node = `嗨，欢迎来到顺逛商城 请
            <a href="Hair-login.html"  target="_blank" class="login-btn">登录</a>
            <span>|</span>
            <a href="Hair-register.html" target="_blank" class="register-btn">免费注册</a>`;
            $(".Hair-public-header-nav-box li:first").html(node)
            .css("color","#999")
            .css("fontWeight","100")
            $(".tuilogin").css("visibility","hidden");
            setTimeout(function(){
               window.open("Hair-login.html");
            }, 2000);
        })
    }
    //购物车数量
        
        function sc_num(){
           
            var cookieStr = $.cookie("goods");
            
            if(cookieStr){
                var cookieArr = eval(cookieStr);
                var sum = 0;
                for(var i = 0; i < cookieArr.length; i++){
                    sum += cookieArr[i].num;
                    
                }
                //alert(11)
                $(".myCarNum").html(sum);

            }else{
                $(".myCarNum").html(0);
            }
        }
    return{
        headerNav:headerNav,
        sc_num:sc_num,
        getUsername:getUsername,
        tuiLogin:tuiLogin,
    }
})