<?php

header('content-type:text/html;charset="utf-8"');
$responseData = array("code"=>0,"msg"=>"");
$username = $_POST["username"];
$pwd = $_POST["pwd"];
//echo ($_POST);
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

$str = md5(md5($pwd));

$link = mysql_connect("localhost","root","123456");
if(!$link){
    $responseData["code"] = 3;
    $responseData["msg"] = "服务器忙，稍后再试吧";
    echo json_encode($responseData);
    exit;
}
mysql_select_db("hair");
mysql_set_charset("utf8");

$sql = "SELECT * FROM user WHERE username='{$username}' and pwd='{$str}'";

$res = mysql_query($sql);

$row = mysql_fetch_assoc($res);

if(!$row){
    $responseData["code"] = 4;
    $responseData["msg"] = "用户名或密码错误";
    echo json_encode($responseData);
    exit;
}else{
    $responseData["msg"] = "登录成功";
    echo json_encode($responseData);
}