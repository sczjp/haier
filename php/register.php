<?php
header('content-type:text/html;charset="utf-8"');
//定义一个关联数组，里面放返回的统一格式，模拟状态码
$responseData = array("code"=>0,"msg"=>"");
$username = $_POST['username'];
$pwd = $_POST["pwd"];
$repwd = $_POST["repwd"];
//echo $time;
//对传过来的数据进行简单的判断；
if(!$username){
    $responseData["code"] = 1;
    $responseData["msg"] = "用户名不能为空";
    echo json_encode($responseData);
    exit;
}  
if(!$pwd){
    $responseData["code"] = 2;
    $responseData["msg"] = "密码不能为空";
    echo json_encode($responseData);
    exit;
}   
if($pwd != $repwd){
    $responseData["code"] = 3;
    $responseData["msg"] = "两次输入的密码不一致";
    echo json_encode($responseData);
    exit;
}   
$str = md5(md5($pwd)); 

$link = mysql_connect("localhost","root","123456");
if(!$link){
    $responseData["code"] = 4;
    $responseData["msg"] = "服务器忙，稍后再试吧";
    echo json_encode($responseData);
    exit;
}
mysql_select_db("hair");
mysql_set_charset("utf8");

$sql = "SELECT * FROM user WHERE username='{$username}'";

$res = mysql_query($sql);

$row = mysql_fetch_assoc($res);

if($row){
    $responseData["code"] = 5;
    $responseData["msg"] = "用户名已经存在";
    echo json_encode($responseData);
    exit;
}

$sql2 = "INSERT INTO user(username,pwd,repwd) VALUES('{$username}','{$str}','{$repwd}')";

$res2 = mysql_query($sql2);



if(!$res2){
    $responseData["code"] = 6;
    $responseData["msg"] = "注册失败";
    echo json_encode($responseData);
    exit;
}else{
    $responseData["msg"] = "注册成功";
    echo json_encode($responseData); 
}


mysql_close($link);