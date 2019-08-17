console.log("越越加载成功了");
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "range":"range",
        "magnifyGlass":"magnifyGlass",
        "headerNav":"headerNav",
    },
    shim: {
		//设置jquery-cookie依赖于jquery开发的
		"jquery-cookie": ["jquery"],
	}
});
require(["magnifyGlass"],function(magnifyGlass){
    magnifyGlass.magnifyGlass();
    magnifyGlass.tab();
    magnifyGlass.a();
    magnifyGlass.sbp();
    magnifyGlass.big();

})