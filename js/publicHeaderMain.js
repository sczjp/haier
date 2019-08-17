console.log("头部文件加载成功");
/*
	配置引入的所有的.js文件

 */
require.config({
	/* paths:{
		"jquery":"jquery-1.11.3",
		"jquery.cookie":"jquery.cookie",
		"parabola":"parabola",
		"index":"index"

	},
	shim:{
		"jquery.cookie":["jquery"],
		"parabola":{
			exports:"_"
		}
	} */
	paths: {
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",
		"parabola": "parabola",
		"headerNav":"headerNav",
	},
	shim: {
		//设置jquery-cookie依赖于jquery开发的
		"jquery-cookie": ["jquery"],
		//抛物线不支持AMD规范
		"parabola": {
			exports: "_"
		}
	}
});

require(["headerNav"],function(headerNav){
	headerNav.headerNav();
	headerNav.sc_num();
	headerNav.getUsername();
	headerNav.tuiLogin();
});