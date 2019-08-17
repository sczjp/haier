console.log("越越告你说商品列表成功了");
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
        "range":"range",
		"goodsList":"goodsList",
		"headerNav":"headerNav"
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

require(["goodsList"],function(goodsList){

	goodsList.goodsList();
});