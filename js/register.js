define([
    'jquery',
    'jquery-cookie'
], function($) {
    function register(){

        



        var i = false;
        var j = false;
        var k = false;
        $("#username").blur(function(){
            if($("#username").val()){
                if((/^1(3|[5-9])\d{9}$/).test(this.value)){
                    $("#div1").html("用户名正确");
                    $("#div1").css("color","green");
                    i= true;
                }else{
                    $("#div1").html("请填写正确格式手机号");
                    $("#div1").css("color","red");
                }
            }else{
                $("#div1").html("用户名不能为空");
                $("#div1").css("color","red");
            } 
            
        });
        $("#pwd").blur(function(){
            if($("#pwd").val()){
                if(this.value.length >= 6 && this.value.length <= 18){
                    $("#div2").html("密码符合要求") ;
                    $("#div2").css("color","green");
                    $("#pwdstrong").css("display","none");
                    j=true;
                }else{
                    $("#div2").html("密码长度需要6到16位");
                    $("#div2").css("color","red");
                }
            }else{
                $("#div2").html("密码不能为空");
                $("#div2").css("color","red");
            }
            
        });
        $("#pwd").keyup(function(){
            if(this.value.length >= 6 && this.value.length <= 18){
            
                for(var i = 0; i <  $("#pwdstrong span").length; i++){
                    $(this).attr("class","")
                   
                }
            //alert(aSpan[0]);
                if(/^\d+$/.test(this.value)||/^[a-z]+$/.test(this.value)|| /^[A-Z]+$/.test(this.value)){
                
                
                    $("#pwdstrong").css("display","block");
                    $("#pwdstrong span").eq(0).attr("class","active")
                    $("#div2").html("密码过于简单")
                    $("#div2").css("color","red");
        
                }else if(/\d+/.test(this.value) && /[a-z]+/.test(this.value) && /[A-Z]+/.test(this.value)){
                    $("#pwdstrong").css("display","block");
                    $("#pwdstrong span").eq(2).attr("class","active")
                    $("#div2").html("密码强度高")
                    $("#div2").css("color","green");
        
                }else{
                    $("#pwdstrong").css("display","block");
                    $("#pwdstrong span").eq(1).attr("class","active")
                    $("#div2").html("密码强度适中")
                    $("#div2").css("color","green");
                }
            
            }
        
        })


        //判断密码是否一致；
        $("#repwd").blur(function(){
            if($("#repwd").val()){
                if($("#repwd").val() == $("#pwd").val()){
                    $("#div3").html("密码一致呢");
                    $("#div3").css("color","green");
                    k= true;
                }else{
                    $("#div3").html("密码不一致");
                    $("#div3").css("color","red");
                }
            }else{
                $("#div3").html("确认密码不能为空");
                $("#div3").css("color","red");
            }
            
        })

        $(".Hair-register-submit").click(function(){
            if(i == true && j==true && k == true){
                $.ajax({
                    type:"post",
                    url:"../php/register.php",
                    data:{
                        username:$("#username").val(),
                        pwd:$("#pwd").val(),
                        repwd:$("#repwd").val(),
                    },
                    success:function(res){
                        //alert(res)
                        var obj = JSON.parse(res);
                        //alert(obj)
                        if(obj.code){
                        
                            alert(obj.msg + "请您重新注册")
                        }else {
                            alert("恭喜您注册成功");
                            setTimeout(function(){
                                location.assign("Hair-login.html");
                            }, 2000);
                        }
                        /* if(res){
                            alert("恭喜您注册成功");
                            
                        } */
                    },
                    error:function(msg){
                        alert(msg)
                    }
                });

             }else{
                 alert("请完成以上验证在注册");
             }
            
            $("input").val("");
            $("#div1").html("");
            $("#div2").html("");
            $("#div3").html("");
        });

    }
    return {
        register:register,
    }
    
});