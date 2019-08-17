console.log("登录加载成功");


require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "login":"login"
    },
    shim: {
		//设置jquery-cookie依赖于jquery开发的
		"jquery-cookie": ["jquery"],
	}
});
require(["login"],function(login){
    login.login();

})