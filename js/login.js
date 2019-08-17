define([
    'jquery',
    'jquery-cookie'
], function($) {
    function login(){
        $(".Hair-login-submit").click(function(){
            //alert(11)
                $.ajax({
                    type:"post",
                    url:"../php/login.php",
                    data:{
                        username:$("#shop_login_username").val(),
                        pwd:$("#shop_login_password").val(),
                    },
                    success:function(res){
                        //alert(res)
                        var obj = JSON.parse(res);
                        //alert(obj)
                        if(obj.code){
                        
                            alert(obj.msg + "请您重新登录")
                        }else {
                            alert("登录成功");
                            $.cookie("username",$("#shop_login_username").val() , {
                                expires: 7
                            });
                            setTimeout(function(){
                                location.assign("../index.html");
                            }, 2000);
                        }
                    },
                    error:function(msg){
                        alert(msg)
                    }
                });

    })

}
    return {
        login:login,
    }
    
});