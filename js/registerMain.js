console.log("注册加载成功");

require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "register":"register"
    },
    shim: {
		//设置jquery-cookie依赖于jquery开发的
		"jquery-cookie": ["jquery"],
	}
});
require(["register"],function(register){
    register.register();

})