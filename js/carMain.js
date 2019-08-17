console.log("购物车页面加载成功");
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
		"car":"car",
		
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
require(["car"],function(car){
   car.car();
   car.carGetUser();
})