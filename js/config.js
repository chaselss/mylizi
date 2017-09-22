require.config({
	
	paths:{
		"jquery": "../jquery-1.10.1.min",
		"swiper": "../plugin/swiper",
		"jquery.ui": "../plugin/jquery-ui",
		"temp" :　"../template/temp",
		"tempengine" : "../template/tempengine",
		"date" : "../plugin/date",
		"partemp" : "../template/partner",
		"cookie" : "../plugin/cookie",
		"magnify" : "../plugin/magnify",
		"comment_tem" :　"../template/comme_temp",
		"pager": "../plugin/pager"
	},
	shim:{
		"ajax":{
			exports: "ajax"
		},
		"magnify":{
			exports:"magnify"
		},
		"pager" :{
			exports:"Page"
		}
	}
}) 